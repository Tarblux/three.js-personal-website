import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { ScrollControls, useScroll, Scroll, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { getProject, val } from "@theatre/core"
import { useControls, folder } from "leva"
import { Perf } from "r3f-perf"
import { SheetProvider, PerspectiveCamera as TheatrePerspectiveCamera, useCurrentSheet, editable as e} from "@theatre/r3f"

import CameraPath from "./Main Frame.theatre-project-state.json"
import { Landscape } from './components-3d/Landscape.jsx'
import { ProjectLabs } from './components-3d/ProjectLabs.jsx'
import { LandscapeProps} from './components-3d/LandscapeProps.jsx'
import { Campus } from './components-3d/Campus.jsx'
import { LanguageInstitute } from "./components-3d/LanguageInstitute.jsx"
import { Flags } from "./components-3d/Flags.jsx"
import { Downtown } from "./components-3d/Downtown.jsx"
import { Recreation } from "./components-3d/Recreation.jsx"
import { ContactTower} from "./components-3d/ContactTower.jsx"
import { Train } from "./components-3d/Train.jsx"
import { TrainWheel } from "./components-3d/TrainWheel.jsx"
import { Clouds } from './components-3d/Clouds.jsx'
import { TrainSmoke } from "./components-3d/TrainSmoke.jsx"
import { FactorySmoke } from "./components-3d/FactorySmoke.jsx"
import { DeferredFactoryAudio } from "./components-3d/DeferredFactoryAudio.jsx"
import { Sky } from './components-3d/Sky.jsx'

import Section from "./helpers/Section.jsx"
import WelcomeMessage from "./components/UI/WelcomeMessage.jsx"
import Introduction from "./components/Introduction/Introduction.jsx"
import Flextrade from "./components/Career/Flextrade.jsx"
import EagleMed from "./components/Career/EagleMed.jsx"
import ProjectsOverview from "./components/Projects/ProjectsOverview.jsx"
import ProjectsWarehouse from "./components/Projects/ProjectsWarehouse.jsx"
import ProjectsConstruction from "./components/Projects/ProjectsConstruction.jsx"
import Education from "./components/Education/EducationKzoo.jsx"
import CollegeJobs from "./components/Education/CollegeJobs.jsx"
import CollegeClubs from "./components/Education/CollegeClubs.jsx"
import EducationYonsei from "./components/Education/EducationYonsei.jsx"
import Languages from "./components/Languages/Languages.jsx"
import FootballWatch from "./components/Hobbies/FootballWatch.jsx"
import FootballMemories from "./components/Hobbies/FootballMemories.jsx"
import FootballPlay from "./components/Hobbies/FootballPlay.jsx"
import ChessPlay from "./components/Hobbies/ChessPlay.jsx"
import ChessDashboard from "./components/Hobbies/ChessDashboard.jsx"
import Kombucha from "./components/Hobbies/Kombucha.jsx"
import KombuchaMenu from "./components/Hobbies/KombuchaMenu.jsx"
import Contact from "./components/Contact/Contact.jsx"
import Credits from "./components/Contact/Credits.jsx"


export default function Experience({ disableScroll, setDisableScroll, autoPlay, setAutoPlay , onScrollProgress, onAudioDebugUpdate }) {
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
        {/* Add DeferredFactoryAudio outside of SheetProvider to avoid cloning issues */}
        <DeferredFactoryAudio 
          theatreSequence={sheet.sequence} 
          onDebugUpdate={onAudioDebugUpdate}
        />
        <Scroll html style={{ width: "100vw", height: "100vh" }}>

          <Section 
            top="5vh"
            fadeInStart={-10}
            fadeInEnd={0}
            fadeOutStart={5}
            fadeOutEnd={10}
          >
            <div className="flex justify-center items-center h-screen">
              <WelcomeMessage showMessage={showWelcome} />
            </div>
          </Section>
          
          <Section 
            top="40vh"
            fadeInStart={20}
            fadeInEnd={30}
            fadeOutStart={65}
            fadeOutEnd={75}
          >
            <Introduction />
          </Section>

          <Section 
            top="110vh"
            fadeInStart={100}
            fadeInEnd={110}
            fadeOutStart={125}
            fadeOutEnd={140}
          >
            <Flextrade />
          </Section>

          <Section 
            top="200vh"
            fadeInStart={190}
            fadeInEnd={195}
            fadeOutStart={220}
            fadeOutEnd={230}
          >
            <EagleMed />
          </Section>

          <Section 
            top="280vh"
            fadeInStart={270}
            fadeInEnd={280}
            fadeOutStart={310}
            fadeOutEnd={315}
          >
            <ProjectsOverview />
          </Section>

          <Section 
            top="350vh"
            fadeInStart={350}
            fadeInEnd={360}
            fadeOutStart={400}
            fadeOutEnd={410}
          >
            <ProjectsWarehouse />
          </Section>

          <Section 
            top="430vh"
            fadeInStart={440}
            fadeInEnd={450}
            fadeOutStart={460}
            fadeOutEnd={470}
          >
            <ProjectsConstruction />
          </Section>


          <Section 
            top="540vh"
            fadeInStart={550}
            fadeInEnd={565}
            fadeOutStart={570}
            fadeOutEnd={580}
          >
            <Education />
          </Section>

          <Section 
            top="580vh"
            fadeInStart={590}
            fadeInEnd={605}
            fadeOutStart={625}
            fadeOutEnd={635}
          >
            <CollegeJobs />
          </Section>

          <Section 
            top="620vh"
            fadeInStart={645}
            fadeInEnd={655}
            fadeOutStart={665}
            fadeOutEnd={675}
          >
            <CollegeClubs />
          </Section>
          
          <Section 
            top="680vh"
            fadeInStart={705}
            fadeInEnd={715}
            fadeOutStart={725}
            fadeOutEnd={735}
          >
            <EducationYonsei />
          </Section>

          <Section 
            top="780vh"
            fadeInStart={765}
            fadeInEnd={775}
            fadeOutStart={790}
            fadeOutEnd={800}
          >
            <Languages />
          </Section>

          <Section 
            top="780vh"
            fadeInStart={815}
            fadeInEnd={825}
            fadeOutStart={835}
            fadeOutEnd={845}
          >
            <FootballWatch />
          </Section>

          <Section 
            top="925vh"
            fadeInStart={875}
            fadeInEnd={880}
            fadeOutStart={900}
            fadeOutEnd={910}
          >
            <FootballMemories />
          </Section>

          <Section 
            top="910vh"
            fadeInStart={960}
            fadeInEnd={970}
            fadeOutStart={980}
            fadeOutEnd={990}
          >
            <FootballPlay />
          </Section>

          <Section 
            top="985vh"
            fadeInStart={1040}
            fadeInEnd={1050}
            fadeOutStart={1065}
            fadeOutEnd={1075}
          >
            <ChessPlay />
          </Section>

          <Section 
            top="1080vh"
            fadeInStart={1085}
            fadeInEnd={1095}
            fadeOutStart={1110}
            fadeOutEnd={1120}
          >
            <ChessDashboard />
          </Section>

          <Section 
            top="1080vh"
            fadeInStart={1135}
            fadeInEnd={1145}
            fadeOutStart={1160}
            fadeOutEnd={1170}
          >
            <Kombucha />
          </Section>

          <Section 
            top="1130vh"
            fadeInStart={1190}
            fadeInEnd={1200}
            fadeOutStart={1220}
            fadeOutEnd={1230}
          >
            <KombuchaMenu />
          </Section>

          <Section 
            top="1200vh"
            fadeInStart={1260}
            fadeInEnd={1270}
            fadeOutStart={1280}
            fadeOutEnd={1290}
          >
            <Contact />
          </Section>

          <Section 
            top="1215vh"
            fadeInStart={1290}
            fadeInEnd={1300}
            fadeOutStart={1310}
            fadeOutEnd={1320}
          >
            <Credits />
          </Section>

        </Scroll>
      </ScrollControls>
      <Perf position="bottom-left" />
    </>
  );
}

