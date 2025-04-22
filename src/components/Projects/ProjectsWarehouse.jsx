import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectsWarehouse = () => {
    const projects = [
,
        {
            title: "Three.js Personal Website",
            date: "Oct '24 - Present · 7 mo",
            image: "/images/project-tester.png",
            description: "Interactive 3D portfolio website with modern tech stack",
            category: "Web Development",
            technologies: ["Three.js", "React", "Node.js", "PostgreSQL"]
        },
        {
            title: "Leetcode Dashboard",
            date: "Jan '24 - Apr '25 · 1 yr 4 mo",
            image: "/images/project-leet.png",
            description: "Personal progress tracking dashboard for coding practice",
            category: "Web Development",
            technologies: ["React", "Node.js", "PostgreSQL"]
        },
        {
            title: "Creole Linguistics Study",
            date: "Jan '23 - Mar '23 · 3 mo",
            image: "/images/project-creo.png",
            description: "Study of the Creole language spoken in Jamaica.",
            category: "Research",
            technologies: ["R", "Python", "LaTeX"]
        }
    ];

    return (
        <div className="absolute left-0 flex ml-12 mt-12">
            <div className="bg-white/20 backdrop-blur-md rounded-lg w-[440px] p-2">
                <div className="bg-white rounded-lg p-1 pb-5">
                    <h2 className="text-xl font-bold mb-5 mt-2 text-center">Project Warehouse</h2>
                    <div className="grid grid-cols-2  gap-y-4 justify-items-center">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={index}
                                title={project.title}
                                date={project.date}
                                image={project.image}
                                description={project.description}
                                category={project.category}
                                technologies={project.technologies}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsWarehouse;