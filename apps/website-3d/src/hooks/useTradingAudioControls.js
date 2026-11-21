import { useControls, folder } from "leva";

export function useTradingAudioControls() {
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
    "Trading Audio",
    {
      "Audio Properties": folder(
        {
          volume: {
            value: 2.0,
            min: 0,
            max: 3,
            step: 0.1,
            label: "Volume",
          },
          refDistance: {
            value: 20,
            min: 1,
            max: 100,
            step: 1,
            label: "Reference Distance",
          },
          maxDistance: {
            value: 55,
            min: 10,
            max: 200,
            step: 5,
            label: "Max Distance",
          },
          rolloffFactor: {
            value: 20,
            min: 0.1,
            max: 40,
            step: 0.1,
            label: "Rolloff Factor",
          },
        },
        { collapsed: true }
      ),
      "Position": folder(
        {
          positionX: {
            value: -345,
            min: -500,
            max: 500,
            step: 0.1,
            label: "X Position",
          },
          positionY: {
            value: 52,
            min: -100,
            max: 100,
            step: 0.1,
            label: "Y Position",
          },
          positionZ: {
            value: 139.5,
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