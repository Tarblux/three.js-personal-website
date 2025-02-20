import { useControls } from "leva";

export function useSkyControls() {

  const {
    turbidity,
    rayleigh,
    mieCoefficient,
    mieDirectionalG,
    inclination,
    azimuth,
    distance,
  } = useControls("Sky", {
    turbidity: {
      value: 2.0,
      min: 0,
      max: 20,
      step: 0.1,
    },
    rayleigh: {
      value: 1,
      min: 0,
      max: 10,
      step: 0.1,
    },
    mieCoefficient: {
      value: 0.005,
      min: 0,
      max: 0.1,
      step: 0.001,
    },
    mieDirectionalG: {
      value: 0.8,
      min: 0,
      max: 1,
      step: 0.01,
    },
    inclination: {
      value: 0.6,
      min: 0,
      max: 1,
      step: 0.01,
    },
    azimuth: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.01,
    },
    distance: {
      value: 2000,
      min: 1,
      max: 10000,
      step: 1,
    },
  });

  // Calculate sunPosition from inclination & azimuth
  function calcSunPosition(inclination, azimuth, distance) {
    // Convert inclination (0–1) to polar angle (-0.5π to 0.5π)
    const theta = Math.PI * (inclination - 0.5);
    // Convert azimuth (0–1) to azimuth angle (0 to 2π)
    const phi = 2 * Math.PI * (azimuth - 0.5);

    const x = distance * Math.cos(theta) * Math.cos(phi);
    const y = distance * Math.sin(theta);
    const z = distance * Math.cos(theta) * Math.sin(phi);

    return [x, y, z];
  }

  const sunPosition = calcSunPosition(inclination, azimuth, distance);


  return {
    turbidity,
    rayleigh,
    mieCoefficient,
    mieDirectionalG,
    sunPosition,
    distance,
  };
}