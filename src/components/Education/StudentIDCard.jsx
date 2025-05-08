import React from 'react';

const StudentIDCard = ({ school }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-lg p-8 flex flex-row items-start max-w-4xl mx-auto border-2 border-blue-200 relative min-w-[700px] min-h-[370px] overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl group"
    >
      {/* Gloss shimmer overlay */}
      <div
        className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none z-30"
      >
        <div
          className="w-full h-full opacity-0 group-hover:opacity-100 group-hover:animate-idCardGloss"
          style={{
            background: 'linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.25) 40%, rgba(255,255,255,0.25) 60%, transparent 80%)',
            backgroundSize: '200% 100%',
            backgroundPosition: '150% center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden z-20"
      >
        <div className="absolute top-0 left-[-60%] w-[60%] h-full bg-gradient-to-tr from-white/70 via-white/30 to-transparent rotate-[25deg] opacity-0 group-hover:opacity-100 transition-opacity duration-200 group-hover:animate-idCardGloss will-change-transform" />
      </div>
      <div
        className="absolute top-4 right-7 z-10"
      >
        <img src={school.logo} alt="School Logo" className="w-20 h-20 object-contain" />
      </div>
      <div className="flex-shrink-0 mr-10 flex flex-col items-center">
        <img
          src={school.idImage}
          alt="Student ID"
          className="w-56 h-72 object-cover rounded-lg border border-gray-400"
          style={{ background: '#eaeaea' }}
        />
        <div className="mt-2 text-center w-full">
          <div className="text-gray-700 text-sm font-mono mb-1">Student ID : {school.studentId}</div>
          <img
            src="/images/Education/education-barcode.jpeg"
            alt="Student Barcode"
            className="w-40 h-8 object-contain mx-auto"
            style={{ background: 'white' }}
          />
        </div>
      </div>
      <div className="flex-1 text-left">
        <div className="flex items-center justify-between">
          <h2 className="text-5xl font-bold text-gray-900 mb-1 leading-tight" style={{ fontSize: '2.2rem' }}>Tariq Williams</h2>
        </div>
        <div className="text-xl text-gray-700 font-semibold mb-2" style={{ fontSize: '1.1rem' }}>{school.name}</div>
        <div className="mb-2">
          {school.degrees.map((deg, i) => (
            <div key={i} className="text-gray-800 text-base" style={{ fontSize: '1rem' }}>
              {deg.type} , {deg.major}.
            </div>
          ))}
        </div>
        {school.minors && school.minors.length > 0 && (
          <div className="text-gray-800 text-base mb-2" style={{ fontSize: '1rem' }}>
            Minor : {school.minors.join(', ')}
          </div>
        )}
        <div className="text-gray-700 text-base mb-2" style={{ fontSize: '1rem' }}>
          School Year : {school.years}
        </div>
      </div>
      <div
        className="absolute bottom-[-160px] right-[-100px] opacity-10 z-0 pointer-events-none select-none"
      >
        <img src={school.logo} alt="Logo watermark" className="w-96 h-96 object-contain" />
      </div>
    </div>
  );
};

export default StudentIDCard; 