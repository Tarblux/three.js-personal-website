import React from 'react';
import './Dna.css';

const ProjectsDna = () => {
    return (
        <div className="flex items-center">
            <div className="w-1/2 -ml-8">
                <div 
                    className="flex items-center justify-center"
                    style={{ '--uib-size': '150px', '--uib-speed': '5s' }}
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

            <div className="w-300px bg-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-6">Coding DNA</h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="text-xl font-medium">Main Strand</h4>
                        <p className="text-gray-600">Python • Three.js • TailwindCSS</p>
                    </div>
                    <div>
                        <h4 className="text-xl font-medium">Secondary Strand</h4>
                        <p className="text-gray-600">JavaScript • React • Node.js</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsDna;
