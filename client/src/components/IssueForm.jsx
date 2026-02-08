import { useState } from "react";

export default function IssueForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");

  const submit = (e) => {
    e.preventDefault();
    onCreate({ title, description, priority, status: "OPEN" });
    setTitle(""); setDescription(""); setPriority("MEDIUM");
  };

  return (
    <form onSubmit={submit} style={{ display:"grid", gap:8, marginBottom: 16 }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Issue title" required style={{ padding:10 }} />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" style={{ padding:10 }} />
      <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ padding:10 }}>
        <option>LOW</option><option>MEDIUM</option><option>HIGH</option>
      </select>
      <button style={{ padding: 10 }}>Create Issue</button>
    </form>
  );
}
