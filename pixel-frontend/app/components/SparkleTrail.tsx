"use client";
import { useEffect, useRef } from "react";

export default function SparkleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles: any[] = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d")!;
    let w = (canvas!.width = window.innerWidth);
    let h = (canvas!.height = window.innerHeight);

    const resize = () => {
      w = canvas!.width = window.innerWidth;
      h = canvas!.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const mouse = { x: 0, y: 0 };
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;

      // ✨ Reduced sparkle count: 1–2 per move instead of 3–5
      const count = Math.random() > 0.6 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: mouse.x,
          y: mouse.y,
          size: Math.random() * 3 + 1,
          life: 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          color: Math.random() > 0.3 ? "#FAF9F6" : "#EEDFCC",
          type: Math.random() > 0.8 ? "star" : "sparkle",
        });
      }
    });

    function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
      ctx.save();
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(
          Math.cos(((18 + i * 72) / 180) * Math.PI) * r + x,
          -Math.sin(((18 + i * 72) / 180) * Math.PI) * r + y
        );
        ctx.lineTo(
          Math.cos(((54 + i * 72) / 180) * Math.PI) * (r / 2.5) + x,
          -Math.sin(((54 + i * 72) / 180) * Math.PI) * (r / 2.5) + y
        );
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= 0.02;
        p.size *= 0.97;

        if (p.life <= 0 || p.size <= 0.2) particles.splice(i, 1);

        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;

        if (p.type === "star") {
          drawStar(ctx, p.x, p.y, p.size * 2);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[999]"
    />
  );
}
