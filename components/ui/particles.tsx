"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { cn } from "@/app/lib/utils";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  color?: string;
  vx?: number;
  vy?: number;
}

interface Circle {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
}

export const Particles: React.FC<ParticlesProps> = ({
  className,
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  color = "#ffffff",
  vx = 0,
  vy = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = useRef(1);

  const hexToRgb = (hex: string): number[] => {
    let normalized = hex.replace("#", "");
    if (normalized.length === 3) {
      normalized = normalized.split("").map((char) => char + char).join("");
    }
    const hexInt = parseInt(normalized, 16);
    return [(hexInt >> 16) & 255, (hexInt >> 8) & 255, hexInt & 255];
  };

  const rgb = hexToRgb(color);

  const circleParams = useCallback((): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    return {
      x,
      y,
      translateX: 0,
      translateY: 0,
      size: Math.floor(Math.random() * 2) + size,
      alpha: 0,
      targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
      dx: (Math.random() - 0.5) * 0.1,
      dy: (Math.random() - 0.5) * 0.1,
      magnetism: 0.1 + Math.random() * 4,
    };
  }, [size]);

  const resizeCanvas = useCallback(() => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current = [];
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr.current;
      canvasRef.current.height = canvasSize.current.h * dpr.current;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.setTransform(dpr.current, 0, 0, dpr.current, 0, 0);

      for (let i = 0; i < quantity; i++) {
        circles.current.push(circleParams());
      }
    }
  }, [quantity, circleParams]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    dpr.current = window.devicePixelRatio || 1;

    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }

    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        mouse.current.x = e.clientX - rect.left - canvasSize.current.w / 2;
        mouse.current.y = e.clientY - rect.top - canvasSize.current.h / 2;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resizeCanvas);

    let animationFrame: number;
    const animate = () => {
      if (context.current) {
        context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
        circles.current.forEach((circle) => {
          // Movimento e Magnetismo
          circle.x += circle.dx + vx;
          circle.y += circle.dy + vy;
          circle.translateX += (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
          circle.translateY += (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;

          // Fade in suave
          if (circle.alpha < circle.targetAlpha) circle.alpha += 0.01;

          // Desenho
          context.current!.translate(circle.translateX, circle.translateY);
          context.current!.beginPath();
          context.current!.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
          context.current!.fillStyle = `rgba(${rgb.join(", ")}, ${circle.alpha})`;
          context.current!.fill();
          context.current!.setTransform(dpr.current, 0, 0, dpr.current, 0, 0);

          // Reset de posição (fora da tela)
          if (circle.x < -circle.size || circle.x > canvasSize.current.w + circle.size ||
              circle.y < -circle.size || circle.y > canvasSize.current.h + circle.size) {
            Object.assign(circle, circleParams());
          }
        });
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, [resizeCanvas, vx, vy, staticity, ease, rgb, circleParams]);

  return (
    <div 
      ref={canvasContainerRef} 
      className={cn("pointer-events-none fixed inset-0 -z-10 h-full w-full", className)}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};