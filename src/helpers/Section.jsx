import { useScroll } from "@react-three/drei"

import { useEffect, useRef } from 'react'

export default function Section({ top, fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd, children, onActiveChange }) {
    const scroll = useScroll()
    const lastActiveRef = useRef(false)
    
    const calculateOpacity = () => {
        // scroll.offset is already normalized between 0 and 1
        const currentScrollVh = scroll.offset * 1500 // multiply by total pages (15 * 100vh)

        // Convert vh values to the same scale
        const fadeInStartVh = fadeInStart
        const fadeInEndVh = fadeInEnd
        const fadeOutStartVh = fadeOutStart
        const fadeOutEndVh = fadeOutEnd

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

    return (
        <div
            className="absolute left-0 right-0 flex justify-center transition-opacity duration-300"
            style={{
                top: top,
                opacity: opacity,
                pointerEvents: isActive ? 'auto' : 'none'
            }}
        >
            {children}
        </div>
    );
}
