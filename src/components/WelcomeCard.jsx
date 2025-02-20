import React from 'react';

const WelcomeCard = () => {
    return (
        <div className="absolute top-[100vh] left-0 right-0 flex justify-center">
            <div className="bg-white/90 p-6 rounded-lg shadow-lg max-w-sm text-center">
                <h2 className="text-2xl font-bold">Welcome Card</h2>
                <p className="mt-3 text-gray-600">
                    Whipper snapper, you're here! Welcome to the city.
                </p>
            </div>
        </div>
    );
};

export default WelcomeCard;
