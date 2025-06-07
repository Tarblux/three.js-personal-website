import React from 'react';

const KzooDetails = () => {
    return (
        <a href="https://www.kzoo.edu/" target="_blank" rel="noopener noreferrer" className="block">
            <div className="absolute top-8 right-8 flex justify-center items-center p-1.5 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer">
                <div className="bg-white w-[240px] rounded-2xl shadow-lg flex flex-col items-center overflow-hidden">
                    {/* Campus Image*/}
                    <div className="w-full p-2 pb-1 flex justify-center items-center">
                        <img
                            src="/images/Education/education-kzoocampus.webp"
                            alt="Kalamazoo College Campus"
                            className="w-full h-[110px] object-cover rounded-xl border border-blue-100"
                        />
                    </div>
                    {/* Card Content */}
                    <div className="w-full p-3 pt-2 flex flex-col items-center">
                        {/* Logo and Title */}
                        <div className="flex items-center w-full mb-2 mt-0">
                            <img
                                src="/images/Education/education-kzoo_logo(2).webp"
                                alt="Kalamazoo College Logo"
                                className="w-10 h-10 mr-2"
                            />
                            <div>
                                <div className="text-l font-bold leading-tight">Kalamazoo College</div>
                                <div className="flex items-center text-gray-600 text-[13px]">
                                    Kalamazoo, MI
                                    <img
                                        src="/images/Education/united-states-roundflag.webp"
                                        alt="USA Flag"
                                        className="w-3 h-3 ml-1"
                                    />
                                </div>
                            </div>
                        </div>
                        <hr className="w-[60%] my-2 border-gray-200" />
                        {/* Details */}
                        <div className="text-gray-700 text-[13px] w-full">
                            <div className="mb-1 mt-1 font-semibold">Private Liberal Arts College</div>
                            <div className="mb-1">Established : <span className="font-medium">April 22, 1833</span></div>
                            <div className="mb-1">Student Population : <span className="font-medium">~1500</span></div>
                            <div className="mb-1">Student-Faculty Ratio : <span className="font-medium">7 to 1</span></div>
                            <div className="mb-1 flex items-center">Colors :
                                <span className="inline-block w-4 h-4 bg-orange-600 rounded-full mx-1 border border-gray-300"></span>
                                <span className="inline-block w-4 h-4 bg-black rounded-full mx-1 border border-gray-300"></span>
                            </div>
                            <div className="mb-1">Mascot : <span className="font-medium">Hornet</span></div>
                        </div>
                        <div className="text-center text-gray-400 text-xs mt-4">"More in Four, More in a lifetime"</div>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default KzooDetails; 