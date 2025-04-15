import React from 'react';
import ProjectsDna from './ProjectsDna';
import ProjectsGit from './ProjectsGit';

const ProjectsOverview = () => {
    return (
        <div className="absolute left-0 flex ml-16">
            <div className="backdrop-blur-sm bg-white/30 p-2 rounded-2xl shadow-lg w-[600px] h-[750px]">
                <h2 className="text-white text-sm font-medium mb-1 text-center">Project Labs</h2>
                <div className="rounded-2xl w-full h-[96%] p-1 flex flex-col gap-4">

                    {/* DNA Section */}
                    <div>
                        <ProjectsDna />
                    </div>

                    {/* GitHub Contributions Section */}
                    <div>
                        <ProjectsGit />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsOverview;