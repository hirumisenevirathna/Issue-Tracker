import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const nav = useNavigate();

  const styles = {
    bar: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      background: "rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.12)",
      backdropFilter: "blur(10px)",
    },
    inner: {
      maxWidth: 980,
      margin: "0 auto",
      padding: "12px 16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
      flexWrap: "wrap",
    },
    left: { display: "flex", alignItems: "center", gap: 12 },
    brand: { fontWeight: 800, color: "#e5e7eb", textDecoration: "none" },
    link: {
      color: "#cbd5e1",
      textDecoration: "none",
      padding: "6px 10px",
      borderRadius: 10,
      border: "1px solid rgba(255,255,255,0.10)",
      background: "rgba(0,0,0,0.20)",
      fontSize: 13,
    },
    right: { display: "flex", alignItems: "center", gap: 10 },
    email: { fontSize: 13, color: "#e5e7eb" },
    logout: {
      border: "none",
      borderRadius: 10,
      padding: "8px 12px",
      cursor: "pointer",
      background: "rgba(239,68,68,0.18)",
      color: "#fecaca",
      fontWeight: 700,
    },
  };

  return (
    <div style={styles.bar}>
      <div style={styles.inner}>
        <div style={styles.left}>
          <Link to="/dashboard" style={styles.brand}>
            Issue Tracker
          </Link>
          <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          <Link to="/issues/new" style={styles.link}>Create Issue</Link>
          <Link to="/issues" style={styles.link}>Issues</Link>
        </div>

        <div style={styles.right}>
          <span style={styles.email}>{user?.email}</span>
          <button
            style={styles.logout}
            onClick={() => {
              onLogout();
              nav("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
