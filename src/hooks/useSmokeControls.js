import { useControls, folder } from "leva";

export function useSmokeControls() {
  const {
    enabled,
    emissionRate,
    maxParticles,
    maxLife,
    maxSize,
    radius,
    positionX,
    positionY,
    positionZ,
    velocityY,
    velocityVariation,
    dragStrength,
    turbulence,
    alphaStart,
    alphaMax,
    alphaEnd,
    sizeStart,
    sizeEnd,
    rotationRate,
    scale,
  } = useControls(
    "Train Smoke",
    {
      enabled: { value: true },
      "Position": folder(
        {
          positionX: { value: -270.0, min: -300, max: 200, step: 0.1 },
          positionY: { value: 25, min: -5, max: 100, step: 0.1 },
          positionZ: { value: 149.0, min: -10, max: 200, step: 0.1 },
          scale: { value: 25, min: 0.1, max: 50, step: 0.1 },
        },
        { collapsed: false }
      ),
      "Emission": folder(
        {
          emissionRate: { value: 25.0, min: 1, max: 100, step: 1 },
          maxParticles: { value: 1000, min: 100, max: 2000, step: 100 },
          maxLife: { value: 2.5, min: 0.5, max: 10, step: 0.1 },
          radius: { value: 0.3, min: 0.1, max: 2, step: 0.1 },
        },
        { collapsed: true }
      ),
              "Particle Size": folder(
        {
          maxSize: { value: 19, min: 0.5, max: 20, step: 0.5 },
          sizeStart: { value: 1.2, min: 0.1, max: 2, step: 0.1 },
          sizeEnd: { value: 3.2, min: 0.5, max: 5, step: 0.1 },
        },
        { collapsed: true }
      ),
      "Physics": folder(
        {
          velocityY: { value: 2.2, min: 0, max: 5, step: 0.1 },
          velocityVariation: { value: 0.5, min: 0, max: 2, step: 0.1 },
          dragStrength: { value: 0.2, min: 0, max: 1, step: 0.05 },
          turbulence: { value: 0.1, min: 0, max: 0.5, step: 0.01 },
          rotationRate: { value: 0.02, min: 0, max: 0.1, step: 0.005 },
        },
        { collapsed: true }
      ),
      "Appearance": folder(
        {
          alphaStart: { value: 0.0, min: 0, max: 1, step: 0.1 },
          alphaMax: { value: 0.6, min: 0, max: 1, step: 0.1 },
          alphaEnd: { value: 0.0, min: 0, max: 1, step: 0.1 },
        },
        { collapsed: true }
      ),
    },
    { collapsed: false }
  );

  return {
    enabled,
    emissionRate,
    maxParticles,
    maxLife,
    maxSize,
    radius,
    positionX,
    positionY,
    positionZ,
    velocityY,
    velocityVariation,
    dragStrength,
    turbulence,
    alphaStart,
    alphaMax,
    alphaEnd,
    sizeStart,
    sizeEnd,
    rotationRate,
    scale,
  };
}
