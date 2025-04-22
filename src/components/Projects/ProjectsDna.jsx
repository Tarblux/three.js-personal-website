import React, { useState } from 'react';
import './Dna.css';

const ProjectsDna = () => {

    const [hoveredStrand, setHoveredStrand] = useState(null);
    const [hoveredLanguage, setHoveredLanguage] = useState(null);


    const mainStrandStyle = hoveredStrand === "secondary" ? { opacity: 0.5 } : {};
    const secondaryStrandStyle = hoveredStrand === "main" ? { opacity: 0.5 } : {};

    const helixContainerClass = `helix-container 
        ${hoveredStrand === "main" ? "dim-secondary" : ""} 
        ${hoveredStrand === "secondary" ? "dim-main" : ""}
        ${hoveredLanguage ? `highlight-${hoveredLanguage}` : ""}`;

    const getLanguageOpacityClass = (language) => {
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

    const getLanguageScaleClass = (language) => {
        return language === hoveredLanguage ? 'scale-110' : '';
    };

    return (
        <div className="flex flex-col rounded-xl">
            <div className="flex flex-row gap-8">
                {/* DNA Animation */}
                <div className="w-1/3 flex flex-col justify-center">
                    <h3 className="text-white text-sm font-medium text-center mb-4">Projects DNA</h3>
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
                        className="strand-section bg-white rounded-lg p-4 transform transition-transform duration-300 hover:scale-105 w-full"
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
                        <div className="flex items-center justify-center w-full overflow-visible">
                            <div className="flex items-center  overflow-visible">
                                <div 
                                    className="flex flex-col items-center transition-transform duration-300 overflow-visible"
                                    onMouseEnter={() => setHoveredLanguage("python")}
                                    onMouseLeave={() => setHoveredLanguage(null)}
                                >
                                    <img 
                                        src="/images/DNA/Py.png" 
                                        alt="Python" 
                                        className={`w-[128px] h-[128px] transition-all duration-300 ${getLanguageOpacityClass('python')} ${getLanguageScaleClass('python')}`} 
                                    />
                                    <div className="flex items-center mt-2">
                                        <div className={`language-pattern pattern-python transition-opacity duration-300 ${getLanguageOpacityClass('python')}`}></div>
                                        <span className={`text-xs text-black ml-1 transition-opacity duration-300 ${getLanguageOpacityClass('python')}`}>Python</span>
                                    </div>
                                </div>
                                <div 
                                    className="flex flex-col items-center transition-transform duration-300 overflow-visible"
                                    onMouseEnter={() => setHoveredLanguage("typescript")}
                                    onMouseLeave={() => setHoveredLanguage(null)}
                                >
                                    <img 
                                        src="/images/DNA/TS.png" 
                                        alt="TypeScript" 
                                        className={`w-[190px] h-[128px] transition-all duration-300 ${getLanguageOpacityClass('typescript')} ${getLanguageScaleClass('typescript')}`} 
                                    />
                                    <div className="flex items-center mt-2">
                                        <div className={`language-pattern pattern-typescript transition-opacity duration-300 ${getLanguageOpacityClass('typescript')}`}></div>
                                        <span className={`text-xs text-black ml-1 transition-opacity duration-300 ${getLanguageOpacityClass('typescript')}`}>TypeScript</span>
                                    </div>
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
                        <div className="flex items-center justify-center w-full overflow-visible">
                            <div className="flex items-center overflow-visible">
                                <div 
                                    className="flex flex-col items-center transition-transform duration-300 overflow-visible"
                                    onMouseEnter={() => setHoveredLanguage("scala")}
                                    onMouseLeave={() => setHoveredLanguage(null)}
                                >
                                    <img 
                                        src="/images/DNA/Scala.png" 
                                        alt="Scala" 
                                        className={`w-[128px] h-[128px] transition-all duration-300 ${getLanguageOpacityClass('scala')} ${getLanguageScaleClass('scala')}`} 
                                    />
                                    <div className="flex items-center mt-2">
                                        <div className={`language-pattern pattern-scala transition-opacity duration-300 ${getLanguageOpacityClass('scala')}`}></div>
                                        <span className={`text-xs text-black ml-1 transition-opacity duration-300 ${getLanguageOpacityClass('scala')}`}>Scala</span>
                                    </div>
                                </div>
                                <div 
                                    className="flex flex-col items-center transition-transform duration-300 overflow-visible"
                                    onMouseEnter={() => setHoveredLanguage("rust")}
                                    onMouseLeave={() => setHoveredLanguage(null)}
                                >
                                    <img 
                                        src="/images/DNA/Rust.png" 
                                        alt="Rust" 
                                        className={`w-[100px] h-[128px] transition-all duration-300 ${getLanguageOpacityClass('rust')} ${getLanguageScaleClass('rust')}`} 
                                    />
                                    <div className="flex items-center mt-2">
                                        <div className={`language-pattern pattern-rust transition-opacity duration-300 ${getLanguageOpacityClass('rust')}`}></div>
                                        <span className={`text-xs text-black ml-1 transition-opacity duration-300 ${getLanguageOpacityClass('rust')}`}>Rust</span>
                                    </div>
                                </div>
                                
                                <div 
                                    className="flex flex-col items-center transition-transform duration-300 overflow-visible"
                                    onMouseEnter={() => setHoveredLanguage("cpp")}
                                    onMouseLeave={() => setHoveredLanguage(null)}
                                >
                                    <img 
                                        src="/images/DNA/C++.png" 
                                        alt="C++" 
                                        className={`w-[58px] h-[128px] transition-all duration-300 ${getLanguageOpacityClass('cpp')} ${getLanguageScaleClass('cpp')}`} 
                                    />
                                    <div className="flex items-center mt-2">
                                        <div className={`language-pattern pattern-cpp transition-opacity duration-300 ${getLanguageOpacityClass('cpp')}`}></div>
                                        <span className={`text-xs text-black ml-1 transition-opacity duration-300 ${getLanguageOpacityClass('cpp')}`}>C++</span>
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

export default ProjectsDna;
