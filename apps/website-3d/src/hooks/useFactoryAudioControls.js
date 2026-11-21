import { useControls, folder } from "leva";

export function useFactoryAudioControls() {
  const {
    volume,
    refDistance,
    maxDistance,
    rolloffFactor,
    positionX,
    positionY,
    positionZ,
    showInfluenceArea,
    showCenterIndicator,
    influenceOpacity,
    debugLogging,
    showDebugHUD,
  } = useControls(
    "Factory Audio",
    {
      "Audio Properties": folder(
        {
          volume: {
            value: 2,
            min: 0,
            max: 3,
            step: 0.1,
            label: "Volume",
          },
          refDistance: {
            value: 7,
            min: 1,
            max: 100,
            step: 1,
            label: "Reference Distance",
          },
          maxDistance: {
            value: 35,
            min: 10,
            max: 200,
            step: 5,
            label: "Max Distance",
          },
          rolloffFactor: {
            value: 2,
            min: 0.1,
            max: 5,
            step: 0.1,
            label: "Rolloff Factor",
          },
        },
        { collapsed: true }
      ),
      "Position": folder(
        {
          positionX: {
            value: -238,
            min: -500,
            max: 500,
            step: 0.1,
            label: "X Position",
          },
          positionY: {
            value: 33,
            min: -100,
            max: 100,
            step: 0.1,
            label: "Y Position",
          },
          positionZ: {
            value: 53.4,
            min: -500,
            max: 500,
            step: 0.1,
            label: "Z Position",
          },
        },
        { collapsed: true }
      ),
      "Debug Visuals": folder(
        {
          showInfluenceArea: {
            value: false,
            label: "Show Audio Influence Area",
          },
          showCenterIndicator: {
            value: false,
            label: "Show Center Indicator",
          },
          influenceOpacity: {
            value: 0.1,
            min: 0,
            max: 0.5,
            step: 0.01,
            label: "Influence Area Opacity",
          },
          debugLogging: {
            value: false,
            label: "Enable Debug Logging",
          },
          showDebugHUD: {
            value: false,
            label: "Show Debug HUD",
          },
        },
        { collapsed: true }
      ),
    },
    { collapsed: true}
  );

  return {
    volume,
    refDistance,
    maxDistance,
    rolloffFactor,
    position: [positionX, positionY, positionZ],
    showInfluenceArea,
    showCenterIndicator,
    influenceOpacity,
    debugLogging,
    showDebugHUD,
  };
} 