import { useState } from "react";

export default function IssueForm({ onCreate, ui }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onCreate?.({ title, description, priority });
    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      {/* ✅ TITLE */}
      <div style={ui?.group}>
        <div style={ui?.label}>Issue title</div>

        {/* ✅ same length wrapper */}
        <div style={ui?.fieldWrap}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Issue title"
            required
            style={ui?.input}
            className="form-input"
          />
        </div>
      </div>

      {/* ✅ DESCRIPTION */}
      <div style={ui?.group}>
        <div style={ui?.label}>Description</div>

        {/* ✅ same length wrapper */}
        <div style={ui?.fieldWrap}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            style={ui?.textarea}
            className="form-textarea"
          />
        </div>
      </div>

      {/* ✅ PRIORITY */}
      <div style={ui?.group}>
        <div style={ui?.label}>Priority</div>

        {/* ✅ same length wrapper */}
        <div style={ui?.fieldWrap}>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={ui?.select}
            className="form-select"
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>
      </div>

      <button type="submit" style={ui?.button?.(false)} className="form-button">
        Create Issue
      </button>

      <style>{`
        .form-input:focus,
        .form-textarea:focus,
        .form-select:focus {
          border: 1px solid rgba(59,130,246,0.55) !important;
          box-shadow: 0 0 0 4px rgba(59,130,246,0.14) !important;
          outline: none;
        }

        .form-input,
        .form-textarea,
        .form-select {
          transition: border 160ms ease, box-shadow 160ms ease;
        }

        .form-button:hover {
          transform: translateY(-1px);
          filter: brightness(1.05);
        }

        .form-button {
          transition: transform 140ms ease, filter 140ms ease;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .form-input,
          .form-textarea,
          .form-select {
            font-size: 16px;
          }
        }
      `}</style>
    </form>
  );
}
