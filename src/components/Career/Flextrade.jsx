import React from 'react'
import { FaCheck } from 'react-icons/fa';

const Flextrade = () => {
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
        <div className="absolute top-0 right-0 z-0 p-4 md:p-8">
            <div className="flex flex-col items-start">
                <span className="mb-2 bg-white/30 border border-white/30 backdrop-blur-md rounded-md px-3 py-1 shadow-md text-gray-600 text-xs inline-block">
                    Career|Flextrade
                </span>
                <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 w-[308px] min-h-[420px] border border-white/30 shadow-lg">
                    <div className="space-y-4">
                        {/* Flextrade Experience */}
                        <div className="bg-white rounded-lg shadow-lg p-3">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2.5">
                                    <img 
                                        src="/icons/flextrade_logo.webp" 
                                        alt="Flextrade Systems" 
                                        className="w-8 h-8 rounded-md"
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
                                    <span className="text-[10px] text-gray-400 mt-0.5 text-center">
                                        {calculateDuration()}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-start gap-2 text-gray-700 text-xs">
                                        <FaCheck className="text-green-500 mt-0.5 flex-shrink-0" size={12} />
                                        <span>
                                            Develop features for a Python-based calculation service 
                                            used to deliver risk analytics and financial computations 
                                            within the Order Management System (OMS)
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-2 text-gray-700 text-xs">
                                        <FaCheck className="text-green-500 mt-0.5 flex-shrink-0" size={12} />
                                        <span>
                                            Build and maintain gRPC API routines enabling
                                            seamless integration of calculation results into the
                                            main OMS backend
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-2 text-gray-700 text-xs">
                                        <FaCheck className="text-green-500 mt-0.5 flex-shrink-0" size={12} />
                                        <span>
                                            Write unit tests for calculation workflows to ensure
                                            accuracy and reliability of all calculations
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-bold mb-3">Programming Languages:</p>
                                    <div className="flex gap-4 mb-3">
                                        <div className="flex flex-col items-center">
                                            <a href="https://en.wikipedia.org/wiki/Python_(programming_language)" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-125 hover:rotate-3">
                                                <img src="/icons/python.svg" alt="Python" className="w-6 h-6" />
                                            </a>
                                            <span className="text-[9px] mt-0.5 ">Python</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <a href="https://en.wikipedia.org/wiki/Scala_(programming_language)" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-125 hover:rotate-3">
                                                <img src="/icons/scala.svg" alt="Scala" className="w-6 h-6" />
                                            </a>
                                            <span className="text-[9px] mt-0.5">Scala</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <a href="https://en.wikipedia.org/wiki/SQL" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-125 hover:rotate-3">
                                                <img src="/icons/mysql.svg" alt="SQL" className="w-6 h-6" />
                                            </a>
                                            <span className="text-[9px] mt-0.5">SQL</span>
                                        </div>
                                    </div>

                                    <p className="text-xs font-bold mb-3">Tools:</p>
                                    <div className="flex gap-4 mb-3">
                                        <div className="flex flex-col items-center">
                                            <a href="https://en.wikipedia.org/wiki/Docker_(software)" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-125 hover:rotate-3">
                                                <img src="/icons/docker.svg" alt="Docker" className="w-6 h-6" />
                                            </a>
                                            <span className="text-[9px] mt-0.5">Docker</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <a href="https://en.wikipedia.org/wiki/Jira_(software)" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-125 hover:rotate-3">
                                                <img src="/icons/jira-1.svg" alt="Jira" className="w-6 h-6" />
                                            </a>
                                            <span className="text-[9px] mt-0.5">Jira</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <a href="https://en.wikipedia.org/wiki/Jenkins_(software)" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-125 hover:rotate-3">
                                                <img src="/icons/Jenkins_logo.svg" alt="Jenkins" className="w-6 h-6" />
                                            </a>
                                            <span className="text-[9px] mt-0.5">Jenkins</span>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <a href="https://en.wikipedia.org/wiki/PyCharm" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-125 hover:rotate-3">
                                                <img src="/icons/pycharm.svg" alt="Pycharm" className="w-6 h-6" />
                                            </a>
                                            <span className="text-[9px] mt-0.5">Pycharm</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <a href="https://en.wikipedia.org/wiki/Postman_(software)" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-125 hover:rotate-3">
                                                <img src="/icons/postman.svg" alt="Postman" className="w-6 h-6" />
                                            </a>
                                            <span className="text-[9px] mt-0.5">Postman</span>
                                        </div>
                                    </div>

                                    <p className="text-xs font-bold mb-1">Libraries & Protocols:</p>
                                    <div className="flex gap-4 mb-3">
                                        <div className="flex flex-col items-center">
                                            <a href="https://en.wikipedia.org/wiki/GRPC" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-125 hover:rotate-3">
                                                <img src="/icons/grpc-icon-color.webp" alt="gRPC" className="w-6 h-6" />
                                            </a>
                                            <span className="text-[9px] mt-0.5">gRPC</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <a href="https://en.wikipedia.org/wiki/Akka_(toolkit)" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-125 hover:rotate-3">
                                                <img src="/icons/akka.svg" alt="Akka" className="w-6 h-6" />
                                            </a>
                                            <span className="text-[9px] mt-0.5">Akka</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <a href="https://en.wikipedia.org/wiki/NumPy" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-125 hover:rotate-3">
                                                <img src="/icons/numpy.svg" alt="Numpy" className="w-6 h-6" />
                                            </a>
                                            <span className="text-[9px] mt-0.5">Numpy</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <a href="https://en.wikipedia.org/wiki/Pandas_(software)" target="_blank" rel="noopener noreferrer" className="transition-all duration-300 hover:scale-125 hover:rotate-3">
                                                <img src="/icons/pandas.svg" alt="Pandas" className="w-6 h-6" />
                                            </a>
                                            <span className="text-[9px] mt-0.5">Pandas</span>
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

export default Flextrade; 