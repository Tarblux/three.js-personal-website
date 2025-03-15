import { useScroll } from "@react-three/drei"

export default function Section({ top, fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd, children }) {
    const scroll = useScroll()
    
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

    return (
        <div
            className="absolute left-0 right-0 flex justify-center transition-opacity duration-300"
            style={{
                top: top,
                opacity: calculateOpacity()
            }}
        >
            {children}
        </div>
    );
}
