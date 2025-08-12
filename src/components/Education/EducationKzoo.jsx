import React from 'react'
import { schools } from '../../data/schools'
import StudentIDCard from './StudentIDCard'
import KzooDetails from './KzooDetails'

const EducationKzoo = () => {
    const kzooSchool = schools.find(school => school.name === 'Kalamazoo College');
    
    return (
        <>
            {/* Mobile: Stack vertically */}
            <div className="md:hidden flex flex-col items-center gap-4 p-4 pt-8" style={{ zIndex: 10 }}>
                <StudentIDCard school={kzooSchool} />
                <div className="relative">
                    <KzooDetails />
                </div>
            </div>
            
            {/* Desktop: Absolute positioning */}
            <div className="hidden md:block">
                <div className="absolute left-0 top-0 flex flex-col items-start gap-8 p-8" style={{ zIndex: 10 }}>
                    <StudentIDCard school={kzooSchool} />
                </div>
                <KzooDetails />
            </div>
        </>
    );
};

export default React.memo(EducationKzoo)