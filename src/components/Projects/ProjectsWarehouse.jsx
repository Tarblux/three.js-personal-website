import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectFilter from '../UI/ProjectFilter';
import ProjectDetails from './ProjectDetails';

const ProjectsWarehouse = () => {
    const [filter, setFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);

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

    const projects = [
        {
            title: "Three.js Personal Website",
            startDate: "2024-10-01",
            endDate: null,
            image: "/images/Projects/project-tester.png",
            description: "Interactive 3D portfolio website with modern tech stack",
            category: "development",
            technologies: ["Three.js", "React", "Node.js", "PostgreSQL"],
            story: "This project represents a significant milestone in my web development journey. I wanted to create something that would not only showcase my work but also demonstrate my ability to work with modern web technologies and 3D graphics. The site features interactive 3D elements that respond to user interaction, creating an engaging and memorable experience.",
            github: "https://github.com/Tarblux",
            link: "https://google.com"
        },
        {
            title: "Leetcode Dashboard",
            startDate: "2024-01-01",
            endDate: "2025-04-01",
            image: "/images/Projects/project-leet.png",
            description: "Personal progress tracking dashboard for coding practice",
            category: "development",
            technologies: ["React", "Node.js", "PostgreSQL"],
            story: "The Leetcode Dashboard was born from my desire to better track and visualize my progress in algorithmic problem-solving. I built this tool to help myself and other developers maintain consistency in their coding practice and identify areas for improvement.",
            github: "https://github.com/Tarblux",
            link: "https://google.com"
        },
        {
            title: "Creole Linguistics Study",
            startDate: "2022-12-01",
            endDate: "2023-02-01",
            image: "/images/Projects/project-creo.png",
            description: "Study of the Creole language spoken in Jamaica.",
            category: "research",
            technologies: ["R", "Python", "LaTeX"],
            story: "This research project involved analyzing linguistic patterns in Jamaican Creole, combining traditional linguistic research methods with modern data analysis techniques. The study provided valuable insights into language evolution and cultural preservation.",
            github: "https://github.com/Tarblux",
            link: "https://google.com"
        },
        {
            title: "Bukayo Saka Wall Art",
            startDate: "2023-07-19",
            endDate: "2023-07-19",
            image: "/images/Projects/B Saks Poster.png",
            description: "Minimalist black and white wall art design featuring Arsenal's Bukayo Saka",
            category: "media",
            technologies: ["Photoshop", "Digital Art", "Typography"],
            story: "This artistic piece combines portrait photography and sports imagery in a minimalist black and white style. The design features Arsenal star Bukayo Saka in two contrasting poses - a formal portrait with a signature pose and a celebratory moment from a match. The composition is enhanced with his signature, the Nigerian flag, and the Arsenal crest, creating a powerful visual narrative that celebrates both his heritage and his club identity."
        }
    ];

    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(project => project.category.toLowerCase() === filter);

    const handleProjectClick = (project) => {
        const formattedProject = {
            ...project,
            date: `${formatDate(project.startDate)} - ${project.endDate ? formatDate(project.endDate) : 'Present'} · ${calculateDuration(project.startDate, project.endDate)}`
        };
        setSelectedProject(formattedProject);
    };

    return (
        <div className="absolute left-0 flex ml-12 mt-12">
            <div className="bg-white/20 backdrop-blur-md rounded-lg w-[440px] p-2">
                <div className="bg-white rounded-lg p-1 pb-5">
                    <div className="mb-5 mt-2">
                        <ProjectFilter onFilterChange={setFilter} />
                    </div>
                    <div className="grid grid-cols-2 gap-y-4 justify-items-center">
                        {filteredProjects.map((project, index) => {
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