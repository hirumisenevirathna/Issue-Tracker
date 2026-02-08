import { useEffect, useState } from "react";
import { getSummary } from "../api/issues.api";

export default function IssueSummary({ refreshKey }) {
  const [s, setS] = useState({ OPEN: 0, IN_PROGRESS: 0, DONE: 0 });

  useEffect(() => {
    getSummary().then((r) => setS(r.data));
  }, [refreshKey]);

  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
      <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>🟢 Open: {s.OPEN}</div>
      <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>🟡 In Progress: {s.IN_PROGRESS}</div>
      <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>✅ Done: {s.DONE}</div>
    </div>
  );
}
