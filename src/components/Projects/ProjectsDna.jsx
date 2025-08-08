import React, { useState, useEffect } from 'react';
import './Dna.css';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640); // 640px is the default for sm in Tailwind

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
};

const ProjectsDna = () => {
    const [hoveredStrand, setHoveredStrand] = useState(null);
    const [hoveredLanguage, setHoveredLanguage] = useState(null);
    const isMobile = useIsMobile();

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

    const getRainbowTextClass = () => {
        if (hoveredLanguage) {
            return `rainbow-text ${hoveredLanguage}-gradient`;
        }
        if (hoveredStrand === "main") {
            return 'rainbow-text main-strand-gradient';
        }
        if (hoveredStrand === "secondary") {
            return 'rainbow-text secondary-strand-gradient';
        }
        return 'rainbow-text';
    };

    const renderMainStrand = () => (
        <div
            className="strand-section bg-white rounded-lg p-2 sm:p-4 transform transition-transform duration-300 hover:scale-[1.03] w-full"
            onMouseEnter={() => setHoveredStrand("main")}
            onMouseLeave={() => {
                setHoveredStrand(null);
                setHoveredLanguage(null);
            }}
            style={mainStrandStyle}
        >
            <h4 className="text-sm sm:text-lg font-semibold mb-1">Main Strand</h4>
            <p className="text-gray-600 text-xs mb-2 sm:mb-4">
                Languages I use the most in my projects. I'm comfortable enough with these to get by without constantly googling.
            </p>
            <div className="flex items-center justify-center w-full overflow-visible">
                <div className="flex items-center overflow-visible">
                    <div 
                        className="flex flex-col items-center transition-transform duration-300 overflow-visible"
                        onMouseEnter={() => setHoveredLanguage("python")}
                        onMouseLeave={() => setHoveredLanguage(null)}
                    >
                        <img 
                            src="/images/Projects/DNA/Py.webp" 
                            alt="Python" 
                            className={`w-16 h-16 sm:w-[100px] sm:h-[100px] transition-all duration-300 ${getLanguageOpacityClass('python')} ${getLanguageScaleClass('python')}`} 
                        />
                        <div className="flex items-center mt-1 sm:mt-2">
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
                            src="/images/Projects/DNA/TS.webp" 
                            alt="TypeScript" 
                            className={`w-24 h-16 sm:w-[172px] sm:h-[100px] transition-all duration-300 ${getLanguageOpacityClass('typescript')} ${getLanguageScaleClass('typescript')}`} 
                        />
                        <div className="flex items-center mt-1 sm:mt-2">
                            <div className={`language-pattern pattern-typescript transition-opacity duration-300 ${getLanguageOpacityClass('typescript')}`}></div>
                            <span className={`text-xs text-black ml-1 transition-opacity duration-300 ${getLanguageOpacityClass('typescript')}`}>TypeScript</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSecondaryStrand = () => (
        <div
            className="strand-section bg-white rounded-lg p-2 sm:p-4 transform transition-transform duration-300 hover:scale-[1.03]"
            onMouseEnter={() => setHoveredStrand("secondary")}
            onMouseLeave={() => {
                setHoveredStrand(null);
                setHoveredLanguage(null);
            }}
            style={secondaryStrandStyle}
        >
            <h4 className="text-sm sm:text-lg font-semibold mb-1">Secondary Strand</h4>
            <p className="text-gray-600 text-xs mb-2 sm:mb-4">
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
                            src="/images/Projects/DNA/Scala.webp" 
                            alt="Scala" 
                            className={`w-16 h-16 sm:w-[100px] sm:h-[100px] transition-all duration-300 ${getLanguageOpacityClass('scala')} ${getLanguageScaleClass('scala')}`} 
                        />
                        <div className="flex items-center mt-1 sm:mt-2">
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
                            src="/images/Projects/DNA/Rust.webp" 
                            alt="Rust" 
                            className={`w-12 h-16 sm:w-[100px] sm:h-[100px] transition-all duration-300 ${getLanguageOpacityClass('rust')} ${getLanguageScaleClass('rust')}`} 
                        />
                        <div className="flex items-center mt-1 sm:mt-2">
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
                            src="/images/Projects/DNA/C++.webp" 
                            alt="C++" 
                            className={`w-8 h-16 sm:w-[58px] sm:h-[100px] transition-all duration-300 ${getLanguageOpacityClass('cpp')} ${getLanguageScaleClass('cpp')}`} 
                        />
                        <div className="flex items-center mt-1 sm:mt-2">
                            <div className={`language-pattern pattern-cpp transition-opacity duration-300 ${getLanguageOpacityClass('cpp')}`}></div>
                            <span className={`text-xs text-black ml-1 transition-opacity duration-300 ${getLanguageOpacityClass('cpp')}`}>C++</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderDNA = () => (
        <div className="flex flex-col justify-center items-center py-4 sm:py-6">
            <span className="mb-4 sm:mb-6 bg-[#f0f0f0] rounded-lg text-xs sm:text-sm font-semibold px-3 py-0.5 shadow-[inset_0_1px_0_0_#f4f4f4,0_1px_0_0_#efefef,0_2px_0_0_#ececec,0_4px_0_0_#e0e0e0,0_5px_0_0_#dedede,0_6px_0_0_#dcdcdc,0_7px_0_0_#cacaca,0_7px_8px_0_#cecece] inline-block text-center w-fit">
                <span className={getRainbowTextClass()}>Projects DNA</span>
            </span>
            <div
                className="flex items-center justify-center"
                style={{ 
                    '--uib-size': isMobile ? '150px' : '250px', 
                    '--uib-speed': '6s' 
                }}
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
    );

    return (
        <div className="flex flex-col rounded-xl">
            {isMobile ? (
                // Mobile Layout - Stack vertically with DNA in middle
                <div className="flex flex-col gap-4 sm:gap-6">
                    {renderMainStrand()}
                    {renderDNA()}
                    {renderSecondaryStrand()}
                </div>
            ) : (
                // Desktop Layout - Original side-by-side layout
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                    {/* DNA Animation */}
                    <div className="w-full sm:w-1/3 flex flex-col justify-center">
                        <span className="mb-6 sm:mb-12 ml-7 bg-[#f0f0f0] rounded-lg text-sm sm:text-md font-semibold px-3 py-0.5 shadow-[inset_0_1px_0_0_#f4f4f4,0_1px_0_0_#efefef,0_2px_0_0_#ececec,0_4px_0_0_#e0e0e0,0_5px_0_0_#dedede,0_6px_0_0_#dcdcdc,0_7px_0_0_#cacaca,0_7px_8px_0_#cecece] inline-block text-center w-fit">
                            <span className={getRainbowTextClass()}>Projects DNA</span>
                        </span>
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
                    <div className="w-full sm:w-2/3 space-y-2 sm:space-y-4">
                        {renderMainStrand()}
                        {renderSecondaryStrand()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectsDna;
