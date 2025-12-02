import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-darkbg text-white flex flex-col">
            <Navbar />

            <div className="flex-grow flex flex-col items-center justify-start pt-[20vh] px-6 text-center relative">
                <div className="max-w-4xl mx-auto flex flex-col items-center gap-12 z-10">
                    <div className="font-architex text-lg md:text-xl leading-relaxed space-y-12 text-gray-200">
                        <p>
                            Let's be honest,<br />
                            the world kinda sucks.
                        </p>

                        <p>
                            Let's run away and escape to our kingdom of fantasy together.
                        </p>

                        <p>
                            We are a VC-backed team of anime-lovers who builds isekai-inspired AI companion and AI worlds.
                        </p>

                        <p>
                            Based in Silicon Valley,<br />
                            Recruiting Worldwide.
                        </p>
                    </div>

                    <Link to="/careers">
                        <button className="mt-4 px-12 py-4 rounded-full bg-primary text-white text-xl font-bold hover:bg-[#dd32f0] transition-all shadow-[0_0_20px_rgba(221,50,240,0.3)] hover:shadow-[0_0_30px_rgba(221,50,240,0.5)] transform hover:scale-105 font-sans">
                            Join Us
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
