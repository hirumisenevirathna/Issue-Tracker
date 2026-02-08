export default function IssueList({ issues, onStatus, onDelete }) {
  return (
    <div style={{ display:"grid", gap:10 }}>
      {issues.map((it) => (
        <div key={it._id} style={{ border:"1px solid #ddd", borderRadius:8, padding:12 }}>
          <div style={{ display:"flex", justifyContent:"space-between", gap:10 }}>
            <b>{it.title}</b>
            <span>{it.status} | {it.priority}</span>
          </div>
          <p style={{ marginTop: 6 }}>{it.description}</p>

          <div style={{ display:"flex", gap:8 }}>
            <button onClick={() => onStatus(it._id, "IN_PROGRESS")}>In Progress</button>
            <button onClick={() => onStatus(it._id, "DONE")}>Resolve</button>
            <button onClick={() => onDelete(it._id)} style={{ color:"red" }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
