/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "rgb(74, 145, 245)", // Updated Blue
                secondary: "#2d2d2d",
                darkbg: "rgb(18, 24, 39)",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                fragile: ['"Fragile Bombers"', 'sans-serif'],
                architex: ['"Architex"', 'sans-serif'],
            },
            animation: {
                'scroll-wheel': 'scroll-wheel 10s linear infinite',
            },
            keyframes: {
                'scroll-wheel': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(-50%)' },
                },
            },
        },
    },
    plugins: [],
}
