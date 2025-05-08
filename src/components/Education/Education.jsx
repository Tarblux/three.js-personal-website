import React from 'react'
import { schools } from '../../data/schools'
import StudentIDCard from './StudentIDCard'

const Education = () => {
    return (
        <div className="absolute left-0 top-0 flex flex-col items-start gap-8 p-8" style={{ zIndex: 10 }}>
            {schools.map((school, idx) => (
                <StudentIDCard key={idx} school={school} />
            ))}
        </div>
    );
};

export default Education