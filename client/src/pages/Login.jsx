import { useContext, useState } from "react";
import { login } from "../api/auth.api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { refreshUser } = useContext(AuthContext);
  const nav = useNavigate();
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("123456");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await login({ email, password });
      localStorage.setItem("token", res.data.token);
      await refreshUser();
      nav("/issues");
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "50px auto" }}>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" style={{ width:"100%", padding:10, margin:"8px 0" }} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" style={{ width:"100%", padding:10, margin:"8px 0" }} />
        {err && <p style={{ color: "red" }}>{err}</p>}
        <button style={{ padding: 10, width:"100%" }}>Login</button>
      </form>
      <p style={{ marginTop: 10 }}>
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
