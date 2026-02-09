import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const ICONS = {
  dashboard: "🏠",
  create: "➕",
  issues: "📋",
};

/* ---------- Tooltip ---------- */
function Tooltip({ show, text }) {
  if (!show) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: 64,
        top: "50%",
        transform: "translateY(-50%)",
        padding: "8px 10px",
        borderRadius: 10,
        fontSize: 12,
        fontWeight: 800,
        color: "#e5e7eb",
        background: "rgba(0,0,0,0.75)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        backdropFilter: "blur(10px)",
        animation: "tipIn 160ms ease-out",
      }}
    >
      {text}
    </div>
  );
}

export default function HoverSidebar({ user, onLogout, open, setOpen }) {
  const nav = useNavigate();
  const [tip, setTip] = React.useState(null);

  const collapsed = 76;
  const expanded = 260;

  const styles = {
    shell: {
      position: "fixed",
      top: 0,
      left: 0,
      height: "100vh",
      width: open ? expanded : collapsed,
      transition: "width 260ms cubic-bezier(.2,.8,.2,1)",
      background: "rgba(15, 23, 42, 0.75)",
      borderRight: "1px solid rgba(255,255,255,0.10)",
      backdropFilter: "blur(14px)",
      boxShadow: open
        ? "0 24px 90px rgba(0,0,0,0.55)"
        : "0 18px 60px rgba(0,0,0,0.35)",
      overflow: "hidden",
      zIndex: 50,
    },
    inner: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      padding: 10,
      gap: 10,
      justifyContent: "space-between",
    },
    brandRow: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: 10,
      borderRadius: 14,
      background: "rgba(0,0,0,0.25)",
      border: "1px solid rgba(255,255,255,0.10)",
    },
    logo: {
      width: 38,
      height: 38,
      borderRadius: 14,
      background:
        "linear-gradient(135deg, rgba(34,197,94,1), rgba(59,130,246,1))",
    },
    fadeText: {
      whiteSpace: "nowrap",
      opacity: open ? 1 : 0,
      transform: open ? "translateX(0)" : "translateX(-6px)",
      transition: "opacity 220ms ease, transform 220ms ease",
      fontWeight: 900,
      color: "#e5e7eb",
    },
    nav: { display: "grid", gap: 8 },
    link: (active) => ({
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: 12,
      borderRadius: 14,
      textDecoration: "none",
      background: active ? "rgba(59,130,246,0.16)" : "rgba(0,0,0,0.25)",
      border: "1px solid rgba(255,255,255,0.10)",
      color: "#e5e7eb",
    }),
    iconWrap: { position: "relative" },
    icon: {
      width: 36,
      height: 36,
      borderRadius: 14,
      display: "grid",
      placeItems: "center",
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.10)",
    },
    label: {
      whiteSpace: "nowrap",
      opacity: open ? 1 : 0,
      transform: open ? "translateX(0)" : "translateX(-6px)",
      transition: "opacity 220ms ease, transform 220ms ease",
      fontWeight: 800,
      fontSize: 13,
    },
    spacer: { flex: 1 },
    userCard: {
  padding: 14,
  borderRadius: 20,
  background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.28))",
  border: "1px solid rgba(255,255,255,0.12)",
  display: "grid",
  gap: 10,
  boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
},


    avatar: {
  width: 42,
  height: 42,
  borderRadius: "50%", // 🔥 friendly circle
  background:
    "linear-gradient(135deg, rgba(59,130,246,0.9), rgba(34,197,94,0.9))",
  display: "grid",
  placeItems: "center",
  fontWeight: 900,
  color: "#0b1220",
  boxShadow: "0 6px 18px rgba(59,130,246,0.35)",
},

    email: {
      fontSize: 12,
      color: "#cbd5e1",
      opacity: open ? 1 : 0,
      transform: open ? "translateX(0)" : "translateX(-6px)",
      transition: "opacity 220ms ease, transform 220ms ease",
    },
    logout: {
  marginTop: 6,
  padding: "12px",
  borderRadius: 16,
  background:
    "linear-gradient(135deg, rgba(239,68,68,0.25), rgba(239,68,68,0.12))",
  border: "1px solid rgba(239,68,68,0.35)",
  color: "#fee2e2",
  fontWeight: 800,
  cursor: "pointer",
  transition: "transform 160ms ease, filter 160ms ease",
},

  };

  const initials = user?.email?.[0]?.toUpperCase() || "U";

  return (
    <div
      style={styles.shell}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div style={styles.inner}>
        {/* Brand */}
        <div style={styles.brandRow}>
          <div style={styles.logo} />
          <div style={styles.fadeText}>Issue Tracker</div>
        </div>

        {/* Nav */}
        <div style={styles.nav}>
          {/* Dashboard */}
          <NavLink to="/dashboard" style={({ isActive }) => styles.link(isActive)}>
            <div
              style={styles.iconWrap}
              onMouseEnter={() => !open && setTip("Dashboard")}
              onMouseLeave={() => setTip(null)}
            >
              <div style={styles.icon}>{ICONS.dashboard}</div>
              <Tooltip show={!open && tip === "Dashboard"} text="Dashboard" />
            </div>
            <div style={styles.label}>Dashboard</div>
          </NavLink>

          {/* Create */}
          <NavLink
            to="/issues/new"
            style={({ isActive }) => styles.link(isActive)}
          >
            <div
              style={styles.iconWrap}
              onMouseEnter={() => !open && setTip("Create Issue")}
              onMouseLeave={() => setTip(null)}
            >
              <div style={styles.icon}>{ICONS.create}</div>
              <Tooltip show={!open && tip === "Create Issue"} text="Create Issue" />
            </div>
            <div style={styles.label}>Create Issue</div>
          </NavLink>

          {/* Issues (exact match) */}
          <NavLink
            to="/issues"
            end
            style={({ isActive }) => styles.link(isActive)}
          >
            <div
              style={styles.iconWrap}
              onMouseEnter={() => !open && setTip("Issues")}
              onMouseLeave={() => setTip(null)}
            >
              <div style={styles.icon}>{ICONS.issues}</div>
              <Tooltip show={!open && tip === "Issues"} text="Issues" />
            </div>
            <div style={styles.label}>Issues</div>
          </NavLink>
        </div>

        

        {/* User */}
        <div
  style={{
    ...styles.userCard,
    marginTop: 0,
    marginBottom: 6, // ✅ keeps gap from bottom edge
  }}
>
  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
    <div style={styles.avatar}>{initials}</div>

    {/* show email only when expanded */}
    {open && <div style={styles.email}>{user?.email}</div>}
  </div>

<button
  style={{
    ...styles.logout,
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // ✅ center horizontally
    width: "100%",
    padding: open ? "12px" : "12px 0", // ✅ remove side padding when collapsed
  }}
  onClick={() => {
    onLogout();
    nav("/login");
  }}
>
  🚪 {open && "Logout"}
</button>

</div>

      </div>
    </div>
  );
}
