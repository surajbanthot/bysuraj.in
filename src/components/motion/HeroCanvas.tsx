"use client";

import { useEffect, useRef } from "react";
import { palette } from "@/lib/palette";

// A single full-screen shader on plain WebGL2 — no 3D library needed for one
// quad, which keeps this chunk a few KB instead of ~900 KB.

const vertex = /* glsl */ `#version 300 es
  in vec2 position;
  out vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// Darkroom tray: slow domain-warped "developer fluid", a drifting safelight
// leak, a glow that follows the pointer, vignette and animated grain.
const fragment = /* glsl */ `#version 300 es
  precision highp float;
  in vec2 vUv;
  out vec4 outColor;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uRes;
  uniform vec3 uPaper;
  uniform vec3 uRaised;
  uniform vec3 uAccent;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
               mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uRes.x / uRes.y, 1.0);
    vec2 p = uv * aspect;
    float t = uTime * 0.05;

    // Pointer pushes the fluid around.
    vec2 m = uMouse * aspect;
    float md = distance(p, m);
    vec2 push = (p - m) * exp(-md * 3.0) * 0.35;

    vec2 q = vec2(fbm(p * 1.6 + t + push), fbm(p * 1.6 - t + 4.2));
    float fluid = fbm(p * 2.2 + q * 1.8 + push * 2.0);

    vec3 col = mix(uPaper, uRaised, smoothstep(0.35, 0.85, fluid));

    // Drifting safelight leak from the top-right corner.
    vec2 leakPos = vec2(1.05 + 0.12 * sin(uTime * 0.13), 0.95 + 0.08 * cos(uTime * 0.11)) * aspect;
    float leak = exp(-distance(p, leakPos) * 1.6) * (0.55 + 0.45 * fluid);
    col += uAccent * leak * 0.55;

    // Safelight glow under the pointer.
    col += uAccent * exp(-md * 6.0) * 0.18;

    // Vignette + grain.
    col *= 1.0 - 0.55 * pow(distance(uv, vec2(0.5)), 1.6);
    col += (hash(uv * uRes + fract(uTime) * 100.0) - 0.5) * 0.045;

    outColor = vec4(col, 1.0);
  }
`;

/** Token hex → linear RGB, matching how the shader mixes and outputs colour. */
const linear = (hex: string) =>
  [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];

type Gl = {
  gl: WebGL2RenderingContext;
  canvas: HTMLCanvasElement;
  uTime: WebGLUniformLocation | null;
  uMouse: WebGLUniformLocation | null;
  uRes: WebGLUniformLocation | null;
  time: number;
  mouse: [number, number];
  target: [number, number];
};

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

export default function HeroCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef<Gl | null>(null);

  // Set up the context, program and full-screen triangle once.
  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl2", { antialias: false, powerPreference: "low-power" });
    if (!canvas || !gl) return;

    const program = gl.createProgram()!;
    const vs = compile(gl, gl.VERTEX_SHADER, vertex);
    const fs = compile(gl, gl.FRAGMENT_SHADER, fragment);
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    gl.uniform3fv(gl.getUniformLocation(program, "uPaper"), linear(palette.paper));
    gl.uniform3fv(gl.getUniformLocation(program, "uRaised"), linear(palette.paperRaised));
    gl.uniform3fv(gl.getUniformLocation(program, "uAccent"), linear(palette.accent));

    const s: Gl = {
      gl,
      canvas,
      uTime: gl.getUniformLocation(program, "uTime"),
      uMouse: gl.getUniformLocation(program, "uMouse"),
      uRes: gl.getUniformLocation(program, "uRes"),
      time: 0,
      mouse: [0.7, 0.6],
      target: [0.7, 0.6],
    };
    state.current = s;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(s.uRes, canvas.width, canvas.height);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      s.target = [(e.clientX - rect.left) / rect.width, 1 - (e.clientY - rect.top) / rect.height];
    };
    window.addEventListener("pointermove", onPointer);

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onPointer);
      state.current = null;
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  // Render only while the hero is on screen.
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const s = state.current;
      if (s) {
        s.time += (now - last) / 1000;
        // Ease the glow toward the pointer.
        s.mouse = [s.mouse[0] + (s.target[0] - s.mouse[0]) * 0.05, s.mouse[1] + (s.target[1] - s.mouse[1]) * 0.05];
        s.gl.uniform1f(s.uTime, s.time);
        s.gl.uniform2f(s.uMouse, s.mouse[0], s.mouse[1]);
        s.gl.drawArrays(s.gl.TRIANGLES, 0, 3);
      }
      last = now;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full" />;
}
