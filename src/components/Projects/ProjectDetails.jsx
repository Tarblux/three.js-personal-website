import React, { useState, useEffect } from 'react';

const ProjectDetails = ({ project, isVisible, onClose }) => {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [isClosing, setIsClosing] = useState(false);

    // Reset currentMediaIndex when project changes
    useEffect(() => {
        setCurrentMediaIndex(0);
    }, [project]);

    // Reset closing state when visibility changes
    useEffect(() => {
        if (isVisible) {
            setIsClosing(false);
        }
    }, [isVisible]);

    const handleClose = () => {
        setIsClosing(true);
        // Wait for animation to complete before actually closing
        setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, 700); // Match animation duration
    };
    
    if (!isVisible || !project) return null;

    const getYoutubeVideoId = (url) => {
        if (!url) return null;
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
        return match ? match[1] : null;
    };

    // Combine images and video into a single media array
    const mediaItems = [
        ...(project.images || [project.image]).map(img => ({ type: 'image', src: img })),
        ...(project.link && getYoutubeVideoId(project.link) ? [{
            type: 'video',
            src: `https://www.youtube.com/embed/${getYoutubeVideoId(project.link)}`
        }] : [])
    ];

    const nextMedia = () => {
        setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
    };

    const prevMedia = () => {
        setCurrentMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    };

    const getCategoryColor = (category) => {
        switch(category?.toLowerCase()) {
            case 'development':
                return 'text-blue-500';
            case 'research':
                return 'text-purple-500';
            case 'media':
                return 'text-emerald-500';
            default:
                return 'text-white';
        }
    };

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
                className={`fixed right-[200px] top-[48px] w-[600px] h-[75vh] bg-white/95 backdrop-blur-sm
                    rounded-2xl shadow-lg transform-gpu
                    ${isClosing ? 'animate-fold' : 'animate-unfold'}`}
                style={{
                    transformOrigin: 'center center'
                }}
            >
                <div className="h-full relative">
                    {/* Close button */}
                    <button 
                        onClick={handleClose}
                        className="absolute top-7 right-8 text-black hover:text-gray-600 transition-colors z-10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Main media display with navigation */}
                    <div className="p-6 pb-2 relative">
                        <div className="w-full h-[300px] rounded-xl overflow-hidden !shadow-none relative group transition-all duration-300 hover:scale-[1.02] hover:rounded-2xl">
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
                            
                            {/* Navigation arrows */}
                            {mediaItems.length > 1 && (
                                <>
                                    {/* Left arrow */}
                                    <button
                                        onClick={prevMedia}
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    
                                    {/* Right arrow */}
                                    <button
                                        onClick={nextMedia}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>

                                    {/* Media counter and type indicator - only show for images */}
                                    {currentMedia.type === 'image' && (
                                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                                            {currentMediaIndex + 1} / {mediaItems.length}
                                            <span className="ml-2">🖼️</span>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    <div className="px-6">
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

                        <h2 className="text-xl font-bold mb-2">{project.title}</h2>

                        {/* Description */}
                        <div className="mb-3">
                            <p className="text-gray-800 text-xs">{project.description}</p>
                        </div>

                        {/* Technologies and Category */}
                        <div className="mb-3">
                            <div className="flex flex-wrap gap-1.5">
                                <span 
                                    className={`flex bg-white px-1.5 py-[0.1rem] text-[0.65rem] rounded border border-gray-200 ${getCategoryColor(project.category)}`}
                                >
                                    {project.category === 'development' ? 'Software Development' :
                                     project.category === 'research' ? 'Research' : 'Digital Media'}
                                </span>
                                {project.technologies.map((tech, index) => (
                                    <span 
                                        key={index}
                                        className="flex bg-white px-1.5 py-[0.1rem] text-[0.65rem] rounded border border-gray-200 text-gray-500"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Story/Details */}
                        <div>
                            <p className="text-gray-600 text-sm font-thin leading-relaxed ">
                                {project.story || "Beep Boop, I'm a project story!"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectDetails; 