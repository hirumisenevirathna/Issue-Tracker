import IssueForm from "../components/IssueForm";
import { createIssue } from "../api/issues.api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function IssueCreatePage() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const onCreate = async (data) => {
    setLoading(true);
    try {
      await createIssue(data);
      nav("/issues");
    } finally {
      setLoading(false);
    }
  };

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

    @keyframes pulse {
      0% { transform: scale(1); opacity: 0.75; }
      50% { transform: scale(1.12); opacity: 1; }
      100% { transform: scale(1); opacity: 0.75; }
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
      animation: "pageIn 420ms ease-out",
    },

    // full area (no empty space)
    wrap: {
      flex: 1,
      display: "flex",
      minHeight: "calc(100vh - 40px)",
    },

    // card fills all remaining space
    card: {
      flex: 1,
      width: "100%",
      minHeight: "100%",
      position: "relative",
      borderRadius: 22,
      padding: 22,
      background: "rgba(15, 23, 42, 0.75)",
      border: "1px solid rgba(148, 163, 184, 0.18)",
      boxShadow: "0 24px 90px rgba(0,0,0,0.45)",
      backdropFilter: "blur(14px)",
      overflow: "hidden",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      animation: "cardIn 520ms cubic-bezier(.2,.8,.2,1)",
    },

    glow: {
      position: "absolute",
      inset: -80,
      background:
        "radial-gradient(420px 260px at 18% 20%, rgba(34,197,94,0.18), transparent 60%), radial-gradient(460px 280px at 82% 12%, rgba(59,130,246,0.18), transparent 60%)",
      pointerEvents: "none",
      filter: "blur(2px)",
      opacity: 0.9,
    },

    header: {
      position: "relative",
      zIndex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 12,
      paddingBottom: 12,
      borderBottom: "1px solid rgba(148, 163, 184, 0.12)",
    },

    titleBlock: {
      display: "flex",
      alignItems: "center",
      gap: 12,
    },

    icon: {
      width: 46,
      height: 46,
      borderRadius: 16,
      background:
        "linear-gradient(135deg, rgba(34,197,94,1), rgba(59,130,246,1))",
      boxShadow: "0 14px 44px rgba(59,130,246,0.22)",
      display: "grid",
      placeItems: "center",
      fontWeight: 900,
      color: "#0b1220",
      flex: "0 0 auto",
    },

    h2: { margin: 0, fontSize: 28, letterSpacing: 0.2, fontWeight: 900 },
    sub: { margin: "4px 0 0", color: "#cbd5e1", fontSize: 13, lineHeight: 1.5 },

    badge: {
      fontSize: 12,
      color: "#cbd5e1",
      border: "1px solid rgba(148, 163, 184, 0.18)",
      background: "rgba(0,0,0,0.22)",
      padding: "7px 10px",
      borderRadius: 999,
      fontWeight: 800,
    },

    // main area fills all remaining height (no empty space)
    main: {
      position: "relative",
      zIndex: 1,
      flex: 1,
      minHeight: 0,
      display: "flex",
      flexDirection: "column",
      gap: 14,
      paddingTop: 10,
    },

    topRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      flexWrap: "wrap",
      padding: "12px 14px",
      borderRadius: 18,
      background: "rgba(2, 6, 23, 0.40)",
      border: "1px solid rgba(148, 163, 184, 0.14)",
    },

    topTitle: { fontWeight: 900, color: "#e5e7eb" },

    statusNote: { fontSize: 12, color: "#94a3b8" },
    statusPill: {
      display: "inline-block",
      marginLeft: 6,
      padding: "3px 10px",
      borderRadius: 999,
      border: "1px solid rgba(34,197,94,0.28)",
      background: "rgba(34,197,94,0.10)",
      color: "#bbf7d0",
      fontWeight: 900,
      fontSize: 12,
    },

    formArea: {
      flex: 1,
      minHeight: 0,
      borderRadius: 18,
      background: "rgba(2, 6, 23, 0.30)",
      border: "1px solid rgba(148, 163, 184, 0.12)",
      padding: 14,
      overflow: "auto",
    },

    loading: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "12px 12px",
      borderRadius: 16,
      border: "1px solid rgba(148, 163, 184, 0.14)",
      background: "rgba(0,0,0,0.25)",
      color: "#e5e7eb",
      fontWeight: 800,
    },

    dot: {
      width: 10,
      height: 10,
      borderRadius: 999,
      background:
        "linear-gradient(135deg, rgba(34,197,94,1), rgba(59,130,246,1))",
      boxShadow: "0 0 0 6px rgba(59,130,246,0.10)",
      animation: "pulse 900ms ease-in-out infinite",
    },

    hint: {
      marginTop: "auto",
      paddingTop: 12,
      borderTop: "1px solid rgba(148, 163, 184, 0.12)",
      color: "#94a3b8",
      fontSize: 12,
      lineHeight: 1.5,
      position: "relative",
      zIndex: 1,
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <div style={styles.card}>
          <div style={styles.glow} />

          {/* Header */}
          <div style={styles.header}>
            <div style={styles.titleBlock}>
              <div style={styles.icon}>+</div>
              <div>
                <h2 style={styles.h2}>Create Issue</h2>
                <p style={styles.sub}>Fill the form and submit a new issue.</p>
              </div>
            </div>

            <div style={styles.badge}>Tip: Title required • Priority optional</div>
          </div>

          {/* Main */}
          <div style={styles.main}>
            <div style={styles.topRow}>
              <div style={styles.topTitle}>New Issue Details</div>
              <div style={styles.statusNote}>
                Status starts as <span style={styles.statusPill}>OPEN</span>
              </div>
            </div>

            <div style={styles.formArea}>
              {loading ? (
                <div style={styles.loading}>
                  <div style={styles.dot} />
                  Creating issue… please wait
                </div>
              ) : (
                <IssueForm onCreate={onCreate} />
              )}
            </div>

            <div style={styles.hint}>
              You can manage issues in the{" "}
              <b style={{ color: "#e5e7eb" }}>Issues</b> page after submission
              (update status, delete, filter, and search).
            </div>
          </div>
        </div>
      </div>

      <style>{animations}</style>
    </div>
  );
}
