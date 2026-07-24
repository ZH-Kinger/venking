import { api } from "./client";

// 当前登录用户:来自后端 /api/me(以 Logto access token 校验后的 sub + claims + is_admin 为准)。
export interface Me {
  sub: string;
  is_admin: boolean;
  username: string | null;
  email: string | null;
}

export interface HealthResponse {
  ok: boolean;
  checks: Record<string, boolean>;
  db_backend: string;
  iam: string; // "logto"
}
export interface AuditItem {
  id: string; action: string; resource_type: string | null;
  resource_id: string | null; request_id: string | null; created_at: string | null;
  actor_sub: string | null;
}
export interface ConversationItem {
  id: string; user_sub: string; title: string | null; updated_at: string | null;
}
export interface Paged<T> { total: number; limit: number; offset: number; items: T[]; }
export interface FeedbackItem {
  ts?: string; verdict?: string; question?: string; answer?: string; mode?: string; correction?: string | null;
}

// 身份/登录/登出全由 Logto 托管(见 auth/auth.tsx),这里只留"当前用户"探针。
export const meApi = {
  me: () => api.get<Me>("/me"),
};

export const adminApi = {
  health: () => api.get<HealthResponse>("/admin/system/health"),
  auditLogs: (limit = 50) => api.get<Paged<AuditItem>>(`/admin/audit-logs?limit=${limit}`),
  conversations: (limit = 50) => api.get<Paged<ConversationItem>>(`/admin/conversations?limit=${limit}`),
  feedback: (limit = 100) => api.get<{ total: number; items: FeedbackItem[] }>(`/admin/feedback?limit=${limit}`),
};
