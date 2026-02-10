import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const ICONS = {
  dashboard: "/home.png",
  create: "/create.png",
  issues: "/list.png",
};

function Tooltip({ show, text }) {
  if (!show) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 70,
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
        zIndex: 999,
      }}
    >
      {text}
    </div>
  );
}

export default function HoverSidebar({ user, onLogout, open, setOpen }) {
  const nav = useNavigate();
  const [tip, setTip] = React.useState(null);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const collapsed = 90;
  const expanded = 230;

  // ✅ close dropdown when clicking outside
  const menuRef = React.useRef(null);
  React.useEffect(() => {
    const onDown = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // ✅ close dropdown when sidebar collapses
  React.useEffect(() => {
    if (!open) setMenuOpen(false);
  }, [open]);

  const styles = {
    shell: {
      position: "fixed",
      top: 0,
      left: 0,
      height: "100vh",
      width: open ? expanded : collapsed,
      transition: "width 240ms cubic-bezier(.2,.8,.2,1)",
      background: "rgba(10,16,30,0.78)",
      borderRight: "1px solid rgba(148,163,184,0.12)",
      backdropFilter: "blur(16px)",
      boxShadow: "0 24px 90px rgba(0,0,0,0.45)",
      zIndex: 100,
      padding: 12,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
    },

    brand: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: 10,
      borderRadius: 18,
      background: open ? "rgba(255,255,255,0.04)" : "transparent",
      border: open ? "1px solid rgba(148,163,184,0.12)" : "1px solid transparent",
      marginBottom: 12,
      transition: "background 200ms ease, border 200ms ease",
    },
    logo: {
      width: 40,
      height: 40,
      borderRadius: 16,
      background: "linear-gradient(135deg, rgba(34,197,94,1), rgba(59,130,246,1))",
      boxShadow: "0 12px 26px rgba(59,130,246,0.18)",
      flex: "0 0 auto",
    },
    brandText: {
      opacity: open ? 1 : 0,
      transform: open ? "translateX(0)" : "translateX(-6px)",
      transition: "opacity 200ms ease, transform 200ms ease",
      fontWeight: 1000,
      color: "#e5e7eb",
      fontSize: 14,
      whiteSpace: "nowrap",
      letterSpacing: 0.2,
    },

    nav: {
      display: "grid",
      gap: 12,
      marginTop: 8,
    },

    linkBase: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: 12,
      textDecoration: "none",
      padding: "10px 10px",
      borderRadius: 18,
      border: "1px solid transparent",
      transition: "background 160ms ease, transform 160ms ease, border 160ms ease",
      outline: "none",
    },

    activeBg: (openNow) => ({
      position: "absolute",
      inset: 0,
      borderRadius: 18,
      background: "rgba(59,130,246,0.08)",
      border: "1px solid rgba(59,130,246,0.16)",
      pointerEvents: "none",
      opacity: openNow ? 1 : 0,
      transition: "opacity 160ms ease",
    }),

    icon: (active) => ({
      width: 44,
      height: 44,
      borderRadius: 16,
      display: "grid",
      placeItems: "center",
      background: active ? "rgba(59,130,246,0.10)" : "transparent",
      border: active ? "1px solid rgba(59,130,246,0.18)" : "1px solid transparent",
      transition: "background 160ms ease, border 160ms ease, transform 160ms ease",
      flex: "0 0 auto",
    }),

    iconImg: (isActive) => ({
      width: 22,
      height: 22,
      objectFit: "contain",
      filter: isActive ? "brightness(1.15)" : "brightness(1)",
    }),

    label: {
      opacity: open ? 1 : 0,
      transform: open ? "translateX(0)" : "translateX(-6px)",
      transition: "opacity 200ms ease, transform 200ms ease",
      fontWeight: 900,
      fontSize: 13,
      color: "#e5e7eb",
      whiteSpace: "nowrap",
    },

    spacer: { flex: 1 },

    userCard: {
      position: "relative",
      padding: 10,
      borderRadius: 20,
      background: open ? "rgba(255,255,255,0.04)" : "transparent",
      border: open ? "1px solid rgba(148,163,184,0.10)" : "1px solid transparent",
      transition: "background 200ms ease, border 200ms ease",
      display: "grid",
      gap: 10,
    },

    userRowBtn: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      minHeight: 46,
      cursor: open ? "pointer" : "default",
      borderRadius: 16,
      padding: "8px 8px",
      border: "1px solid transparent",
      background: "transparent",
      color: "inherit",
      textAlign: "left",
    },

    avatar: {
      width: 42,
      height: 42,
      borderRadius: 999,
      background: "linear-gradient(135deg, rgba(59,130,246,0.95), rgba(34,197,94,0.95))",
      display: "grid",
      placeItems: "center",
      fontWeight: 1000,
      color: "#0b1220",
      flex: "0 0 auto",
      userSelect: "none",
    },

    userText: {
      opacity: open ? 1 : 0,
      transform: open ? "translateX(0)" : "translateX(-6px)",
      transition: "opacity 200ms ease, transform 200ms ease",
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

    menu: {
      position: "absolute",
      right: 10,
      bottom: 64,
      width: 190,
      borderRadius: 16,
      background: "rgba(2,6,23,0.88)",
      border: "1px solid rgba(148,163,184,0.18)",
      boxShadow: "0 22px 90px rgba(0,0,0,0.55)",
      backdropFilter: "blur(14px)",
      overflow: "hidden",
      transform: menuOpen ? "translateY(0) scale(1)" : "translateY(8px) scale(0.98)",
      opacity: menuOpen ? 1 : 0,
      pointerEvents: menuOpen ? "auto" : "none",
      transition: "all 160ms ease",
      zIndex: 500,
    },

    menuItem: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "12px 12px",
      cursor: "pointer",
      background: "transparent",
      border: "none",
      color: "#e5e7eb",
      fontWeight: 900,
      fontSize: 13,
      textAlign: "left",
    },

    menuItemHover: {
      background: "rgba(255,255,255,0.06)",
    },

    menuIcon: {
      width: 18,
      height: 18,
      objectFit: "contain",
      filter: "brightness(1.15)",
      flex: "0 0 auto",
    },
  };

  const initials = user?.email?.[0]?.toUpperCase() || "U";

  const Item = ({ to, label, icon, exact }) => (
    <NavLink
      to={to}
      end={exact}
      style={styles.linkBase}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {({ isActive }) => (
        <>
          {isActive && <div style={styles.activeBg(open)} />}

          <div
            style={{ position: "relative", zIndex: 1 }}
            onMouseEnter={() => !open && setTip(label)}
            onMouseLeave={() => setTip(null)}
          >
            <div style={styles.icon(isActive)}>
              <img src={icon} alt="" style={styles.iconImg(isActive)} draggable={false} />
            </div>
            <Tooltip show={!open && tip === label} text={label} />
          </div>

          <div style={{ ...styles.label, position: "relative", zIndex: 1 }}>{label}</div>
        </>
      )}
    </NavLink>
  );

  return (
    <aside
      style={styles.shell}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div style={styles.brand}>
        <div style={styles.logo} />
        <div style={styles.brandText}>Issue Tracker</div>
      </div>

      <div style={styles.nav}>
        <Item to="/dashboard" label="Dashboard" icon={ICONS.dashboard} />
        <Item to="/issues/new" label="Create Issue" icon={ICONS.create} />
        <Item to="/issues" label="Issues" icon={ICONS.issues} exact />
      </div>

      <div style={styles.spacer} />

      {/* ✅ User Card + Dropdown */}
      <div style={styles.userCard} ref={menuRef}>
        <button
          type="button"
          style={styles.userRowBtn}
          onClick={() => open && setMenuOpen((v) => !v)}
          onMouseEnter={(e) => {
            if (!open) return;
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.border = "1px solid rgba(148,163,184,0.14)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.border = "1px solid transparent";
          }}
          title={!open ? "Signed in" : undefined}
        >
          <div style={styles.avatar}>{initials}</div>
          <div style={styles.userText}>
            <div style={styles.userTitle}>Signed in</div>
            <div style={styles.email}>{user?.email}</div>
          </div>

          {/* caret only when open */}
          {open && (
            <div style={{ marginLeft: "auto", color: "rgba(226,232,240,0.7)", fontWeight: 900 }}>
              ▾
            </div>
          )}
        </button>

        <div style={styles.menu}>
          <MenuButton
            label="Logout"
            icon="/logout.png"
            styles={styles}
            onClick={async () => {
              setMenuOpen(false);
              await onLogout?.();
              nav("/", { replace: true });
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes tipIn {
          from { opacity: 0; transform: translateY(-50%) translateX(-6px); }
          to   { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
        button:focus { outline: none; }
        button:focus-visible { outline: 2px solid rgba(59,130,246,0.35); outline-offset: 2px; }
      `}</style>
    </aside>
  );
}

function MenuButton({ label, icon, onClick, styles }) {
  const [hover, setHover] = React.useState(false);

  return (
    <button
      type="button"
      style={{ ...styles.menuItem, ...(hover ? styles.menuItemHover : {}) }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <img src={icon} alt="" style={styles.menuIcon} draggable={false} />
      <span>{label}</span>
    </button>
  );
}
