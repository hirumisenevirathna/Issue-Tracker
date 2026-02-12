// src/components/IssueList.jsx
export default function IssueList({ issues = [], onStatus, onDelete, getIssueStyle }) {
  const baseCard = {
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    display: "flex",
    gap: 12,
    justifyContent: "space-between",
    alignItems: "flex-start",
    backdropFilter: "blur(12px)",
    transition: "transform 140ms ease, filter 140ms ease, box-shadow 140ms ease",
  };

  // ✅ DONE/RESOLVED/CLOSED full card style
  const doneCard = {
    background: "rgba(34,197,94,0.10)", // green tint
    border: "1px solid rgba(34,197,94,0.30)",
    boxShadow: "0 10px 42px rgba(34,197,94,0.12)",
    opacity: 0.93,
  };

  // ✅ normal card style
  const normalCard = {
    background: "rgba(2,6,23,0.45)",
    border: "1px solid rgba(148,163,184,0.18)",
    boxShadow: "none",
    opacity: 1,
  };

  const title = { margin: 0, fontSize: 16, fontWeight: 900, color: "#e5e7eb" };
  const desc = { margin: "6px 0 0", fontSize: 13, color: "#cbd5e1", lineHeight: 1.5 };

  const badge = (type) => {
    const map = {
      OPEN: { bg: "rgba(59,130,246,0.16)", br: "rgba(59,130,246,0.35)", tx: "#bfdbfe" },
      IN_PROGRESS: { bg: "rgba(234,179,8,0.16)", br: "rgba(234,179,8,0.35)", tx: "#fde68a" },
      DONE: { bg: "rgba(34,197,94,0.16)", br: "rgba(34,197,94,0.35)", tx: "#bbf7d0" },

      LOW: { bg: "rgba(148,163,184,0.12)", br: "rgba(148,163,184,0.28)", tx: "#e2e8f0" },
      MEDIUM: { bg: "rgba(249,115,22,0.14)", br: "rgba(249,115,22,0.32)", tx: "#fed7aa" },
      HIGH: { bg: "rgba(239,68,68,0.14)", br: "rgba(239,68,68,0.32)", tx: "#fecaca" },
    };

    const s =
      map[type] || {
        bg: "rgba(148,163,184,0.10)",
        br: "rgba(148,163,184,0.20)",
        tx: "#e5e7eb",
      };

    return {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "6px 10px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 900,
      letterSpacing: 0.2,
      background: s.bg,
      border: `1px solid ${s.br}`,
      color: s.tx,
      marginRight: 8,
    };
  };

  const btn = (tone = "neutral") => {
    const tones = {
      neutral: {
        bg: "linear-gradient(135deg, rgba(30,41,59,0.80), rgba(2,6,23,0.80))",
        br: "rgba(148,163,184,0.22)",
      },
      danger: {
        bg: "linear-gradient(135deg, rgba(127,29,29,0.65), rgba(2,6,23,0.80))",
        br: "rgba(239,68,68,0.28)",
      },
      success: {
        bg: "linear-gradient(135deg, rgba(22,101,52,0.65), rgba(2,6,23,0.80))",
        br: "rgba(34,197,94,0.30)",
      },
    };

    const t = tones[tone] || tones.neutral;

    return {
      borderRadius: 12,
      padding: "9px 12px",
      border: `1px solid ${t.br}`,
      background: t.bg,
      color: "#e5e7eb",
      cursor: "pointer",
      fontWeight: 900,
      letterSpacing: 0.2,
      fontSize: 12,
      transition: "transform 140ms ease, filter 140ms ease",
      userSelect: "none",
      whiteSpace: "nowrap",
    };
  };

  const hoverOn = (e) => {
    e.currentTarget.style.transform = "translateY(-1px)";
    e.currentTarget.style.filter = "brightness(1.06)";
  };
  const hoverOff = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.filter = "brightness(1)";
  };

  if (!issues.length) {
    return (
      <div
        style={{
          padding: 14,
          borderRadius: 16,
          border: "1px solid rgba(148,163,184,0.18)",
          background: "rgba(2,6,23,0.45)",
          color: "#cbd5e1",
        }}
      >
        No issues found.
      </div>
    );
  }

  return (
    <div>
      {issues.map((issue) => {
        const id = issue?._id || issue?.id;
        const status = (issue?.status || "").toUpperCase();
        const priority = (issue?.priority || "").toUpperCase();

        const isDone = status === "DONE" || status === "RESOLVED" || status === "CLOSED";

        // ✅ card style: DONE card vs normal card
        const mergedStyle = {
          ...baseCard,
          ...(isDone ? doneCard : normalCard),
          // if parent passed getIssueStyle, it can override
          ...(getIssueStyle ? getIssueStyle(issue) : {}),
        };

        return (
          <div key={id} style={mergedStyle}>
            {/* Left: info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ marginBottom: 8 }}>
                <span style={badge(status)}>{status || "STATUS"}</span>
                {priority && <span style={badge(priority)}>{priority}</span>}
              </div>

              <h3 style={title}>{issue?.title || "Untitled issue"}</h3>
              {issue?.description && <p style={desc}>{issue.description}</p>}
            </div>

            {/* Right: actions */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
              {/* ✅ Hide status-change buttons if DONE */}
              {!isDone && (
                <button
                  style={btn("success")}
                  onMouseEnter={hoverOn}
                  onMouseLeave={hoverOff}
                  onClick={() => onStatus?.(id, "DONE")}
                  title="Mark as Done"
                >
                  Mark DONE
                </button>
              )}

              {status !== "IN_PROGRESS" && !isDone && (
                <button
                  style={btn("neutral")}
                  onMouseEnter={hoverOn}
                  onMouseLeave={hoverOff}
                  onClick={() => onStatus?.(id, "IN_PROGRESS")}
                  title="Move to In Progress"
                >
                  IN PROGRESS
                </button>
              )}

              <button
                style={btn("danger")}
                onMouseEnter={hoverOn}
                onMouseLeave={hoverOff}
                onClick={() => onDelete?.(id)}
                title="Delete issue"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
