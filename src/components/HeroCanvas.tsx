"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Color, Vector2, type ShaderMaterial } from "three";
import { palette } from "@/lib/palette";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Darkroom tray: slow domain-warped "developer fluid", a drifting safelight
// leak, a glow that follows the pointer, vignette and animated grain.
const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
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

    gl_FragColor = vec4(col, 1.0);
  }
`;

function FluidPlane() {
  const material = useRef<ShaderMaterial>(null);
  const target = useRef(new Vector2(0.7, 0.6));
  const { size, gl } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new Vector2(0.7, 0.6) },
      uRes: { value: new Vector2(1, 1) },
      uPaper: { value: new Color(palette.paper) },
      uRaised: { value: new Color(palette.paperRaised) },
      uAccent: { value: new Color(palette.accent) },
    }),
    [],
  );

  useFrame((state, delta) => {
    const u = material.current?.uniforms;
    if (!u) return;
    u.uTime.value += delta;
    // Pointer is normalised -1..1 by R3F; map to 0..1 uv space and ease toward it.
    target.current.set((state.pointer.x + 1) / 2, (state.pointer.y + 1) / 2);
    (u.uMouse.value as Vector2).lerp(target.current, 0.05);
    (u.uRes.value as Vector2).set(size.width * gl.getPixelRatio(), size.height * gl.getPixelRatio());
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function HeroCanvas({ active }: { active: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: false, powerPreference: "low-power" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
      aria-hidden="true"
    >
      <FluidPlane />
    </Canvas>
  );
}
