import { useState } from "react";
import { register } from "../api/auth.api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await register({ email, password });
      nav("/login");
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Register failed");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "50px auto" }}>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" style={{ width:"100%", padding:10, margin:"8px 0" }} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" style={{ width:"100%", padding:10, margin:"8px 0" }} />
        {err && <p style={{ color: "red" }}>{err}</p>}
        <button style={{ padding: 10, width:"100%" }}>Create account</button>
      </form>
      <p style={{ marginTop: 10 }}>
        Already have one? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
