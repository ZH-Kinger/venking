// 统一 API 客户端:同源(dev 走 Vite proxy),带 Logto access token(Bearer),401 抛出供守卫处理。
// 令牌由 AuthProvider 通过 setTokenGetter 注入(getAccessToken 是 Logto hook,只能在组件树内取)。

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

type TokenGetter = () => Promise<string | undefined>;
let tokenGetter: TokenGetter | null = null;
export function setTokenGetter(fn: TokenGetter | null) {
  tokenGetter = fn;
}

type Options = { method?: string; body?: unknown };

async function request<T>(path: string, opts: Options = {}): Promise<T> {
  const method = opts.method ?? "GET";
  const headers: Record<string, string> = {};
  if (opts.body !== undefined) headers["Content-Type"] = "application/json";

  // 附 Bearer:token 拿不到就不带头(后端返 401,守卫会引导重新登录)。
  if (tokenGetter) {
    try {
      const token = await tokenGetter();
      if (token) headers["Authorization"] = `Bearer ${token}`;
    } catch {
      /* 取 token 失败 → 不带头,后端 401 */
    }
  }

  const res = await fetch(`/api${path}`, {
    method,
    headers,
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
  });

  if (res.status === 204) return undefined as T;
  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    /* 非 JSON 响应 */
  }
  if (!res.ok) {
    let detail = `请求失败(${res.status})`;
    if (data && typeof data === "object" && "detail" in data) {
      detail = String((data as { detail: unknown }).detail);
    }
    throw new ApiError(res.status, detail);
  }
  return data as T;
}

export const api = {
  get: <T>(p: string) => request<T>(p),
  post: <T>(p: string, body?: unknown) => request<T>(p, { method: "POST", body }),
};
