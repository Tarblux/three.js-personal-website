import React from 'react';
import ProjectsDna from './ProjectsDna';
import ProjectsGit from './ProjectsGit';

const ProjectsOverview = () => {
    return (
        <div className="absolute left-0 flex ml-16">
            <div className=" backdrop-blur-md rounded-lg p-4 w-[570px]">
                <h2 className="text-white text-lg font-medium mb-4 text-center">Project Labs</h2>
                <div className="grid grid-cols-1 gap-4">
                    {/* DNA Section */}
                    <div className=" backdrop-blur-sm rounded-lg p-4">
                        <ProjectsDna />
                    </div>

                    {/* GitHub Contributions Section */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg">
                        <ProjectsGit />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsOverview;