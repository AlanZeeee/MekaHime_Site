import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SignupForm from '../components/SignupForm';

const Home = () => {
    return (
        <div className="min-h-screen bg-darkbg text-white">
            <Navbar />
            <Hero />
        </div>
    );
};

export default Home;
