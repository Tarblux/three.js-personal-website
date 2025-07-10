import { useControls, folder } from "leva";

export function useSmokeControls() {
  const {
    enabled,
    puffCount,
    segments,
    volume,
    opacity,
    fade,
    riseSpeed,
    resetHeight,
    bounds,
    color,
    positionX,
    positionY,
    positionZ,
    scaleMultiplier,
    driftAmount,
    puffOffset,
  } = useControls(
    "Train Smoke",
    {
      enabled: { value: true },
      "Smoke Properties": folder(
        {
          puffCount: { value: 5, min: 1, max: 8, step: 1 },
          segments: { value: 18, min: 5, max: 40, step: 1 },
          volume: { value: 4, min: 0, max: 20, step: 0.1 },
          opacity: { value: 1, min: 0, max: 1, step: 0.01 },
          fade: { value: 150, min: 50, max: 500, step: 10 },
          riseSpeed: { value: 0.5, min: 0, max: 3, step: 0.1 },
          resetHeight: { value: 6, min: 2, max: 15, step: 0.5 },
          bounds: { value: [1.2, 3, 1.2], min: 0.1, max: 5, step: 0.1 },
          color: "#f0f0f0",
          driftAmount: { value: 0.02, min: 0, max: 0.1, step: 0.001 },
          puffOffset: { value: 1.5, min: 0.5, max: 3, step: 0.1 },
        },
        { collapsed: true }
      ),
      "Position & Scale": folder(
        {
          positionX: { value: -302, min: -1000, max: 1000, step: 0.01 },
          positionY: { value: -1.5, min: -2, max: 5, step: 0.01 },
          positionZ: { value: 128, min: -1000, max: 1000, step: 0.01 },
          scaleMultiplier: { value: 10, min: 10, max: 200, step: 1 },
        },
        { collapsed: true }
      ),
    },
    { collapsed: true }
  );

  return {
    puffCount,
    segments,
    volume,
    opacity,
    fade,
    riseSpeed,
    resetHeight,
    bounds,
    color,
    positionX,
    positionY,
    positionZ,
    scaleMultiplier,
    driftAmount,
    puffOffset,
    enabled,
  };
} 