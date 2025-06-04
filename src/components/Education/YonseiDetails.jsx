import React from 'react';

const YonseiDetails = () => {
    return (
        <a href="https://www.yonsei.ac.kr/sc/index.do" target="_blank" rel="noopener noreferrer" className="block">
            <div className="absolute top-8 right-8 flex justify-center items-center p-1.5 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer">
                <div className="bg-white w-[240px] rounded-2xl shadow-lg flex flex-col items-center overflow-hidden">
                    {/* Campus Image*/}
                    <div className="w-full p-2 pb-1 flex justify-center items-center">
                        <img
                            src="/images/Education/education-yonseicampus.webp"
                            alt="Yonsei University Campus"
                            className="w-full h-[110px] object-cover rounded-xl border border-blue-100"
                        />
                    </div>
                    {/* Card Content */}
                    <div className="w-full p-3 pt-2 flex flex-col items-center">
                        {/* Logo and Title */}
                        <div className="flex items-center w-full mb-2 mt-0">
                            <img
                                src="/images/Education/education-yonsei_logo.webp"
                                alt="Yonsei University Logo"
                                className="w-10 h-10 mr-2"
                            />
                            <div>
                                <div className="text-lg font-bold leading-tight">Yonsei University</div>
                                <div className="flex items-center text-gray-600 text-[13px]">
                                    Seoul, South Korea
                                    <img
                                        src="/images/Education/south-korea-roundflag.webp"
                                        alt="South Korea Flag"
                                        className="w-5 h-5 ml-1"
                                    />
                                </div>
                            </div>
                        </div>
                        <hr className="w-[60%] my-2 border-gray-200" />
                        {/* Details */}
                        <div className="text-gray-700 text-[13px] w-full">
                            <div className="mb-1 mt-1 font-semibold">Private Research University</div>
                            <div className="mb-1">Established : <span className="font-medium">April 10, 1885</span></div>
                            <div className="mb-1">Student Population : <span className="font-medium">~38,000 </span></div>
                            <div className="mb-1">Student-Faculty Ratio : <span className="font-medium">12 to 1</span></div>
                            <div className="mb-1 flex items-center">Colors :
                                <span className="inline-block w-4 h-4 bg-[#0f0f8a] rounded-full mx-1 border border-gray-500"></span>
                                <span className="inline-block w-4 h-4 bg-white rounded-full mx-1 border border-gray-500"></span>
                            </div>
                            <div className="mb-1">Mascot : <span className="font-medium">Eagle</span></div>
                        </div>
                        <div className="text-center text-gray-400 text-xs mt-4">"진리가 너희를 자유케 하리라"
                            <div className="text-[10px] text-gray-300 mt-1">"The truth will set you free"</div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default YonseiDetails; 