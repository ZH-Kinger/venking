import { api } from "./client";

export interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  status: string;
  last_login_at: string | null;
}
export interface MeResponse { user: User; csrf: string; }

export interface HealthResponse {
  ok: boolean;
  checks: Record<string, boolean>;
  db_backend: string;
  dev_mode: boolean;
}
export interface AuditItem {
  id: string; action: string; resource_type: string | null;
  resource_id: string | null; request_id: string | null; created_at: string | null;
  actor_user_id: string | null;
}
export interface LoginEventItem {
  id: string; event_type: string; user_id: string | null; created_at: string | null;
}
export interface Paged<T> { total: number; limit: number; offset: number; items: T[]; }
export interface FeedbackItem {
  ts?: string; verdict?: string; question?: string; answer?: string; mode?: string; correction?: string | null;
}

export const authApi = {
  me: () => api.get<MeResponse>("/auth/me"),
  login: (identifier: string, password: string) =>
    api.post<MeResponse>("/auth/login", { identifier, password }),
  logout: () => api.post<{ ok: boolean }>("/auth/logout"),
  csrf: () => api.get<{ csrf: string }>("/auth/csrf"),
  changePassword: (old_password: string, new_password: string) =>
    api.post<{ ok: boolean; relogin: boolean }>("/auth/change-password", { old_password, new_password }),
};

export const adminApi = {
  health: () => api.get<HealthResponse>("/admin/system/health"),
  auditLogs: (limit = 50) => api.get<Paged<AuditItem>>(`/admin/audit-logs?limit=${limit}`),
  loginEvents: (limit = 50) => api.get<Paged<LoginEventItem>>(`/admin/login-events?limit=${limit}`),
  feedback: (limit = 100) => api.get<{ total: number; items: FeedbackItem[] }>(`/admin/feedback?limit=${limit}`),
};
