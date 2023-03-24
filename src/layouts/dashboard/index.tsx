import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAppSelector } from "../../store";
export const DashboardLayout = () => {
  const nav = useNavigate();
  const uid = useAppSelector((s) => s.auth.uid);
  useEffect(() => {
    if (!uid ) nav("/", { replace: true });
  }, [uid, nav]);
  return (
    <>
      <Outlet />
    </>
  );
};
