import React from 'react';

const ProjectCard = ({ title, date, image, description, category, technologies }) => {
    const getCategoryColor = (category) => {
        switch(category) {
            case 'Web Development':
                return 'text-green-300';
            case 'Research':
                return 'text-white';
            default:
                return 'text-gray-100';
        }
    };

    const getBorderColor = (category) => {
        switch(category) {
            case 'Web Development':
                return 'before:from-green-300';
            case 'Research':
                return 'before:from-purple-300';
            default:
                return 'before:from-gray-100';
        }
    };

    return (
        <div className={`
            relative bg-white rounded-xl p-1 shadow-md hover:shadow-xl 
            transition-all duration-300 ease-in-out w-[180px]
            hover:scale-105 cursor-pointer border border-gray-200
            before:absolute before:inset-0
            before:rounded-xl before:-z-10
            before:bg-gradient-to-r ${getBorderColor(category)} before:to-transparent
            before:opacity-0 hover:before:opacity-100
            before:animate-border-flow
        `}>
            {/* Category tag and Image container */}
            <div className="relative mb-3">
                {/* Category tag */}
                <div className="absolute top-2 left-2 z-10">
                    <span className={`flex bg-black/15 backdrop-blur-sm ${getCategoryColor(category)} px-1.5 py-0.5 text-[0.65rem] rounded-[0.2rem] border border-white/20 shadow-sm`}>
                        {category}
                    </span>
                </div>

                {/* Project image */}
                <div className="relative">
                    <img 
                        src={image} 
                        alt={title} 
                        className="w-full h-32 object-cover rounded-lg"
                    />
                    
                    {/* Technology tags overlay */}
                    <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-0.5">
                        {technologies.map((tech, index) => (
                            <span 
                                key={index}
                                className={`flex bg-black/20 backdrop-blur-sm text-gray-100 px-1 py-[0.1rem] text-[0.585rem] rounded-[0.2rem] border border-white/20 shadow-sm`}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pl-2">
                {/* Date */}
                <div className="text-gray-500 text-xs mb-1">
                    {date}
                </div>

                {/* Title and Description */}
                <h3 className="text-xs font-bold mb-1">{title}</h3>
                <p className="text-gray-600 text-[0.68rem] mb-8">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default ProjectCard; 