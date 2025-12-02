import React from 'react';
import TTSDemo from '../components/TTSDemo';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const TryPage = () => {
    return (
        <div className="min-h-screen bg-darkbg text-white">
            <Navbar />
            <div className="pt-[20vh] px-6 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-bold mb-4 font-fragile">FREYA TTS - Demo</h1>
                </div>
                <TTSDemo />
            </div>
        </div>
    );
};

export default TryPage;
