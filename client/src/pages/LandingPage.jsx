import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const nav = useNavigate();
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 500);
    return () => clearTimeout(t);
  }, []);

  // Canvas animation (toned down for professional look)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class GradientBlob {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 260 + 180;
        this.vx = (Math.random() - 0.5) * 0.28;
        this.vy = (Math.random() - 0.5) * 0.28;
        this.hue = 210 + Math.random() * 60; // tighter palette (blue/teal)
        this.hueSpeed = (Math.random() - 0.5) * 0.15;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.hue += this.hueSpeed;

        if (this.x < -this.radius || this.x > canvas.width + this.radius) this.vx *= -1;
        if (this.y < -this.radius || this.y > canvas.height + this.radius) this.vy *= -1;

        this.x = Math.max(-this.radius, Math.min(canvas.width + this.radius, this.x));
        this.y = Math.max(-this.radius, Math.min(canvas.height + this.radius, this.y));
      }

      draw() {
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        g.addColorStop(0, `hsla(${this.hue}, 70%, 62%, 0.18)`);
        g.addColorStop(0.5, `hsla(${this.hue}, 70%, 52%, 0.09)`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.6 + 0.4;
        this.speedY = Math.random() * 0.35 + 0.12;
        this.speedX = (Math.random() - 0.5) * 0.18;
        this.opacity = Math.random() * 0.25 + 0.10;
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
        ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const blobs = Array.from({ length: 4 }, () => new GradientBlob());
    const particles = Array.from({ length: 80 }, () => new Particle());

    let animationId;
    function animate() {
      ctx.fillStyle = "#070B14";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "screen";
      blobs.forEach((b) => {
        b.update();
        b.draw();
      });

      ctx.globalCompositeOperation = "source-over";
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const dots = useMemo(() => {
    const n = 10; // fewer = cleaner
    return Array.from({ length: n }).map((_, i) => ({
      id: i,
      size: 6 + Math.random() * 10,
      left: Math.random() * 100,
      top: Math.random() * 100,
      dur: 10 + Math.random() * 10,
      delay: Math.random() * 2,
      opacity: 0.10 + Math.random() * 0.14,
    }));
  }, []);

  const styles = {
    page: {
      position: "fixed",
      inset: 0,
      overflow: "hidden",
      display: "grid",
      placeItems: "center",
      color: "#EAF0FF",
      background: "#070B14",
      fontFamily:
        '"Plus Jakarta Sans", Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
      isolation: "isolate",
    },

    brand: {
      position: "fixed",
      top: 18,
      left: 18,
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 12px",
      borderRadius: 999,
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.12)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      boxShadow: "0 18px 60px rgba(0,0,0,0.45)",
      transform: mounted ? "translateY(0)" : "translateY(-10px)",
      opacity: mounted ? 1 : 0,
      transition: "all 600ms cubic-bezier(.2,.8,.2,1)",
    },

    brandMark: {
      width: 34,
      height: 34,
      borderRadius: 999,
      background:
        "linear-gradient(135deg, rgba(99,102,241,1), rgba(34,211,238,1))",
      boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
    },
    brandText: {
      fontWeight: 800,
      letterSpacing: 0.2,
      fontSize: 13,
      color: "rgba(234,240,255,0.95)",
    },

    bg: {
      position: "absolute",
      inset: 0,
      zIndex: 0,
      overflow: "hidden",
    },

    canvas: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      filter: "saturate(0.95) contrast(1.05)",
      opacity: 0.85,
    },

    overlay: {
      position: "absolute",
      inset: 0,
      zIndex: 1,
      background:
        "radial-gradient(900px 520px at 15% 20%, rgba(99,102,241,0.18), transparent 55%), radial-gradient(900px 520px at 85% 70%, rgba(34,211,238,0.12), transparent 55%), linear-gradient(180deg, rgba(7,11,20,0.55), rgba(7,11,20,0.82))",
    },

    noise: {
      position: "absolute",
      inset: 0,
      zIndex: 2,
      opacity: 0.06,
      pointerEvents: "none",
      backgroundImage:
        "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.4%22/%3E%3C/svg%3E')",
    },

    wrap: {
      position: "relative",
      zIndex: 3,
      width: "min(980px, 92vw)",
      padding: "64px 22px",
      display: "grid",
      justifyItems: "center",
      gap: 18,
    },

    glass: {
      width: "100%",
      padding: "46px 36px",
      borderRadius: 26,
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
      border: "1px solid rgba(255,255,255,0.14)",
      boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",

      transform: mounted ? "translateY(0) scale(1)" : "translateY(16px) scale(0.985)",
      opacity: mounted ? 1 : 0,
      transition: "all 700ms cubic-bezier(.2,.8,.2,1)",
    },

    badgeRow: {
      display: "flex",
      gap: 10,
      justifyContent: "center",
      flexWrap: "wrap",
      marginBottom: 16,
    },

    badge: (i) => ({
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: 0.3,
      color: "rgba(234,240,255,0.92)",
      padding: "8px 12px",
      borderRadius: 999,
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.12)",
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(10px)",
      transition: `all 750ms cubic-bezier(.2,.8,.2,1) ${220 + i * 120}ms`,
    }),

    title: {
      margin: 0,
      textAlign: "center",
      fontSize: "clamp(38px, 5.6vw, 68px)",
      fontWeight: 900,
      letterSpacing: "-1.2px",
      lineHeight: 1.06,
      color: "rgba(234,240,255,0.98)",
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(12px)",
      transition: "all 720ms cubic-bezier(.2,.8,.2,1) 240ms",
    },

    titleGrad: {
      background: "linear-gradient(90deg, rgba(99,102,241,1), rgba(34,211,238,1))",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      textShadow: "0 18px 60px rgba(99,102,241,0.18)",
    },

    desc: {
      margin: "14px auto 0",
      maxWidth: 740,
      textAlign: "center",
      fontSize: 15.5,
      lineHeight: 1.75,
      color: "rgba(210,222,255,0.86)",
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(12px)",
      transition: "all 720ms cubic-bezier(.2,.8,.2,1) 340ms",
    },

    ctaRow: {
      marginTop: 26,
      display: "flex",
      justifyContent: "center",
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(12px)",
      transition: "all 720ms cubic-bezier(.2,.8,.2,1) 450ms",
    },

    cta: {
      position: "relative",
      border: "1px solid rgba(255,255,255,0.18)",
      borderRadius: 16,
      padding: "14px 34px",
      background:
        "linear-gradient(135deg, rgba(99,102,241,1), rgba(34,211,238,1))",
      color: "#071018",
      fontWeight: 900,
      letterSpacing: 0.2,
      fontSize: 15.5,
      cursor: "pointer",
      boxShadow: "0 26px 90px rgba(0,0,0,0.55)",
      transition: "transform 160ms ease, filter 160ms ease, box-shadow 200ms ease",
      overflow: "hidden",
    },

    footer: {
      marginTop: 18,
      textAlign: "center",
      fontSize: 12,
      color: "rgba(170,186,220,0.75)",
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(10px)",
      transition: "all 650ms cubic-bezier(.2,.8,.2,1) 540ms",
    },

    dot: (d) => ({
      position: "absolute",
      left: `${d.left}%`,
      top: `${d.top}%`,
      width: d.size,
      height: d.size,
      borderRadius: 999,
      background:
        "linear-gradient(135deg, rgba(99,102,241,0.75), rgba(34,211,238,0.65))",
      opacity: d.opacity,
      filter: "blur(0.4px)",
      zIndex: 2,
      animation: `dotFloat ${d.dur}s ease-in-out ${d.delay}s infinite`,
      pointerEvents: "none",
    }),

    shimmer: {
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 30%, rgba(255,255,255,0) 60%)",
      transform: "translateX(-120%)",
      animation: "shimmer 3.4s ease-in-out infinite",
      pointerEvents: "none",
      opacity: 0.75,
    },
  };

  return (
    <div style={styles.page}>
      {/* Google Font (professional) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap');

        @keyframes shimmer {
          0%   { transform: translateX(-120%); opacity: 0.0; }
          20%  { opacity: 1; }
          50%  { transform: translateX(120%); opacity: 0.9; }
          100% { transform: translateX(120%); opacity: 0.0; }
        }
        @keyframes dotFloat {
          0%,100% { transform: translate(0px,0px); }
          50% { transform: translate(10px,-14px); }
        }
      `}</style>

      {/* Brand */}
      <div style={styles.brand}>
        <div style={styles.brandMark} />
        <div style={styles.brandText}>TraceFlow</div>
      </div>

      {/* Background */}
      <div style={styles.bg}>
        <canvas ref={canvasRef} style={styles.canvas} />
        <div style={styles.overlay} />
        <div style={styles.noise} />
      </div>

      {/* Subtle particles */}
      {dots.map((d) => (
        <div key={d.id} style={styles.dot(d)} />
      ))}

      <div style={styles.wrap}>
        <div style={styles.glass}>
          <div style={styles.badgeRow}>
            <div style={styles.badge(0)}>ISSUE TRACKING</div>
            <div style={styles.badge(1)}>TEAM WORKFLOW</div>
            <div style={styles.badge(2)}>FAST DELIVERY</div>
          </div>

          <h1 style={styles.title}>
            Ship faster. <br />
            Stay on top of <span style={styles.titleGrad}>every issue</span>.
          </h1>

          <p style={styles.desc}>
            TraceFlow keeps your bug reports, priorities, and statuses organized in one place —
            so your team can move from OPEN → DONE with clarity and speed.
          </p>

          <div style={styles.ctaRow}>
            <button
              style={styles.cta}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.filter = "brightness(1.03)";
                e.currentTarget.style.boxShadow = "0 34px 110px rgba(0,0,0,0.65)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.filter = "brightness(1)";
                e.currentTarget.style.boxShadow = "0 26px 90px rgba(0,0,0,0.55)";
              }}
              onClick={() => nav("/login")}
            >
              <span style={{ position: "relative", zIndex: 2 }}>Get Started →</span>
              <span style={styles.shimmer} />
            </button>
          </div>

          <div style={styles.footer}>
            © {new Date().getFullYear()} TraceFlow • Simple, clean issue tracking
          </div>
        </div>
      </div>
    </div>
  );
}