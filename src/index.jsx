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
import MiniMap from "./components/UI/MiniMap.jsx"
import SkipIntroButton from './components/UI/SkipIntroButton.jsx'
import ScrollDebug from './components/UI/ScrollDebug.jsx'

// --- Fun Easter Egg for Curious Developers ---

const easterEgg = {
  header: [
    'color: #F92626',
    'background: #333',
    'font-size: 24px',
    'font-weight: bold',
    'padding: 10px 15px',
    'border-radius: 8px',
    'font-family: "Courier New", Courier, monospace',
    'text-shadow: 2px 2px 4px #000000'
  ].join(';'),
  main: [
    'color: #4CAF50',
    'font-size: 14px',
    'line-height: 1.6',
    'font-family: "Courier New", Courier, monospace',
  ].join(';'),
};

console.log('%cPsst... I see you!', easterEgg.header);
console.log(
`%c
                 _
    \\_     _     / )
     \\ \\   / \\   / /
      \\ \\ /   \\ / /
       \\ /     \\ /
       / \\     / \\
      /   \\   /   \\
     /     \\ /     \\
    (_______V_______)
     |             |
     |  O       O  |
     |      <      |
     |             |
     |  \\_______/  |
     |_____________|
        |       |
       /         \\
      /           \\
     /             \\

Well, well, well... you thought you could look at my code undetected?
Since you're poking around in here, you're clearly curious.

The source code is available on my GitHub: https://github.com/Tarblux/three.js-personal-website
You can also ping me on LinkedIn for questions , or just let me know you found it lol: https://www.linkedin.com/in/tariq-williams12/

If you found a bug, let's just call it an 'undocumented feature' for now, shall we?
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
      <video src="/videos/city-loading.mp4" autoPlay muted playsInline disablePictureInPicture className="loading-video" />
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
          />
        </Suspense>
      </Canvas>
      <MiniMap progress={scrollProgress} />
      <ScrollDebug scrollProgress={scrollProgress} />
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
