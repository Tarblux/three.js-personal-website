import React from 'react';

const ProjectFilter = ({ onFilterChange, filter }) => {
    return (
        <div className="flex relative mx-3 -mb-[1px]">
            <button 
                onClick={() => onFilterChange('all')}
                className={`px-3 py-2 text-xs rounded-t-lg mr-0.5 transition-all flex-1 text-center relative ${
                    filter === 'all' 
                        ? 'bg-white text-blue-700 font-semibold tab-active' 
                        : 'text-gray-600 hover:text-black hover:bg-white/50'
                }`}
            >
                All
            </button>
            <button 
                onClick={() => onFilterChange('development')}
                className={`px-3 py-2 text-xs rounded-t-lg mx-0.5 transition-all flex-1 text-center relative ${
                    filter === 'development' 
                        ? 'bg-white text-blue-400  font-semibold tab-active' 
                        : 'text-gray-700 hover:text-black hover:bg-white/50'
                }`}
            >
                Development
            </button>
            <button 
                onClick={() => onFilterChange('research')}
                className={`px-3 py-2 text-xs rounded-t-lg mx-0.5 transition-all flex-1 text-center relative ${
                    filter === 'research' 
                        ? 'bg-white text-purple-400 font-semibold tab-active' 
                        : 'text-gray-700 hover:text-black hover:bg-white/50'
                }`}
            >
                Research
            </button>
            <button 
                onClick={() => onFilterChange('media')}
                className={`px-3 py-2 text-xs rounded-t-lg ml-0.5 transition-all flex-1 text-center relative ${
                    filter === 'media' 
                        ? 'bg-white text-emerald-400 font-semibold tab-active' 
                        : 'text-gray-700 hover:text-black hover:bg-white/50'
                }`}
            >
                Media
            </button>
        </div>
    );
};

export default ProjectFilter; 