import { Canvas, useFrame } from "@react-three/fiber"
import { Gltf, ScrollControls, useScroll, Sky, OrbitControls } from "@react-three/drei"
import { getProject, val } from "@theatre/core"
import { Leva, useControls } from "leva"
import { Perf } from "r3f-perf"

import { SheetProvider, PerspectiveCamera, useCurrentSheet, } from "@theatre/r3f"
import CameraPath from "./cameraPath.json"


import { Landscape } from './components/Landscape.jsx'
import { Projexts } from './components/Projexts.jsx'
import { LandscapeProps} from './components/LandscapeProps.jsx'
import { Campus } from './components/Campus.jsx'
import { LanguageInstitute } from "./components/LanguageInstitute.jsx"
import { Downtown } from "./components/Downtown.jsx"
import { Recreation } from "./components/Recreation.jsx"
import { Contact} from "./components/Contact.jsx"

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
      <Landscape castShadow receiveShadow />
      <Projexts castShadow receiveShadow />
      <LandscapeProps castShadow receiveShadow />
      <Campus castShadow receiveShadow />
      <LanguageInstitute castShadow receiveShadow />
      <Downtown castShadow receiveShadow />
      <Recreation castShadow receiveShadow />
      <Contact castShadow receiveShadow />
      <PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0, 0]} fov={90} near={0.1} far={70}/>
      <OrbitControls />
    </>
  );
}