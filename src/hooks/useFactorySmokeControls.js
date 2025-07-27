import { useControls, folder } from "leva";

export function useFactorySmokeControls() {
  const {
    enabled,
    stackCount,
    stackSpacing,
    positionX,
    positionY,
    positionZ,
    scale,
    emissionRate,
    maxParticles,
    maxLife,
    radius,
    maxSize,
    sizeStart,
    sizeEnd,
    velocityY,
    velocityVariation,
    dragStrength,
    turbulence,
    rotationRate,
    alphaStart,
    alphaMax,
    alphaEnd,
  } = useControls(
    "Factory Smoke",
    {
      enabled: { value: true },
      "Stack Configuration": folder(
        {
          stackCount: { value: 2, min: 1, max: 5, step: 1 },
          stackSpacing: { value: 5, min: 1, max: 20, step: 1 },
        },
        { collapsed: false }
      ),
      "Position": folder(
        {
          positionX: { value: -103, min: -1000, max: 1000, step: 0.1 },
          positionY: { value: 27, min: -5, max: 200, step: 0.1 },
          positionZ: { value: 27, min: -1000, max: 1000, step: 0.1 },
          scale: { value: 25, min: 0.1, max: 50, step: 0.1 },
        },
        { collapsed: true }
      ),
      "Emission": folder(
        {
          emissionRate: { value: 30.0, min: 1, max: 100, step: 1 },
          maxParticles: { value: 800, min: 100, max: 2000, step: 100 },
          maxLife: { value: 8.0, min: 0.5, max: 20, step: 0.1 },
          radius: { value: 0.4, min: 0.1, max: 2, step: 0.1 },
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
          velocityY: { value: 4, min: 0, max: 8, step: 0.1 },
          velocityVariation: { value: 0.6, min: 0, max: 2, step: 0.1 },
          dragStrength: { value: 0.15, min: 0, max: 1, step: 0.05 },
          turbulence: { value: 0.1, min: 0, max: 0.5, step: 0.01 },
          rotationRate: { value: 0.015, min: 0, max: 0.1, step: 0.005 },
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
    { collapsed: true }
  );

  return {
    enabled,
    stackCount,
    stackSpacing,
    positionX,
    positionY,
    positionZ,
    scale,
    emissionRate,
    maxParticles,
    maxLife,
    radius,
    maxSize,
    sizeStart,
    sizeEnd,
    velocityY,
    velocityVariation,
    dragStrength,
    turbulence,
    rotationRate,
    alphaStart,
    alphaMax,
    alphaEnd,
  };
} 