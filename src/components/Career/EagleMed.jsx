import React from 'react'
import { FaCheck } from 'react-icons/fa';

const EagleMed = () => {
    return (
        <div className="absolute top-0 right-0 z-0 p-4 md:p-8">
            <div className="flex flex-col items-start">
                <span className="mb-2 bg-white/30 border border-white/30 backdrop-blur-md rounded-md px-3 py-1 shadow-md text-gray-600 text-xs inline-block">
                    Career|Eagle Medical Labs
                </span>
                <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 w-[308px] min-h-[380px] border border-white/30 shadow-lg">
                    <div className="space-y-4">
                        {/* Eagle Medical Experience */}
                        <div className="bg-white rounded-lg shadow-lg p-3">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <img 
                                        src="/icons/eagle-med.webp" 
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
                                    <span className="text-[10px] text-gray-400 mt-0.5 text-center">
                                        3 mos
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div className="space-y-2 mt-4 mb-4">
                                    <div className="flex items-start gap-2 text-gray-700 text-xs">
                                        <FaCheck className="text-green-500 mt-0.5 flex-shrink-0" size={12} />
                                        <span>
                                            Compiled blood and urine analysis data such as CBC,
                                            Urinalysis, and metabolic panels in Microsoft Excel
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-2 text-gray-700 text-xs">
                                        <FaCheck className="text-green-500 mt-0.5 flex-shrink-0" size={12} />
                                        <span>
                                            Migrated the companies sample inventory database
                                            from Microsoft access to SQL
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-2 text-gray-700 text-xs">
                                        <FaCheck className="text-green-500 mt-0.5 flex-shrink-0" size={12} />
                                        <span>
                                            Provided weekly reports on trends in data
                                            using R studio for data visualization
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-bold mb-3">Programming Languages:</p>
                                    <div className="flex gap-4 mb-3">
                                        <div className="flex flex-col items-center">
                                            <a href="https://en.wikipedia.org/wiki/R_(programming_language)" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-125 hover:rotate-3">
                                                <img src="/icons/R_light.svg" alt="R" className="w-6 h-6" />
                                            </a>
                                            <span className="text-[9px] mt-0.5">R</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <a href="https://en.wikipedia.org/wiki/Python_(programming_language)" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-125 hover:rotate-3">
                                                <img src="/icons/python.svg" alt="Python" className="w-6 h-6" />
                                            </a>
                                            <span className="text-[9px] mt-0.5">Python</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <a href="https://en.wikipedia.org/wiki/PostgreSQL" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-125 hover:rotate-3">
                                                <img src="/icons/postgresql.svg" alt="PostgreSQL" className="w-6 h-6" />
                                            </a>
                                            <span className="text-[9px] mt-0.5">PostgreSQL</span>
                                        </div>
                                    </div>

                                    <p className="text-xs font-bold mb-3">Tools:</p>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <a href="https://en.wikipedia.org/wiki/RStudio" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-125 hover:rotate-3">
                                                <img src="/icons/RStudio.svg" alt="Rstudio" className="w-6 h-6" />
                                            </a>
                                            <span className="text-[9px] mt-0.5">Rstudio</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <a href="https://en.wikipedia.org/wiki/GitHub" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-125 hover:rotate-3">
                                                <img src="/icons/Github_light.svg" alt="Github" className="w-6 h-6" />
                                            </a>
                                            <span className="text-[9px] mt-0.5">Github</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <a href="https://en.wikipedia.org/wiki/Microsoft_Excel" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-125 hover:rotate-3">
                                                <img src="/icons/excel.svg" alt="Excel" className="w-6 h-6" />
                                            </a>
                                            <span className="text-[9px] mt-0.5">MS Excel</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <a href="https://en.wikipedia.org/wiki/Microsoft_Access" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-125 hover:rotate-3">
                                                <img src="/icons/access.svg" alt="Access" className="w-6 h-6" />
                                            </a>
                                            <span className="text-[9px] mt-0.5">MS Access</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EagleMed; 