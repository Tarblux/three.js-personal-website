import { useControls, folder } from "leva";

export function useFactorySmokeControls() {
  const {
    enabled,
    stackCount,
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
    fadeStrength,
    expansion,
    stackSpacing,
  } = useControls(
    "Factory Smoke",
    {
      enabled: { value: true },
      "Stack Configuration": folder(
        {
          stackCount: { value: 3, min: 1, max: 5, step: 1 },
          stackSpacing: { value: 5, min: 1, max: 20, step: 1 },
        },
        { collapsed: false }
      ),
      "Smoke Properties": folder(
        {
          puffCount: { value: 4, min: 1, max: 8, step: 1 },
          segments: { value: 18, min: 5, max: 40, step: 1 },
          volume: { value: 3.9, min: 0, max: 20, step: 0.1 },
          opacity: { value: 1, min: 0, max: 1, step: 0.01 },
          fade: { value: 150, min: 50, max: 500, step: 10 },
          riseSpeed: { value: 2.5, min: 0, max: 5, step: 0.1 },
          resetHeight: { value: 20, min: 5, max: 30, step: 0.5 },
          bounds: { value: [0.1, 4, 1.2], min: 0.1, max: 5, step: 0.1 },
          color: "#FDFDFD",
          driftAmount: { value: 0.03, min: 0, max: 0.1, step: 0.001 },
          puffOffset: { value: 1.5, min: 0.5, max: 3, step: 0.1 },
          fadeStrength: { value: 0.8, min: 0, max: 1, step: 0.01 },
          expansion: { value: 1.2, min: 0.5, max: 3, step: 0.1 },
        },
        { collapsed: true }
      ),
      "Position & Scale": folder(
        {
          positionX: { value: -206, min: -1000, max: 1000, step: 0.01 },
          positionY: { value: 58, min: 50, max: 200, step: 0.01 },
          positionZ: { value: 53.75, min: -1000, max: 1000, step: 0.01 },
          scaleMultiplier: { value: 1, min: 0.5, max: 10, step: 0.1 },
        },
        { collapsed: true }
      ),
    },
    { collapsed: true }
  );

  return {
    enabled,
    stackCount,
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
    fadeStrength,
    expansion,
    stackSpacing,
  };
} 