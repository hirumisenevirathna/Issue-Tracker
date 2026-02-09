import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { createIssue, deleteIssue, getIssues, updateIssue } from "../api/issues.api";
import IssueSummary from "../components/IssueSummary";
import IssueList from "../components/IssueList";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

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

  const onCreate = async (data) => {
    await createIssue(data);
    setRefreshKey((k) => k + 1);
  };

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

    @keyframes pulseSoft {
      0% { opacity: 0.75; }
      50% { opacity: 1; }
      100% { opacity: 0.75; }
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
    page: {
      minHeight: "100vh",
      padding: 16,
      background:
        "radial-gradient(1200px 600px at 10% 10%, rgba(34,197,94,0.16), transparent 60%), radial-gradient(1200px 600px at 90% 20%, rgba(59,130,246,0.16), transparent 60%), #0b1220",
      color: "#e5e7eb",
      animation: "pageIn 420ms ease-out",
    },
    container: { maxWidth: 980, margin: "0 auto" },

    // ✅ glass cards (more pro)
    headerCard: {
      background: "rgba(15,23,42,0.72)",
      border: "1px solid rgba(148,163,184,0.18)",
      borderRadius: 18,
      padding: 18,
      boxShadow: "0 22px 80px rgba(0,0,0,0.40)",
      backdropFilter: "blur(14px)",
      marginBottom: 14,
      animation: "cardIn 520ms cubic-bezier(.2,.8,.2,1)",
    },
    headerTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
      flexWrap: "wrap",
    },
    titleWrap: { display: "flex", alignItems: "center", gap: 10 },
    logo: {
      width: 40,
      height: 40,
      borderRadius: 14,
      background: "linear-gradient(135deg, rgba(34,197,94,1), rgba(59,130,246,1))",
      boxShadow: "0 12px 36px rgba(59,130,246,0.22)",
    },
    title: { margin: 0, fontSize: 24, fontWeight: 900, letterSpacing: 0.2 },
    subtitle: { margin: "4px 0 0", fontSize: 13, color: "#cbd5e1", lineHeight: 1.5 },

    sectionCard: {
      background: "rgba(15,23,42,0.72)",
      border: "1px solid rgba(148,163,184,0.18)",
      borderRadius: 18,
      padding: 18,
      boxShadow: "0 18px 60px rgba(0,0,0,0.28)",
      backdropFilter: "blur(14px)",
      marginBottom: 14,
      animation: "cardIn 560ms cubic-bezier(.2,.8,.2,1)",
    },

    toolbar: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      alignItems: "center",
      marginTop: 10,
    },

    // ✅ pro inputs (no white borders)
    select: {
      padding: "10px 12px",
      borderRadius: 12,
      border: "1px solid rgba(148,163,184,0.18)",
      background: "rgba(2,6,23,0.45)",
      color: "#e5e7eb",
      outline: "none",
      minWidth: 170,
      transition: "border 160ms ease, box-shadow 160ms ease, filter 160ms ease",
    },
    input: {
      flex: 1,
      minWidth: 220,
      padding: "10px 12px",
      borderRadius: 12,
      border: "1px solid rgba(148,163,184,0.18)",
      background: "rgba(2,6,23,0.45)",
      color: "#e5e7eb",
      outline: "none",
      transition: "border 160ms ease, box-shadow 160ms ease, filter 160ms ease",
    },

    hint: { fontSize: 12, color: "#94a3b8", marginTop: 8, lineHeight: 1.5 },

    pagination: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
      flexWrap: "wrap",
      marginTop: 14,
    },

    // ✅ next-level professional button mood (not too bright, not childish)
    pagerBtn: (disabled) => ({
      border: "1px solid rgba(148,163,184,0.22)",
      borderRadius: 14,
      padding: "10px 14px",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.55 : 1,
      color: "#e5e7eb",
      fontWeight: 900,
      letterSpacing: 0.2,
      background: disabled
        ? "rgba(2,6,23,0.55)"
        : "linear-gradient(135deg, rgba(30,41,59,0.85), rgba(2,6,23,0.85))",
      boxShadow: disabled ? "none" : "0 14px 40px rgba(0,0,0,0.35)",
      minWidth: 110,
      transition: "transform 140ms ease, filter 140ms ease, box-shadow 140ms ease",
    }),

    pageInfo: { fontSize: 13, color: "#cbd5e1" },
  };

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

  const btnHoverOn = (e, disabled) => {
    if (disabled) return;
    e.currentTarget.style.transform = "translateY(-1px)";
    e.currentTarget.style.filter = "brightness(1.06)";
    e.currentTarget.style.boxShadow = "0 18px 52px rgba(0,0,0,0.42)";
  };

  const btnHoverOff = (e, disabled) => {
    if (disabled) return;
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.filter = "brightness(1)";
    e.currentTarget.style.boxShadow = "0 14px 40px rgba(0,0,0,0.35)";
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.headerCard}>
          <div style={styles.headerTop}>
            <div style={styles.titleWrap}>
              <div style={styles.logo} />
              <div>
                <h2 style={styles.title}>My Issues</h2>
                <p style={styles.subtitle}>
                  Manage issues with filters, pagination, and status summary.
                </p>
              </div>
            </div>
          </div>
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
          </div>

          <div style={styles.hint}>Tip: Search is debounced (wait ~0.4s after typing).</div>

          <div style={{ marginTop: 14 }}>
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
              onMouseDown={(e) => page > 1 && (e.currentTarget.style.transform = "scale(0.98)")}
              onMouseUp={(e) => page > 1 && (e.currentTarget.style.transform = "translateY(-1px)")}
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
              onMouseDown={(e) =>
                page < meta.totalPages && (e.currentTarget.style.transform = "scale(0.98)")
              }
              onMouseUp={(e) =>
                page < meta.totalPages && (e.currentTarget.style.transform = "translateY(-1px)")
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <style>{animations}</style>
    </div>
  );
}
