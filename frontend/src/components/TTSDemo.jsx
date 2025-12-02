import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useMekaCoin } from '../context/MekaCoinContext';

const TTSDemo = () => {
    const { addCoins } = useMekaCoin();
    const [text, setText] = useState('');
    const [audioUrl, setAudioUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedVoice, setSelectedVoice] = useState('voice1');
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    // Mock stats
    const [peopleInLine, setPeopleInLine] = useState(167);
    const [delay, setDelay] = useState(205);

    useEffect(() => {
        // Randomize stats slightly on mount
        setPeopleInLine(Math.floor(Math.random() * 50) + 150);
        setDelay(Math.floor(Math.random() * 100) + 150);
    }, []);

    const handleGenerate = async (e) => {
        e.stopPropagation();
        if (!text) return;

        // Add coins
        addCoins(50, e.clientX, e.clientY);

        setLoading(true);
        setError(null);
        setAudioUrl(null);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/generate-tts`, {
                text: text,
                voice_id: selectedVoice,
                language: selectedLanguage
            });

            const url = `${import.meta.env.VITE_API_URL}${response.data.audio_url}`;
            setAudioUrl(url);
        } catch (err) {
            setError('Failed to generate audio. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Left Column: Dialogue Box */}
                <div className="md:col-span-2 flex flex-col">
                    <textarea
                        className="w-full h-64 p-6 bg-gray-800 rounded-xl border border-gray-700 focus:border-primary focus:outline-none text-white text-lg resize-none shadow-inner"
                        placeholder="Enter your dialogue here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <p className="mt-4 text-gray-400 text-sm font-light leading-relaxed">
                        Supports English, Chinese, and Japanese, this is a demo of an in-development version of Freya TTS, glitches and bugs are expected, please <Link to="/api" className="underline hover:text-primary transition-colors">join our waitlist</Link> for the production version. This website is purely for demonstration and does not satisfy commercial use requirement. DO NOT use this demo for your project, either personal or commercial.
                    </p>
                </div>

                {/* Right Column: Controls */}
                <div className="md:col-span-1 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-300 font-medium">Character Voice</label>
                        <select
                            value={selectedVoice}
                            onChange={(e) => setSelectedVoice(e.target.value)}
                            className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:border-primary focus:outline-none appearance-none"
                        >
                            <option value="voice1">MekaHime - Standard</option>
                            <option value="voice2">MekaHime - Soft</option>
                            <option value="voice3">MekaHime - Angry</option>
                            <option value="voice4">MekaHime - Whisper</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-300 font-medium">Language</label>
                        <select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:border-primary focus:outline-none appearance-none"
                        >
                            <option value="en">English</option>
                            <option value="zh">Chinese</option>
                            <option value="jp">Japanese</option>
                            <option value="mixed">Mixed</option>
                        </select>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={loading || !text}
                        className={`w-full py-4 px-6 rounded-full font-bold text-lg transition-all transform hover:scale-105 ${loading || !text
                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-primary hover:bg-[#dd32f0] text-white shadow-[0_0_20px_rgba(221,50,240,0.4)]'
                            }`}
                    >
                        {loading ? 'Processing...' : 'Process & Play'}
                    </button>

                    <Link to="/api">
                        <button className="w-full py-4 px-6 rounded-full font-bold text-lg transition-all transform hover:scale-105 border border-white bg-transparent text-white hover:bg-primary hover:border-primary hover:shadow-[0_0_20px_rgba(221,50,240,0.4)]">
                            Request Full Version API
                        </button>
                    </Link>

                    {audioUrl && (
                        <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
                            <audio controls src={audioUrl} className="w-full" autoPlay />
                        </div>
                    )}

                    {error && <p className="text-red-400 text-sm">{error}</p>}
                </div>
            </div>

            {/* Status Box */}
            <div className="flex items-center justify-center gap-4 p-4 rounded-full border border-gray-800 bg-black/20 backdrop-blur-sm w-fit mx-auto">
                <div className="relative flex items-center justify-center w-4 h-4">
                    <div className="absolute w-full h-full bg-green-500 rounded-full animate-ping opacity-75"></div>
                    <div className="relative w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
                </div>
                <p className="text-gray-400 font-mono text-sm">
                    Server is up, <span className="text-white font-bold">{peopleInLine}</span> people are in line, expect delay of <span className="text-white font-bold">{delay}</span> ms
                </p>
            </div>
        </div>
    );
};

export default TTSDemo;
