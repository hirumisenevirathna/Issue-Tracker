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
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes cardIn {
      from { opacity: 0; transform: translateY(12px) scale(0.985); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    @keyframes pulse {
      0% { transform: scale(1); opacity: 0.75; }
      50% { transform: scale(1.12); opacity: 1; }
      100% { transform: scale(1); opacity: 0.75; }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
  `;

  // ✅ Enhanced theme styles for IssueForm fields with better consistency
  const ui = {
    group: { 
      display: "flex", 
      flexDirection: "column", 
      gap: 10, 
      marginBottom: 18 
    },
    label: { 
      fontSize: 13, 
      color: "#94a3b8", 
      fontWeight: 700, 
      marginBottom: 6,
      letterSpacing: 0.3
    },

    input: {
      width: "100%",
      padding: "14px 16px",
      borderRadius: 16,
      border: "1px solid rgba(148,163,184,0.22)",
      background: "rgba(2,6,23,0.60)",
      color: "#e5e7eb",
      outline: "none",
      fontSize: 15,
      fontWeight: 500,
      transition: "all 220ms cubic-bezier(.2,.8,.2,1)",
      backdropFilter: "blur(6px)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
      position: "relative",
      boxSizing: "border-box",
    },

    textarea: {
      width: "100%",
      padding: "14px 16px",
      borderRadius: 16,
      border: "1px solid rgba(148,163,184,0.22)",
      background: "rgba(2,6,23,0.60)",
      color: "#e5e7eb",
      outline: "none",
      fontSize: 15,
      fontWeight: 500,
      minHeight: 130,
      resize: "none",
      transition: "all 220ms cubic-bezier(.2,.8,.2,1)",
      backdropFilter: "blur(6px)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
      boxSizing: "border-box",
    },

    select: {
      width: "100%",
      padding: "14px 16px",
      borderRadius: 16,
      border: "1px solid rgba(148,163,184,0.22)",
      background: "rgba(2,6,23,0.60)",
      color: "#e5e7eb",
      outline: "none",
      fontSize: 15,
      fontWeight: 500,
      transition: "all 220ms cubic-bezier(.2,.8,.2,1)",
      backdropFilter: "blur(6px)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
      appearance: "none",
      backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\\\"http://www.w3.org/2000/svg\\\" width=\\\"14\\\" height=\\\"14\\\" viewBox=\\\"0 0 14 14\\\"><path fill=\\\"%2394a3b8\\\" d=\\\"M7 11L2 6h10z\\\"/></svg>')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 14px center"
    },

    button: (disabled) => ({
      width: "100%",
      marginTop: 10,
      padding: "16px 18px",
      borderRadius: 18,
      border: "1px solid rgba(34,197,94,0.40)",
      background: disabled
        ? "rgba(2,6,23,0.70)"
        : "linear-gradient(135deg, rgba(22,101,52,0.80), rgba(2,6,23,0.98))",
      color: "#e5e7eb",
      fontWeight: 800,
      letterSpacing: 0.6,
      cursor: disabled ? "not-allowed" : "pointer",
      boxShadow: disabled 
        ? "none" 
        : "0 18px 52px rgba(0,0,0,0.45), 0 0 0 1px rgba(34,197,94,0.20)",
      transition: "all 260ms cubic-bezier(.2,.8,.2,1)",
      textTransform: "uppercase",
      fontSize: 14,
      position: "relative",
      overflow: "hidden"
    }),
    fieldWrap: { width: "100%" },
  };

  const styles = {
    page: {
      minHeight: "100vh",
      width: "100%",
      padding: 24,
      boxSizing: "border-box",
      color: "#e5e7eb",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      animation: "pageIn 450ms ease-out",
      background:
        "radial-gradient(1400px 700px at 15% 15%, rgba(34,197,94,0.20), transparent 65%), radial-gradient(1400px 700px at 85% 25%, rgba(59,130,246,0.20), transparent 65%), #0b1220",
    },

    wrap: { width: "100%", display: "flex", justifyContent: "center" },

    card: {
      width: "100%",
      maxWidth: 1020,
      borderRadius: 26,
      padding: 26,
      background: "rgba(15, 23, 42, 0.80)",
      border: "1px solid rgba(148, 163, 184, 0.22)",
      boxShadow: "0 32px 100px rgba(0,0,0,0.50)",
      backdropFilter: "blur(18px)",
      overflow: "hidden",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 18,
      animation: "cardIn 560ms cubic-bezier(.2,.8,.2,1)",
      position: "relative",
    },

    glow: {
      position: "absolute",
      inset: -100,
      background:
        "radial-gradient(480px 300px at 22% 25%, rgba(34,197,94,0.22), transparent 65%), radial-gradient(520px 320px at 78% 15%, rgba(59,130,246,0.22), transparent 65%)",
      pointerEvents: "none",
      filter: "blur(4px)",
      opacity: 0.95,
      animation: "float 6s ease-in-out infinite"
    },

    header: {
      position: "relative",
      zIndex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 14,
      paddingBottom: 16,
      borderBottom: "1px solid rgba(148, 163, 184, 0.15)",
    },

    titleBlock: { display: "flex", alignItems: "center", gap: 14 },

    icon: {
      width: 52,
      height: 52,
      borderRadius: 18,
      background: "linear-gradient(135deg, rgba(34,197,94,1), rgba(59,130,246,1))",
      boxShadow: "0 16px 48px rgba(59,130,246,0.28)",
      display: "grid",
      placeItems: "center",
      fontWeight: 900,
      color: "#0b1220",
      flex: "0 0 auto",
      animation: "float 3s ease-in-out infinite"
    },

    h2: { margin: 0, fontSize: 32, letterSpacing: 0.3, fontWeight: 900 },
    sub: { margin: "6px 0 0", color: "#cbd5e1", fontSize: 14, lineHeight: 1.6 },

    badge: {
      fontSize: 13,
      color: "#cbd5e1",
      border: "1px solid rgba(148, 163, 184, 0.22)",
      background: "rgba(0,0,0,0.28)",
      padding: "8px 12px",
      borderRadius: 999,
      fontWeight: 800,
    },

    main: { position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 18 },

    topRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 14,
      flexWrap: "wrap",
      padding: "16px 18px",
      borderRadius: 20,
      background: "rgba(2, 6, 23, 0.45)",
      border: "1px solid rgba(148, 163, 184, 0.18)",
    },

    topTitle: { fontWeight: 900, color: "#e5e7eb", fontSize: 18 },
    statusNote: { fontSize: 13, color: "#94a3b8" },
    statusPill: {
      display: "inline-block",
      marginLeft: 8,
      padding: "4px 12px",
      borderRadius: 999,
      border: "1px solid rgba(34,197,94,0.32)",
      background: "rgba(34,197,94,0.12)",
      color: "#bbf7d0",
      fontWeight: 900,
      fontSize: 13,
    },

    // ✅ Enhanced form container with better styling
    formArea: {
      width: "100%",
      maxWidth: 800,
      margin: "0 auto",
      borderRadius: 24,
      background: "rgba(2, 6, 23, 0.45)",
      border: "1px solid rgba(148, 163, 184, 0.18)",
      padding: 24,
      boxShadow: "0 16px 48px rgba(0,0,0,0.30)",
      backdropFilter: "blur(10px)"
    },

    loading: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "16px 16px",
      borderRadius: 18,
      border: "1px solid rgba(148, 163, 184, 0.18)",
      background: "rgba(0,0,0,0.30)",
      color: "#e5e7eb",
      fontWeight: 800,
      fontSize: 15
    },

    dot: {
      width: 12,
      height: 12,
      borderRadius: 999,
      background: "linear-gradient(135deg, rgba(34,197,94,1), rgba(59,130,246,1))",
      boxShadow: "0 0 0 8px rgba(59,130,246,0.12)",
      animation: "pulse 900ms ease-in-out infinite",
    },

    hint: {
      paddingTop: 16,
      borderTop: "1px solid rgba(148, 163, 184, 0.15)",
      color: "#94a3b8",
      fontSize: 13,
      lineHeight: 1.6,
      position: "relative",
      zIndex: 1,
      marginTop: 14,
      textAlign: "center"
    },
    fieldWrap: {
  width: "100%",
  maxWidth: "100%",
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
                <h2 style={styles.h2}>Create New Issue</h2>
                <p style={styles.sub}>Fill out the form below to submit a new issue to the tracker.</p>
              </div>
            </div>

            <div style={styles.badge}>Tip: Title is required • Priority is optional</div>
          </div>

          {/* Main */}
          <div style={styles.main}>
            <div style={styles.topRow}>
              <div style={styles.topTitle}>Issue Details</div>
              <div style={styles.statusNote}>
                Status will start as <span style={styles.statusPill}>OPEN</span>
              </div>
            </div>

            <div style={styles.formArea}>
              {loading ? (
                <div style={styles.loading}>
                  <div style={styles.dot} />
                  Creating your issue… please wait
                </div>
              ) : (
                <IssueForm onCreate={onCreate} ui={ui} />
              )}
            </div>

            <div style={styles.hint}>
              After submission, you can manage your issues in the <b style={{ color: "#e5e7eb" }}>Issues</b> page 
              where you can update status, delete issues, apply filters, and search through your submissions.
            </div>
          </div>
        </div>
      </div>

      <style>{animations}</style>
    </div>
  );
}