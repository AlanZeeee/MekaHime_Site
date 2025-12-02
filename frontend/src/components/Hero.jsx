import { useState, useEffect } from 'react';
import backgroundVideo from '../assets/IsekaiBoxWebsiteV2.mov';

const Hero = () => {
    const [text, setText] = useState('異世界');
    const [glow, setGlow] = useState(false);

    // Glitch content in various languages
    const glitchWords = [
        'Otro Mundo', 'Autre Monde', 'Andere Welt', '异世界', '이세계',
        'Другой Мир', 'Un Altro Mondo', 'Outro Mundo', 'Dunia Lain', 'Another Realm'
    ];

    useEffect(() => {
        let isCancelled = false;

        const randomChars = '!@#$%^&*<>?_~[]{}';
        const generateRandomString = () => {
            const length = Math.floor(Math.random() * 5) + 5; // 5 to 9 chars
            let str = '';
            for (let i = 0; i < length; i++) {
                str += randomChars[Math.floor(Math.random() * randomChars.length)];
            }
            return str;
        };

        const runCycle = async () => {
            // Initial Delay: 0.5s
            await new Promise(r => setTimeout(r, 500));
            if (isCancelled) return;

            while (!isCancelled) {
                // --- Cycle 1: Glitch to "Isekai" ---
                setGlow(false);
                // Glitch for ~500ms
                const startTime1 = Date.now();
                while (Date.now() - startTime1 < 500) {
                    const showRandom = Math.random() > 0.4; // 60% chance of random chars
                    setText(showRandom ? generateRandomString() : glitchWords[Math.floor(Math.random() * glitchWords.length)]);

                    // Random interval between 30ms and 80ms
                    await new Promise(r => setTimeout(r, Math.floor(Math.random() * 50) + 30));
                    if (isCancelled) return;
                }

                // Settle on "Isekai"
                setText('the Isekai');
                setGlow(true);

                // Wait 3s
                await new Promise(r => setTimeout(r, 3000));
                if (isCancelled) return;

                // --- Cycle 2: Glitch to "Another World" ---
                setGlow(false);
                // Glitch for ~500ms
                const startTime2 = Date.now();
                while (Date.now() - startTime2 < 500) {
                    const showRandom = Math.random() > 0.4;
                    setText(showRandom ? generateRandomString() : glitchWords[Math.floor(Math.random() * glitchWords.length)]);

                    await new Promise(r => setTimeout(r, Math.floor(Math.random() * 50) + 30));
                    if (isCancelled) return;
                }

                // Settle on "Another World"
                setText('Another World');
                setGlow(true);

                // Wait 3s
                await new Promise(r => setTimeout(r, 3000));
                if (isCancelled) return;
            }
        };

        runCycle();

        return () => {
            isCancelled = true;
        };
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Background Video */}
            <video
                className="absolute inset-0 w-full h-full object-cover z-0"
                src={backgroundVideo}
                autoPlay
                muted
                playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-0" />

            {/* Content */}
            <div className="relative z-10 h-full w-full">
                <div
                    className="absolute text-left"
                    style={{
                        left: '20%',
                        top: '50%',
                        transform: 'translateY(-50%)'
                    }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                        Building Portal<br />
                        to <span
                            className={`transition-all duration-100 text-white ${glow ? 'drop-shadow-[0_0_15px_rgba(221,50,240,1)]' : ''}`}
                        >
                            {text}
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    );
};
export default Hero;
