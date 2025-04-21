import React from 'react';
import ProjectsDna from './ProjectsDna';
import ProjectsGit from './ProjectsGit';

const ProjectsOverview = () => {
    return (
        <div className="absolute left-0 flex ml-5">
            <div className="bg-white/20 backdrop-blur-md rounded-lg w-[600px] p-3">
                {/* <h2 className="text-white text-lg font-medium mb-6 text-center">Project Labs</h2> */}
                <div className="grid grid-cols-1 gap-6">
                    {/* DNA Section */}
                    <div className="rounded-lg">
                        <ProjectsDna />
                    </div>

                    {/* GitHub Contributions Section */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg transform transition-all duration-300 hover:scale-[1.04] mb-2">
                        <ProjectsGit />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsOverview;