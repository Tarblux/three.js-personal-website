import React from 'react';
import { createPortal } from 'react-dom';

const HighlightVideoModal = ({ isVisible, onClose, videoSrc }) => {
    if (!isVisible) return null;
    
    /*
     * IMPORTANT: React Portal Implementation for Modal Rendering
     * 
     * This component uses createPortal() to render the modal content directly into document.body
     * instead of within the component tree. This is necessary because:
     * 
     * 1. @react-three/drei ScrollControls Issue:
     *    - The FootballPlay component is rendered inside <Scroll html> from @react-three/drei
     *    - This creates a special rendering context that constrains child elements
     *    - Even with high z-index values (z-[9999]), modals remain trapped within the scroll container
     * 
     * 2. Portal Solution:
     *    - createPortal(modalContent, document.body) renders the modal at the root DOM level
     *    - This completely bypasses the drei scroll container constraints
     *    - Allows the modal to appear above all other content with proper z-index stacking
     * 
     * This is the same fix applied to ProjectDetails modal to solve drei scroll container issues.
     */
    
    const modalContent = (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity duration-500 z-[9990]"
                onClick={onClose}
            />
            {/* Modal */}
            <div 
                className="fixed top-1/2 left-1/2 z-[9995] w-[350px] h-[600px] bg-white/95 rounded-2xl shadow-2xl transform -translate-x-1/2 -translate-y-1/2 flex flex-col overflow-hidden"
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

    // Render modal content using a portal to escape the drei scroll context
    return createPortal(modalContent, document.body);
};

export default HighlightVideoModal; 