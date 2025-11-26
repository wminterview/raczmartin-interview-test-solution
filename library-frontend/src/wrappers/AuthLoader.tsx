import { useValidate } from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export function AuthGate() {
  const { data, isLoading } = useValidate();
  const { setAccessToken } = useAuthContext();

  useEffect(() => {
    if (data?.data) {
      console.log(data.data.token);
      setAccessToken(data.data.token);
    }
  }, [data]);

  if (isLoading) return <div>Loading authentication…</div>;

  return (
    <>
      <Outlet />
    </>
  );
}
