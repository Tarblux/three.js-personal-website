import React from 'react';

const phaseColors = [
    'bg-red-400',     // Plan
    'bg-orange-400',  // Design
    'bg-yellow-400',  // Development
    'bg-blue-400',   // Testing
    'bg-green-400'     // Deployment
];

const ProjectsConstructionCard = ({ title, date, image, description, category, technologies, phase = 1 }) => {
    const getCategoryColor = (category) => {
        switch(category?.toLowerCase()) {
            case 'development':
                return 'text-blue-400';
            case 'research':
                return 'text-purple-400';
            case 'media':
                return 'text-emerald-400';
            default:
                return 'text-white';
        }
    };

    const getBorderColor = (category) => {
        switch(category?.toLowerCase()) {
            case 'development':
                return 'before:from-blue-400/50';
            case 'research':
                return 'before:from-purple-400/50';
            case 'media':
                return 'before:from-emerald-400/50';
            default:
                return 'before:from-gray-400/50';
        }
    };

    const getCategoryName = (category) => {
        switch(category?.toLowerCase()) {
            case 'development':
                return 'Software Development';
            case 'research':
                return 'Research';
            case 'media':
                return 'Digital Media';
            default:
                return category;
        }
    };

    // All filled bars use the color of the current phase
    const filledColor = phaseColors[Math.max(0, Math.min(phase - 1, 4))];

    return (
        <div className={`
            relative bg-white rounded-xl p-1 shadow-md hover:shadow-xl 
            transition-all duration-300 ease-in-out w-[220px] min-h-[300px]
            hover:scale-105 cursor-pointer border border-gray-200
            before:absolute before:inset-0
            before:rounded-xl before:-z-10
            before:bg-gradient-to-r ${getBorderColor(category)} before:to-transparent
            before:opacity-0 hover:before:opacity-100
            before:animate-border-flow
            flex flex-col justify-between
        `}>
            {/* Category tag and Image container */}
            <div className="relative mb-3">
                {/* Category tag */}
                <div className="absolute top-2 left-2 z-10">
                    <span className={`flex bg-black/15 backdrop-blur-sm ${getCategoryColor(category)} px-1.5 py-0.5 text-[0.65rem] rounded-[0.2rem] border border-white/20 shadow-sm`}>
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
                        {technologies && technologies.map((tech, index) => (
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
                <h3 className="text-sm font-bold mb-1">{title}</h3>
                <p className="text-gray-600 text-[0.68rem] mb-6">
                    {description}
                </p>
            </div>
            {/* Progress bars */}
            <div className="flex justify-center items-center w-full mt-2 mb-2">
                {Array.from({ length: 5 }).map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-[3px] w-6 rounded-full ${idx < phase ? filledColor : 'bg-gray-300'} mx-0.5`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProjectsConstructionCard; 