import React, { useState } from 'react';
import ProjectsConstructionCard from './ProjectsConstructionCard';
import ProjectsConstructionDetails from './ProjectsConstructionDetails';
import { projectsConstruction } from '../../data/projectsConstruction';

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
    return duration.trim();
};

const formatDate = (date) => {
    const d = new Date(date + 'T00:00:00Z');
    return d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }) + " '" + d.getFullYear().toString().slice(-2);
};

const ProjectsConstruction = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const handleProjectClick = (project) => {
        const startDate = formatDate(project.startDate);
        const endDate = project.endDate ? formatDate(project.endDate) : 'Present';
        const duration = calculateDuration(project.startDate, project.endDate);
        setSelectedProject({
            ...project,
            date: `${startDate} - ${endDate} · ${duration}`
        });
    };

    return (
        <div className="absolute right-0 top-0 flex flex-row-reverse items-start mr-12 mt-12">
            <div className="bg-white/20 backdrop-blur-md rounded-lg w-[440px] p-1.5 border border-white/30">
                <div className="bg-white rounded-lg p-1 pb-5 pt-5">
                    <div className="grid grid-cols-2 gap-y-4 justify-items-center min-h-[500px] relative">
                        {projectsConstruction.map((project, idx) => (
                            <div key={idx} onClick={() => handleProjectClick(project)}>
                                <ProjectsConstructionCard
                                    title={project.title}
                                    date={`${formatDate(project.startDate)} - ${project.endDate ? formatDate(project.endDate) : 'Present'} · ${calculateDuration(project.startDate, project.endDate)}`}
                                    image={project.image}
                                    description={project.description}
                                    category={project.category}
                                    technologies={project.technologies}
                                    phase={project.phase}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ProjectsConstructionDetails
                project={selectedProject}
                isVisible={selectedProject !== null}
                onClose={() => setSelectedProject(null)}
            />
        </div>
    );
};

export default ProjectsConstruction;