import React, { useState, useEffect, useRef } from 'react';
import GitActivity from './GitActivity';
import ProjectArticleViewer from './ProjectArticleViewer';

const ProjectDetails = ({ project, isVisible, onClose }) => {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isClosing, setIsClosing] = useState(false);
    const [showGitActivity, setShowGitActivity] = useState(false);
    const [renderGitActivity, setRenderGitActivity] = useState(false);
    const scrollContainerRef = useRef(null);

    // Reset currentMediaIndex when project changes
    useEffect(() => {
        if (project) {
            setCurrentMediaIndex(0);
            setSelectedImageIndex(0);
        }
    }, [project]);

    // Reset closing state when visibility changes , needs to be refactored but works for now
    useEffect(() => {
        if (isVisible) {
            setIsClosing(false);

            setRenderGitActivity(true);
            const timer = setTimeout(() => setShowGitActivity(true), 1000);
            return () => clearTimeout(timer);
        } else {
            setShowGitActivity(false);
            const timer = setTimeout(() => setRenderGitActivity(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    const handleClose = () => {
        setIsClosing(true);
        setShowGitActivity(false);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
            setRenderGitActivity(false);
        }, 700);
    };

    const getYoutubeVideoId = (url) => {
        if (!url) return null;
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
        return match ? match[1] : null;
    };

    // Combine images and video into a single media array - with safety checks
    const mediaItems = project ? [
        ...(project.images || [project.image]).filter(Boolean).map(img => ({ type: 'image', src: img })),
        ...(project.link && getYoutubeVideoId(project.link) ? [{
            type: 'video',
            src: `https://www.youtube.com/embed/${getYoutubeVideoId(project.link)}`
        }] : [])
    ] : [];

    // Filter only images for the thumbnail selection
    const imageItems = mediaItems.filter(item => item.type === 'image');

    const handleImageSelect = (index) => {
        setSelectedImageIndex(index);
        setCurrentMediaIndex(index);
    };

    // Get scroll positions for images - can be defined in project data or calculated
    const getImageScrollPositions = () => {
        // If project has custom scroll positions defined, use those
        if (project?.imageScrollPositions && project.imageScrollPositions.length === imageItems.length) {
            return project.imageScrollPositions;
        }
        
        // Default fallback to equal divisions if no custom positions are defined
        if (imageItems.length <= 1) return [0];
        
        return imageItems.map((_, index) => index / (imageItems.length - 1));
    };

    // Scroll-based image selection with custom positions
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer || !imageItems.length || !isVisible) return;

        const imageScrollPositions = getImageScrollPositions();

        const handleScroll = () => {
            const scrollTop = scrollContainer.scrollTop;
            const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
            const scrollPercentage = scrollTop / scrollHeight;

            // Find the appropriate image index based on custom scroll positions
            let imageIndex = 0;
            
            for (let i = 0; i < imageScrollPositions.length; i++) {
                if (scrollPercentage >= imageScrollPositions[i]) {
                    imageIndex = i;
                } else {
                    break;
                }
            }

            // Only update if the index has changed
            if (imageIndex !== selectedImageIndex) {
                setSelectedImageIndex(imageIndex);
                setCurrentMediaIndex(imageIndex);
            }
        };

        scrollContainer.addEventListener('scroll', handleScroll);

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, [imageItems.length, selectedImageIndex, isVisible, project?.imageScrollPositions]);

    // Manual selection overrides scroll-based selection temporarily
    const handleManualImageSelect = (index) => {
        setSelectedImageIndex(index);
        setCurrentMediaIndex(index);
        
        // Scroll to the corresponding position using custom scroll positions
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer && imageItems.length > 1) {
            const imageScrollPositions = getImageScrollPositions();
            const scrollPercentage = imageScrollPositions[index] || 0;
            const targetScrollTop = scrollPercentage * (scrollContainer.scrollHeight - scrollContainer.clientHeight);
            scrollContainer.scrollTo({
                top: targetScrollTop,
                behavior: 'smooth'
            });
        }
    };

    // Early return after all hooks
    if (!isVisible || !project) return null;

    // Safety check for currentMediaIndex
    const safeMediaIndex = Math.min(currentMediaIndex, mediaItems.length - 1);
    const currentMedia = mediaItems[safeMediaIndex];

    if (!currentMedia) return null;

    return (
        <>
            {/* Backdrop with blur effect */}
            <div 
                className={`fixed inset-0 bg-black/5 backdrop-blur-[2px] transition-opacity duration-500
                    ${isClosing ? 'opacity-0' : 'opacity-100'}`}
                onClick={handleClose}
            />
            
            {/* Project Details Card */}
            <div 
                className={`fixed right-[300px] top-[70px] w-[750px] h-[calc(100vh-140px)] bg-white/95 backdrop-blur-sm
                    rounded-2xl shadow-lg transform-gpu flex flex-col
                    ${isClosing ? 'animate-fold' : 'animate-unfold'}`}
                style={{
                    transformOrigin: 'center center'
                }}
            >
                {/* Close button */}
                <button 
                    onClick={handleClose}
                    className="absolute top-7 right-8 text-black hover:text-gray-600 transition-colors z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Static Header Section */}
                <div className="flex-shrink-0">
                    {/* Main media display */}
                    <div className="p-6 pb-2 relative">
                        <div className="w-full h-[300px] rounded-xl overflow-hidden !shadow-none relative transition-all duration-300">
                            {currentMedia.type === 'video' ? (
                                <iframe
                                    src={currentMedia.src}
                                    title={project.title}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <img 
                                    src={currentMedia.src} 
                                    alt={`${project.title} - Media ${currentMediaIndex + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                        
                        {/* Image thumbnails */}
                        {imageItems.length > 1 && (
                            <div className="mt-3 flex gap-2 overflow-x-auto">
                                {imageItems.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleManualImageSelect(index)}
                                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                            selectedImageIndex === index 
                                                ? 'border-blue-400 shadow-lg shadow-blue-400/50 ring-2 ring-blue-400/30' 
                                                : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                    >
                                        <img 
                                            src={item.src} 
                                            alt={`Thumbnail ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="px-6 pb-2">
                        {/* Header with date and links */}
                        <div className="mb-2 mr-2 flex justify-between items-center">
                            <div className="text-gray-500 text-xs">{project.date}</div>
                            <div className="flex gap-3">
                                {project.github && (
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                        </svg>
                                    </a>
                                )}
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scrollable Article Content */}
                <div ref={scrollContainerRef} className="flex-1 overflow-y-auto overscroll-contain">
                    <ProjectArticleViewer 
                        project={project} 
                        onImageSelect={handleManualImageSelect}
                        selectedImageIndex={selectedImageIndex}
                        imageItems={imageItems}
                    />
                </div>
            </div>
            
            {/* Git Activity*/}
            {renderGitActivity && (
                <GitActivity 
                    isVisible={true} 
                    project={project} 
                    showComponent={showGitActivity}
                    position={{ right: '50px', top: '70px' }}
                />
            )}
        </>
    );
};

export default ProjectDetails; 