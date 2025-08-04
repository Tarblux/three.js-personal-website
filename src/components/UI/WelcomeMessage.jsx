import React, { useState, useEffect } from 'react'

const WelcomeMessage = ({ showMessage }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (showMessage) {
            // Small delay to ensure smooth fade-in
            setTimeout(() => setIsVisible(true), 500);
        } else {
            setIsVisible(false);
        }
    }, [showMessage]);

    if (!showMessage) return null;

    return (
        <div className={`
            bg-white/95 p-4 sm:p-8 rounded-lg shadow-xl max-w-[95vw] sm:max-w-md w-full text-center border-2 border-gray-200
            transition-all duration-1000 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
            <div className="mb-4">
                <img 
                    src="/images/UI/welcome-moji.webp" 
                    alt="Welcome Memoji" 
                    className="w-24 h-24 sm:w-32 sm:h-32 mx-auto object-cover"
                />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                Welcome to my little Corner of the Internet !
            </h2>
            {/* <p className="text-sm sm:text-base text-gray-500 mb-2 italic">
                (it is a literal corner)
            </p> */}
            <p className="text-base sm:text-md text-gray-600 text-balance mb-4">
                Your train has arrived Downtown. The locals can be a little nosy, so feel free to put on some headphones so they leave you alone.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed text-sm sm:text-base font-bold">
                Scroll to explore the local attractions
            </p>
            
            <div className="mt-8 pt-4 border-t border-gray-200">
                <p className="text-xs sm:text-sm text-gray-500 italic">
                     Don't forget your return ticket to the World Wide Web!
                </p>
                <div className="mt-4 animate-bounce">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 mx-auto text-gray-600" 
                         fill="none" 
                         strokeWidth="2" 
                         viewBox="0 0 24 24" 
                         stroke="currentColor">
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default WelcomeMessage