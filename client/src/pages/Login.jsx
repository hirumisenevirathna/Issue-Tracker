import { useContext, useState, useEffect, useRef } from "react";
import { login } from "../api/auth.api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { refreshUser } = useContext(AuthContext);
  const nav = useNavigate();
  const canvasRef = useRef(null);

  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("123456");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // Canvas animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Gradient blobs configuration
    class GradientBlob {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 300 + 200;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.hue = Math.random() * 360;
        this.hueSpeed = (Math.random() - 0.5) * 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.hue += this.hueSpeed;

        // Bounce off edges
        if (this.x < -this.radius || this.x > canvas.width + this.radius) this.vx *= -1;
        if (this.y < -this.radius || this.y > canvas.height + this.radius) this.vy *= -1;

        // Keep within bounds
        this.x = Math.max(-this.radius, Math.min(canvas.width + this.radius, this.x));
        this.y = Math.max(-this.radius, Math.min(canvas.height + this.radius, this.y));
      }

      draw() {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, `hsla(${this.hue}, 70%, 60%, 0.4)`);
        gradient.addColorStop(0.5, `hsla(${this.hue}, 70%, 50%, 0.2)`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }

    // Particle system
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;

        if (this.y < 0) {
          this.y = canvas.height;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create blobs and particles
    const blobs = [];
    const particles = [];

    for (let i = 0; i < 5; i++) {
      blobs.push(new GradientBlob());
    }

    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }

    // Mouse interaction
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      blobs.forEach((blob) => {
        const dx = mouseX - blob.x;
        const dy = mouseY - blob.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 500) {
          blob.vx += dx * 0.00005;
          blob.vy += dy * 0.00005;
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId;
    function animate() {
      // Dark base
      ctx.fillStyle = '#0b1220';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Enable blending for smooth gradient mixing
      ctx.globalCompositeOperation = 'screen';

      // Update and draw blobs
      blobs.forEach(blob => {
        blob.update();
        blob.draw();
      });

      // Reset composite operation for particles
      ctx.globalCompositeOperation = 'source-over';

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

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
      position: "fixed",
      inset: 0,
      overflow: "hidden",
      display: "grid",
      placeItems: "center",
      padding: 0,
      color: "#e5e7eb",
      background: "#0b1220",
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
      backdropFilter: "blur(10px)",
      animation: "cardIn 520ms cubic-bezier(.2,.8,.2,1)",
      zIndex: 2,
      position: "relative",
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

    videoBackground: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      zIndex: 0,
      overflow: "hidden",
    },

    canvas: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },

    overlay: {
      position: "absolute",
      inset: 0,
      background:
        "radial-gradient(1200px 500px at 10% 10%, rgba(34,197,94,0.18), transparent 60%), radial-gradient(1200px 500px at 90% 20%, rgba(59,130,246,0.18), transparent 60%), linear-gradient(180deg, rgba(2,6,23,0.55), rgba(2,6,23,0.75))",
      zIndex: 1,
    },
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
      {/* Canvas Background Animation */}
      <div style={styles.videoBackground}>
        <canvas ref={canvasRef} style={styles.canvas} />
      </div>

      <div style={styles.overlay} />

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
