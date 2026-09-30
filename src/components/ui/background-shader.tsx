"use client";

import * as React from "react";
import dynamic from "next/dynamic";

// Dynamically import MeshGradient to guarantee client-only execution with zero SSR canvas errors
const DynamicMeshGradient = dynamic(
  () =>
    import("@paper-design/shaders-react").then((mod) => mod.MeshGradient),
  {
    ssr: false,
    loading: () => (
      <div
        className="absolute inset-0 w-full h-full bg-[#0A2540]"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, #0284C7 0%, #0A2540 50%, #041222 100%)",
        }}
      />
    ),
  }
);

export interface BackgroundShaderProps {
  colors?: string[];
  speed?: number;
  distortion?: number;
  swirl?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function BackgroundShader({
  colors = ["#041222", "#0A2540", "#0284C7", "#1E40AF", "#38BDF8"],
  speed = 0.35,
  distortion = 0.8,
  swirl = 0.6,
  className,
  style,
}: BackgroundShaderProps) {
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className ?? ""}`}
      style={style}
    >
      {mounted ? (
        <DynamicMeshGradient
          colors={colors}
          speed={speed}
          distortion={distortion}
          swirl={swirl}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
      ) : (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, #0284C7 0%, #0A2540 50%, #041222 100%)",
          }}
        />
      )}
    </div>
  );
}

export default BackgroundShader;
