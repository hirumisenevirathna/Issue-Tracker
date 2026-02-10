import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const nav = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 750);
    return () => clearTimeout(t);
  }, []);

  // lightweight particles (no libs)
  const dots = useMemo(() => {
    const n = 14;
    return Array.from({ length: n }).map((_, i) => ({
      id: i,
      size: 6 + Math.random() * 10,
      left: Math.random() * 100,
      top: Math.random() * 100,
      dur: 6 + Math.random() * 7,
      delay: Math.random() * 3,
      opacity: 0.20 + Math.random() * 0.28,
    }));
  }, []);

  const styles = {
   page: {
  position: "fixed",
  inset: 0,
  overflow: "hidden",
  display: "grid",
  placeItems: "center",
  color: "#e5e7eb",
  background: "#0b1220",
  isolation: "isolate",
}
,

    // ✅ top brand (short name) — animate in
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
      background: "rgba(2,6,23,0.28)",
      border: "1px solid rgba(148,163,184,0.18)",
      backdropFilter: "blur(0px)",
      WebkitBackdropFilter: "blur(0px)",
      boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
      transform: mounted ? "translateY(0)" : "translateY(-14px)",
      opacity: mounted ? 1 : 0,
      filter: mounted ? "blur(0px)" : "blur(8px)",
      transition: "all 680ms cubic-bezier(.2,.8,.2,1)",
    },
    
    brandMark: {
      width: 36,
      height: 36,
      borderRadius: 999,
      background:
        "linear-gradient(135deg, rgba(59,130,246,0.95), rgba(34,197,94,0.95))",
      boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
    },
    brandText: {
      fontWeight: 950,
      letterSpacing: 0.4,
      fontSize: 13,
      color: "#e5e7eb",
    },

    video: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: 0,
      filter: "saturate(1.05) contrast(1.02)",
      transform: "scale(1.02)",
    },

    overlay: {
      position: "absolute",
      inset: 0,
      zIndex: 1,
      background:
        "radial-gradient(1200px 650px at 20% 20%, rgba(59,130,246,0.22), transparent 60%), radial-gradient(1200px 650px at 85% 70%, rgba(34,197,94,0.18), transparent 60%), linear-gradient(180deg, rgba(2,6,23,0.48), rgba(2,6,23,0.72))",
    },

    blobA: {
      position: "absolute",
      width: 620,
      height: 620,
      left: "-180px",
      top: "-220px",
      borderRadius: 999,
      background:
        "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.55), rgba(59,130,246,0) 60%)",
      filter: "blur(28px)",
      opacity: 0.55,
      zIndex: 2,
      animation: "blobFloat 9s ease-in-out infinite",
      pointerEvents: "none",
    },
    blobB: {
      position: "absolute",
      width: 700,
      height: 700,
      right: "-220px",
      bottom: "-260px",
      borderRadius: 999,
      background:
        "radial-gradient(circle at 40% 40%, rgba(34,197,94,0.55), rgba(34,197,94,0) 62%)",
      filter: "blur(30px)",
      opacity: 0.5,
      zIndex: 2,
      animation: "blobFloat2 10s ease-in-out infinite",
      pointerEvents: "none",
    },

    wrap: {
      position: "relative",
      zIndex: 3,
      width: "min(980px, 92vw)",
      padding: "60px 22px",
      display: "grid",
      justifyItems: "center",
      gap: 18,
    },

    // ✅ glass entrance (animate-ui feel)
    glass: {
      width: "100%",
      padding: "44px 34px",
      borderRadius: 28,
      background: "rgba(15,23,42,0.22)",
      border: "1px solid rgba(148,163,184,0.18)",
      boxShadow: "0 36px 120px rgba(0,0,0,0.55)",
      backdropFilter: "blur(0px)",
      WebkitBackdropFilter: "blur(0px)",

      // entrance
      transform: mounted ? "translateY(0) scale(1)" : "translateY(18px) scale(0.985)",
      opacity: mounted ? 1 : 0,
      filter: mounted ? "blur(0px)" : "blur(10px)",
      transition: "all 780ms cubic-bezier(.2,.8,.2,1)",
    },

    badgeRow: {
      display: "flex",
      gap: 10,
      justifyContent: "center",
      flexWrap: "wrap",
      marginBottom: 14,
    },
    badge: (i) => ({
      fontSize: 12,
      fontWeight: 900,
      letterSpacing: 0.4,
      color: "#e5e7eb",
      padding: "8px 12px",
      borderRadius: 999,
      background: "rgba(2,6,23,0.35)",
      border: "1px solid rgba(148,163,184,0.18)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",

      // stagger
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(10px)",
      transition: `all 900ms cubic-bezier(.2,.8,.2,1) ${250 + i * 140}ms`,

    }),

    title: {
      margin: 0,
      textAlign: "center",
      fontSize: "clamp(40px, 6vw, 72px)",
      fontWeight: 1000,
      letterSpacing: "-1px",
      lineHeight: 1.05,

      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(14px)",
      transition: "all 760ms cubic-bezier(.2,.8,.2,1) 320ms",
    },

    titleGrad: {
      background: "linear-gradient(90deg, rgba(59,130,246,1), rgba(34,197,94,1))",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      textShadow: "0 22px 70px rgba(59,130,246,0.22)",
    },

    desc: {
      margin: "14px auto 0",
      maxWidth: 760,
      textAlign: "center",
      fontSize: 15,
      lineHeight: 1.75,
      color: "rgba(226,232,240,0.92)",

      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(14px)",
      transition: "all 760ms cubic-bezier(.2,.8,.2,1) 420ms",
    },

    ctaRow: {
      marginTop: 24,
      display: "flex",
      gap: 12,
      justifyContent: "center",
      flexWrap: "wrap",

      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(14px)",
      transition: "all 760ms cubic-bezier(.2,.8,.2,1) 520ms",
    },

    cta: {
      position: "relative",
      border: "1px solid rgba(34,197,94,0.35)",
      borderRadius: 18,
      padding: "14px 20px",
      background:
        "linear-gradient(135deg, rgba(59,130,246,0.92), rgba(34,197,94,0.92))",
      color: "#0b1220",
      fontWeight: 1000,
      letterSpacing: 0.4,
      cursor: "pointer",
      boxShadow:
        "0 22px 70px rgba(0,0,0,0.40), 0 0 0 1px rgba(255,255,255,0.04) inset",
      overflow: "hidden",
      transition: "transform 160ms ease, filter 160ms ease, box-shadow 200ms ease",
      minWidth: 190,
    },

    secondary: {
      border: "1px solid rgba(148,163,184,0.22)",
      borderRadius: 18,
      padding: "14px 18px",
      background: "rgba(2,6,23,0.22)",
      color: "#e5e7eb",
      fontWeight: 900,
      letterSpacing: 0.25,
      cursor: "default",
      backdropFilter: "blur(0px)",
      WebkitBackdropFilter: "blur(0px)",
      minWidth: 190,
      textAlign: "center",
    },

    footer: {
      marginTop: 18,
      textAlign: "center",
      fontSize: 12,
      color: "rgba(148,163,184,0.92)",

      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(10px)",
      transition: "all 700ms cubic-bezier(.2,.8,.2,1) 620ms",
    },

    dot: (d) => ({
      position: "absolute",
      left: `${d.left}%`,
      top: `${d.top}%`,
      width: d.size,
      height: d.size,
      borderRadius: 999,
      background:
        "linear-gradient(135deg, rgba(59,130,246,0.9), rgba(34,197,94,0.85))",
      opacity: d.opacity,
      filter: "blur(0.2px)",
      zIndex: 2,
      animation: `dotFloat ${d.dur}s ease-in-out ${d.delay}s infinite`,
      pointerEvents: "none",
    }),

    shimmer: {
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 30%, rgba(255,255,255,0) 60%)",
      transform: "translateX(-120%)",
      animation: "shimmer 2.8s ease-in-out infinite",
      pointerEvents: "none",
    },
  };

  return (
    <div style={styles.page}>
      {/* ✅ Short web name at top */}
      <div style={styles.brand}>
        <div/>
        <div style={styles.brandText}>TraceFlow</div>
      </div>

      {/* 🎥 Background Video */}
      <video autoPlay loop muted playsInline style={styles.video}>
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      <div style={styles.overlay} />
      <div style={styles.blobA} />
      <div style={styles.blobB} />

      {/* Particles */}
      {dots.map((d) => (
        <div key={d.id} style={styles.dot(d)} />
      ))}

      <div style={styles.wrap}>
        <div style={styles.glass}>
          <div style={styles.badgeRow}>
            <div style={styles.badge(0)}>ISSUE TRACKING</div>
            <div style={styles.badge(1)}>PRIORITY WORKFLOW</div>
            <div style={styles.badge(2)}>CLEAN UI</div>
          </div>

          <h1 style={styles.title}>
            Build with confidence. <br />
            Track every <span style={styles.titleGrad}>coding error</span>.
          </h1>

          <p style={styles.desc}>
            TraceFlow helps you log bugs, set priority, and move issues from OPEN to DONE
            with a smooth workflow — so your team ships faster with less chaos.
          </p>

          <div style={styles.ctaRow}>
            <button
              style={styles.cta}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.filter = "brightness(1.06)";
                e.currentTarget.style.boxShadow =
                  "0 28px 90px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05) inset";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.filter = "brightness(1)";
                e.currentTarget.style.boxShadow =
                  "0 22px 70px rgba(0,0,0,0.40), 0 0 0 1px rgba(255,255,255,0.04) inset";
              }}
              onClick={() => nav("/login")}
            >
              <span style={{ position: "relative", zIndex: 2 }}>Get Started →</span>
              <span style={styles.shimmer} />
            </button>

            <div style={styles.secondary}>Simple. Fast. Organized.</div>
          </div>

          <div style={styles.footer}>
            © {new Date().getFullYear()} TraceFlow • Error tracking made simple
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blobFloat {
          0%,100% { transform: translate(0px,0px); }
          50% { transform: translate(40px, 30px); }
        }
        @keyframes blobFloat2 {
          0%,100% { transform: translate(0px,0px); }
          50% { transform: translate(-42px, -26px); }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-120%); opacity: 0.0; }
          20%  { opacity: 1; }
          50%  { transform: translateX(120%); opacity: 0.9; }
          100% { transform: translateX(120%); opacity: 0.0; }
        }
        @keyframes dotFloat {
          0%,100% { transform: translate(0px,0px); }
          50% { transform: translate(10px,-16px); }
        }
      `}</style>
    </div>
  );
}
