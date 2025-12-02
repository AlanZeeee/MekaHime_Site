import { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;
        setStatus('loading');

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/subscribe`, { email });
            setStatus('success');
            setEmail('');
        } catch (err) {
            setStatus('error');
            console.error(err);
        }
    };

    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-xl max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4 text-primary">Stay Updated</h2>
            <p className="text-gray-400 mb-4">Join the waitlist for MekaHime updates.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 bg-gray-700 rounded border border-gray-600 focus:border-primary focus:outline-none text-white"
                    required
                />
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="py-2 px-4 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors"
                >
                    {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
            </form>

            {status === 'success' && (
                <p className="text-green-400 mt-2">Thanks for subscribing!</p>
            )}
            {status === 'error' && (
                <p className="text-red-400 mt-2">Something went wrong. Try again.</p>
            )}
        </div>
    );
};

export default SignupForm;
