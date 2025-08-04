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
            bg-white/95 p-4 sm:p-8 rounded-xl shadow-xl max-w-[95vw] sm:max-w-md w-full text-center border-2 border-gray-200
            transition-all duration-1000 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
            <div className="">
                <img 
                    src="/images/UI/welcome-moji.webp" 
                    alt="Welcome Memoji" 
                    className="w-24 h-24 sm:w-24 sm:h-24 mx-auto object-cover"
                />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                Welcome to town !
            </h2>
            <p className="text-[14px] sm:text-md text-gray-600 text-left mb-6">
                Your train has just pulled into the heart of the city! This place is more than a website, it's a living map of my world. Each district represents a different part of my life, and as you scroll, new layers of the city will reveal themselves. Go as deep as you like, explore at your own pace.
            </p>
            
            {/* Travel Guide Section with dashed lines */}
            <div className="flex items-center my-2">
                <div className="flex-grow border-t-2 border-dashed border-gray-300"></div>
                <span className="mx-3 text-gray-800 text-sm font-bold mb-2">Travel Guide</span>
                <div className="flex-grow border-t-2 border-dashed border-gray-300"></div>
            </div>
            
            {/* Instructions List */}
            <div className="text-left space-y-3">
                <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">Scroll</span> to navigate through the city
                    </p>
                </div>
                <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">
                        As you arrive in new areas, <span className="font-semibold">details</span> will fade in to tell their story
                    </p>
                </div>
                <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">
                        Most elements are interactive (<span className="font-semibold">hover or click to uncover more</span>)
                    </p>
                </div>
                <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">
                        For full immersion, <span className="font-semibold">put on headphones</span> and listen to the sounds of each space
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WelcomeMessage