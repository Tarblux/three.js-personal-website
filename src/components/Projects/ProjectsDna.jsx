import React, { useState } from 'react';
import './Dna.css';

const ProjectsDna = () => {
    // Track which strand is hovered; null means none.
    const [hoveredStrand, setHoveredStrand] = useState(null);
    // Track which language is hovered
    const [hoveredLanguage, setHoveredLanguage] = useState(null);

    // If the secondary strand is hovered, dim the main strand.
    const mainStrandStyle = hoveredStrand === "secondary" ? { opacity: 0.5 } : {};
    // If the main strand is hovered, dim the secondary strand.
    const secondaryStrandStyle = hoveredStrand === "main" ? { opacity: 0.5 } : {};

    // Get helix container class based on hover state
    const helixContainerClass = `helix-container 
        ${hoveredStrand === "main" ? "dim-secondary" : ""} 
        ${hoveredStrand === "secondary" ? "dim-main" : ""}
        ${hoveredLanguage ? `highlight-${hoveredLanguage}` : ""}`;

    // Get vial opacity class based on hover state
    const getVialOpacityClass = (language) => {
        if (!hoveredLanguage) return '';
        if (language === hoveredLanguage) return '';
        if ((language === 'python' && hoveredLanguage === 'typescript') || 
            (language === 'typescript' && hoveredLanguage === 'python')) {
            return 'opacity-25';
        }
        if ((language === 'scala' && hoveredLanguage === 'rust') || 
            (language === 'rust' && hoveredLanguage === 'scala') ||
            (language === 'rust' && hoveredLanguage === 'cpp') ||
            (language === 'cpp' && hoveredLanguage === 'rust') ||
            (language === 'scala' && hoveredLanguage === 'cpp') ||
            (language === 'cpp' && hoveredLanguage === 'scala')) {
            return 'opacity-25';
        }
        return '';
    };

    // Get vial scale class based on hover state
    const getVialScaleClass = (language) => {
        return language === hoveredLanguage ? 'scale-110' : '';
    };

    return (
        <div className="flex flex-col rounded-xl">
            <div className="flex flex-row gap-8">
                {/* DNA Animation */}
                <div className="w-1/3 flex flex-col justify-center">
                    <h3 className="text-gray-400 text-sm font-medium text-center mb-4">Projects DNA</h3>
                    <div
                        className="flex items-center justify-center"
                        style={{ '--uib-size': '250px', '--uib-speed': '6s' }}
                    >
                        <div className={helixContainerClass}>
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
                    {/* Main Strand */}
                    <div
                        className="strand-section bg-white rounded-lg p-4 transform transition-transform duration-300 hover:scale-105"
                        onMouseEnter={() => setHoveredStrand("main")}
                        onMouseLeave={() => {
                            setHoveredStrand(null);
                            setHoveredLanguage(null);
                        }}
                        style={mainStrandStyle}
                    >
                        <h4 className="text-lg font-semibold mb-1">Main Strand</h4>
                        <p className="text-gray-600 text-xs mb-4">
                            Languages I use the most in my projects—comfortable enough with these to get by without constantly googling.
                        </p>
                        <div className="flex">
                            <div 
                                className="flex flex-col items-center transition-transform duration-300"
                                onMouseEnter={() => setHoveredLanguage("python")}
                                onMouseLeave={() => setHoveredLanguage(null)}
                            >
                                <img 
                                    src="/images/language-vials/python-vial.png" 
                                    alt="Python" 
                                    className={`w-24 h-auto transition-all duration-300 ${getVialOpacityClass('python')} ${getVialScaleClass('python')}`} 
                                />
                                <div className="flex items-center">
                                    <div className="language-pattern pattern-python"></div>
                                    <span className="text-xs text-black ml-1">Python</span>
                                </div>
                            </div>
                            <div 
                                className="flex flex-col items-center transition-transform duration-300"
                                onMouseEnter={() => setHoveredLanguage("typescript")}
                                onMouseLeave={() => setHoveredLanguage(null)}
                            >
                                <img 
                                    src="/images/language-vials/typescript-vial.png" 
                                    alt="TypeScript" 
                                    className={`w-24 h-auto transition-all duration-300 ${getVialOpacityClass('typescript')} ${getVialScaleClass('typescript')}`} 
                                />
                                <div className="flex items-center">
                                    <div className="language-pattern pattern-typescript"></div>
                                    <span className="text-xs text-black ml-1">TypeScript</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Strand */}
                    <div
                        className="strand-section bg-white rounded-lg p-4 transform transition-transform duration-300 hover:scale-105"
                        onMouseEnter={() => setHoveredStrand("secondary")}
                        onMouseLeave={() => {
                            setHoveredStrand(null);
                            setHoveredLanguage(null);
                        }}
                        style={secondaryStrandStyle}
                    >
                        <h4 className="text-lg font-semibold mb-1">Secondary Strand</h4>
                        <p className="text-gray-600 text-xs mb-4">
                            A chaotic mix of things I understand, stuff I'm still learning, and moments where I just nod, smile, and pray no one asks follow-up questions.
                        </p>
                        <div className="flex">
                            <div 
                                className="flex flex-col items-center transition-transform duration-300"
                                onMouseEnter={() => setHoveredLanguage("scala")}
                                onMouseLeave={() => setHoveredLanguage(null)}
                            >
                                <img 
                                    src="/images/language-vials/scala-vial.png" 
                                    alt="Scala" 
                                    className={`w-24 h-auto transition-all duration-300 ${getVialOpacityClass('scala')} ${getVialScaleClass('scala')}`} 
                                />
                                <div className="flex items-center">
                                    <div className="language-pattern pattern-scala"></div>
                                    <span className="text-xs text-black ml-1">Scala</span>
                                </div>
                            </div>
                            <div 
                                className="flex flex-col items-center transition-transform duration-300"
                                onMouseEnter={() => setHoveredLanguage("rust")}
                                onMouseLeave={() => setHoveredLanguage(null)}
                            >
                                <img 
                                    src="/images/language-vials/rust-vial.png" 
                                    alt="Rust" 
                                    className={`w-24 h-auto transition-all duration-300 ${getVialOpacityClass('rust')} ${getVialScaleClass('rust')}`} 
                                />
                                <div className="flex items-center">
                                    <div className="language-pattern pattern-rust"></div>
                                    <span className="text-xs text-black ml-1">Rust</span>
                                </div>
                            </div>
                            
                            {/* Learning Divider */}
                            <div className="flex flex-col items-center justify-center mx-2">
                                <div className="h-5 border-r border-gray-300 border-dashed"></div>
                                <div className="text-[10px] text-gray-500 whitespace-nowrap my-2" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Learning</div>
                                <div className="h-5 border-r border-gray-300 border-dashed"></div>
                            </div>
                            
                            <div 
                                className="flex flex-col items-center transition-transform duration-300"
                                onMouseEnter={() => setHoveredLanguage("cpp")}
                                onMouseLeave={() => setHoveredLanguage(null)}
                            >
                                <img 
                                    src="/images/language-vials/c++-vial.png" 
                                    alt="C++" 
                                    className={`w-24 h-auto transition-all duration-300 ${getVialOpacityClass('cpp')} ${getVialScaleClass('cpp')}`} 
                                />
                                <div className="flex items-center">
                                    <div className="language-pattern pattern-cpp"></div>
                                    <span className="text-xs text-black ml-1">C++</span>
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
