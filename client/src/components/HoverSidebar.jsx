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
        borderRadius: 12,
        fontSize: 12,
        fontWeight: 900,
        color: "#e5e7eb",
        background: "rgba(2,6,23,0.92)",
        border: "1px solid rgba(148,163,184,0.18)",
        boxShadow: "0 18px 60px rgba(0,0,0,0.55)",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        backdropFilter: "blur(12px)",
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

  // smaller + cleaner
  const collapsed = 64;
  const expanded = 230;

  const styles = {
    shell: {
      position: "fixed",
      top: 0,
      left: 0,
      height: "100vh",
      width: open ? expanded : collapsed,
      transition: "width 260ms cubic-bezier(.2,.8,.2,1)",
      background:
        "linear-gradient(180deg, rgba(15,23,42,0.85), rgba(2,6,23,0.75))",
      borderRight: "1px solid rgba(148,163,184,0.14)",
      backdropFilter: "blur(14px)",
      boxShadow: "0 24px 90px rgba(0,0,0,0.45)",
      zIndex: 50,
    },

    inner: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      padding: 10,
      gap: 12,
    },

    // BRAND: simpler + friendly
    brand: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: 10,
      borderRadius: 18,
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(148,163,184,0.14)",
      boxShadow: "0 12px 32px rgba(0,0,0,0.20)",
    },
    logo: {
      width: 36,
      height: 36,
      borderRadius: 16,
      background:
        "linear-gradient(135deg, rgba(34,197,94,1), rgba(59,130,246,1))",
      boxShadow: "0 12px 26px rgba(59,130,246,0.16)",
      flex: "0 0 auto",
    },
    brandText: {
      opacity: open ? 1 : 0,
      transform: open ? "translateX(0)" : "translateX(-6px)",
      transition: "opacity 220ms ease, transform 220ms ease",
      fontWeight: 1000,
      color: "#e5e7eb",
      fontSize: 14,
      whiteSpace: "nowrap",
      letterSpacing: 0.2,
    },

    // NAV RAIL (clean)
    rail: {
      display: "grid",
      gap: 10,
      padding: 10,
      borderRadius: 22,
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(148,163,184,0.12)",
    },

    linkBase: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: 12,
      borderRadius: 18,
      textDecoration: "none",
      padding: "10px 10px",
      border: "1px solid transparent",
      transition: "transform 160ms ease, filter 160ms ease, background 160ms ease",
      outline: "none",
    },

    // icon tile: remove ugly circles → soft pill
    iconTile: (active) => ({
      width: 40,
      height: 40,
      borderRadius: 16,
      display: "grid",
      placeItems: "center",
      background: active
        ? "linear-gradient(135deg, rgba(59,130,246,0.22), rgba(34,197,94,0.12))"
        : "rgba(2,6,23,0.45)",
      border: active
        ? "1px solid rgba(59,130,246,0.28)"
        : "1px solid rgba(148,163,184,0.14)",
      boxShadow: active
        ? "0 14px 34px rgba(59,130,246,0.12)"
        : "0 10px 26px rgba(0,0,0,0.16)",
      flex: "0 0 auto",
      marginLeft: -1, // slight left balance
    }),

    label: {
      opacity: open ? 1 : 0,
      transform: open ? "translateX(0)" : "translateX(-6px)",
      transition: "opacity 220ms ease, transform 220ms ease",
      fontWeight: 900,
      fontSize: 13,
      color: "#e5e7eb",
      whiteSpace: "nowrap",
    },

    // active background (friendly)
    activeBg: {
      position: "absolute",
      inset: 0,
      borderRadius: 18,
      background:
        "linear-gradient(135deg, rgba(59,130,246,0.14), rgba(34,197,94,0.08))",
      border: "1px solid rgba(59,130,246,0.22)",
      boxShadow: "0 16px 50px rgba(0,0,0,0.22)",
      pointerEvents: "none",
    },

    iconWrap: { position: "relative", zIndex: 1 },

    spacer: { flex: 1 },

    // USER AREA: clean capsule
    userCard: {
      padding: 10,
      borderRadius: 22,
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(148,163,184,0.12)",
      boxShadow: "0 18px 60px rgba(0,0,0,0.32)",
      display: "grid",
      gap: 10,
    },
    userRow: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      minHeight: 46,
    },
    avatar: {
      width: 38,
      height: 38,
      borderRadius: 999,
      background:
        "linear-gradient(135deg, rgba(59,130,246,0.95), rgba(34,197,94,0.95))",
      display: "grid",
      placeItems: "center",
      fontWeight: 1000,
      color: "#0b1220",
      boxShadow: "0 12px 26px rgba(59,130,246,0.16)",
      flex: "0 0 auto",
    },
    userText: {
      opacity: open ? 1 : 0,
      transform: open ? "translateX(0)" : "translateX(-6px)",
      transition: "opacity 220ms ease, transform 220ms ease",
      minWidth: 0,
    },
    userTitle: {
      fontSize: 12,
      fontWeight: 1000,
      color: "#e5e7eb",
      marginBottom: 2,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    email: {
      fontSize: 12,
      color: "#94a3b8",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },

    // LOGOUT: no outline touch; icon-only when collapsed
    logout: {
      height: 42,
      border: "1px solid rgba(239,68,68,0.28)",
      background:
        "linear-gradient(135deg, rgba(239,68,68,0.18), rgba(239,68,68,0.08))",
      color: "#fee2e2",
      borderRadius: open ? 16 : 999,
      width: open ? "100%" : 42,
      padding: open ? "0 12px" : 0,
      fontWeight: 1000,
      cursor: "pointer",
      boxShadow: "0 14px 36px rgba(0,0,0,0.26)",
      display: "flex",
      alignItems: "center",
      justifyContent: open ? "center" : "flex-start",
      gap: 8,
      paddingLeft: open ? 12 : 12, // slightly left
      outline: "none",
      transition: "transform 160ms ease, filter 160ms ease, border-color 160ms ease",
    },
  };

  const initials = user?.email?.[0]?.toUpperCase() || "U";

  const linkHoverOn = (e) => {
    e.currentTarget.style.transform = "translateY(-1px)";
    e.currentTarget.style.filter = "brightness(1.08)";
    e.currentTarget.style.border = "1px solid rgba(59,130,246,0.22)";
    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
  };
  const linkHoverOff = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.filter = "brightness(1)";
    e.currentTarget.style.border = "1px solid transparent";
    e.currentTarget.style.background = "transparent";
  };

  const Item = ({ to, label, icon, exact }) => (
    <NavLink to={to} end={exact} style={styles.linkBase}
      onMouseEnter={linkHoverOn} onMouseLeave={linkHoverOff}
    >
      {({ isActive }) => (
        <>
          {isActive && <div style={styles.activeBg} />}
          <div
            style={{ ...styles.iconWrap, position: "relative" }}
            onMouseEnter={() => !open && setTip(label)}
            onMouseLeave={() => setTip(null)}
          >
            <div style={styles.iconTile(isActive)}>{icon}</div>
            <Tooltip show={!open && tip === label} text={label} />
          </div>
          <div style={{ ...styles.label, position: "relative", zIndex: 1 }}>
            {label}
          </div>
        </>
      )}
    </NavLink>
  );

  return (
    <div
      style={styles.shell}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div style={styles.inner}>
        {/* Brand */}
        <div style={styles.brand}>
          <div style={styles.logo} />
          <div style={styles.brandText}>Issue Tracker</div>
        </div>

        {/* Nav Rail */}
        <div style={styles.rail}>
          <Item to="/dashboard" label="Dashboard" icon={ICONS.dashboard} />
          <Item to="/issues/new" label="Create Issue" icon={ICONS.create} />
          <Item to="/issues" label="Issues" icon={ICONS.issues} exact />
        </div>

        <div style={styles.spacer} />

        {/* User */}
        <div style={styles.userCard}>
          <div style={styles.userRow}>
            <div style={styles.avatar}>{initials}</div>
            <div style={styles.userText}>
              <div style={styles.userTitle}>Signed in</div>
              <div style={styles.email}>{user?.email}</div>
            </div>
          </div>

          <button
            style={styles.logout}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.filter = "brightness(1.08)";
              e.currentTarget.style.borderColor = "rgba(239,68,68,0.50)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.filter = "brightness(1)";
              e.currentTarget.style.borderColor = "rgba(239,68,68,0.28)";
            }}
            onClick={() => {
              onLogout();
              nav("/login");
            }}
            title={!open ? "Logout" : undefined}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>🚪</span>
            {open && <span>Logout</span>}
          </button>
        </div>

        {/* Animations + focus fix */}
        <style>{`
          @keyframes tipIn {
            from { opacity: 0; transform: translateY(-50%) translateX(-6px); }
            to   { opacity: 1; transform: translateY(-50%) translateX(0); }
          }
          button:focus { outline: none; }
          button:focus-visible { outline: 2px solid rgba(59,130,246,0.35); outline-offset: 2px; }
        `}</style>
      </div>
    </div>
  );
}
