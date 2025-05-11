import React, { useState } from 'react'

const CollegeJobs = () => {
    const [expandedJob, setExpandedJob] = useState(null);

    return (
        <div className="absolute left-0 right-0 flex justify-center">
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 w-[320px] min-h-[420px] border border-white/30">
                <div className="space-y-4">
                    {/* First Job */}
                    <div 
                        className="bg-white rounded-lg shadow-lg p-3 transition-all duration-500 cursor-pointer"
                        onClick={() => setExpandedJob(expandedJob === 1 ? null : 1)}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2.5">
                                <img 
                                    src="/images/Education/k-logo-rounded.png" 
                                    alt="K Logo" 
                                    className="w-8 h-8 rounded"
                                />
                                <div>
                                    <h3 className="text-xs font-bold">Teaching Assistant</h3>
                                    <p className="text-gray-600 text-xs">Mathematics Dept</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="bg-gray-200 px-2 py-0.5 rounded text-xs text-gray-600 whitespace-nowrap">
                                    2021 - 2022
                                </span>
                                <span className="text-[10px] text-gray-400 mt-0.5 text-center">
                                    1 yr
                                </span>
                            </div>
                        </div>
                        <div className={`transition-all duration-500 overflow-hidden ${expandedJob === 1 ? 'max-h-[200px] mt-3' : 'max-h-0'}`}>
                            <p className="text-gray-700 text-xs">
                                Assisted students with research materials and maintained the organization of digital and physical resources. Helped implement a new cataloging system that improved resource accessibility.
                            </p>
                        </div>
                    </div>

                    {/* Second Job */}
                    <div 
                        className="bg-white rounded-lg shadow-lg p-3 transition-all duration-500 cursor-pointer"
                        onClick={() => setExpandedJob(expandedJob === 2 ? null : 2)}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2.5">
                                <img 
                                    src="/images/Education/k-logo-rounded.png" 
                                    alt="K Logo" 
                                    className="w-8 h-8 rounded"
                                />
                                <div>
                                    <h3 className="text-xs font-bold">Peer Advisor</h3>
                                    <p className="text-gray-600 text-xs">Center for International Programs</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="bg-gray-200 px-2 py-0.5 rounded text-xs text-gray-600 whitespace-nowrap">
                                    2020 - 2021
                                </span>
                                <span className="text-[10px] text-gray-400 mt-0.5 text-center">
                                    1 yr
                                </span>
                            </div>
                        </div>
                        <div className={`transition-all duration-500 overflow-hidden ${expandedJob === 2 ? 'max-h-[200px] mt-3' : 'max-h-0'}`}>
                            <p className="text-gray-700 text-xs">
                                Provided technical support to students and faculty, troubleshooting hardware and software issues. Contributed to the development of a new ticketing system that reduced response times by 30%.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollegeJobs