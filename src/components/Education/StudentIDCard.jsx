import React from 'react';

const StudentIDCard = ({ school }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-xl p-3 flex flex-row items-start mx-auto border-2 border-blue-200 relative min-w-[450px] min-h-[100px] overflow-hidden transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl group"
    >
      {/* Gloss shimmer overlay */}
      <div
        className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none z-30"
      >
        <div
          className="w-full h-full opacity-0 group-hover:opacity-100 group-hover:animate-idCardGloss bg-id-card-gloss bg-size-id-card-gloss bg-pos-id-card-gloss bg-no-repeat"
        />
      </div>
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden z-20"
      >
        <div className="absolute top-0 left-[-60%] w-[60%] h-full bg-gradient-to-tr from-white/70 via-white/30 to-transparent rotate-[25deg] opacity-0 group-hover:opacity-100 transition-opacity duration-200 group-hover:animate-idCardGloss will-change-transform" />
      </div>
      <div
        className="absolute top-2 right-4 z-10"
      >
        <img src={school.logo} alt="School Logo" className="w-10 h-10 object-contain" />
      </div>
      <div className="flex-shrink-0 mr-5 flex flex-col items-center">
        <img
          src={school.idImage}
          alt="Student ID"
          className="w-24 h-32 object-cover rounded-lg bg-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300"
        />
        <div className="mt-1 w-full flex flex-row items-center justify-center gap-2">
          <img
            src="/images/Education/education-barcode-2.jpg"
            alt="Student QR Code"
            className="object-contain w-6 h-6 mb-0"
          />
          <div className="flex flex-col items-start mt-1">
            <span className="text-black font-bold text-[10px] leading-tight">Student ID</span>
            <span className="text-black text-[10px] font-semibold ml-1">{school.studentId}</span>
          </div>
        </div>
      </div>
      <div className="flex-1 text-left">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 mb-0.5 leading-tight text-[1.1rem]">Tariq Williams</h2>
        </div>
        <div className="text-gray-700 text-[13px] mb-3 mt-[-2px]">{school.name}</div>
        <div className="mb-1">
          {school.degrees.map((deg, i) => (
            <div key={i} className="text-gray-800 text-sm" style={{ fontSize: '0.8rem' }}>
              {deg.type}{deg.major ? ` , ${deg.major}` : ''}.
            </div>
          ))}
        </div>
        {school.minors && school.minors.length > 0 && (
          <div className="text-gray-800 text-sm mb-1" style={{ fontSize: '0.8rem' }}>
            Minor : {school.minors.join(', ')}
          </div>
        )}
        <div className="text-gray-700 text-sm mb-1" style={{ fontSize: '0.8rem' }}>
          School Year : {school.years}
        </div>
      </div>
      <div
        className="absolute bottom-[-70px] right-[-40px] opacity-10 z-0 pointer-events-none select-none"
      >
        <img src={school.logo} alt="Logo watermark" className="w-40 h-40 object-contain" />
      </div>
    </div>
  );
};

export default StudentIDCard; 