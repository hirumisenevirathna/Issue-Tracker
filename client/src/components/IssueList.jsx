const statusColor = (status) => {
  switch (status) {
    case "OPEN":
      return "#22c55e"; // green
    case "IN_PROGRESS":
      return "#f59e0b"; // orange
    case "DONE":
      return "#3b82f6"; // blue
    default:
      return "#6b7280";
  }
};

const priorityColor = (priority) => {
  switch (priority) {
    case "HIGH":
      return "#ef4444"; // red
    case "MEDIUM":
      return "#f59e0b"; // orange
    case "LOW":
      return "#22c55e"; // green
    default:
      return "#6b7280";
  }
};



export default function IssueList({ issues, onStatus, onDelete }) {
  return (
    <div style={{ display:"grid", gap:10 }}>
      {issues.map((it) => (
        <div key={it._id} style={{ border:"1px solid #ddd", borderRadius:8, padding:12 }}>
          <div style={{ display:"flex", justifyContent:"space-between", gap:10 }}>
            <b>{it.title}</b>
            <div style={{ display: "flex", gap: 8 }}>
  <span
    style={{
      backgroundColor: statusColor(it.status),
      color: "white",
      padding: "2px 8px",
      borderRadius: 12,
      fontSize: 12,
    }}
  >
    {it.status}
  </span>

  <span
    style={{
      backgroundColor: priorityColor(it.priority),
      color: "white",
      padding: "2px 8px",
      borderRadius: 12,
      fontSize: 12,
    }}
  >
    {it.priority}
  </span>
</div>

          </div>
          <p style={{ marginTop: 6 }}>{it.description}</p>

          <div style={{ display:"flex", gap:8 }}>
            <button style={{ background:"#f59e0b", color:"white", border:"none", padding:"6px 10px", borderRadius:6 }}
  onClick={() => onStatus(it._id, "IN_PROGRESS")}>
  In Progress
</button>

<button style={{ background:"#22c55e", color:"white", border:"none", padding:"6px 10px", borderRadius:6 }}
  onClick={() => onStatus(it._id, "DONE")}>
  Resolve
</button>

<button style={{ background:"#ef4444", color:"white", border:"none", padding:"6px 10px", borderRadius:6 }}
  onClick={() => onDelete(it._id)}>
  Delete
</button>

          </div>
        </div>
      ))}
    </div>
  );
}
