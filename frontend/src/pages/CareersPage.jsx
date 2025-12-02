import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const jobs = [
    {
        title: 'Founding Software Engineer',
        location: 'Berkeley, CA',
        type: 'On-Site, Full-Time',
        salary: '$110K - $130K'
    },
    {
        title: 'Product Growth Manager',
        location: 'Berkeley, CA',
        type: 'On-Site, Full-Time',
        salary: '$90K - $100K'
    },
    {
        title: 'Social Media Marketing Intern',
        location: 'Berkeley, CA',
        type: 'Hybrid, Part-Time',
        salary: '$25-$40/hr'
    },
    {
        title: 'Product Growth Intern',
        location: 'Berkeley, CA',
        type: 'Hybrid, Part-Time',
        salary: '$30-$40/hr'
    }
];

const CareersPage = () => {
    return (
        <div className="min-h-screen bg-darkbg text-white">
            <Navbar />

            <div className="pt-32 px-6 max-w-5xl mx-auto pb-20">
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 font-fragile">Build the Isekai with Us</h1>
                    <p className="text-xl text-gray-400 font-light">
                        We are looking for people who learn fast, execute fast, and deliver fast.
                    </p>
                </div>

                <div className="flex flex-col">
                    {jobs.map((job, index) => (
                        <Link
                            to="/coming-soon"
                            key={index}
                            className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-gray-800 hover:border-gray-600 transition-colors cursor-pointer block"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0 group-hover:text-primary transition-colors">
                                {job.title}
                            </h3>

                            <div className="flex items-center gap-8 md:gap-16">
                                <div className="text-left md:text-right text-gray-400 font-light text-sm md:text-base">
                                    <p>{job.location}</p>
                                    <p>{job.type}</p>
                                    <p className="text-white font-medium mt-1">{job.salary}</p>
                                </div>
                                <div className="hidden md:block transform group-hover:translate-x-2 transition-transform text-2xl text-gray-500 group-hover:text-white">
                                    →
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CareersPage;
