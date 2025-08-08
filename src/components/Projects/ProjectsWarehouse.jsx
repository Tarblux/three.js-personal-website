import React, { useState, useRef, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import ProjectFilter from '../UI/ProjectFilter';
import ProjectDetails from './ProjectDetails';
import { projects } from '../../data/projects';

const ProjectsWarehouse = () => {
    const [filter, setFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const containerRef = useRef(null);

    const calculateDuration = (startDate, endDate = null) => {
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : new Date();
        
        const diffTime = Math.abs(end - start);
        const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44));
        
        const years = Math.floor(diffMonths / 12);
        const months = diffMonths % 12;
        
        let duration = '';
        if (years > 0) {
            duration += `${years} yr${years > 1 ? 's' : ''} `;
        }
        if (months > 0) {
            duration += `${months} mo`;
        }
        
        return duration;
    };

    const formatDate = (date) => {
        const d = new Date(date + 'T00:00:00Z');
        return d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }) + " '" + d.getFullYear().toString().slice(-2);
    };

    const filteredProjects = filter === 'all' 
        ? [...projects].sort((a, b) => a.order - b.order)
        : projects.filter(project => project.category.toLowerCase() === filter)
            .sort((a, b) => a.order - b.order);

    const totalPages = Math.ceil(filteredProjects.length / 4);
    const currentProjects = filteredProjects.slice(currentPage * 4, (currentPage + 1) * 4);

    const handleScroll = (event) => {
        if (event.deltaY > 0 && currentPage < totalPages - 1) {
            setCurrentPage(prev => prev + 1);
        } else if (event.deltaY < 0 && currentPage > 0) {
            setCurrentPage(prev => prev - 1);
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleScroll);
            return () => container.removeEventListener('wheel', handleScroll);
        }
    }, [currentPage, totalPages]);

    useEffect(() => {
        setCurrentPage(0); // Reset to first page when filter changes
    }, [filter]);

    const handleProjectClick = (project) => {
        const formattedProject = {
            ...project,
            date: `${formatDate(project.startDate)} - ${project.endDate ? formatDate(project.endDate) : 'Present'} · ${calculateDuration(project.startDate, project.endDate)}`
        };
        setSelectedProject(formattedProject);
    };

    return (
        <div className="relative md:absolute md:left-0 flex flex-col md:flex-row mx-4 md:mx-0 md:ml-12 mt-4 md:mt-10">
            <div className="flex flex-col items-start w-full md:w-auto">
                <span className="mb-2 bg-white/30 border border-white/30 backdrop-blur-md rounded-md px-3 py-1 shadow-md text-gray-600 text-xs inline-block">
                    Projects Warehouse
                </span>
                <div className="bg-white/20 backdrop-blur-md rounded-lg w-full md:w-[500px] border border-white/30 overflow-hidden px-1 py-2 md:max-h-none max-h-[calc(100vh-8rem)] flex flex-col">
                    <div className="px-[6px] pb-0">
                        <ProjectFilter onFilterChange={setFilter} filter={filter} />
                    </div>
                    <div className="bg-white rounded-lg mx-1 px-4 pt-4 pb-4 md:pb-5 flex-1 md:h-auto">
                        <div 
                            ref={containerRef}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 justify-items-center min-h-[620px] relative md:overflow-visible overflow-y-auto md:max-h-none max-h-[calc(100vh-22rem)] md:py-0 py-2"
                        >
                            {currentProjects.map((project, index) => {
                                const startDate = formatDate(project.startDate);
                                const endDate = project.endDate ? formatDate(project.endDate) : 'Present';
                                const duration = calculateDuration(project.startDate, project.endDate);
                                
                                return (
                                    <div key={index} onClick={() => handleProjectClick(project)}>
                                        <ProjectCard
                                            title={project.title}
                                            date={`${startDate} - ${endDate} · ${duration}`}
                                            image={project.thumbnail}
                                            description={project.description}
                                            category={project.category}
                                            technologies={project.technologies}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        {/* Mobile Navigation - Previous/Next buttons */}
                        <div className="flex md:hidden items-center justify-between mt-3">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                                disabled={currentPage === 0}
                                className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
                                    currentPage === 0 
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                        : 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm'
                                }`}
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Previous
                            </button>
                            
                            <div className="text-gray-500 text-xs font-medium">
                                {currentPage + 1} / {totalPages}
                            </div>
                            
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                                disabled={currentPage === totalPages - 1}
                                className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all duration-200 ${
                                    currentPage === totalPages - 1 
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                        : 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm'
                                }`}
                            >
                                Next
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Desktop Navigation - Dot pagination */}
                        <div className="hidden md:flex items-center justify-center gap-4 mt-4">
                            <div className="flex gap-2">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i)}
                                        className={`h-2 w-3 rounded-full transition-all duration-300 hover:bg-gray-600 cursor-pointer
                                            ${currentPage === i ? 'bg-blue-800 w-6' : 'bg-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <div className="text-gray-400 text-xs">
                                {currentPage + 1} / {totalPages}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <ProjectDetails 
                project={selectedProject}
                isVisible={selectedProject !== null}
                onClose={() => setSelectedProject(null)}
            />
        </div>
    );
};

export default ProjectsWarehouse;