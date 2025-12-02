import React from 'react';
import { Link } from 'react-router-dom';
import { useMekaCoin } from '../context/MekaCoinContext';

const FloatingButtons = () => {
    const { addCoins } = useMekaCoin();

    const handleClick = (e) => {
        e.stopPropagation(); // Prevent global +1 coin
        addCoins(10, e.clientX, e.clientY);
    };

    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-8 z-40">
            <Link to="/api">
                <button
                    onClick={handleClick}
                    className="px-8 py-3 rounded-full bg-primary text-white text-xl font-bold hover:bg-[#dd32f0] transition-all shadow-[0_0_20px_rgba(221,50,240,0.3)] hover:shadow-[0_0_30px_rgba(221,50,240,0.5)] hover:scale-105"
                >
                    Try
                </button>
            </Link>
            <Link to="/api">
                <button
                    onClick={handleClick}
                    className="px-8 py-3 rounded-full border-2 border-white text-white text-xl font-bold bg-transparent hover:bg-primary hover:border-primary transition-all backdrop-blur-sm hover:scale-105"
                >
                    API
                </button>
            </Link>
        </div>
    );
};

export default FloatingButtons;
