import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const nav = useNavigate();

  const animations = `
    @keyframes pageIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes cardIn {
      from {
        opacity: 0;
        transform: translateY(12px) scale(0.98);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `;

  const styles = {
    page: {
      minHeight: "100vh",
      width: "100%",
      padding: 20,
      boxSizing: "border-box",
      color: "#e5e7eb",
      display: "flex",
      animation: "pageIn 420ms ease-out", // ✅ page enter
    },

    wrap: {
      flex: 1,
      display: "flex",
      minHeight: "calc(100vh - 40px)",
    },

    card: {
      flex: 1,
      width: "100%",
      minHeight: "100%",
      background: "rgba(15, 23, 42, 0.75)",
      border: "1px solid rgba(148, 163, 184, 0.18)",
      borderRadius: 22,
      padding: 22,
      boxShadow: "0 24px 90px rgba(0,0,0,0.45)",
      backdropFilter: "blur(14px)",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      animation: "cardIn 520ms cubic-bezier(.2,.8,.2,1)", // ✅ card enter
    },

    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 12,
      paddingBottom: 12,
      borderBottom: "1px solid rgba(148, 163, 184, 0.12)",
    },

    titleWrap: { display: "grid", gap: 4 },
    title: { margin: 0, fontSize: 28, letterSpacing: 0.3, fontWeight: 900 },
    sub: { margin: 0, color: "#cbd5e1", fontSize: 13 },

    badgeRow: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      alignItems: "center",
    },
    badge: {
      padding: "7px 10px",
      borderRadius: 999,
      border: "1px solid rgba(148, 163, 184, 0.18)",
      background: "rgba(0,0,0,0.22)",
      color: "#cbd5e1",
      fontSize: 12,
      fontWeight: 800,
    },

    main: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 14,
      minHeight: 0,
      paddingTop: 12,
    },

    grid: {
      flex: 1,
      minHeight: 0,
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: 14,
      alignContent: "stretch",
    },

    btn: {
      borderRadius: 22,
      border: "1px solid rgba(148, 163, 184, 0.18)",
      background: "rgba(2, 6, 23, 0.55)",
      color: "#e5e7eb",
      cursor: "pointer",
      padding: 22,
      textAlign: "left",
      transition:
        "transform 160ms ease, border-color 160ms ease, filter 160ms ease",
      boxShadow: "0 18px 60px rgba(0,0,0,0.25)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      gap: 14,
      minHeight: 220,
    },

    btnTop: { display: "grid", gap: 10 },
    btnTitle: {
      fontWeight: 900,
      fontSize: 18,
      display: "flex",
      gap: 10,
      alignItems: "center",
    },
    hint: {
      color: "#94a3b8",
      fontSize: 13,
      fontWeight: 600,
      lineHeight: 1.5,
    },

    btnMetaRow: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      borderTop: "1px solid rgba(148, 163, 184, 0.12)",
      paddingTop: 12,
      color: "#cbd5e1",
      fontSize: 12,
      fontWeight: 700,
    },

    footer: {
      paddingTop: 12,
      borderTop: "1px solid rgba(148, 163, 184, 0.12)",
      color: "#94a3b8",
      fontSize: 12,
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 10,
    },
  };

  const hoverOn = (e) => {
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.borderColor = "rgba(59,130,246,0.40)";
    e.currentTarget.style.filter = "brightness(1.06)";
  };
  const hoverOff = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.borderColor = "rgba(148, 163, 184, 0.18)";
    e.currentTarget.style.filter = "brightness(1)";
  };

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <div style={styles.card}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.titleWrap}>
              <h2 style={styles.title}>Dashboard</h2>
              <p style={styles.sub}>Choose what you want to do.</p>
            </div>

            <div style={styles.badgeRow}>
              <div style={styles.badge}>Issue Tracker • v1</div>
              <div style={styles.badge}>Quick Actions</div>
            </div>
          </div>

          {/* Main */}
          <div style={styles.main}>
            <div style={styles.grid}>
              <button
                style={styles.btn}
                onMouseEnter={hoverOn}
                onMouseLeave={hoverOff}
                onClick={() => nav("/issues/new")}
              >
                <div style={styles.btnTop}>
                  <div style={styles.btnTitle}>➕ Create Issue</div>
                  <div style={styles.hint}>
                    Create a new issue with title, description, and priority.
                    It will start in <b style={{ color: "#e5e7eb" }}>OPEN</b>.
                  </div>
                </div>

                <div style={styles.btnMetaRow}>
                  <span>Go to form</span>
                  <span>→</span>
                </div>
              </button>

              <button
                style={styles.btn}
                onMouseEnter={hoverOn}
                onMouseLeave={hoverOff}
                onClick={() => nav("/issues")}
              >
                <div style={styles.btnTop}>
                  <div style={styles.btnTitle}>📋 View Issues</div>
                  <div style={styles.hint}>
                    Browse issues with filters, search, pagination, and update
                    statuses quickly.
                  </div>
                </div>

                <div style={styles.btnMetaRow}>
                  <span>Open list</span>
                  <span>→</span>
                </div>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div style={styles.footer}>
            <span>Tip: Use sidebar navigation for quick access.</span>
            <span>Built with React + Vite</span>
          </div>
        </div>
      </div>

      <style>{animations}</style>
    </div>
  );
}
