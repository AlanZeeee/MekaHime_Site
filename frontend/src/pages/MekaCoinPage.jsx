import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useMekaCoin } from '../context/MekaCoinContext';

const MekaCoinPage = () => {
    const { coins, addCoins, setCoins } = useMekaCoin();
    const navigate = useNavigate();
    const [spinning, setSpinning] = useState(false);
    const [resultMessage, setResultMessage] = useState(null);
    const [currentEmoji, setCurrentEmoji] = useState("🎰");

    // Initialize spinCost from localStorage or default to 1000
    const [spinCost, setSpinCost] = useState(() => {
        const savedCost = localStorage.getItem('mekacoin_spin_cost');
        return savedCost ? parseInt(savedCost, 10) : 1000;
    });

    const buttonRef = useRef(null);

    // Persist spinCost to localStorage
    useEffect(() => {
        localStorage.setItem('mekacoin_spin_cost', spinCost.toString());
    }, [spinCost]);

    const EMOJIS = ["🎰", "🍒", "🍋", "🍉", "🍇", "💎", "🔔", "🍀", "7️⃣", "🪙", "🎲", "🃏", "🎱", "🎪", "🎭", "🎨", "🎩", "🔮", "🧿", "🧸"];

    const handleSpin = () => {
        // Dynamic Cost Logic
        // If balance <= 5000, cost is 1000.
        // If balance > 5000, cost scales (handled by state update at end of spin).

        const initialBalance = coins; // Capture balance BEFORE spin cost

        // Check if user can afford the current cost
        if (coins < spinCost) {
            setResultMessage(
                <span className="flex items-center justify-center gap-2 flex-wrap">
                    Not Enough <img src="/mekacoin.png" alt="coin" className="w-6 h-6 inline" />, maybe go get a <Link to="/careers" className="underline hover:text-yellow-400">job</Link>?
                </span>
            );
            // If balance is below 1000, ensure cost resets to 1000 (standard base cost)
            if (coins < 1000) {
                setSpinCost(1000);
            }
            return;
        }

        setSpinning(true);
        setResultMessage(null);

        // Deduct cost
        setCoins(prev => prev - spinCost);

        // Determine spin duration (10-30 steps * 100ms = 1-3 seconds)
        const spinSteps = Math.floor(Math.random() * 21) + 10; // 10 to 30
        const stepDuration = 100;
        const totalDuration = spinSteps * stepDuration;

        // Start emoji cycling
        const spinInterval = setInterval(() => {
            const randomEmoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
            setCurrentEmoji(randomEmoji);
        }, stepDuration);

        // End spin and show outcome
        setTimeout(() => {
            clearInterval(spinInterval);

            let outcome;
            // Special Odds if balance (before spin) was <= 5000
            if (initialBalance <= 5000) {
                // Low/Mid Balance: 25% chance each for 0, 1, 2, 3
                const r = Math.random();
                if (r < 0.25) outcome = 0;      // Go Broke
                else if (r < 0.50) outcome = 1; // 2X
                else if (r < 0.75) outcome = 2; // 4X
                else outcome = 3;               // 8X
            } else {
                // Standard: Random 0-7
                outcome = Math.floor(Math.random() * 8);
            }

            let message = "";
            let messageColor = "text-white";
            let action = () => { };

            // Get button position for animation origin
            const rect = buttonRef.current?.getBoundingClientRect();
            const centerX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
            const centerY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

            const triggerRapidAnimations = (count, interval, radius, amountPerStep, style) => {
                let i = 0;
                const intervalId = setInterval(() => {
                    if (i >= count) {
                        clearInterval(intervalId);
                        return;
                    }

                    // Random position within radius
                    const angle = Math.random() * Math.PI * 2;
                    const r = Math.random() * radius;
                    const x = centerX + Math.cos(angle) * r;
                    const y = centerY + Math.sin(angle) * r;

                    addCoins(amountPerStep, x, y, { skipMultiplier: true, customStyle: style });
                    i++;
                }, interval * 1000);
            };

            switch (outcome) {
                case 0: // Go Broke
                    message = "Go Broke! You lost all your MekaCoins.";
                    messageColor = "text-red-500";
                    action = () => {
                        // Instant Zero
                        setCoins(0);

                        // Cosmetic Animations: Show losing the remaining balance
                        const remainingBalance = initialBalance - spinCost;
                        if (remainingBalance > 0) {
                            const step = Math.round(remainingBalance / 10);
                            // 10 animations, 0.5s apart, 500px radius
                            triggerRapidAnimations(10, 0.5, 500, -step, "text-red-500 font-bold text-4xl");
                        }
                    };
                    break;
                case 1: // 2X
                    message = "2X MekaCoin! Your balance doubled!";
                    messageColor = "text-blue-500";
                    action = () => {
                        // Target: Initial * 2
                        // Current (theoretical): Initial - Cost
                        // Add: (Initial * 2) - (Initial - Cost) = Initial + Cost
                        const totalAdd = initialBalance + spinCost;
                        const step = Math.round(totalAdd / 10);
                        // 10 animations, 0.3s apart, 500px radius
                        triggerRapidAnimations(10, 0.3, 500, step, "text-blue-500 font-bold text-4xl");
                    };
                    break;
                case 2: // 4X
                    message = "4X MekaCoin! Your balance quadrupled!";
                    messageColor = "text-purple-500";
                    action = () => {
                        // Target: Initial * 4
                        // Add: (Initial * 4) - (Initial - Cost) = 3 * Initial + Cost
                        const totalAdd = (3 * initialBalance) + spinCost;
                        const step = Math.round(totalAdd / 50);
                        // 50 animations, 0.05s apart, 700px radius
                        triggerRapidAnimations(50, 0.05, 700, step, "text-purple-500 font-bold text-4xl");
                    };
                    break;
                case 3: // 8X (New)
                    message = "8X MekaCoin! JACKPOT!";
                    messageColor = "text-[#FFD700] drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]";
                    action = () => {
                        // Target: Initial * 8
                        // Add: (Initial * 8) - (Initial - Cost) = 7 * Initial + Cost
                        const totalAdd = (7 * initialBalance) + spinCost;
                        const step = Math.round(totalAdd / 300);
                        // 300 animations, 0.01s apart, 1000px radius
                        triggerRapidAnimations(300, 0.01, 1000, step, "text-[#FFD700] font-bold text-5xl drop-shadow-[0_0_10px_rgba(255,255,255,1)]");
                    };
                    break;
                case 4: // Try Freya
                    message = "You Earned a Chance to Try Freya TTS";
                    action = () => setTimeout(() => navigate('/try'), 3000);
                    break;
                case 5: // Job Application
                    message = "JOB APPLICATION, GO GET A JOB!!";
                    action = () => setTimeout(() => navigate('/careers'), 3000);
                    break;
                case 6: // Secret Early Access
                    message = "You Earned a Chance to Try Super Secret Early Access";
                    action = () => setTimeout(() => navigate('/api'), 3000);
                    break;
                case 7: // Fall Off Map
                    message = "You are about to fall off the map, womp womp";
                    action = () => setTimeout(() => navigate('/coming-soon'), 3000);
                    break;
                default:
                    break;
            }

            setResultMessage(<span className={messageColor}>{message}</span>);

            // Execute action immediately (animations start now) or after delay for navigation
            if (outcome <= 3) {
                action();
                setSpinning(false); // Stop spinning immediately for coin outcomes to show animations
            } else {
                // For navigation, wait 3s then navigate
                action();
                setTimeout(() => setSpinning(false), 3000);
            }

            // Update Spin Cost for NEXT spin
            // Logic: If balance (after cost deduction) <= 5000 -> Reset to 1000.
            // If balance > 5000 -> Scale by 1.5x.

            const balanceAfterCost = coins - spinCost;

            if (balanceAfterCost <= 5000) {
                setSpinCost(1000);
            } else {
                setSpinCost(prev => Math.min(10000, Math.floor(prev * 1.5)));
            }

        }, totalDuration);
    };

    return (
        <div className="min-h-screen bg-darkbg text-white flex flex-col">
            <Navbar />

            <div className="flex-grow flex flex-col items-center justify-start pt-32 px-6 max-w-4xl mx-auto text-center pb-20">
                <div className="flex items-center justify-center gap-4 mb-12">
                    <img src="/mekacoin.png" alt="MekaCoin" className="w-16 h-16 md:w-20 md:h-20" />
                    <h1 className="text-6xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">MekaCoin</h1>
                </div>

                {/* Rules Section */}
                <div className="bg-gray-900/50 border border-gray-700 p-8 rounded-2xl mb-16 w-full backdrop-blur-sm">
                    <h2 className="text-3xl font-bold mb-6">How It Works</h2>
                    <div className="space-y-4 text-left text-gray-300">
                        <p className="flex items-center gap-4">
                            <span className="w-4 h-4 rounded-full bg-gray-400"></span>
                            <span><strong className="text-white">Base Click:</strong> +1 Coin for every interaction, but some buttons yield more.</span>
                        </p>
                        <p className="flex items-center gap-4">
                            <span className="w-4 h-4 rounded-full bg-blue-400"></span>
                            <span><strong className="text-blue-400">SR Crit (10%):</strong> 5x Multiplier</span>
                        </p>
                        <p className="flex items-center gap-4">
                            <span className="w-4 h-4 rounded-full bg-[#dd32f0]"></span>
                            <span><strong className="text-[#dd32f0]">SSR Crit (2%):</strong> 100x Multiplier</span>
                        </p>
                        <p className="flex items-center gap-4">
                            <span className="w-4 h-4 rounded-full bg-[#FFD700]"></span>
                            <span><strong className="text-[#FFD700]">UR Crit (0.5%):</strong> 1000x Multiplier</span>
                        </p>
                        <p className="flex items-center gap-4">
                            <span className="text-xl">⏳</span>
                            <span><strong className="text-white">Passive Income:</strong> +1 Coin every 5 seconds.</span>
                        </p>
                    </div>
                </div>

                {/* Roulette Section */}
                <div className="bg-gray-800/50 border border-gray-600 p-12 rounded-3xl w-full max-w-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-500/10 pointer-events-none"></div>

                    <h2 className="text-4xl font-bold mb-8 relative z-10">Try Your Luck</h2>
                    <p className="text-gray-400 mb-12 relative z-10">Cost: {spinCost} MekaCoins per spin</p>

                    <div className="mb-12 relative h-32 flex items-center justify-center">
                        {spinning ? (
                            <div className="flex flex-col items-center gap-4">
                                <div className="text-8xl animate-bounce">{currentEmoji}</div>
                                {resultMessage && <div className="text-xl font-bold animate-pulse">{resultMessage}</div>}
                            </div>
                        ) : (
                            <div className="text-2xl font-bold text-white">
                                {resultMessage || "Ready to Spin?"}
                            </div>
                        )}
                    </div>

                    <button
                        ref={buttonRef}
                        onClick={handleSpin}
                        disabled={spinning}
                        className={`
                            px-12 py-6 rounded-full text-2xl font-bold transition-all transform relative z-10 flex items-center justify-center gap-3 mx-auto
                            ${spinning
                                ? 'bg-gray-600 cursor-not-allowed opacity-50'
                                : 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:scale-105 shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:shadow-[0_0_50px_rgba(234,179,8,0.6)]'
                            }
                        `}
                    >
                        {spinning ? 'Spinning...' : (
                            <>
                                SPIN <span className="font-normal flex items-center gap-1">(-{spinCost} <img src="/mekacoin.png" alt="coin" className="w-8 h-8" />)</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MekaCoinPage;
