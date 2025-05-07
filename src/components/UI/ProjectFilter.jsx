import React from 'react';

const ProjectFilter = ({ onFilterChange }) => {
    return (
        <div className="radio-inputs">
            <label className="radio">
                <input 
                    defaultChecked 
                    name="projectFilter" 
                    type="radio"
                    onChange={() => onFilterChange('all')}
                />
                <span className="name">All</span>
            </label>
            <label className="radio">
                <input 
                    name="projectFilter" 
                    type="radio"
                    onChange={() => onFilterChange('development')}
                />
                <span className="name">Development</span>
            </label>
            <label className="radio">
                <input 
                    name="projectFilter" 
                    type="radio"
                    onChange={() => onFilterChange('research')}
                />
                <span className="name">Research</span>
            </label>
            <label className="radio">
                <input 
                    name="projectFilter" 
                    type="radio"
                    onChange={() => onFilterChange('media')}
                />
                <span className="name">Media</span>
            </label>
        </div>
    );
};

export default ProjectFilter; 