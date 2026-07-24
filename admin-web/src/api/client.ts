// 统一 API 客户端:同源(dev 走 Vite proxy)、带 cookie、写操作附 CSRF 头、401 抛出供守卫跳登录。

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

let csrfToken = "";
export function setCsrf(token: string) {
  csrfToken = token || "";
}

type Options = { method?: string; body?: unknown };

async function request<T>(path: string, opts: Options = {}): Promise<T> {
  const method = opts.method ?? "GET";
  const headers: Record<string, string> = {};
  if (opts.body !== undefined) headers["Content-Type"] = "application/json";
  // 写操作带 CSRF(双提交:后端比对本 session 派生的令牌)
  if (method !== "GET" && csrfToken) headers["X-CSRF-Token"] = csrfToken;

  const res = await fetch(`/api${path}`, {
    method,
    credentials: "include", // 携带 HttpOnly session cookie
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
