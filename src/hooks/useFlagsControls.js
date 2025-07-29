import { useControls, folder } from "leva";

export function useFlagsControls() {
  const {
    scale,
    flagWidth,
    flagHeight,
    globalHorizontal,
    globalVertical,
    globalWaveHeight,
    globalSpeed,
    flagSpacing,
    // Group 1 position controls
    group1X,
    group1Y,
    group1Z,
    // Group 2 position controls
    group2X,
    group2Y,
    group2Z
  } = useControls(
    "Flags",
    {
      "Group 1 Position (BR, JA, MX)": folder(
        {
          group1X: {
            value: -443,
            min: -1000,
            max: 1000,
            step: 0.1,
          },
          group1Y: {
            value: 22,
            min: -1000,
            max: 1000,
            step: 0.1,
          },
          group1Z: {
            value: 214,
            min: -1000,
            max: 1000,
            step: 0.1,
          }
        },
        { collapsed: true }
      ),
      "Group 2 Position (KR, GR, FR)": folder(
        {
          group2X: {
            value: -443,
            min: -1000,
            max: 1000,
            step: 0.1,
          },
          group2Y: {
            value: 22,
            min: -1000,
            max: 1000,
            step: 0.1,
          },
          group2Z: {
            value: 188,
            min: -1000,
            max: 1000,
            step: 0.1,
          }
        },
        { collapsed: true }
      ),
      "Global Settings": folder(
        {
          scale: {
            value: 0.5,
            min: 0.1,
            max: 3,
            step: 0.1,
          }
        },
        { collapsed: true }
      ),
             "Flag Dimensions": folder(
         {
           flagWidth: {
             value: 5,
             min: 1,
             max: 6,
             step: 0.1,
           },
           flagHeight: {
             value: 3,
             min: 1,
             max: 4,
             step: 0.1,
           },
           flagSpacing: {
             value: 7,
             min: 2,
             max: 10,
             step: 0.1,
           }
         },
         { collapsed: true }
       ),
      "Animation": folder(
        {
          globalHorizontal: {
            value: 0.3,
            min: 0,
            max: 2,
            step: 0.1,
          },
          globalVertical: {
            value: 0.2,
            min: 0,
            max: 1,
            step: 0.1,
          },
          globalWaveHeight: {
            value: 0.1,
            min: 0,
            max: 0.5,
            step: 0.01,
          },
          globalSpeed: {
            value: 2,
            min: 0,
            max: 5,
            step: 0.1,
          }
        },
        { collapsed: true }
      )
    },
    { collapsed: true }
  );

  return {
    scale,
    flagDimensions: [flagWidth, flagHeight],
    animationParams: {
      horizontal: globalHorizontal,
      vertical: globalVertical,
      waveHeight: globalWaveHeight,
      speed: globalSpeed
    },
    flagSpacing,
    group1Position: [group1X, group1Y, group1Z],
    group2Position: [group2X, group2Y, group2Z]
  };
} 