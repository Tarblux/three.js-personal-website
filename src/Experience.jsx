import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { ScrollControls, useScroll, Scroll, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { getProject, val } from "@theatre/core"
import { useControls, folder } from "leva"
import { Perf } from "r3f-perf"
import { SheetProvider, PerspectiveCamera as TheatrePerspectiveCamera, useCurrentSheet, editable as e} from "@theatre/r3f"

import CameraPath from "./Main Frame.theatre-project-state.json"
import { NewLandscape } from './components-3d/NewLandscape.jsx'
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

import ScrollSections from "./ScrollSections.jsx"


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
          <ScrollSections showWelcome={showWelcome} />
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
      <NewLandscape castShadow receiveShadow />
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