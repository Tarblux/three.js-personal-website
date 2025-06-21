import React, { useState, useEffect } from 'react';
import GitActivity from './GitActivity';

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

    useEffect(() => {
        if (isVisible) {
            setIsClosing(false);
            
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

    if (!isVisible || !project) return null;

    const getCategoryColor = (category) => {
        switch(category?.toLowerCase()) {
            case 'development':
                return 'text-blue-500';
            case 'research':
                return 'text-purple-500';
            case 'media':
                return 'text-emerald-500';
            default:
                return 'text-black';
        }
    };

    // All filled bars use the color of the current phase
    const filledColor = phaseColors[Math.max(0, Math.min((project.phase || 1) - 1, 4))];

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
                className={`fixed left-[100px] top-[48px] w-[600px] min-h-[400px] bg-white/95 backdrop-blur-sm
                    rounded-2xl shadow-lg transform-gpu
                    ${isClosing ? 'animate-fold' : 'animate-unfold'}`}
                style={{ transformOrigin: 'center center' }}
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

                    {/* Main image display */}
                    <div className="p-6 pb-2 relative">
                        <div className="w-full h-[300px] rounded-xl overflow-hidden !shadow-none relative group transition-all duration-300 hover:scale-[1.02] hover:rounded-2xl">
                            <img 
                                src={project.thumbnail} 
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="px-6">
                        {/* Header with date */}
                        <div className="mb-2 mr-2 flex justify-between items-center">
                            <div className="text-gray-500 text-xs">{project.date}</div>
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

                        {/* Story/Details */}
                        <div>
                            <p className="text-gray-600 text-sm font-thin leading-relaxed mb-3">
                                {project.story || "Beep Boop, I'm a project story!"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Git Activity */}
            {renderGitActivity && (
                <GitActivity 
                    isVisible={true} 
                    project={project}
                    showComponent={showGitActivity}
                    position={{ left: '710px', top: '50px' }}
                />  
            )}
        </>
    );
};

export default ProjectsConstructionDetails; 