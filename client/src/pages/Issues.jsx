import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { createIssue, deleteIssue, getIssues, updateIssue } from "../api/issues.api";
import IssueSummary from "../components/IssueSummary";
import IssueForm from "../components/IssueForm";
import IssueList from "../components/IssueList";
import { useNavigate } from "react-router-dom";

export default function Issues() {
  const { user, loading, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const [refreshKey, setRefreshKey] = useState(0);
  const [issues, setIssues] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0, limit: 5 });

  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const params = useMemo(() => ({
    page,
    limit: meta.limit,
    status: status || undefined,
    priority: priority || undefined,
    search: search || undefined,
  }), [page, meta.limit, status, priority, search]);

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

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div style={{ maxWidth: 900, margin: "20px auto", padding: 12 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <h2>My Issues</h2>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <span>{user?.email}</span>
          <button onClick={() => { logout(); nav("/login"); }}>Logout</button>
        </div>
      </div>

      <IssueSummary refreshKey={refreshKey} />
      <IssueForm onCreate={onCreate} />

      <div style={{ display:"flex", gap:10, marginBottom: 12 }}>
        <select value={status} onChange={(e) => { setPage(1); setStatus(e.target.value); }}>
          <option value="">All Status</option>
          <option value="OPEN">OPEN</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>

        <select value={priority} onChange={(e) => { setPage(1); setPriority(e.target.value); }}>
          <option value="">All Priority</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        <input
          value={search}
          onChange={(e) => { setPage(1); setSearch(e.target.value); }}
          placeholder="Search title/description"
          style={{ flex: 1, padding: 8 }}
        />
      </div>

      <IssueList issues={issues} onStatus={onStatus} onDelete={onDelete} />

      <div style={{ display:"flex", justifyContent:"space-between", marginTop: 14 }}>
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
        <span>Page {meta.page} / {meta.totalPages} (Total: {meta.total})</span>
        <button disabled={page >= meta.totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}
