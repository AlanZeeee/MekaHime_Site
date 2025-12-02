import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

import FloatingButtons from '../components/FloatingButtons';
import { useMekaCoin } from '../context/MekaCoinContext';

// Import Audio Files
import femaleMix from '../assets/audio/Female_Mix.wav';
import maleMix from '../assets/audio/Male_Mix.wav';
import femaleDissapointed from '../assets/audio/Female_Dissapointed.wav';
import maleTired from '../assets/audio/Male_Tired.wav';

const TTSProductPage = () => {
    const { addCoins } = useMekaCoin();
    const [playingEmotion, setPlayingEmotion] = useState(null);
    const [nsfwConfirming, setNsfwConfirming] = useState(false);
    const timeoutRef = useRef(null);
    const currentAudioRef = useRef(null);

    const [playbackDuration, setPlaybackDuration] = useState(0);

    const [demoStep, setDemoStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDemoStep((prev) => (prev + 1) % 4);
        }, 2000); // Change step every 2 seconds
        return () => clearInterval(interval);
    }, []);

    const audioMap = {
        'Female, EN + JP + CN': femaleMix,
        'Male, EN + JP + CN': maleMix,
        'Female, Dissapointed': femaleDissapointed,
        'Male, Tired': maleTired
    };

    const handleEmotionClick = (e, emotion) => {
        e.stopPropagation();

        // Stop current audio if any
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current.currentTime = 0;
        }

        // NSFW Logic
        if (emotion === 'Female, NSFW') {
            if (!nsfwConfirming) {
                setNsfwConfirming(true);
                return;
            }
            // Confirmed, but it's coming soon, so just set playing state (no coins)
            setNsfwConfirming(false);
        }

        // Toggle off if clicking same emotion
        if (playingEmotion === emotion) {
            setPlayingEmotion(null);
            setPlaybackDuration(0);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            if (emotion === 'Female, NSFW') setNsfwConfirming(false);
            return;
        }

        // Clear existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (emotion !== 'Female, NSFW') {
            setNsfwConfirming(false);
        }

        let duration = 5000; // Default 5s

        // Award Coins only for playable items
        const playableItems = ['Female, EN + JP + CN', 'Male, EN + JP + CN', 'Female, Dissapointed', 'Male, Tired'];
        if (playableItems.includes(emotion)) {
            addCoins(100, e.clientX, e.clientY);

            // Play Audio
            if (audioMap[emotion]) {
                const audio = new Audio(audioMap[emotion]);
                currentAudioRef.current = audio;

                // We need to wait for metadata to get duration
                // But we also want to start visual immediately? 
                // Actually, if we wait for metadata, there might be a slight delay.
                // Let's try to get duration.

                audio.addEventListener('loadedmetadata', () => {
                    const audioDuration = audio.duration * 1000;
                    if (audioDuration && isFinite(audioDuration)) {
                        setPlaybackDuration(audioDuration);
                        setPlayingEmotion(emotion);

                        audio.play().catch(err => console.error("Audio play failed:", err));

                        timeoutRef.current = setTimeout(() => {
                            setPlayingEmotion(null);
                            setPlaybackDuration(0);
                            timeoutRef.current = null;
                            if (emotion === 'Female, NSFW') setNsfwConfirming(false);
                        }, audioDuration);
                    }
                });

                // Fallback if metadata fails or takes too long? 
                // For local files it should be fast.
                // Trigger load
                audio.load();
                return; // Exit here, logic continues inside event listener
            }
        }

        // Fallback / No Audio Logic
        setPlaybackDuration(duration);
        setPlayingEmotion(emotion);

        timeoutRef.current = setTimeout(() => {
            setPlayingEmotion(null);
            setPlaybackDuration(0);
            timeoutRef.current = null;
            if (emotion === 'Female, NSFW') setNsfwConfirming(false);
        }, duration);
    };

    const emotionColors = {
        'Female, EN + JP + CN': 'bg-pink-500',
        'Male, EN + JP + CN': 'bg-blue-500',
        'Female, Dissapointed': 'bg-purple-500',
        'Male, Tired': 'bg-gray-500',
        'Female, Whispering': 'bg-indigo-500',
        'Female, Intense Crying': 'bg-teal-500',
        'Female, NSFW': 'bg-pink-600'
    };

    return (
        <div className="min-h-screen bg-darkbg text-white">
            <Navbar />
            <div className="pt-16"> {/* Add padding for fixed navbar */}
                {/* Section 1: Juiciest TTS + Video */}
                <section className="h-screen flex flex-row items-center justify-center gap-16 px-20 border-b border-gray-800 snap-start pb-[20vh]">
                    <div className="flex flex-col items-start">
                        <h2 className="text-6xl font-bold mb-8 text-left leading-tight">
                            Juiciest<br />TTS<br />on Earth
                        </h2>
                        <div className="flex items-center gap-4 text-gray-400">
                            <span className="h-[1px] w-12 bg-gray-600"></span>
                            <p className="uppercase tracking-widest text-sm">for AI Companions, Anime, and Games</p>
                        </div>
                    </div>
                    <div className="w-full max-w-xl aspect-video bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-2xl">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/SqKpdYlJzI0?start=478&autoplay=1&mute=1&loop=1&playlist=SqKpdYlJzI0"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </section>

                {/* Section 2: FREYA TTS Engine (Scrolling Wheels) */}
                <section className="flex items-center justify-center px-20 overflow-hidden snap-start py-10 border-b border-gray-800">
                    <div className="flex items-center gap-12">
                        <div className="text-right flex flex-col items-end">
                            <p className="tracking-widest text-sm text-gray-400 mb-0">Introducing MekaHime's</p>
                            <h2 className="text-6xl font-bold text-white mb-0">FREYA TTS Engine</h2>
                        </div>
                        <div className="h-64 overflow-hidden relative mask-image-gradient w-64">
                            {/* Mask for fading effect top/bottom */}
                            {/* Mask for fading effect top/bottom - Handled by CSS mask-image-gradient class */}

                            <div className="animate-scroll-wheel-smooth flex flex-col gap-0 text-4xl font-light text-gray-400">
                                {/* Duplicated list for seamless scrolling. 9 unique items * 2 = 18 items total. */}
                                {['AI Companions', 'Anime', 'ASMR', 'AI Toys', 'NSFW', 'Storytelling', 'VTubers', 'Game NPCs', 'Audiobooks', 'Visual Novels', 'Waifus', 'Roleplay', 'AI Companions', 'Anime', 'ASMR', 'AI Toys', 'NSFW', 'Storytelling', 'VTubers', 'Game NPCs', 'Audiobooks', 'Visual Novels', 'Waifus', 'Roleplay'].map((item, index) => (
                                    <div key={index} className={`h-16 flex items-center justify-start ${item === 'AI Companions' ? 'text-white font-bold' : ''}`}>{item}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Listen to Our Samples */}
                <section className="min-h-screen flex flex-row items-center justify-center gap-20 border-b border-gray-800 px-20 snap-start pb-[20vh]">
                    <div className="text-left">
                        <h2 className="text-6xl font-bold leading-tight mb-4">
                            Listen to<br />Our Samples
                        </h2>
                        <p className="text-xl text-gray-400 font-light max-w-md">
                            We support multiple languages and mixing them in the same sentence.
                        </p>
                    </div>
                    <div className="flex flex-col gap-0 border border-gray-700 rounded-lg overflow-hidden w-80 bg-gray-900">
                        {[
                            'Female, EN + JP + CN',
                            'Male, EN + JP + CN',
                            'Female, Dissapointed',
                            'Male, Tired',
                            'Female, Whispering',
                            'Female, Intense Crying',
                            'Female, NSFW'
                        ].map((emotion) => (
                            <button
                                key={emotion}
                                onClick={(e) => handleEmotionClick(e, emotion)}
                                className="relative flex items-center gap-4 p-4 hover:bg-gray-800 transition-colors border-b border-gray-700 last:border-b-0 text-left overflow-hidden group"
                            >
                                {/* Progress Bar */}
                                <div
                                    className={`absolute inset-0 h-full opacity-100 ${emotionColors[emotion]} ${playingEmotion === emotion ? 'transition-all ease-linear' : 'transition-none'}`}
                                    style={{
                                        width: playingEmotion === emotion ? '100%' : '0%',
                                        transitionDuration: playingEmotion === emotion ? `${playbackDuration}ms` : '0ms'
                                    }}
                                ></div>

                                <div className="relative z-10 w-8 h-8 rounded-full border border-white flex items-center justify-center text-xs group-hover:bg-white group-hover:text-black transition-colors">▶</div>
                                <span className="relative z-10 text-lg">
                                    {emotion === 'Female, NSFW'
                                        ? (playingEmotion === 'Female, NSFW' ? 'Coming soon...' : (nsfwConfirming ? 'Are you sure?' : 'Female, NSFW'))
                                        : (['Female, Whispering', 'Female, Intense Crying'].includes(emotion) && playingEmotion === emotion ? 'Coming soon...' : emotion)
                                    }
                                </span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Section 4: Context-Aware Emotion Detection */}
                <section className="min-h-screen flex flex-row items-center justify-center gap-20 border-b border-gray-800 px-20 snap-start pb-[20vh]">
                    {/* Left Side */}
                    <div className="flex flex-col items-start max-w-xl">
                        <h2 className="text-6xl font-bold mb-6 leading-tight">Context-Aware<br />Emotion Detection</h2>
                        <p className="text-xl text-gray-400 mb-2">No more tagging tone every sentence, it's done automagically.</p>
                        <p className="text-sm text-gray-500 italic">*manual tagging option offered for advanced users</p>
                    </div>

                    {/* Right Side - Animation */}
                    <div className="flex flex-col gap-8 w-full max-w-lg">
                        {/* Sentence 1 */}
                        <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700">
                            <p className="text-lg text-gray-300 leading-relaxed">
                                <span className={`transition-all duration-500 px-1 rounded ${demoStep === 0 || demoStep === 1 ? 'bg-yellow-500/30 text-yellow-100 shadow-[0_0_10px_rgba(234,179,8,0.2)]' : ''}`}>
                                    "I am so excited to watch the movie tonight. Wanna get dinner together beforehand?"
                                </span>
                            </p>
                            {/* Label 1 */}
                            <div className={`mt-2 transition-all duration-500 ${demoStep === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 h-0 overflow-hidden'}`}>
                                <span className="text-yellow-500 font-bold uppercase text-sm tracking-wider flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                    Happy, Excited
                                </span>
                            </div>
                        </div>

                        {/* Sentence 2 */}
                        <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700">
                            <p className="text-lg text-gray-300 leading-relaxed">
                                <span className={`transition-all duration-500 px-1 rounded ${demoStep === 2 || demoStep === 3 ? 'bg-blue-500/30 text-blue-100 shadow-[0_0_10px_rgba(59,130,246,0.2)]' : ''}`}>
                                    "Why did you leave me alone last night? I was trying to find you but you just dissapeared into thin air!"
                                </span>
                            </p>
                            {/* Label 2 */}
                            <div className={`mt-2 transition-all duration-500 ${demoStep === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 h-0 overflow-hidden'}`}>
                                <span className="text-blue-500 font-bold uppercase text-sm tracking-wider flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                    Dissapointed, Fear
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 5: Latency Graph */}
                <section className="min-h-screen flex flex-row items-center justify-center gap-24 border-b border-gray-800 px-20 snap-start pb-[20vh]">
                    <div className="text-left">
                        <h2 className="text-6xl font-bold leading-tight mb-4">Latency<br />Sub-275ms</h2>
                        <h3 className="text-xl text-gray-400 font-light">from request received to first token</h3>
                    </div>
                    <div className="flex flex-col gap-6 w-1/3">
                        {/* ElevenLabs */}
                        <div className="flex items-center gap-4">
                            <div className="w-[15%] h-8 bg-gray-700 rounded-r-full"></div>
                            <span className="text-gray-400 whitespace-nowrap">ElevenLabs - 75ms</span>
                        </div>
                        {/* MekaHime */}
                        <div className="flex items-center gap-4">
                            <div className="w-[55%] h-12 bg-primary rounded-r-full shadow-[0_0_15px_rgba(74,145,245,0.5)]"></div>
                            <span className="text-white font-bold text-xl whitespace-nowrap">MekaHime Freya - 275ms</span>
                        </div>
                        {/* Microsoft Azure */}
                        <div className="flex items-center gap-4">
                            <div className="w-[60%] h-8 bg-gray-700 rounded-r-full"></div>
                            <span className="text-gray-400 whitespace-nowrap">Microsoft Azure - 300ms</span>
                        </div>
                        {/* Hume AI */}
                        <div className="flex items-center gap-4">
                            <div className="w-[60%] h-8 bg-gray-700 rounded-r-full"></div>
                            <span className="text-gray-400 whitespace-nowrap">Hume AI - 300ms</span>
                        </div>
                        {/* Fish Audio */}
                        <div className="flex items-center gap-4">
                            <div className="w-full h-8 bg-gray-700 rounded-r-full"></div>
                            <span className="text-gray-400 whitespace-nowrap">Fish Audio - 500ms</span>
                        </div>
                    </div>
                </section>

                {/* Section 4: Voice Cloning vs Contracted VAs */}
                <section className="min-h-screen flex items-center justify-center border-b border-gray-800 snap-start pb-[20vh]">
                    <div className="grid grid-cols-2 w-full h-full min-h-screen">
                        {/* Left: Voice Cloning */}
                        <div className="flex flex-col justify-center px-20 border-r-2 border-gray-600">
                            <h2 className="text-5xl font-bold mb-8">Voice Cloning</h2>
                            <p className="text-2xl text-gray-300 font-light leading-relaxed">
                                1 minute of audio sample to clone any voice with ultra-rich emotional expression
                            </p>
                        </div>
                        {/* Right: Contracted VAs */}
                        <div className="flex flex-col justify-center px-20">
                            <h2 className="text-5xl font-bold mb-8">Contracted VAs</h2>
                            <p className="text-2xl text-gray-300 font-light leading-relaxed mb-8">
                                We contracted voice actors so you don't have to. Choose from a library of sound that is commercial-ready.
                            </p>
                            <Link to="/coming-soon" className="text-xl underline hover:text-primary transition-colors">Browse Commercial-Ready Voices --&gt;</Link>
                        </div>
                    </div>
                </section>

                {/* Section 6: Bottom CTA */}
                <section className="min-h-[50vh] flex flex-col md:flex-row items-center justify-center gap-8 border-b border-gray-800 snap-start pb-[10vh] px-20">
                    <Link to="/api" className="w-full md:w-auto">
                        <button className="w-full md:w-auto px-12 py-8 bg-primary hover:bg-blue-600 text-white text-2xl font-bold rounded-2xl transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(74,145,245,0.3)]">
                            Try MekaHime's Freya TTS
                        </button>
                    </Link>
                    <Link to="/api" className="w-full md:w-auto">
                        <button className="w-full md:w-auto px-12 py-8 bg-gray-800 hover:bg-gray-700 text-white text-2xl font-bold rounded-2xl border border-gray-600 transition-all transform hover:scale-105 hover:border-white">
                            I want to use your TTS as an API service
                        </button>
                    </Link>
                </section>

                <FloatingButtons />
            </div>
        </div>
    );
};

export default TTSProductPage;
