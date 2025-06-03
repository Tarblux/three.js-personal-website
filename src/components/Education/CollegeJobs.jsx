import React, { useState } from 'react'
import { collegeJobs } from '../../data/collegeJobs'

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

const CollegeJobs = () => {
    const [expandedJob, setExpandedJob] = useState(null);
    const [hoveredJob, setHoveredJob] = useState(null);
    const regularJobs = collegeJobs.slice(0, 5);
    const volunteeringJobs = collegeJobs.slice(5);

    return (
        <div className="fixed top-8 right-8 z-0">
            <div className="flex flex-col items-start">
                <span className="mb-2 bg-white/30 border border-white/30 backdrop-blur-md rounded-md px-3 py-1 shadow-md text-gray-600 text-xs inline-block">
                    College Employment
                </span>
                <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 w-[320px] min-h-[420px] border border-white/30">
                    <div className="space-y-4">
                        {regularJobs.map((job) => (
                            <div
                                key={job.id}
                                className="bg-white rounded-lg shadow-lg p-3 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl hover:bg-gray-50"
                                onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                                onMouseEnter={() => setHoveredJob(job.id)}
                                onMouseLeave={() => setHoveredJob(null)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <img
                                            src={job.logo}
                                            alt="K Logo"
                                            className="w-8 h-8 rounded"
                                        />
                                        <div>
                                            <h3 className="text-xs font-bold">{job.title}</h3>
                                            <p className="text-gray-600 text-xs">{job.organization}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="bg-gray-200 px-2 py-0.5 rounded text-xs text-gray-600 whitespace-nowrap">
                                            {getYearsString(job.startDate, job.endDate)}
                                        </span>
                                        <span className="text-[10px] text-gray-400 mt-0.5 text-center">
                                            {calculateDuration(job.startDate, job.endDate)}
                                        </span>
                                    </div>
                                </div>
                                <div className={`transition-all duration-1000 overflow-hidden ${expandedJob === job.id || hoveredJob === job.id ? 'max-h-[200px] mt-3' : 'max-h-0'}`}>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {job.bullets && job.bullets.map((bullet, idx) => (
                                            <li key={idx} className="text-gray-700 text-xs">{bullet}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center my-6">
                      <div className="flex-grow border-t border-dashed border-gray-300"></div>
                      <span className="mx-4 text-xs text-gray-600 font-semibold uppercase tracking-wider bg-white/80 px-2 rounded">
                        Volunteering
                      </span>
                      <div className="flex-grow border-t border-dashed border-gray-300"></div>
                    </div>
                    <div className="space-y-4">
                        {volunteeringJobs.map((job) => (
                            <div
                                key={job.id}
                                className="bg-white rounded-lg shadow-lg p-3 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl hover:bg-gray-50"
                                onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                                onMouseEnter={() => setHoveredJob(job.id)}
                                onMouseLeave={() => setHoveredJob(null)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <img
                                            src={job.logo}
                                            alt="K Logo"
                                            className="w-8 h-8 rounded"
                                        />
                                        <div>
                                            <h3 className="text-xs font-bold">{job.title}</h3>
                                            <p className="text-gray-600 text-xs">{job.organization}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="bg-gray-200 px-2 py-0.5 rounded text-xs text-gray-600 whitespace-nowrap">
                                            {getYearsString(job.startDate, job.endDate)}
                                        </span>
                                        <span className="text-[10px] text-gray-400 mt-0.5 text-center">
                                            {calculateDuration(job.startDate, job.endDate)}
                                        </span>
                                    </div>
                                </div>
                                <div className={`transition-all duration-1000 overflow-hidden ${expandedJob === job.id || hoveredJob === job.id ? 'max-h-[200px] mt-3' : 'max-h-0'}`}>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {job.bullets && job.bullets.map((bullet, idx) => (
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

export default CollegeJobs