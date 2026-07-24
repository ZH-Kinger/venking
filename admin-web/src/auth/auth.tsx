// 身份接 Logto:登录/登出/令牌全交给 @logto/react 托管;is_admin 以后端 /api/me 为准。
import { useLogto } from "@logto/react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { setTokenGetter } from "../api/client";
import { meApi, type Me } from "../api/endpoints";
import { API_RESOURCE, callbackUri, postLogoutUri } from "../config";

interface AuthState {
  me: Me | null;          // 后端确认的当前用户(null=未登录或非法)
  authed: boolean;        // Logto 侧已认证
  loading: boolean;       // Logto SDK 初始化 or 正在拉 /api/me
  isAdmin: boolean;
  login: () => void;      // 跳 Logto 托管登录页
  logout: () => void;     // Logto 登出并回站点
}

const AuthCtx = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, signIn, signOut, getAccessToken } = useLogto();
  const [me, setMe] = useState<Me | null>(null);
  const [probing, setProbing] = useState(false);

  // 让 API 客户端能取到本 resource 的 access token(仅认证后注册)。
  useEffect(() => {
    if (isAuthenticated) {
      setTokenGetter(() => getAccessToken(API_RESOURCE));
    } else {
      setTokenGetter(null);
      setMe(null);
    }
    return () => setTokenGetter(null);
  }, [isAuthenticated, getAccessToken]);

  // 认证后拉一次 /api/me,拿后端判定的 is_admin + 展示信息。
  useEffect(() => {
    let alive = true;
    if (!isAuthenticated) return;
    setProbing(true);
    void meApi
      .me()
      .then((m) => { if (alive) setMe(m); })
      .catch(() => { if (alive) setMe(null); })
      .finally(() => { if (alive) setProbing(false); });
    return () => { alive = false; };
  }, [isAuthenticated]);

  const value = useMemo<AuthState>(
    () => ({
      me,
      authed: isAuthenticated,
      loading: isLoading || (isAuthenticated && probing && me === null),
      isAdmin: Boolean(me?.is_admin),
      login: () => void signIn(callbackUri()),
      logout: () => void signOut(postLogoutUri()),
    }),
    [me, isAuthenticated, isLoading, probing, signIn, signOut],
  );
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
