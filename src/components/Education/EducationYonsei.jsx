import React from 'react'
import { schools } from '../../data/schools'
import StudentIDCard from './StudentIDCard'
import YonseiDetails from './YonseiDetails'
import Photodeck from './Photodeck'

const EducationYonsei = () => {
    const yonseiSchool = schools.find(school => school.name === 'Yonsei University');
    
    return (
        <>
            {/* Mobile: Stack vertically */}
            <div className="md:hidden flex flex-col items-center gap-4 p-4 pt-8" style={{ zIndex: 10 }}>
                <StudentIDCard school={yonseiSchool} />
                <div className="relative">
                    <YonseiDetails />
                </div>
            </div>
            
            {/* Desktop: Grid layout for proper positioning */}
            <div className="hidden md:block relative w-full h-screen">
                <div className="absolute left-7 top-0 flex flex-col items-start gap-8 p-8" style={{ zIndex: 10 }}>
                    <StudentIDCard school={yonseiSchool} />
                    <div className="mt-64">
                        <Photodeck />
                    </div>
                </div>
                <YonseiDetails />
            </div>
        </>
    );
};

export default EducationYonsei