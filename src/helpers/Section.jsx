import { useScroll } from "@react-three/drei"
import { useEffect, useRef, useState } from 'react'
import { isMobile } from '../utils/deviceDetection.js'
import { getMobileScrollMultiplier, getMobileAdjustedPosition } from '../utils/mobileScrollUtils.js'

export default function Section({ 
    top, 
    fadeInStart, 
    fadeInEnd, 
    fadeOutStart, 
    fadeOutEnd, 
    children, 
    onActiveChange,
    // Mobile-specific props
    mobileTop,
    mobileFadeInStart,
    mobileFadeInEnd,
    mobileFadeOutStart,
    mobileFadeOutEnd
}) {
    const scroll = useScroll()
    const lastActiveRef = useRef(false)
    const [isMobileDevice, setIsMobileDevice] = useState(false)
    
    useEffect(() => {
        setIsMobileDevice(isMobile())
    }, [])
    
    const calculateOpacity = () => {
        // scroll.offset is already normalized between 0 and 1
        // Apply mobile scroll multiplier for better mobile handling
        const scrollMultiplier = isMobileDevice ? getMobileScrollMultiplier() : 1
        const currentScrollVh = scroll.offset * 1500 * scrollMultiplier // multiply by total pages (15 * 100vh)

        // Use mobile values if provided and on mobile, otherwise use desktop values
        const fadeInStartVh = isMobileDevice && mobileFadeInStart !== undefined ? mobileFadeInStart : fadeInStart
        const fadeInEndVh = isMobileDevice && mobileFadeInEnd !== undefined ? mobileFadeInEnd : fadeInEnd
        const fadeOutStartVh = isMobileDevice && mobileFadeOutStart !== undefined ? mobileFadeOutStart : fadeOutStart
        const fadeOutEndVh = isMobileDevice && mobileFadeOutEnd !== undefined ? mobileFadeOutEnd : fadeOutEnd

        // Calculate fade in
        if (currentScrollVh >= fadeInStartVh && currentScrollVh <= fadeInEndVh) {
            return (currentScrollVh - fadeInStartVh) / (fadeInEndVh - fadeInStartVh)
        }
        // Calculate fade out
        else if (currentScrollVh >= fadeOutStartVh && currentScrollVh <= fadeOutEndVh) {
            return 1 - (currentScrollVh - fadeOutStartVh) / (fadeOutEndVh - fadeOutStartVh)
        }
        // Before fade in or after fade out
        else if (currentScrollVh < fadeInStartVh || currentScrollVh > fadeOutEndVh) {
            return 0
        }
        // Between fade in and fade out
        return 1
    }

    const opacity = calculateOpacity()
    const isActive = opacity > 0.75 // Threshold for considering section "active"

    useEffect(() => {
        if (!onActiveChange) return;
        if (lastActiveRef.current !== isActive) {
            lastActiveRef.current = isActive;
            try { onActiveChange(isActive); } catch {}
        }
    }, [isActive, onActiveChange])

    // Use mobile top position if provided and on mobile, otherwise use desktop top
    let topPosition = isMobileDevice && mobileTop !== undefined ? mobileTop : top
    
    // Apply mobile position adjustment for better mobile viewport handling
    if (isMobileDevice) {
        topPosition = getMobileAdjustedPosition(topPosition)
    }

    return (
        <div
            className="absolute left-0 right-0 flex justify-center transition-opacity duration-300"
            style={{
                top: topPosition,
                opacity: opacity,
                pointerEvents: isActive ? 'auto' : 'none'
            }}
        >
            {children}
        </div>
    );
}
