import React from 'react'
import { schools } from '../../data/schools'
import StudentIDCard from './StudentIDCard'
import YonseiDetails from './YonseiDetails'
import Photodeck from './Photodeck'

const EducationYonsei = () => {
    const yonseiSchool = schools.find(school => school.name === 'Yonsei University');
    
    return (
        <>
            <div className="absolute left-7 top-0 flex flex-col items-start gap-8 p-8" style={{ zIndex: 10 }}>
                <StudentIDCard school={yonseiSchool} />
            </div>
            <YonseiDetails />
            <div className="absolute left-9 bottom-20 p-8" style={{ zIndex: 10 }}>
                <Photodeck />
            </div>
        </>
    );
};

export default EducationYonsei