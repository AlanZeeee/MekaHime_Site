import React from 'react';
import TTSDemo from '../components/TTSDemo';
import Navbar from '../components/Navbar';

const TTSPage = () => {
    return (
        <div className="min-h-screen bg-darkbg text-white">
            <Navbar />
            <div className="pt-24 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Experience the Voice</h1>
                    <p className="text-gray-400">Try our advanced neural TTS engine below.</p>
                </div>
                <TTSDemo />
            </div>
        </div>
    );
};

export default TTSPage;
