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
import LoadedButton from './components/LoadedButton.jsx'
import MiniMap from "./components/MiniMap.jsx"
import SkipIntroButton from './components/SkipIntroButton.jsx'

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
      <video src="/images/city-loading.mp4" autoPlay muted playsInline disablePictureInPicture className="loading-video" />
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
    // Stop the audio if it's playing
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    // Skip to the end of the intro sequence
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
