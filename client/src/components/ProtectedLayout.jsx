import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import HoverSidebar from "./HoverSidebar";

export default function ProtectedLayout() {
  const { user, loading, logout } = useContext(AuthContext);
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) nav("/login");
  }, [loading, user, nav]);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (!user) return null;

  const collapsed = 76;
  const expanded = 260;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "radial-gradient(1200px 600px at 10% 10%, rgba(34,197,94,0.16), transparent 60%), radial-gradient(1200px 600px at 90% 20%, rgba(59,130,246,0.16), transparent 60%), #0b1220",
        overflowX: "hidden",
      }}
    >
      <HoverSidebar user={user} onLogout={logout} open={open} setOpen={setOpen} />

      {/* Content pushes smoothly */}
      <div
        style={{
          marginLeft: open ? expanded : collapsed,
          transition: "margin-left 260ms cubic-bezier(.2,.8,.2,1)",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
