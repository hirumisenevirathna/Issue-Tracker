// src/pages/IssueListPage.jsx
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { deleteIssue, getIssues, updateIssue } from "../api/issues.api";
import IssueSummary from "../components/IssueSummary";
import IssueList from "../components/IssueList";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

// -----------------------------
// Export helpers (CSV / JSON)
// -----------------------------
function downloadFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}

function issuesToCSV(rows) {
  const headers = ["id", "title", "description", "status", "priority", "createdAt", "updatedAt"];

  const escape = (v) => {
    if (v === null || v === undefined) return "";
    const s = String(v).replace(/"/g, '""');
    return `"${s}"`;
  };

  const lines = [
    headers.join(","),
    ...rows.map((r) =>
      [
        r._id ?? r.id ?? "",
        r.title ?? "",
        r.description ?? "",
        r.status ?? "",
        r.priority ?? "",
        r.createdAt ?? "",
        r.updatedAt ?? "",
      ]
        .map(escape)
        .join(",")
    ),
  ];

  return lines.join("\n");
}

function safeDateStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(
    d.getMinutes()
  )}-${pad(d.getSeconds())}`;
}

export default function IssueListPage() {
  const { user, loading } = useContext(AuthContext);
  const nav = useNavigate();

  const [refreshKey, setRefreshKey] = useState(0);
  const [issues, setIssues] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0, limit: 5 });

  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [page, setPage] = useState(1);

  const params = useMemo(
    () => ({
      page,
      limit: meta.limit,
      status: status || undefined,
      priority: priority || undefined,
      search: debouncedSearch || undefined,
    }),
    [page, meta.limit, status, priority, debouncedSearch]
  );

  const load = async () => {
    const res = await getIssues(params);
    setIssues(res.data.issues);
    setMeta({
      page: res.data.page,
      totalPages: res.data.totalPages,
      total: res.data.total,
      limit: res.data.limit,
    });
  };

  useEffect(() => {
    if (!loading && !user) nav("/login");
  }, [loading, user, nav]);

  useEffect(() => {
    if (user) load();
    // eslint-disable-next-line
  }, [user, params, refreshKey]);

  const onStatus = async (id, newStatus) => {
    await updateIssue(id, { status: newStatus });
    setRefreshKey((k) => k + 1);
  };

  const onDelete = async (id) => {
    const ok = confirm("Delete this issue?");
    if (!ok) return;
    await deleteIssue(id);
    setRefreshKey((k) => k + 1);
  };

  // ✅ Export current page list (respects current filters/search/pagination)
  const onExportCSV = () => {
    const csv = issuesToCSV(issues);
    downloadFile(`issues_${safeDateStamp()}.csv`, csv, "text/csv;charset=utf-8");
  };

  const onExportJSON = () => {
    const json = JSON.stringify(issues, null, 2);
    downloadFile(`issues_${safeDateStamp()}.json`, json, "application/json;charset=utf-8");
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

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
  `;

  const focusIn = (e) => {
    e.target.style.border = "1px solid rgba(59,130,246,0.55)";
    e.target.style.boxShadow = "0 0 0 4px rgba(59,130,246,0.14)";
  };
  const focusOut = (e) => {
    e.target.style.border = "1px solid rgba(148,163,184,0.18)";
    e.target.style.boxShadow = "none";
  };

  const styles = {
    // ✅ DO NOT put background here (ProtectedLayout handles full-page fixed bg)
    page: {
      minHeight: "100vh",
      width: "100%",
      padding: 24,
      boxSizing: "border-box",
      color: "#e5e7eb",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      animation: "pageIn 450ms ease-out",
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
      animation: "float 6s ease-in-out infinite",
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
      animation: "float 3s ease-in-out infinite",
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

    sectionCard: {
      position: "relative",
      zIndex: 1,
      borderRadius: 22,
      background: "rgba(2, 6, 23, 0.45)",
      border: "1px solid rgba(148, 163, 184, 0.18)",
      padding: 18,
      boxShadow: "0 16px 48px rgba(0,0,0,0.28)",
      backdropFilter: "blur(10px)",
      animation: "cardIn 620ms cubic-bezier(.2,.8,.2,1)",
    },

    toolbar: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      alignItems: "center",
      marginTop: 10,
    },

    select: {
      padding: "12px 14px",
      borderRadius: 16,
      border: "1px solid rgba(148,163,184,0.22)",
      background: "rgba(2,6,23,0.60)",
      color: "#e5e7eb",
      outline: "none",
      minWidth: 180,
      transition: "all 220ms cubic-bezier(.2,.8,.2,1)",
      backdropFilter: "blur(6px)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
    },

    input: {
      flex: 1,
      minWidth: 240,
      padding: "12px 14px",
      borderRadius: 16,
      border: "1px solid rgba(148,163,184,0.22)",
      background: "rgba(2,6,23,0.60)",
      color: "#e5e7eb",
      outline: "none",
      transition: "all 220ms cubic-bezier(.2,.8,.2,1)",
      backdropFilter: "blur(6px)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
    },

    exportBtn: {
      borderRadius: 16,
      padding: "12px 14px",
      border: "1px solid rgba(148,163,184,0.22)",
      background: "linear-gradient(135deg, rgba(30,41,59,0.85), rgba(2,6,23,0.92))",
      color: "#e5e7eb",
      cursor: "pointer",
      fontWeight: 900,
      letterSpacing: 0.2,
      boxShadow: "0 18px 52px rgba(0,0,0,0.35)",
      transition: "transform 140ms ease, filter 140ms ease, box-shadow 140ms ease",
      whiteSpace: "nowrap",
      userSelect: "none",
    },

    hint: { fontSize: 12, color: "#94a3b8", marginTop: 10, lineHeight: 1.5 },

    pagination: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
      flexWrap: "wrap",
      marginTop: 16,
    },

    pagerBtn: (disabled) => ({
      border: "1px solid rgba(148,163,184,0.22)",
      borderRadius: 18,
      padding: "12px 16px",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.55 : 1,
      color: "#e5e7eb",
      fontWeight: 900,
      letterSpacing: 0.2,
      background: disabled
        ? "rgba(2,6,23,0.70)"
        : "linear-gradient(135deg, rgba(30,41,59,0.85), rgba(2,6,23,0.92))",
      boxShadow: disabled ? "none" : "0 18px 52px rgba(0,0,0,0.42)",
      minWidth: 120,
      transition: "transform 140ms ease, filter 140ms ease, box-shadow 140ms ease",
      userSelect: "none",
      whiteSpace: "nowrap",
    }),

    pageInfo: { fontSize: 13, color: "#cbd5e1" },
  };

  const btnHoverOn = (e, disabled) => {
    if (disabled) return;
    e.currentTarget.style.transform = "translateY(-1px)";
    e.currentTarget.style.filter = "brightness(1.06)";
    e.currentTarget.style.boxShadow = "0 22px 60px rgba(0,0,0,0.46)";
  };

  const btnHoverOff = (e, disabled) => {
    if (disabled) return;
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.filter = "brightness(1)";
    e.currentTarget.style.boxShadow = "0 18px 52px rgba(0,0,0,0.42)";
  };

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <div style={styles.card}>
          <div style={styles.glow} />

          {/* Header */}
          <div style={styles.header}>
            <div style={styles.titleBlock}>
              <div style={styles.icon}>📋</div>
              <div>
                <h2 style={styles.h2}>My Issues</h2>
                <p style={styles.sub}>Browse issues with filters, search, pagination, and status summary.</p>
              </div>
            </div>
            <div style={styles.badge}>Tip: Use filters + search to find issues quickly</div>
          </div>

          {/* Summary */}
          <div style={styles.sectionCard}>
            <IssueSummary refreshKey={refreshKey} />
          </div>

          {/* Filters + List */}
          <div style={styles.sectionCard}>
            <div style={styles.toolbar}>
              <select
                value={status}
                onChange={(e) => {
                  setPage(1);
                  setStatus(e.target.value);
                }}
                style={styles.select}
                onFocus={focusIn}
                onBlur={focusOut}
              >
                <option value="">All Status</option>
                <option value="OPEN">OPEN</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>

              <select
                value={priority}
                onChange={(e) => {
                  setPage(1);
                  setPriority(e.target.value);
                }}
                style={styles.select}
                onFocus={focusIn}
                onBlur={focusOut}
              >
                <option value="">All Priority</option>
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>

              <input
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
                placeholder="Search title/description (debounced)"
                style={styles.input}
                onFocus={focusIn}
                onBlur={focusOut}
              />

              {/* ✅ Export buttons */}
              <button
                type="button"
                style={styles.exportBtn}
                onMouseEnter={(e) => btnHoverOn(e, false)}
                onMouseLeave={(e) => btnHoverOff(e, false)}
                onClick={onExportCSV}
                title="Export current list to CSV"
              >
                Export CSV
              </button>

              <button
                type="button"
                style={styles.exportBtn}
                onMouseEnter={(e) => btnHoverOn(e, false)}
                onMouseLeave={(e) => btnHoverOff(e, false)}
                onClick={onExportJSON}
                title="Export current list to JSON"
              >
                Export JSON
              </button>
            </div>

            <div style={styles.hint}>Tip: Search is debounced (wait ~0.4s after typing).</div>

            <div style={{ marginTop: 16 }}>
              <IssueList issues={issues} onStatus={onStatus} onDelete={onDelete} />
            </div>

            {/* Pagination */}
            <div style={styles.pagination}>
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                style={styles.pagerBtn(page <= 1)}
                onMouseEnter={(e) => btnHoverOn(e, page <= 1)}
                onMouseLeave={(e) => btnHoverOff(e, page <= 1)}
              >
                Prev
              </button>

              <span style={styles.pageInfo}>
                Page {meta.page} / {meta.totalPages} • Total: {meta.total}
              </span>

              <button
                disabled={page >= meta.totalPages}
                onClick={() => setPage((p) => p + 1)}
                style={styles.pagerBtn(page >= meta.totalPages)}
                onMouseEnter={(e) => btnHoverOn(e, page >= meta.totalPages)}
                onMouseLeave={(e) => btnHoverOff(e, page >= meta.totalPages)}
              >
                Next
              </button>
            </div>
          </div>

          <style>{animations}</style>
        </div>
      </div>
    </div>
  );
}
