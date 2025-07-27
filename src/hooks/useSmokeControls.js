import { useControls, folder } from "leva";

export function useSmokeControls() {
  const {
    enabled,
    manualOverride,
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
    // Color controls
    colorStart,
    colorEnd,
    // Debug controls
    showDebugInfo,
    logEmitterPosition,
    logParticleCount,
    showTimingInfo,
    // Timing controls
    startTime,
    endTime,
    residualEmission,
  } = useControls(
    "Train Smoke",
    {
      enabled: { value: true },
      manualOverride: { value: false, label: "Manual Override (Re-enable after autoplay)" },
      "Debug": folder(
        {
          showDebugInfo: { value: false, label: "Show Debug Info" },
          showTimingInfo: { value: true, label: "Show Timing Info" },
          logEmitterPosition: { value: false, label: "Log Emitter Position" },
          logParticleCount: { value: false, label: "Log Particle Count" },
        },
        { collapsed: true }
      ),
      "Timing": folder(
        {
          startTime: { value: 8, min: 0, max: 30, step: 0.5, label: "Start Emission (sec)" },
          endTime: { value: 23, min: 0, max: 30, step: 0.5, label: "End Emission (sec)" },
          residualEmission: { value: 0, min: 0, max: 0.5, step: 0.01, label: "Residual Rate %" },
        },
        { collapsed: false }
      ),
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
          emissionRate: { value: 55.0, min: 1, max: 100, step: 1 },
          maxParticles: { value: 1000, min: 100, max: 2000, step: 100 },
          maxLife: { value: 4.5, min: 0.5, max: 10, step: 0.1 },
          radius: { value: 0.3, min: 0.1, max: 2, step: 0.1 },
        },
        { collapsed: true }
      ),
        "Particle Size": folder(
        {
          maxSize: { value: 13, min: 0.5, max: 20, step: 0.5 },
          sizeStart: { value: 1.2, min: 0.1, max: 2, step: 0.1 },
          sizeEnd: { value: 3.2, min: 0.5, max: 5, step: 0.1 },
        },
        { collapsed: true }
      ),
      "Physics": folder(
        {
          velocityY: { value: 3.9, min: 0, max: 10, step: 0.1 },
          velocityVariation: { value: 0.5, min: 0, max: 2, step: 0.1 },
          dragStrength: { value: 0.4, min: 0, max: 1, step: 0.05 },
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
      "Color": folder(
        {
          colorStart: { value: "#bcbcbc", label: "Start Color" },
          colorEnd: { value: "#f0f0f0", label: "End Color" },
        },
        { collapsed: true }
      ),
    },
    { collapsed: false }
  );

  return {
    enabled,
    manualOverride,
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
    // Color controls
    colorStart,
    colorEnd,
    // Debug controls
    showDebugInfo,
    logEmitterPosition,
    logParticleCount,
    showTimingInfo,
    // Timing controls
    startTime,
    endTime,
    residualEmission,
  };
}
