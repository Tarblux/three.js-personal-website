import React, { useEffect, useState } from 'react'
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const WelcomeMessage = ({ showMessage }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [opacity, setOpacity] = useState(1);
    const scroll = useScroll();

    useEffect(() => {
        if (showMessage) {
            setTimeout(() => setIsVisible(true), 500);
        }
    }, [showMessage]);

    useFrame(() => {
        if (scroll.offset > 0 && !hasScrolled) {
            setHasScrolled(true);
        }
        
        if (hasScrolled) {
            setOpacity(prev => Math.max(prev - 0.03, 0)); // Adjust the 0.03 value to control fade speed
        }
    });

    if (!showMessage || (hasScrolled && opacity <= 0)) return null;

    return (
        <div className={`
            fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            transition-all duration-1000 ease-out
            ${isVisible ? 'translate-y-0' : 'translate-y-10'}
        `}
        style={{ opacity: isVisible ? opacity : 0 }}
        >
            <div className="bg-white/95 p-8 rounded-lg shadow-xl max-w-md text-center
                          border-2 border-gray-200">
                <div className="mb-4">
                    <img 
                        src="/images/UI/welcome-moji.webp" 
                        alt="Welcome Memoji" 
                        className="w-20 h-20 mx-auto object-cover"
                    />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Welcome to Tariqstan
                </h2>
                <p className="text-lg text-gray-600 mb-4">
                    Your train has arrived at Platform Portfolio
                </p>
                <p className="mt-4 text-gray-700 leading-relaxed">
                    Scroll to explore the local attractions
                </p>
                
                <div className="mt-8 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500 italic">
                        🚂 Don't forget your return ticket to the World Wide Web!
                    </p>
                    <div className="mt-4 animate-bounce">
                        <svg className="w-6 h-6 mx-auto text-gray-600" 
                             fill="none" 
                             strokeWidth="2" 
                             viewBox="0 0 24 24" 
                             stroke="currentColor">
                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeMessage