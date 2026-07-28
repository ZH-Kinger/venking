#!/usr/bin/env python3
"""TCP → SOCKS5 盲隧道:把到本机某端口的连接,经 SOCKS5 转发到固定目标。

为什么需要它:Logto(Node 22)不认 HTTP_PROXY 环境变量(那是 Node 24+ 的
NODE_USE_ENV_PROXY),所以代理只能在网络层做。而 WARP 的 SOCKS5 只监听
127.0.0.1,容器访问不到 —— 本服务跑在宿主上,一头连得到 WARP,另一头
监听在 docker 网桥地址上供容器访问。

**盲隧道**:只搬字节,不解析、不终止 TLS。GitHub 的真实证书由 Logto 自己
校验,本服务看不到明文,不构成中间人。

用法:
  tcp2socks.py --listen 172.17.0.1:18443 --target github.com:443 \\
               --socks 127.0.0.1:40000
"""
from __future__ import annotations

import argparse
import logging
import socket
import struct
import threading

log = logging.getLogger("tcp2socks")
BUF = 65536


def socks5_connect(socks_host: str, socks_port: int, host: str, port: int,
                   timeout: float) -> socket.socket:
    """与 SOCKS5 服务端握手并 CONNECT 到目标,返回已就绪的 socket。

    用域名寻址(ATYP=0x03)而不是先本地解析成 IP —— 让 SOCKS5 那端去解析,
    避免本机被污染的 DNS 把我们导到错误的地址上。
    """
    s = socket.create_connection((socks_host, socks_port), timeout=timeout)
    try:
        s.sendall(b"\x05\x01\x00")               # VER=5, 1 种认证方式, NO-AUTH
        if s.recv(2) != b"\x05\x00":
            raise OSError("SOCKS5 不接受无认证")
        h = host.encode()
        s.sendall(b"\x05\x01\x00\x03" + bytes([len(h)]) + h + struct.pack("!H", port))
        rep = s.recv(4)
        if len(rep) < 2 or rep[1] != 0x00:
            raise OSError(f"SOCKS5 CONNECT 失败, REP={rep[1] if len(rep) > 1 else '?'}")
        # 吃掉 BND.ADDR/BND.PORT,长度随地址类型而定
        atyp = rep[3]
        if atyp == 0x01:
            s.recv(4 + 2)
        elif atyp == 0x03:
            s.recv(s.recv(1)[0] + 2)
        elif atyp == 0x04:
            s.recv(16 + 2)
        s.settimeout(None)
        return s
    except Exception:
        s.close()
        raise


def pump(src: socket.socket, dst: socket.socket) -> None:
    try:
        while True:
            data = src.recv(BUF)
            if not data:
                break
            dst.sendall(data)
    except OSError:
        pass
    finally:
        # 只关写方向,让另一半把剩余数据发完(半关闭),避免截断响应
        try:
            dst.shutdown(socket.SHUT_WR)
        except OSError:
            pass


def handle(client: socket.socket, args: argparse.Namespace) -> None:
    t_host, t_port = args.target.rsplit(":", 1)
    try:
        if args.plain:
            # 纯 TCP 转发(不走 SOCKS5)。容器那一跳用这个模式:
            # 它只需把 443 的流量搬到宿主的转发端口,SOCKS5 由宿主那一跳去说。
            upstream = socket.create_connection((t_host, int(t_port)), timeout=args.timeout)
            upstream.settimeout(None)
        else:
            s_host, s_port = args.socks.rsplit(":", 1)
            upstream = socks5_connect(s_host, int(s_port), t_host, int(t_port), args.timeout)
    except Exception as e:
        log.warning("连不上上游 %s: %s", args.target, e)
        client.close()
        return
    with client, upstream:
        a = threading.Thread(target=pump, args=(client, upstream), daemon=True)
        b = threading.Thread(target=pump, args=(upstream, client), daemon=True)
        a.start(); b.start(); a.join(); b.join()


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--listen", required=True, help="host:port,如 172.17.0.1:18443")
    p.add_argument("--target", required=True, help="host:port,如 github.com:443")
    p.add_argument("--socks", default="127.0.0.1:40000", help="SOCKS5 host:port")
    p.add_argument("--plain", action="store_true", help="纯 TCP 转发,不经 SOCKS5")
    p.add_argument("--timeout", type=float, default=15.0)
    args = p.parse_args()
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")

    host, port = args.listen.rsplit(":", 1)
    srv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    srv.bind((host, int(port)))
    srv.listen(128)
    log.info("监听 %s → %s(%s)", args.listen, args.target,
             "纯 TCP" if args.plain else f"经 SOCKS5 {args.socks}")
    while True:
        conn, _ = srv.accept()
        threading.Thread(target=handle, args=(conn, args), daemon=True).start()


if __name__ == "__main__":
    main()
