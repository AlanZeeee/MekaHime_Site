import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ComingSoonPage = () => {
    return (
        <div className="min-h-screen bg-darkbg text-white flex flex-col">
            <Navbar />
            <div className="flex-grow flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-5xl md:text-7xl font-bold mb-8">
                    This map area is coming soon...
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 mb-12">
                    How about we explore this area ahead of us later?
                </p>
                <Link
                    to="/"
                    className="text-lg md:text-xl text-white hover:text-primary transition-colors border-b border-white hover:border-primary pb-1"
                >
                    Teleport back to the overworld →
                </Link>
            </div>
        </div>
    );
};

export default ComingSoonPage;
