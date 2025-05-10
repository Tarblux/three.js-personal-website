import React from 'react'
import { schools } from '../../data/schools'
import StudentIDCard from './StudentIDCard'
import KzooDetails from './KzooDetails'

const EducationKzoo = () => {
    const kzooSchool = schools.find(school => school.name === 'Kalamazoo College');
    
    return (
        <>
            <div className="absolute left-0 top-0 flex flex-col items-start gap-8 p-8" style={{ zIndex: 10 }}>
                <StudentIDCard school={kzooSchool} />
            </div>
            <KzooDetails />
        </>
    );
};

export default EducationKzoo 