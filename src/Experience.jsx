import { Canvas, useFrame } from "@react-three/fiber"
import { Gltf, ScrollControls, useScroll } from "@react-three/drei"
import { getProject, val } from "@theatre/core"
import {Leva , useControls} from "leva"
import {Perf} from "r3f-perf"

import {SheetProvider,PerspectiveCamera,useCurrentSheet,} from "@theatre/r3f"
import CameraPath from "./cameraPath.json"

export default function Experience() {
  const sheet = getProject("Main Frame", { state: CameraPath }).sheet("Scene")

  return (
      <>
          <ScrollControls pages={5}>
              <SheetProvider sheet={sheet}>
                  <Scene />
              </SheetProvider>
          </ScrollControls>
          <Perf position="top-left" />
      </>
  );
}
function Scene() {
    const sheet = useCurrentSheet();
    const scroll = useScroll();
  
    // our callback will run on every animation frame
    useFrame(() => {
      // the length of our sequence
      const sequenceLength = val(sheet.sequence.pointer.length);
      // update the "position" of the playhead in the sequence, as a fraction of its whole length
      sheet.sequence.position = scroll.offset * sequenceLength;
    });
  
    const bgColor = "#84a4f4";
  
    return (
      <>
        <color attach="background" args={[bgColor]} />
        <fog attach="fog" color={bgColor} near={-4} far={10} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-5, 5, -5]} intensity={1.5} />
        <Gltf src="/models/storybook.gltf" castShadow receiveShadow />
        <PerspectiveCamera
          theatreKey="Camera"
          makeDefault
          position={[0, 0, 0]}
          fov={90}
          near={0.1}
          far={70}
        />
      </>
    );
  }