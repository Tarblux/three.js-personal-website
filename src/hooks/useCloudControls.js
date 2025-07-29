import { useControls, folder } from "leva";

export function useCloudControls() {
  const {
    enabled,
    seed,
    segments,
    volume,
    opacity,
    fade,
    growth,
    speed,
    x,
    y,
    z,
    range,
    color,
    positionX,
    positionY,
    positionZ,
    scaleMultiplier,
    rotationSpeed,
  } = useControls(
    "Clouds",
    {
      enabled: { value: true },
      "Cloud Properties": folder(
        {
          seed: { value: 35, min: 1, max: 100, step: 1 },
          segments: { value: 80, min: 1, max: 200, step: 1 },
          volume: { value: 12, min: 0, max: 100, step: 0.1 },
          opacity: { value: 1, min: 0, max: 1, step: 0.01 },
          fade: { value: 232, min: 0, max: 400, step: 1 },
          growth: { value: 20, min: 0, max: 20, step: 1 },
          speed: { value: 0.01, min: 0, max: 1, step: 0.01 },
          color: "white",
        },
        { collapsed: true }
      ),
      "Cloud Distribution": folder(
        {
          x: { value: 81, min: 0, max: 500, step: 1 },
          y: { value: 6, min: 0, max: 100, step: 1 },
          z: { value: 147, min: 0, max: 500, step: 1 },
          range: { value: 440, min: 50, max: 1000, step: 10 },
        },
        { collapsed: true }
      ),
      "Position & Scale": folder(
        {
          positionX: { value: -306, min: -500, max: 500, step: 1 },
          positionY: { value: 400, min: -100, max: 500, step: 1 },
          positionZ: { value: -1220, min: -2000, max: 2000, step: 1 },
          scaleMultiplier: { value: 15, min: 1, max: 50, step: 0.1 },
          rotationSpeed: { value: 0.11, min: 0, max: 5, step: 0.01 },
        },
        { collapsed: true }
      ),
    },
    { collapsed: true }
  );

  return {
    enabled,
    seed,
    segments,
    volume,
    opacity,
    fade,
    growth,
    speed,
    x,
    y,
    z,
    range,
    color,
    positionX,
    positionY,
    positionZ,
    scaleMultiplier,
    rotationSpeed,
  };
} 