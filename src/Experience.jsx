import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber"
import { ScrollControls, useScroll, Sky, OrbitControls } from "@react-three/drei"
import { getProject, val } from "@theatre/core"
import { Leva, useControls } from "leva"
import { Perf } from "r3f-perf"
import { SheetProvider, PerspectiveCamera, useCurrentSheet, } from "@theatre/r3f"

import CameraPath from "./Main Frame.theatre-project-state.json"
import { Landscape } from './components-3d/Landscape.jsx'
import { Projects } from './components-3d/Projects.jsx'
import { LandscapeProps} from './components-3d/LandscapeProps.jsx'
import { Campus } from './components-3d/Campus.jsx'
import { LanguageInstitute } from "./components-3d/LanguageInstitute.jsx"
import { Downtown } from "./components-3d/Downtown.jsx"
import { Recreation } from "./components-3d/Recreation.jsx"
import { Contact} from "./components-3d/Contact.jsx"


export default function Experience() {
  
  const sheet = getProject("Main Frame", { state: CameraPath }).sheet("Scene")

  return (
    <>
      <ScrollControls pages={5}>
        <SheetProvider sheet={sheet}>
          <Scene />
        </SheetProvider>
      </ScrollControls>
      {/* <Perf position="bottom-right" /> */}

    </>
  );
}

function Scene() {

  const sheet = useCurrentSheet();
  const scroll = useScroll();
  const cameraRig = useRef();

  // Debug controls
  const { sunPosition } = useControls({
    sunPosition: {
      value: [10, 20, 25],
      step: 1,
      min: 0,
      max: 100
    }
  });

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: (event.clientY / window.innerHeight - 0.5) * -2,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    // the length of our sequence
    const sequenceLength = val(sheet.sequence.pointer.length);
    // update the "position" of the playhead in the sequence, as a fraction of its whole length
    sheet.sequence.position = scroll.offset * sequenceLength;

    if (cameraRig.current) {
      cameraRig.current.position.x += (mouse.x * 5 - cameraRig.current.position.x) * 0.05;
      cameraRig.current.position.y += (mouse.y * 2.5 - cameraRig.current.position.y) * 0.05;
    }
  });

  return (
    <>
      <Sky sunPosition={sunPosition} />
      <Landscape castShadow receiveShadow />
      <Projects castShadow receiveShadow />
      <LandscapeProps castShadow receiveShadow />
      <Campus castShadow receiveShadow />
      <LanguageInstitute castShadow receiveShadow />
      <Downtown castShadow receiveShadow />
      <Recreation castShadow receiveShadow />
      <Contact castShadow receiveShadow />

      <group ref={cameraRig}>
        <PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0, 0]} fov={45} near={10} far={2000} />
      </group>

      {/* <OrbitControls /> */}
    </>
  );
}