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
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await login({ email, password });
      localStorage.setItem("token", res.data.token);
      await refreshUser();
      nav("/dashboard");
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
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

    @keyframes pulse {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }

    @keyframes glow {
      from { filter: brightness(1); }
      to { filter: brightness(1.08); }
    }
  `;

  const styles = {
    page: {
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      padding: 16,
      background:
        "radial-gradient(1200px 500px at 10% 10%, rgba(34,197,94,0.18), transparent 60%), radial-gradient(1200px 500px at 90% 20%, rgba(59,130,246,0.18), transparent 60%), #0b1220",
      color: "#e5e7eb",
      animation: "pageIn 420ms ease-out",
    },
    card: {
      width: "100%",
      maxWidth: 420,
      background: "rgba(15,23,42,0.75)",
      border: "1px solid rgba(148,163,184,0.18)",
      borderRadius: 18,
      padding: 24,
      boxShadow: "0 22px 80px rgba(0,0,0,0.45)",
      backdropFilter: "blur(14px)",
      animation: "cardIn 520ms cubic-bezier(.2,.8,.2,1)",
    },
    brand: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 18,
    },
    logo: {
      width: 38,
      height: 38,
      borderRadius: 12,
      background:
        "linear-gradient(135deg, rgba(34,197,94,1), rgba(59,130,246,1))",
      boxShadow: "0 10px 30px rgba(59,130,246,0.25)",
      flex: "0 0 auto",
    },
    title: { margin: 0, fontSize: 26, letterSpacing: 0.2 },
    subtitle: { marginTop: 6, fontSize: 14, color: "#cbd5e1", lineHeight: 1.6 },
    label: { display: "block", fontSize: 12, color: "#cbd5e1", marginBottom: 6 },
    inputWrap: { margin: "12px 0" },
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: 10,
      border: "1px solid rgba(255,255,255,0.16)",
      background: "rgba(0,0,0,0.25)",
      color: "#e5e7eb",
      outline: "none",
      transition: "border 160ms ease, box-shadow 160ms ease",
    },
    error: {
      marginTop: 10,
      padding: "10px 12px",
      borderRadius: 12,
      background: "rgba(239,68,68,0.12)",
      border: "1px solid rgba(239,68,68,0.35)",
      color: "#fecaca",
      fontSize: 13,
      animation: "cardIn 260ms ease-out",
    },
    btn: {
      width: "100%",
      padding: "12px",
      borderRadius: 12,
      border: "none",
      cursor: "pointer",
      fontWeight: 800,
      color: "#0b1220",
      background:
        "linear-gradient(90deg, rgba(34,197,94,1) 0%, rgba(59,130,246,1) 100%)",
      boxShadow: "0 10px 28px rgba(59,130,246,0.25)",
      marginTop: 10,
      transition: "transform 120ms ease, box-shadow 120ms ease, filter 120ms ease",
    },
    btnDisabled: { opacity: 0.7, cursor: "not-allowed" },
    footer: { marginTop: 14, fontSize: 13, color: "#cbd5e1" },
    link: { color: "#93c5fd", textDecoration: "none", fontWeight: 700 },
  };

  const focusIn = (e) => {
    e.target.style.border = "1px solid rgba(59,130,246,0.6)";
    e.target.style.boxShadow = "0 0 0 4px rgba(59,130,246,0.15)";
  };

  const focusOut = (e) => {
    e.target.style.border = "1px solid rgba(255,255,255,0.16)";
    e.target.style.boxShadow = "none";
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.brand}>
          <div style={styles.logo} />
          <div>
            <div style={{ fontWeight: 900, fontSize: 14, color: "#e5e7eb" }}>
              Issue Tracker
            </div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>
              Login to your account
            </div>
          </div>
        </div>

        <h2 style={styles.title}>Login</h2>
        <p style={styles.subtitle}>
          Access your issues, filters, and status dashboard.
        </p>

        <form onSubmit={onSubmit}>
          <div style={styles.inputWrap}>
            <label style={styles.label}>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              style={styles.input}
              onFocus={focusIn}
              onBlur={focusOut}
              required
            />
          </div>

          <div style={styles.inputWrap}>
            <label style={styles.label}>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              placeholder="Your password"
              style={styles.input}
              onFocus={focusIn}
              onBlur={focusOut}
              required
            />
          </div>

          {err && <div style={styles.error}>{err}</div>}

          <button
            style={{
              ...styles.btn,
              ...(loading ? styles.btnDisabled : {}),
              ...(loading ? { animation: "pulse 1s ease-in-out infinite" } : {}),
            }}
            disabled={loading}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.filter = "brightness(1.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
            onMouseDown={(e) => !loading && (e.currentTarget.style.transform = "scale(0.97)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p style={styles.footer}>
          No account?{" "}
          <Link to="/register" style={styles.link}>
            Register
          </Link>
        </p>
      </div>

      <style>{animations}</style>
    </div>
  );
}
