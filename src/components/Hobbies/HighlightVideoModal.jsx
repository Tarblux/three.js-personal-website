import React from 'react';

const HighlightVideoModal = ({ isVisible, onClose, videoSrc }) => {
    if (!isVisible) return null;
    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity duration-500 z-40"
                onClick={onClose}
            />
            {/* Modal */}
            <div 
                className="fixed top-1/2 left-1/2 z-50 w-[350px] h-[600px] bg-white/95 rounded-2xl shadow-2xl transform -translate-x-1/2 -translate-y-1/2 flex flex-col overflow-hidden"
            >
                {/* Close button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-black hover:text-gray-600 transition-colors z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {/* Video */}
                <div className="flex-1 flex items-center justify-center">
                    <video
                        src={videoSrc}
                        controls
                        autoPlay
                        className="w-full h-full rounded-2xl object-cover bg-black"
                    />
                </div>
            </div>
        </>
    );
};

export default HighlightVideoModal; 