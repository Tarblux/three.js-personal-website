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
          seed: { value: 1, min: 1, max: 100, step: 1 },
          segments: { value: 20, min: 1, max: 80, step: 1 },
          volume: { value: 6, min: 0, max: 100, step: 0.1 },
          opacity: { value: 0.8, min: 0, max: 1, step: 0.01 },
          fade: { value: 10, min: 0, max: 400, step: 1 },
          growth: { value: 4, min: 0, max: 20, step: 1 },
          speed: { value: 0.1, min: 0, max: 1, step: 0.01 },
          color: "white",
        },
        { collapsed: true }
      ),
      "Cloud Distribution": folder(
        {
          x: { value: 60, min: 0, max: 500, step: 1 },
          y: { value: 10, min: 0, max: 100, step: 1 },
          z: { value: 60, min: 0, max: 500, step: 1 },
          range: { value: 200, min: 50, max: 1000, step: 10 },
        },
        { collapsed: true }
      ),
      "Position & Scale": folder(
        {
          positionX: { value: 0, min: -500, max: 500, step: 1 },
          positionY: { value: 50, min: -100, max: 200, step: 1 },
          positionZ: { value: 0, min: -500, max: 500, step: 1 },
          scaleMultiplier: { value: 10, min: 1, max: 50, step: 0.1 },
          rotationSpeed: { value: 0.3, min: 0, max: 5, step: 0.01 },
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