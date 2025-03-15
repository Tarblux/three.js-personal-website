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
import { ProjectLabs } from './components-3d/ProjectLabs.jsx'
import { LandscapeProps} from './components-3d/LandscapeProps.jsx'
import { Campus } from './components-3d/Campus.jsx'
import { LanguageInstitute } from "./components-3d/LanguageInstitute.jsx"
import { Downtown } from "./components-3d/Downtown.jsx"
import { Recreation } from "./components-3d/Recreation.jsx"
import { ContactTower} from "./components-3d/ContactTower.jsx"

import Section from "./helpers/Section.jsx"
import Introduction from "./components/Introduction/Introduction.jsx"
import Career from "./components/Career/Career.jsx"
import ProjectsOverview from "./components/Projects/ProjectsOverview.jsx"
import ProjectsWarehouse from "./components/Projects/ProjectsWarehouse.jsx"
import ProjectsConstruction from "./components/Projects/ProjectsConstruction.jsx"
import ProjectsPower from "./components/Projects/ProjectsPower.jsx"
import Education from "./components/Education/Education.jsx"
import EducationMajors from "./components/Education/EducationMajors.jsx"
import EducationMinors from "./components/Education/EducationMinors.jsx"
import EducationYonsei from "./components/Education/EducationYonsei.jsx"
import Languages from "./components/Languages/Languages.jsx"
import LanguagesMain from "./components/Languages/LanguagesMain.jsx"
import LanguagesBasic from "./components/Languages/LanguagesBasic.jsx"
import FootballWatch from "./components/Hobbies/FootballWatch.jsx"
import FootballPlay from "./components/Hobbies/FootballPlay.jsx"
import Chess from "./components/Hobbies/Chess.jsx"
import Kombucha from "./components/Hobbies/Kombucha.jsx"
import Contact from "./components/Contact/Contact.jsx"
import WelcomeMessage from "./components/UI/WelcomeMessage.jsx"

export default function Experience({ disableScroll, setDisableScroll, autoPlay, setAutoPlay , onScrollProgress }) {
  const sheet = getProject("Main Frame", { state: CameraPath }).sheet("Scene")
  const [showWelcome, setShowWelcome] = useState(false)

  // Show welcome message when autoplay is complete or skipped
  useEffect(() => {
    if (!autoPlay && !disableScroll) {
      setShowWelcome(true)
    }
  }, [autoPlay, disableScroll])

  return (
    <>
      <ScrollControls 
        pages={15} 
        distance={2}
        damping={0.2}
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

          <WelcomeMessage showMessage={showWelcome} />
          
          <Section 
            top="-20vh"
            fadeInStart={0}
            fadeInEnd={30}
            fadeOutStart={60}
            fadeOutEnd={75}
          >
            <Introduction />
          </Section>

          <Section 
            top="60vh"
            fadeInStart={100}
            fadeInEnd={120}
            fadeOutStart={150}
            fadeOutEnd={180}
          >
            <Career />
          </Section>

          <Section 
            top="230vh"
            fadeInStart={280}
            fadeInEnd={300}
            fadeOutStart={330}
            fadeOutEnd={345}
          >
            <ProjectsOverview />
          </Section>

          <Section 
            top="300vh"
            fadeInStart={350}
            fadeInEnd={380}
            fadeOutStart={400}
            fadeOutEnd={415}
          >
            <ProjectsWarehouse />
          </Section>

          <Section 
            top="360vh"
            fadeInStart={440}
            fadeInEnd={450}
            fadeOutStart={470}
            fadeOutEnd={475}
          >
            <ProjectsConstruction />
          </Section>

          <Section 
            top="440vh"
            fadeInStart={480}
            fadeInEnd={500}
            fadeOutStart={520}
            fadeOutEnd={545}
          >
            <ProjectsPower />
          </Section>

          <Section 
            top="480vh"
            fadeInStart={550}
            fadeInEnd={570}
            fadeOutStart={590}
            fadeOutEnd={610}
          >
            <Education />
          </Section>

          <Section 
            top="520vh"
            fadeInStart={600}
            fadeInEnd={620}
            fadeOutStart={630}
            fadeOutEnd={640}
          >
            <EducationMajors />
          </Section>

          <Section 
            top="540vh"
            fadeInStart={645}
            fadeInEnd={640}
            fadeOutStart={660}
            fadeOutEnd={670}
          >
            <EducationMinors />
          </Section>
          
          <Section 
            top="600vh"
            fadeInStart={700}
            fadeInEnd={720}
            fadeOutStart={725}
            fadeOutEnd={730}
          >
            <EducationYonsei />
          </Section>

          <Section 
            top="660vh"
            fadeInStart={750}
            fadeInEnd={760}
            fadeOutStart={770}
            fadeOutEnd={780}
          >
            <Languages />
          </Section>

          <Section 
            top="720vh"
            fadeInStart={800}
            fadeInEnd={810}
            fadeOutStart={830}
            fadeOutEnd={840}
          >
            <LanguagesMain />
          </Section>

          <Section 
            top="760vh"
            fadeInStart={860}
            fadeInEnd={865}
            fadeOutStart={880}
            fadeOutEnd={890}
          >
            <LanguagesBasic />
          </Section>

          <Section 
            top="820vh"
            fadeInStart={910}
            fadeInEnd={930}
            fadeOutStart={950}
            fadeOutEnd={960}
          >
            <FootballWatch />
          </Section>

          <Section 
            top="940vh"
            fadeInStart={1050}
            fadeInEnd={1060}
            fadeOutStart={1070}
            fadeOutEnd={1080}
          >
            <FootballPlay />
          </Section>

          <Section 
            top="1000vh"
            fadeInStart={1100}
            fadeInEnd={1120}
            fadeOutStart={1140}
            fadeOutEnd={1150}
          >
            <Chess />
          </Section>

          <Section 
            top="1060vh"
            fadeInStart={1198}
            fadeInEnd={1210}
            fadeOutStart={1220}
            fadeOutEnd={1225}
          >
            <Kombucha />
          </Section>

          <Section 
            top="1200vh"
            fadeInStart={1330}
            fadeInEnd={1335}
            fadeOutStart={1347}
            fadeOutEnd={1355}
          >
            <Contact />
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
        (mouse.x * 1.25 - cameraRig.current.position.x) * 0.05;
      cameraRig.current.position.y +=
        (mouse.y * 0.625 - cameraRig.current.position.y) * 0.05;
    }
  });

  return (
    <>
      <Sky turbidity={turbidity} rayleigh={rayleigh} mieCoefficient={mieC} mieDirectionalG={mieD} sunPosition={sunPosition} distance={distance}/>
      <Landscape castShadow receiveShadow />
      <ProjectLabs castShadow receiveShadow />
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