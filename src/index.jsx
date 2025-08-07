import './style.css'
import ReactDOM from 'react-dom/client'
import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useProgress } from '@react-three/drei'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { Leva } from 'leva'

import Experience from './Experience.jsx'
import LoadedButton from './components/UI/LoadedButton.jsx'
import SkipIntroButton from './components/UI/SkipIntroButton.jsx'
import ScrollDebug from './components/UI/ScrollDebug.jsx'
import { AudioDebugHUD } from './components/UI/AudioDebugHUD.jsx'
import KineticTitle from './components/UI/KineticTitle.jsx'

import { sections } from './data/sections.js'

// --- Fun Easter Egg for a Sus Developer ---

const easterEgg = {
  header: [
    'color: #ff0000', 
    'background: #333',
    'font-size: 24px',
    'font-weight: bold',
    'padding: 10px 15px',
    'border-radius: 8px',
    'font-family: "Courier New", Courier, monospace',
    'text-shadow: 2px 2px 4px #000000'
  ].join(';'),
  main: [
    'color: #00e5e5', 
    'font-size: 14px',
    'line-height: 1.6',
    'font-family: "Courier New", Courier, monospace',
  ].join(';'),
};

console.log('%c ALERT: An Imposter Developer is Among Us!', easterEgg.header);
console.log(
`%c
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣤⣤⣤⣤⣶⣦⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⡿⠛⠉⠙⠛⠛⠛⠛⠻⢿⣿⣷⣤⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⠋⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⠈⢻⣿⣿⡄⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣸⣿⡏⠀⠀⠀⣠⣶⣾⣿⣿⣿⠿⠿⠿⢿⣿⣿⣿⣄⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣿⣿⠁⠀⠀⢰⣿⣿⣯⠁⠀⠀⠀⠀⠀⠀⠀⠈⠙⢿⣷⡄⠀
⠀⠀⣀⣤⣴⣶⣶⣿⡟⠀⠀⠀⢸⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣷⠀
⠀⢰⣿⡟⠋⠉⣹⣿⡇⠀⠀⠀⠘⣿⣿⣿⣿⣷⣦⣤⣤⣤⣶⣶⣶⣶⣿⣿⣿⠀
⠀⢸⣿⡇⠀⠀⣿⣿⡇⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠀
⠀⣸⣿⡇⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠉⠻⠿⣿⣿⣿⣿⡿⠿⠿⠛⢻⣿⡇⠀⠀
⠀⠸⣿⣧⡀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠃⠀⠀
⠀⠀⠛⢿⣿⣿⣿⣿⣇⠀⠀⠀⠀⠀⣰⣿⣿⣷⣶⣶⣶⣶⠶⠀⢠⣿⣿⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⣿⣿⡇⠀⣽⣿⡏⠁⠀⠀⢸⣿⡇⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀⠀⠀⠀⣿⣿⡇⠀⢹⣿⡆⠀⠀⠀⣸⣿⠇⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢿⣿⣦⣄⣀⣠⣴⣿⣿⠁⠀⠈⠻⣿⣿⣿⣿⡿⠏⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⠛⠻⠿⠿⠿⠿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀

Hello there, you magnificent console-snooping developer.
I see you, venting into the source code. That's pretty sus no ?.

Since you've completed your 'Inspect Element' task, here are your next objectives:

  - Check the ship's logs (source code) on GitHub: https://github.com/Tarblux/three.js-personal-website
  - Report your findings (or just say hi) on LinkedIn: https://www.linkedin.com/in/tariq-williams12/

Any bugs you find were definitely planted by the *other* imposter. I swear I was in electrical.
`, easterEgg.main);


if (import.meta.env.DEV) {
  studio.extend(extension)
  studio.initialize()
}

const root = ReactDOM.createRoot(document.querySelector('#root'))

function Loader({ onBoardingPassClick }) {
  const { progress } = useProgress()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (progress === 100) {
      setIsLoaded(true)
      const loadingMessage = document.querySelector('.loading-message')
      if (loadingMessage) {
        loadingMessage.classList.add('fade-out-message')
      }
    }
  }, [progress])

  return (
    <div id="loader">
      <div className="loading-message">Building city...</div>
      <video src="/videos/city-loading2.mp4" autoPlay muted playsInline disablePictureInPicture className="loading-video" />
      <div className="loading-bar-container">
        <div className="loading-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="loading-percentage">{Math.round(progress)}%</div>
      {isLoaded && <LoadedButton onBoardingPassClick={onBoardingPassClick} />}
    </div>
  )
}

function App() {
  const [disableScroll, setDisableScroll] = useState(true)
  const [autoPlay, setAutoPlay] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showSkipButton, setShowSkipButton] = useState(false)
  const [audioDebugData, setAudioDebugData] = useState(null)
  const audioRef = useRef(null)

  const handleBoardingPassClick = () => {
    const loader = document.getElementById("loader")
    if (loader) {
      loader.classList.add("fade-out")
      setTimeout(() => {
        loader.style.display = "none"
      }, 1000);
    }

    setAutoPlay(true)
    setShowSkipButton(true)
    audioRef.current = new Audio("sounds/train-sounds.mp3")
    audioRef.current.play()

    setTimeout(() => {
      setShowSkipButton(false)
    }, 15000)
  };

  const handleSkipIntro = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    setAutoPlay(false)
    setDisableScroll(false)
    setShowSkipButton(false)
  }

  return (
    <>
      <Loader onBoardingPassClick={handleBoardingPassClick} />
      {showSkipButton && <SkipIntroButton onSkip={handleSkipIntro} />}
      <Canvas gl={{ preserveDrawingBuffer: true }} flat>
        <Suspense fallback={null}>
          <Experience
            disableScroll={disableScroll}
            setDisableScroll={setDisableScroll}
            autoPlay={autoPlay}
            setAutoPlay={setAutoPlay}
            onScrollProgress={setScrollProgress}
            onAudioDebugUpdate={setAudioDebugData}
          />
        </Suspense>
      </Canvas>
      <KineticTitle sections={sections} scrollProgress={scrollProgress} />
      <ScrollDebug scrollProgress={scrollProgress} />
      {audioDebugData && (
        <AudioDebugHUD 
          {...audioDebugData}
          show={audioDebugData.showDebugHUD}
        />
      )}
      <Leva collapsed />
      <SpeedInsights />
      <Analytics />
    </>
  )
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
