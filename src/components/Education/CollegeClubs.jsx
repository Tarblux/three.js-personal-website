import React, { useState } from 'react'
import { collegeClubs } from '../../data/collegeClubs'

function calculateDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    if (months < 0) {
        years--;
        months += 12;
    }
    let result = '';
    if (years > 0) result += `${years} yr${years > 1 ? 's' : ''} `;
    if (months > 0) result += `${months} mo${months > 1 ? 's' : ''}`;
    return result.trim() || '0 mos';
}

function getYearsString(startDate, endDate) {
    const startYear = new Date(startDate).getFullYear();
    const endYear = endDate ? new Date(endDate).getFullYear() : 'Present';
    return `${startYear} - ${endYear}`;
}

const CollegeClubs = () => {
    const [expandedClub, setExpandedClub] = useState(null);
    const [hoveredClub, setHoveredClub] = useState(null);

    return (
        <div className="absolute top-0 right-0 z-0 p-4 md:p-8">
            <div className="flex flex-col items-start">
                <span className="mb-2 bg-white/30 border border-white/30 backdrop-blur-md rounded-md px-3 py-1 shadow-md text-gray-600 text-xs inline-block">
                    College Clubs & Organizations
                </span>
                <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 w-[320px] min-h-[320px] border border-white/30">
                    <div className="space-y-4">
                        {collegeClubs.map((club) => (
                            <div
                                key={club.id}
                                className="bg-white rounded-lg shadow-lg p-3 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl hover:bg-gray-50"
                                onClick={() => setExpandedClub(expandedClub === club.id ? null : club.id)}
                                onMouseEnter={() => setHoveredClub(club.id)}
                                onMouseLeave={() => setHoveredClub(null)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <img
                                            src={club.logo}
                                            alt={`${club.organization} Logo`}
                                            className="w-8 h-8 rounded"
                                        />
                                        <div>
                                            <h3 className="text-xs font-bold">{club.organization}</h3>
                                            <p className="text-gray-600 text-xs">{club.title}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="bg-gray-200 px-2 py-0.5 rounded text-xs text-gray-600 whitespace-nowrap">
                                            {getYearsString(club.startDate, club.endDate)}
                                        </span>
                                    </div>
                                </div>
                                <div className={`transition-all duration-500 overflow-hidden ${expandedClub === club.id || hoveredClub === club.id ? 'max-h-[200px] mt-3' : 'max-h-0'}`}>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {club.bullets && club.bullets.map((bullet, idx) => (
                                            <li key={idx} className="text-gray-700 text-xs">{bullet}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollegeClubs