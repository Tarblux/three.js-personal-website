import React from 'react';
import ProjectsDna from './ProjectsDna';
import ProjectsGit from './ProjectsGit';

const ProjectsOverview = () => {
    return (
        <div className="absolute left-2 top-5 flex ml-2 sm:ml-5 w-full pr-6 sm:pr-8">
            <div className="flex flex-col items-start w-full max-w-[550px]">
                <span className="mb-2 bg-white/30 border border-white/30 backdrop-blur-md rounded-md px-3 py-1 shadow-md text-gray-600 text-xs inline-block">
                    Project Labs
                </span>
                <div className="bg-white/20 backdrop-blur-md rounded-lg w-full p-1 sm:p-2 border border-white/30">
                    <div className="grid grid-cols-1 gap-2 sm:gap-3">
                        {/* DNA Section */}
                        <div className="rounded-lg">
                            <ProjectsDna />
                        </div>

                        {/* GitHub Contributions Section */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg transform transition-all duration-300">
                            <ProjectsGit />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsOverview;