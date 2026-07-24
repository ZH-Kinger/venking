// Logto 登录回调页(/admin/callback):处理授权码换 token,完成后回首页。
import { useHandleSignInCallback } from "@logto/react";
import { useNavigate } from "react-router-dom";
import { ErrorState, Loading } from "../components/States";

export default function Callback() {
  const nav = useNavigate();
  const { isLoading, error } = useHandleSignInCallback(() => {
    nav("/", { replace: true }); // 回调路由用根相对(basename=/admin)
  });
  if (error) return <ErrorState message={`登录回调失败:${error.message}`} />;
  if (isLoading) return <Loading label="正在完成登录…" />;
  return null;
}
