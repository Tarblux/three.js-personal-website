import React from 'react'

const ClubCard = ({ name, role, value, img }) => (
    <div className="w-[195px] h-[285px] bg-white/20 backdrop-blur-md rounded-[20px] border-2 border-white/30 flex flex-col items-center justify-center text-gray-700 transition-all duration-200 ease-in-out relative cursor-pointer hover:scale-104 group shadow-none hover:shadow-none focus:shadow-none mx-2">
        <img
            src={img}
            alt={name}
            className="h-[60%] absolute transition-all duration-200 ease-in-out z-[1] group-hover:blur-[3px] group-hover:animate-float object-contain"
        />
        <div className="opacity-0 group-hover:opacity-100 flex flex-col items-start justify-end w-full h-full gap-0 group-hover:gap-2 p-4 z-[5] transition-all duration-200 ease-in-out">
            <p className="text-base font-bold max-w-full break-words overflow-hidden">{name}</p>
            <p className="text-sm text-gray-400 font-light max-w-full break-words overflow-hidden">{role}</p>
            <p className="text-sm font-bold max-w-full break-words overflow-hidden">{value}</p>
        </div>
    </div>
);

const CollegeClubs = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="flex flex-row justify-center items-center">
                <ClubCard name="Chess Club" role="President" value="2022 - 2023" img="/images/Education/exco-chess-2.svg" />
                <ClubCard name="KalamAfrica" role="Member" value="2020 - 2023" img="/images/Education/exco-africa.svg" />
                <ClubCard name="Caribbean Student Society" role="Vice President" value="2021" img="/images/Education/exco-island.svg" />
            </div>
        </div>
    );
};

export default CollegeClubs