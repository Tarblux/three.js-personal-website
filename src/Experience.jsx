// Libraries
import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { ScrollControls, useScroll, Scroll, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { getProject, val } from "@theatre/core"
import { useControls, folder } from "leva"
import { Perf } from "r3f-perf"
import { SheetProvider, PerspectiveCamera as TheatrePerspectiveCamera, useCurrentSheet, editable as e} from "@theatre/r3f"

// Three.js Components
import CameraPath from "./Main Frame.theatre-project-state.json"
import { Landscape } from './components-3d/Landscape.jsx'
import { ProjectLabs } from './components-3d/ProjectLabs.jsx'
import { Campus } from './components-3d/Campus.jsx'
import { LanguageInstitute } from "./components-3d/LanguageInstitute.jsx"
import { Flags } from "./components-3d/Flags.jsx"
import { Downtown } from "./components-3d/Downtown.jsx"
import { ContactTower} from "./components-3d/ContactTower.jsx"
import { Field } from "./components-3d/Field.jsx"
import { RailTrack } from "./components-3d/RailTrack.jsx"
import { Streetlights } from "./components-3d/Streetlights.jsx"
import { ChessPark } from "./components-3d/ChessPark.jsx"
import { Stadium } from "./components-3d/Stadium.jsx"
import { Booch } from "./components-3d/Booch.jsx"
import { Train } from "./components-3d/Train.jsx"
import { TrainWheel } from "./components-3d/TrainWheel.jsx"
import { Trees } from "./components-3d/Trees.jsx"
import { Fences } from "./components-3d/Fences.jsx"
import { Clouds } from './components-3d/Clouds.jsx'
import { TrainSmoke } from "./components-3d/TrainSmoke.jsx"
import { FactorySmoke } from "./components-3d/FactorySmoke.jsx"
import { FactoryAudio } from "./components-3d/FactoryAudio.jsx"
import { TradingAudio } from "./components-3d/TradingAudio.jsx"
import { Sky } from './components-3d/Sky.jsx'
import VideoPreloader from './components-3d/VideoPreloader.jsx'

// UI Components
import ScrollSections from "./ScrollSections.jsx"
import { footballMoments } from './data/footballMoments.js'
import FreezeManager from './components/UI/FreezeManager.jsx'
import { FREEZE_POINTS } from './data/sections.js'


export default function Experience({ disableScroll, setDisableScroll, autoPlay, setAutoPlay , onScrollProgress, onAudioDebugUpdate }) {
  const sheet = getProject("Main Frame", { state: CameraPath }).sheet("Scene")
  const [showWelcome, setShowWelcome] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(footballMoments?.[2]?.videoUrl || '/videos/reiss.mp4')
  const [watchActive, setWatchActive] = useState(false)
  const [memoriesActive, setMemoriesActive] = useState(false)
  const [videoChangeKey, setVideoChangeKey] = useState(0) // Force restart on same video selection

  const handleVideoSelection = (videoUrl) => {
    if (videoUrl === currentVideo) {
      // Same video selected, increment key to force restart
      setVideoChangeKey(prev => prev + 1)
    } else {
      // Different video, update URL
      setCurrentVideo(videoUrl)
    }
  }
  
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
            videoUrl={currentVideo}
            audioActive={memoriesActive}
            videoChangeKey={videoChangeKey}
          />
        </SheetProvider>
        <FreezeManager points={FREEZE_POINTS} active={!disableScroll && !autoPlay} />

        <FactoryAudio 
          theatreSequence={sheet.sequence} 
          onDebugUpdate={onAudioDebugUpdate}
        />
        <TradingAudio 
          theatreSequence={sheet.sequence} 
          onDebugUpdate={onAudioDebugUpdate}
        />
        <Scroll html style={{ width: "100vw", height: "100vh" }}>
          <ScrollSections 
            showWelcome={showWelcome} 
            onSelectVideo={handleVideoSelection}
            onWatchActiveChange={setWatchActive}
            onMemoriesActiveChange={setMemoriesActive}
          />
        </Scroll>
        {/* Defer preloading of videos until the FootballWatch section becomes active */}
        {watchActive && (
          <VideoPreloader urls={[
            footballMoments?.[0]?.videoUrl,
            footballMoments?.[1]?.videoUrl,
            footballMoments?.[2]?.videoUrl,
          ].filter(Boolean)} active={true} />
        )}
      </ScrollControls>
    </>
  );
}

function Scene({ disableScroll, setDisableScroll, autoPlay, setAutoPlay, onScrollProgress, videoUrl, audioActive, videoChangeKey }) {

  const sheet = useCurrentSheet();
  const scroll = useScroll();
  const cameraRig = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const smokeEmitterRef = useRef(null);

  // Debug Controls
  const { debugMode, showPerf, perfPosition, cameraPosition, cameraTarget } = useControls("Debug", {
    debugMode: { value: false, label: "Enable Debug Mode" },
    showPerf: { value: false, label: "Show Performance" },
    perfPosition: {
      value: "bottom-left",
      options: ["top-left", "top-right", "bottom-left", "bottom-right"],
      label: "Perf Position",
    },
    "Debug Camera": folder({
      cameraPosition: { value: [-355, 41, 172], label: "Position" },
      cameraTarget: { value: [0, 0, 3000], label: "Target" },
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
    // Skip theatre updates when in debug mode (for now)
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
      <Clouds />
      <Landscape />
      <Field />
      <RailTrack />
      <Streetlights />
      <ChessPark />
      <Stadium videoUrl={videoUrl} audioActive={audioActive} videoChangeKey={videoChangeKey} />
      <Booch />
      <Trees />
      <Fences />
      <ProjectLabs />
      <Campus />
      <LanguageInstitute />
      <Flags />
      <Downtown />
      <ContactTower />
      <e.group theatreKey="TrainSystem">
        <Train />
        <TrainWheel autoPlay={autoPlay} />
      </e.group>
      <e.group theatreKey="TrainSmokeEmitter" ref={smokeEmitterRef} />
      <TrainSmoke 
        emitterRef={smokeEmitterRef} 
        autoPlay={autoPlay}
      />
      <FactorySmoke />
      

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

      {showPerf && <Perf position={perfPosition} />}
    </>
  );
}