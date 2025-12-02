import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useMekaCoin } from '../context/MekaCoinContext';

const WaitlistPage = () => {
    const { addCoins } = useMekaCoin();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(''); // Clear error on typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/waitlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Waitlist submission successful');
                setSubmitted(true);
                // Add coins on successful submission
                // Note: We also have handleJoinClick, but logic-wise it's better here or we keep it separate?
                // The prompt asked to register info. 
                // The coin adding is already handled by the onClick handler on the button.
            } else {
                console.error('Waitlist submission failed');
                setError('Something went wrong. Please try again later.');
                // Optional: Show error to user
            }
        } catch (error) {
            console.error('Error submitting waitlist form:', error);
            setError('Unable to connect to server. Please ensure backend is running.');
        }
    };

    const handleJoinClick = (e) => {
        e.stopPropagation();
        // Only add coins if form is valid? The prompt implies just clicking the button.
        // But let's assume valid submission for "earning". 
        // Actually, prompt says "The 'Join Waitlist' button gives 100". 
        // Let's add it on click.
        addCoins(100, e.clientX, e.clientY);
    };

    return (
        <div className="min-h-screen bg-darkbg text-white">
            <Navbar />
            <div className="pt-32 px-6 max-w-3xl mx-auto flex flex-col items-center text-center">
                <h1 className="text-6xl font-bold mb-8 font-fragile">Early Access</h1>
                <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl">
                    Our TTS is still in beta testing and small-scale adoption. Fill out your information below and we will process your request in 1-2 days.
                </p>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
                        <div className="flex flex-col text-left gap-2">
                            <label className="text-lg font-medium ml-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-4 bg-gray-800 rounded-full border border-gray-700 focus:border-primary focus:outline-none text-white px-6"
                                placeholder="Your Name"
                            />
                        </div>

                        <div className="flex flex-col text-left gap-2">
                            <label className="text-lg font-medium ml-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-4 bg-gray-800 rounded-full border border-gray-700 focus:border-primary focus:outline-none text-white px-6"
                                placeholder="name@company.com"
                            />
                        </div>

                        <div className="flex flex-col text-left gap-2">
                            <label className="text-lg font-medium ml-2">Company <span className="text-gray-500 text-sm">(optional)</span></label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full p-4 bg-gray-800 rounded-full border border-gray-700 focus:border-primary focus:outline-none text-white px-6"
                                placeholder="Company Name"
                            />
                        </div>

                        <button
                            type="submit"
                            onClick={handleJoinClick}
                            className="mt-6 w-full py-4 rounded-full bg-primary text-white text-xl font-bold hover:bg-[#dd32f0] transition-all shadow-[0_0_20px_rgba(221,50,240,0.3)] hover:shadow-[0_0_30px_rgba(221,50,240,0.5)]"
                        >
                            Join Waitlist
                        </button>

                        {error && (
                            <p className="text-red-500 mt-2">{error}</p>
                        )}
                    </form>
                ) : (
                    <div className="p-8 bg-gray-800 rounded-2xl border border-gray-700 animate-fade-in">
                        <h3 className="text-2xl font-bold text-primary mb-4">Request Received!</h3>
                        <p className="text-gray-300">
                            We'll be in touch in 1-2 business days.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WaitlistPage;
