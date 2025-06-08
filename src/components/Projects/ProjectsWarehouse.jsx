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
        <div className="absolute left-0 flex ml-12 mt-10">
            <div className="flex flex-col items-start">
                <span className="mb-2 bg-white/30 border border-white/30 backdrop-blur-md rounded-md px-3 py-1 shadow-md text-gray-600 text-xs inline-block">
                    Projects Warehouse
                </span>
                <div className="bg-white/20 backdrop-blur-md rounded-lg w-[500px] border border-white/30 overflow-hidden px-1 py-2">
                    <div className="px-[6px] pb-0">
                        <ProjectFilter onFilterChange={setFilter} filter={filter} />
                    </div>
                    <div className="bg-white rounded-lg mx-1 px-4 pt-4 pb-5">
                        <div 
                            ref={containerRef}
                            className="grid grid-cols-2 gap-4 justify-items-center min-h-[620px] relative"
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
                                            image={project.image}
                                            description={project.description}
                                            category={project.category}
                                            technologies={project.technologies}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-4">
                            <div className="flex gap-2">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i)}
                                        className={`h-1.5 w-1.5 rounded-full transition-all duration-300 hover:bg-gray-600 cursor-pointer
                                            ${currentPage === i ? 'bg-blue-800 w-4' : 'bg-gray-300'}`}
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