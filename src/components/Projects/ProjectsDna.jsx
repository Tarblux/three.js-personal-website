import React from 'react';
import './Dna.css';

const ProjectsDna = () => {
    return (
        <div className="flex flex-col bg-white rounded-xl p-4">
            <div className="flex flex-row gap-8">
                {/* DNA Animation*/}
                <div className="w-1/3 flex flex-col items-center mt-7">
                    <h3 className="text-gray-300 text-sm font-mediun mb-8">Projects DNA</h3>
                    <div 
                        className="flex items-center justify-center"
                        style={{ '--uib-size': '200px', '--uib-speed': '5s' }}
                    >
                        <div className="helix-container">
                            {Array(12)
                                .fill(null)
                                .map((_, idx) => (
                                    <div key={idx} className="slice" />
                                ))}
                        </div>
                    </div>
                </div>

                {/* Strands Information */}
                <div className="w-2/3 space-y-4">
                    <div className="strand-section bg-gray-50 rounded-lg p-3">
                        <h4 className="text-md font-semibold mb-1">Main Strand</h4>
                        <p className="text-gray-600 text-xs mb-2">
                            Languages that most of my projects are built in that I can use with minimal documentation
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="language-tag">
                                <div className="wave-python" />
                                <span className="text-sm text-black">Python</span>
                            </div>
                            <div className="language-tag">
                                <div className="wave-typescript" />
                                <span className="text-sm text-black">Typescript</span>
                            </div>
                        </div>
                    </div>

                    <div className="strand-section bg-gray-50 rounded-lg p-3">
                        <h4 className="text-md font-semibold mb-1">Secondary Strand</h4>
                        <p className="text-gray-600 text-xs mb-2">
                            A mix of stuff I kinda know whats happening in and what I am leanring
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="language-tag">
                                <div className="wave-scala" />
                                <span className="text-sm text-black">Scala</span>
                            </div>
                            <div className="language-tag">
                                <div className="wave-java" />
                                <span className="text-sm text-black">Java</span>
                            </div>
                            <div className="language-tag">
                                <div className="wave-rust" />
                                <span className="text-sm text-black">Rust</span>
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="relative flex items-center justify-center">
                                <div className="border-t-2 border-dashed border-gray-300 w-full absolute" style={{ borderSpacing: '10px' }}></div>
                                <span className="text-gray-400 text-xs bg-gray-50 px-3 relative">Learning</span>
                            </div>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="language-tag">
                                    <div className="wave-cpp" />
                                    <span className="text-sm text-black">C++</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsDna;
