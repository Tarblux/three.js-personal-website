import React, { useState, useEffect, useRef } from 'react';
import GitActivity from './GitActivity';
import ProjectArticleViewer from './ProjectArticleViewer';

const phaseColors = [
    'bg-red-400',     // Plan
    'bg-orange-400',  // Design
    'bg-yellow-400',  // Develop
    'bg-blue-400',   // Testing
    'bg-green-400'     // Deploy
];

const phaseNames = [
    'Plan',
    'Design',
    'Develop',
    'Test',
    'Deploy'
];

const ProjectsConstructionDetails = ({ project, isVisible, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [showGitActivity, setShowGitActivity] = useState(false);
    const [renderGitActivity, setRenderGitActivity] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        if (isVisible) {
            setIsClosing(false);
            setSelectedImageIndex(0);
            
            // Only show git activity if the project has a github link
            if (project?.github) {
                setRenderGitActivity(true);
                const timer = setTimeout(() => setShowGitActivity(true), 1000);
                return () => clearTimeout(timer);
            }
        } else {
            setShowGitActivity(false);
            const timer = setTimeout(() => setRenderGitActivity(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, project]);

    const handleClose = () => {
        setIsClosing(true);
        setShowGitActivity(false);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
            setRenderGitActivity(false);
        }, 700);
    };

    const handleImageSelect = (index) => {
        setSelectedImageIndex(index);
    };

    if (!isVisible || !project) return null;

    const getCategoryColor = (category) => {
        switch(category?.toLowerCase()) {
            case 'development':
                return 'text-blue-500';
            case 'research':
                return 'text-purple-500';
            case 'media':
                return 'text-emerald-500';
            case 'hardware development':
                return 'text-orange-500';
            default:
                return 'text-black';
        }
    };

    // All filled bars use the color of the current phase
    const filledColor = phaseColors[Math.max(0, Math.min((project.phase || 1) - 1, 4))];

    // Create imageItems array for ProjectArticleViewer
    const imageItems = project.images ? project.images.map(img => ({ type: 'image', src: img })) : [];

    return (
        <>
            {/* Backdrop with blur effect */}
            <div 
                className={`fixed inset-0 bg-black/5 backdrop-blur-[2px] transition-opacity duration-500 z-40
                    ${isClosing ? 'opacity-0' : 'opacity-100'}`}
                onClick={handleClose}
            />
            {/* Project Details Card */}
            <div 
                className={`fixed inset-4 md:left-[100px] md:top-[48px] md:right-auto md:bottom-auto 
                    md:w-[600px] md:h-[calc(100vh-100px)] w-auto h-auto bg-white/95 backdrop-blur-sm
                    rounded-2xl shadow-lg transform-gpu flex flex-col z-50
                    ${isClosing ? 'animate-fold' : 'animate-unfold'}`}
                style={{ transformOrigin: 'center center' }}
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
                    {/* Main image display */}
                    <div className="p-4 md:p-6 pb-2 relative">
                        <div className="w-full h-[200px] md:h-[300px] rounded-xl overflow-hidden !shadow-none relative group transition-all duration-300 hover:scale-[1.02] hover:rounded-2xl">
                            <img 
                                src={project.thumbnail} 
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="px-4 md:px-6 pb-2">
                        {/* Header with date and links */}
                        <div className="mb-2 mr-2 flex justify-between items-center">
                            <div className="text-gray-500 text-xs">{project.startDate}</div>
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
                        {/* Progress bars */}
                        <div className="flex items-center gap-0.5 mt-1 mb-3">
                            {Array.from({ length: 5 }).map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-1 w-8 rounded-full ${idx < (project.phase || 1) ? filledColor : 'bg-gray-300'}`}
                                />
                            ))}
                            <div className="flex items-center ml-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${filledColor}`} />
                                <span className="text-[0.65rem] text-gray-500 ml-1">
                                    {phaseNames[Math.max(0, Math.min((project.phase || 1) - 1, 4))]}
                                </span>
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
                                    {project.category}
                                </span>
                                {project.technologies && project.technologies.map((tech, index) => (
                                    <span 
                                        key={index}
                                        className="flex bg-white px-1.5 py-[0.1rem] text-[0.65rem] rounded border border-gray-200 text-gray-500"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Scrollable Article Content */}
                <div ref={scrollContainerRef} className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-2 md:px-2 pb-4">
                    <ProjectArticleViewer 
                        project={project} 
                        onImageSelect={handleImageSelect}
                        selectedImageIndex={selectedImageIndex}
                        imageItems={imageItems}
                    />
                </div>
            </div>
            {/* Git Activity - Hidden on mobile */}
            {renderGitActivity && (
                <div className="hidden md:block relative z-[60]">
                    <GitActivity 
                        isVisible={true} 
                        project={project}
                        showComponent={showGitActivity}
                        position={{ left: '710px', top: '50px' }}
                    />  
                </div>
            )}
        </>
    );
};

export default ProjectsConstructionDetails; 