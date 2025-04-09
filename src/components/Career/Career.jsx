import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa';

const Career = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const calculateDuration = () => {
        const startDate = new Date('2023-07-01');
        const currentDate = new Date();
        
        let years = currentDate.getFullYear() - startDate.getFullYear();
        let months = currentDate.getMonth() - startDate.getMonth();
        
        if (months < 0) {
            years--;
            months += 12;
        }
        
        return `${years}yr ${months}mos`;
    };

    return (
        <div className="fixed top-8 right-8 z-0">
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 w-[308px] min-h-[420px]">
                <h2 className="text-white text-md font-medium mb-2 ml-1">Professional Experience</h2>
                
                <div className="space-y-4">
                    {/* Flextrade Experience */}
                    <div className={`bg-white rounded-lg shadow-lg p-3 transition-all duration-500 ${isExpanded ? 'opacity-50' : 'opacity-100'}`}>
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2.5">
                                <img 
                                    src="/icons/flextrade_logo.jpg" 
                                    alt="Flextrade Systems" 
                                    className="w-8 h-8 rounded"
                                />
                                <div>
                                    <h3 className="text-xs font-bold">Software Engineer</h3>
                                    <p className="text-gray-600 text-xs">Flextrade</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="bg-gray-200 px-2 py-0.5 rounded text-xs text-gray-600 whitespace-nowrap">
                                    2023 - Present
                                </span>
                                <span className="text-[10px] text-black mt-0.5 text-center">
                                    {calculateDuration()}
                                </span>
                            </div>
                        </div>

                        <div className={`transition-all duration-500 overflow-hidden ${!isExpanded ? 'max-h-[500px]' : 'max-h-0'}`}>
                            <div className="space-y-2 mb-4">
                                <div className="flex items-start gap-2 text-gray-700 text-xs">
                                    <FaCheck className="text-green-500 mt-0.5 flex-shrink-0" size={12} />
                                    <span>Work on scala microservices architecture</span>
                                </div>
                                <div className="flex items-start gap-2 text-gray-700 text-xs">
                                    <FaCheck className="text-green-500 mt-0.5 flex-shrink-0" size={12} />
                                    <span>Build Autoamtion for high frequency trading algorithms with risk analysis</span>
                                </div>
                                <div className="flex items-start gap-2 text-gray-700 text-xs">
                                    <FaCheck className="text-green-500 mt-0.5 flex-shrink-0" size={12} />
                                    <span>Implement real-time market data processing systems</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-bold mb-3">Programming Languages:</p>
                                <div className="flex gap-4 mb-3">
                                    <div className="flex flex-col items-center">
                                        <img src="/icons/python.svg" alt="Python" className="w-6 h-6" />
                                        <span className="text-[9px] mt-0.5">Python</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <img src="/icons/scala.svg" alt="Scala" className="w-6 h-6" />
                                        <span className="text-[9px] mt-0.5">Scala</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <img src="/icons/grpc-icon-color.png" alt="gRPC" className="w-6 h-6" />
                                        <span className="text-[9px] mt-0.5">gRPC</span>
                                    </div>
                                </div>

                                <p className="text-xs font-bold mb-3">Tools:</p>
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <img src="/icons/docker.svg" alt="Docker" className="w-6 h-6" />
                                        <span className="text-[9px] mt-0.5">Docker</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <img src="/icons/jira-1.svg" alt="Jira" className="w-6 h-6" />
                                        <span className="text-[9px] mt-0.5">Jira</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <img src="/icons/Jenkins_logo.svg" alt="Jenkins" className="w-6 h-6" />
                                        <span className="text-[9px] mt-0.5">Jenkins</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <img src="/icons/intellijidea.svg" alt="IntelliJ" className="w-6 h-6" />
                                        <span className="text-[9px] mt-0.5">IntelliJ</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Eagle Medical Experience */}
                    <div className={`bg-white rounded-lg shadow-lg p-3 transition-all duration-500 ${isExpanded ? 'opacity-100' : 'opacity-50'}`}>
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <img 
                                    src="/images/eagle-med.png" 
                                    alt="Eagle Medical Lab" 
                                    className="w-10 h-10"
                                />
                                <div>
                                    <h3 className="text-sm font-bold">Data Analyst Intern</h3>
                                    <p className="text-gray-600 text-sm">Eagle Medical Lab</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="bg-gray-200 px-2 py-0.5 rounded text-xs text-gray-600">
                                    2022
                                </span>
                                <span className="text-[10px] text-black mt-0.5 text-center">
                                    3 mos
                                </span>
                            </div>
                        </div>

                        <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-[500px]' : 'max-h-0'}`}>
                            <div className="space-y-2 mt-4 mb-4">
                                <div className="flex items-start gap-2 text-gray-700 text-xs">
                                    <FaCheck className="text-green-500 mt-0.5 flex-shrink-0" size={12} />
                                    <span>Analyzed medical laboratory data to identify trends and patterns</span>
                                </div>
                                <div className="flex items-start gap-2 text-gray-700 text-xs">
                                    <FaCheck className="text-green-500 mt-0.5 flex-shrink-0" size={12} />
                                    <span>Created data visualizations and reports for management</span>
                                </div>
                                <div className="flex items-start gap-2 text-gray-700 text-xs">
                                    <FaCheck className="text-green-500 mt-0.5 flex-shrink-0" size={12} />
                                    <span>Developed automated data processing scripts</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-bold mb-3">Programming Languages:</p>
                                <div className="flex gap-4 mb-3">
                                    <div className="flex flex-col items-center">
                                        <img src="/icons/R_light.svg" alt="R" className="w-6 h-6" />
                                        <span className="text-[9px] mt-0.5">R</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <img src="/icons/python.svg" alt="Python" className="w-6 h-6" />
                                        <span className="text-[9px] mt-0.5">Python</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <img src="/icons/postgresql.svg" alt="PostgreSQL" className="w-6 h-6" />
                                        <span className="text-[9px] mt-0.5">PostgreSQL</span>
                                    </div>
                                </div>

                                <p className="text-xs font-bold mb-3">Tools:</p>
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <img src="/icons/Github_light.svg" alt="Github" className="w-6 h-6" />
                                        <span className="text-[9px] mt-0.5">Github</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <img src="/icons/mysql.svg" alt="MySQL" className="w-6 h-6" />
                                        <span className="text-[9px] mt-0.5">MySQL</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-4 w-full  bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                    {isExpanded ? 'Test' : 'Test'}
                </button>
            </div>
        </div>
    );
};

export default Career