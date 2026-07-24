import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ApiError } from "./api/client";
import { AuthProvider } from "./auth/auth";
import "./styles/tokens.css";

// 全局 401:会话中途过期时任一查询拿到 401 → 回登录页(后端本就强制鉴权,这里补 UX)。
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
  queryCache: new QueryCache({
    onError: (err) => {
      if (err instanceof ApiError && err.status === 401 && !location.pathname.endsWith("/login")) {
        location.assign("/admin/login");
      }
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* base=/admin/ → Router basename 对齐,SPA 内部路由用根相对路径 */}
    <BrowserRouter basename="/admin">
      <Theme appearance="dark" accentColor="indigo" grayColor="slate" radius="large" panelBackground="solid">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </QueryClientProvider>
      </Theme>
    </BrowserRouter>
  </React.StrictMode>,
);
