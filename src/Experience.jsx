import { Canvas, useFrame } from "@react-three/fiber"
import { Gltf, ScrollControls, useScroll, Sky, OrbitControls } from "@react-three/drei"
import { getProject, val } from "@theatre/core"
import { Leva, useControls } from "leva"
import { Perf } from "r3f-perf"

import { SheetProvider, PerspectiveCamera, useCurrentSheet, } from "@theatre/r3f"
import CameraPath from "./cameraPath.json"


import { Landscape } from './components/Landscape.jsx'

export default function Experience() {
  const sheet = getProject("Main Frame", { state: CameraPath }).sheet("Scene")

  return (
    <>
      <ScrollControls pages={5}>
        <SheetProvider sheet={sheet}>
          <Scene />
        </SheetProvider>
      </ScrollControls>
      <Perf position="bottom-right" />
    </>
  );
}

function Scene() {
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  // Debug controls
  const { sunPosition } = useControls({
    sunPosition: {
      value: [10, 20, 25],
      step: 1,
      min: 0,
      max: 100
    }
  });

  useFrame(() => {
    // the length of our sequence
    const sequenceLength = val(sheet.sequence.pointer.length);
    // update the "position" of the playhead in the sequence, as a fraction of its whole length
    sheet.sequence.position = scroll.offset * sequenceLength;
  });

  return (
    <>
      <Sky sunPosition={sunPosition} />
      <ambientLight intensity={1} />
      <directionalLight position={[-5, 5, -5]} intensity={2.5} />
      <Landscape castShadow receiveShadow />
      <PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0, 0]} fov={90} near={0.1} far={70}/>
      <OrbitControls />
    </>
  );
}