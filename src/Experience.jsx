import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { ScrollControls, useScroll, Scroll, Sky, OrbitControls} from "@react-three/drei"
import { getProject, val } from "@theatre/core"
import { useControls } from "leva"
import { Perf } from "r3f-perf"
import { SheetProvider, PerspectiveCamera, useCurrentSheet} from "@theatre/r3f"

import { useSkyControls } from "./hooks/useSkyControls.js"
import CameraPath from "./Main Frame.theatre-project-state.json"
import { Landscape } from './components-3d/Landscape.jsx'
import { Projects } from './components-3d/Projects.jsx'
import { LandscapeProps} from './components-3d/LandscapeProps.jsx'
import { Campus } from './components-3d/Campus.jsx'
import { LanguageInstitute } from "./components-3d/LanguageInstitute.jsx"
import { Downtown } from "./components-3d/Downtown.jsx"
import { Recreation } from "./components-3d/Recreation.jsx"
import { ContactTower} from "./components-3d/ContactTower.jsx"

import Section from "./helpers/Section.jsx"
import ProjectsCard from "./components/ProjectsCard.jsx"
import WelcomeCard from "./components/WelcomeCard.jsx"
import Career from "./components/Career.jsx"
import Education from "./components/Education.jsx"
import Languages from "./components/Languages.jsx"
import Hobbies from "./components/Hobbies.jsx"
import Contact from "./components/Contact.jsx"

export default function Experience({ disableScroll, setDisableScroll, autoPlay, setAutoPlay , onScrollProgress }) {
  const sheet = getProject("Main Frame", { state: CameraPath }).sheet("Scene")

  return (
    <>
      <ScrollControls 
        pages={15} 
        distance={1}
        enabled={!disableScroll}
      >
        <SheetProvider sheet={sheet}>
          <Scene
            disableScroll={disableScroll}
            setDisableScroll={setDisableScroll}
            autoPlay={autoPlay}
            setAutoPlay={setAutoPlay}
            onScrollProgress = {onScrollProgress}
          />
        </SheetProvider>
        <Scroll html style={{ width: "100vw", height: "100vh" }}>
          
          
          <Section top="-80vh">
            <WelcomeCard />
          </Section>

          <Section top="100vh">
            {/* <Career /> */}
          </Section>

          <Section top="300vh">
            {/* <ProjectsCard /> */}
          </Section>

          <Section top="500vh">
            {/* <Education /> */}
          </Section>

          <Section top="700vh">
            {/* <Languages /> */}
          </Section>

          <Section top="900vh">
            {/* <Hobbies /> */}
          </Section>

          <Section top="950vh">
            {/* <Contact /> */}
          </Section>


        </Scroll>
      </ScrollControls>
      {/* <Perf position="bottom-right" /> */}
    </>
  );
}

function Scene({ disableScroll, setDisableScroll, autoPlay, setAutoPlay, onScrollProgress }) {
  // -------------------------------Debug controls --------------------------------

  // Sky

  const { turbidity, rayleigh, mieC, mieD, sunPosition, distance } = useSkyControls()


  // ------------------------------- ↑ Debug controls  ↑ --------------------------------

  const sheet = useCurrentSheet();
  const scroll = useScroll();
  const cameraRig = useRef();
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

  useEffect(() => {
    sheet.sequence.position = 0;
  }, [sheet]);

  useFrame((state, delta) => {
    const sequenceLength = val(sheet.sequence.pointer.length);

    if (autoPlay) {
      // Auto-play branch: increment sequence position over 30 seconds.
      sheet.sequence.position += delta;
      if (sheet.sequence.position >= 30) {
        sheet.sequence.position = 30;
        // Auto-play is complete—enable scrolling.
        setAutoPlay(false);
        setDisableScroll(false);
      }
    } else if (!autoPlay && !disableScroll) {
      // When autoPlay becomes false (either from completion or skip),
      // ensure we're at position 30
      if (sheet.sequence.position < 30) {
        sheet.sequence.position = 30;
      }
      
      // Scroll branch: ensure the user cannot scroll back below 30.
      const minPosition = 30;
      const maxPosition = sequenceLength;
      const newPos = minPosition + scroll.offset * (maxPosition - minPosition);
      sheet.sequence.position = Math.max(newPos, minPosition);
    }

    if (onScrollProgress) {
      onScrollProgress(scroll.offset)
    }

    if (cameraRig.current) {
      cameraRig.current.position.x +=
        (mouse.x * 2.5 - cameraRig.current.position.x) * 0.05;
      cameraRig.current.position.y +=
        (mouse.y * 1.25 - cameraRig.current.position.y) * 0.05;
    }
  });

  return (
    <>
      <Sky turbidity={turbidity} rayleigh={rayleigh} mieCoefficient={mieC} mieDirectionalG={mieD} sunPosition={sunPosition} distance={distance}/>
      <Landscape castShadow receiveShadow />
      <Projects castShadow receiveShadow />
      <LandscapeProps castShadow receiveShadow />
      <Campus castShadow receiveShadow />
      <LanguageInstitute castShadow receiveShadow />
      <Downtown castShadow receiveShadow />
      <Recreation castShadow receiveShadow />
      <ContactTower castShadow receiveShadow />

      <group ref={cameraRig}>
        <PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0, 0]} fov={45} near={10} far={5000} />
      </group>

      {/* <OrbitControls /> */}
    </>
  );
}