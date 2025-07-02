import React from 'react';

const ProjectCard = ({ title, date, image, description, category, technologies }) => {
    const getCategoryColor = (category) => {
        switch(category.toLowerCase()) {
            case 'development':
                return 'text-cyan-300';
            case 'research':
                return 'text-pink-300';
            case 'media':
                return 'text-emerald-400';
            default:
                return 'text-gray-600';
        }
    };

    const getBorderColor = (category) => {
        switch(category.toLowerCase()) {
            case 'development':
                return 'before:from-cyan-500/50';
            case 'research':
                return 'before:from-purple-400/50';
            case 'media':
                return 'before:from-emerald-400/50';
            default:
                return 'before:from-gray-400/50';
        }
    };

    const getCategoryName = (category) => {
        switch(category.toLowerCase()) {
            case 'development':
                return 'Software Engineering';
            case 'research':
                return 'Research';
            case 'media':
                return 'Digital Media';
            default:
                return category;
        }
    };

    return (
        <div className={`
            relative bg-white rounded-xl p-1 shadow-md hover:shadow-xl 
            transition-all duration-300 ease-in-out w-[220px] min-h-[300px]
            hover:scale-105 cursor-pointer border-2 border-gray-200
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
                    <span className={`flex bg-white/15 backdrop-blur-sm ${getCategoryColor(category)} px-1.5 py-0.5 text-[0.65rem] rounded-[0.2rem] border border-white/20 shadow-sm`}>
                        {getCategoryName(category)}
                    </span>
                </div>

                {/* Project image */}
                <div className="relative">
                    <img 
                        src={image} 
                        alt={title} 
                        className="w-full h-36 object-cover rounded-lg"
                    />
                    
                    {/* Technology tags overlay */}
                    <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-0.5">
                        {technologies.map((tech, index) => (
                            <span 
                                key={index}
                                className={`flex bg-white/20 backdrop-blur-sm text-gray-100 px-1 py-[0.1rem] text-[0.585rem] rounded-[0.2rem] border border-white/20 shadow-sm`}
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
                <h3 className="text-sm font-bold mb-1">{title}</h3>
                <p className="text-gray-600 text-[12px] mb-6">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default ProjectCard; 