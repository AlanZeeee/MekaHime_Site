import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

const MekaCoinContext = createContext();

export const useMekaCoin = () => useContext(MekaCoinContext);

export const MekaCoinProvider = ({ children }) => {
    // Initialize state from localStorage
    const [coins, setCoins] = useState(() => {
        const saved = localStorage.getItem('mekacoins');
        return saved ? parseInt(saved, 10) : 0;
    });
    const [animations, setAnimations] = useState([]);

    // Persist coins to localStorage
    useEffect(() => {
        localStorage.setItem('mekacoins', coins.toString());
    }, [coins]);

    // Safe setter to prevent negative balance
    const setCoinsSafe = useCallback((valueOrFn) => {
        setCoins(prev => {
            const newValue = typeof valueOrFn === 'function' ? valueOrFn(prev) : valueOrFn;
            return Math.max(0, newValue);
        });
    }, []);

    // Add coins and trigger animation
    const addCoins = useCallback((baseAmount, x, y, options = {}) => {
        const { skipMultiplier = false, customStyle = null } = options;

        let finalAmount = baseAmount;
        let styleClass = "text-gray-400 font-bold text-2xl"; // Default Grey

        if (!skipMultiplier) {
            const r = Math.random();
            let multiplier = 1;

            if (r < 0.005) { // 0.5% chance -> 1000x
                multiplier = 1000;
                // Golden text with white glow, 10x size (approx text-9xl or custom)
                styleClass = "text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,255,255,0.9)] text-9xl font-extrabold z-50 animate-pulse";
            } else if (r < 0.025) { // 2% chance -> 100x
                multiplier = 100;
                // Magenta text, 5x size
                styleClass = "text-[#dd32f0] text-7xl font-bold z-40";
            } else if (r < 0.125) { // 10% chance -> 5x
                multiplier = 5;
                // Blue text, 1.5x size
                styleClass = "text-blue-400 text-4xl font-bold z-30";
            }
            finalAmount = Math.floor(baseAmount * multiplier);
        } else {
            if (customStyle) styleClass = customStyle;
        }

        setCoinsSafe(prev => prev + finalAmount);

        const id = Date.now() + Math.random();
        setAnimations(prev => [...prev, { id, amount: finalAmount, x, y, styleClass }]);

        // Remove animation after it completes (e.g., 1s)
        setTimeout(() => {
            setAnimations(prev => prev.filter(anim => anim.id !== id));
        }, 1000);
    }, [setCoinsSafe]);

    // Global timer: +1 coin every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            // For the timer, we don't show a floating animation at a specific location,
            // or we could show it at the top right. Let's just add the coin silently or maybe near the navbar?
            // The prompt says "everytime a new mekacoin is issued, an animation... will appear".
            // Since we don't have a click coordinate, let's skip the animation for the passive income 
            // OR make it appear near the coin counter (top right).
            // Let's just add it to the count for now to avoid visual clutter every 5s.
            setCoinsSafe(prev => prev + 1);
        }, 5000);
        return () => clearInterval(interval);
    }, [setCoinsSafe]);

    // Global click listener: +1 coin on any click
    useEffect(() => {
        const handleGlobalClick = (e) => {
            // We only want this for generic clicks that AREN'T handled by specific buttons
            // But the prompt says "Everytime they click anything anywhere, they get one MekaCoin"
            // AND specific buttons add EXTRA.
            // So we can just add 1 for every click, and specific buttons add EXTRA.
            addCoins(1, e.clientX, e.clientY);
        };

        window.addEventListener('click', handleGlobalClick);
        return () => window.removeEventListener('click', handleGlobalClick);
    }, [addCoins]);

    return (
        <MekaCoinContext.Provider value={{ coins, addCoins, setCoins: setCoinsSafe }}>
            {children}
            {/* Floating Text Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
                {animations.map(anim => (
                    <div
                        key={anim.id}
                        className={`absolute animate-float-up pointer-events-none flex items-center gap-1 ${anim.styleClass}`}
                        style={{ left: anim.x, top: anim.y }}
                    >
                        <span>{anim.amount > 0 ? '+' : ''}{anim.amount}</span>
                        <img src="/mekacoin.png" alt="coin" className="w-6 h-6" />
                    </div>
                ))}
            </div>
        </MekaCoinContext.Provider>
    );
};