function Scene({ disableScroll, setDisableScroll, autoPlay, setAutoPlay, onScrollProgress }) {

  const sheet = useCurrentSheet();
  const scroll = useScroll();
  const cameraRig = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const smokeEmitterRef = useRef(null);

  // Add debug controls
  const { debugMode, cameraPosition, cameraTarget } = useControls("Debug", {
    debugMode: { value: false, label: "Enable Debug Mode" },
    "Debug Camera": folder({
      cameraPosition: { value: [-245, 37, 135], label: "Position" },
      cameraTarget: { value: [0, 0, 0], label: "Target" },
    }, { collapsed: false })
  }, { collapsed: false });

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
    // Skip theatre updates when in debug mode
    if (debugMode) return;

    const sequenceLength = val(sheet.sequence.pointer.length);

    if (autoPlay) {
      // Auto-play branch: increment sequence position over 25 seconds.
      sheet.sequence.position += delta;
      if (sheet.sequence.position >= 25) {
        sheet.sequence.position = 25;
        // Auto-play is complete—enable scrolling.
        setAutoPlay(false);
        setDisableScroll(false);
      }
    } else if (!autoPlay && !disableScroll) {
      // When autoPlay becomes false (either from completion or skip),
      // ensure we're at position 25
      if (sheet.sequence.position < 25) {
        sheet.sequence.position = 25;
      }
      
      // Scroll branch: ensure the user cannot scroll back below 25.
      const minPosition = 25;
      // uncomment this to allow scrolling back to 0 for debugging purposes I guess ( find a better way to do this)
      // const minPosition = 0;
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
      <Sky />
      <Landscape castShadow receiveShadow />
      <ProjectLabs castShadow receiveShadow />
      <LandscapeProps castShadow receiveShadow />
      <Campus castShadow receiveShadow />
      <LanguageInstitute castShadow receiveShadow />
      <Flags castShadow receiveShadow />
      <Downtown castShadow receiveShadow />
      <Recreation castShadow receiveShadow />
      <ContactTower castShadow receiveShadow />
      <e.group theatreKey="TrainSystem">
        <Train castShadow receiveShadow />
        <TrainWheel castShadow receiveShadow autoPlay={autoPlay} />
      </e.group>
      <e.group theatreKey="TrainSmokeEmitter" ref={smokeEmitterRef} />
      <TrainSmoke 
        emitterRef={smokeEmitterRef} 
        autoPlay={autoPlay}
      />
      <FactorySmoke />
      <Clouds />

      {debugMode ? (
        // Debug mode: Use regular camera with OrbitControls
        <>
          <PerspectiveCamera 
            makeDefault 
            position={cameraPosition} 
            fov={45} 
            near={10} 
            far={5000} 
          />
          <OrbitControls target={cameraTarget} />
        </>
      ) : (
        // Normal mode: Use Theatre.js camera
        <group ref={cameraRig}>
          <TheatrePerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0, 0]} fov={45} near={10} far={5000} />
        </group>
      )}
    </>
  );
}