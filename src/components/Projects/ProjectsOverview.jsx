import React from 'react';
import ProjectsDna from './ProjectsDna';
import ProjectsGit from './ProjectsGit';

const ProjectsOverview = () => {
    return (
        <div className="absolute left-0 flex ml-16">
            <div className="backdrop-blur-sm bg-white/30 p-2 rounded-2xl shadow-lg w-[600px] h-[700px]">
                <h2 className="text-white text-sm font-medium mb-1 text-center">Projects Overview</h2>
                <div className="rounded-2xl w-full h-[96%] p-6">
                    {/* Projects Bio Section */}
                    <p className="text-sm mb-12 text-black">
                        I have a passion for <span className="text-purple-600">3D graphics</span> and <span className="text-purple-600">WebGL</span> development, 
                        creating immersive visual experiences on the web. I also enjoy working on <span className="text-blue-800">UI/UX projects</span>, 
                        crafting intuitive and engaging user interfaces. When I'm not working on web applications, 
                        I occasionally dive into <span className="text-blue-800">low-level embedded programming</span>, 
                        exploring the intersection of hardware and software.
                    </p>

                    {/* DNA Section */}
                    <div className="mb-12">
                        <ProjectsDna />
                    </div>

                    {/* GitHub Contributions Section */}
                    <div className="mt-8">
                        <ProjectsGit />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsOverview;