import { Link, useLocation } from 'react-router-dom';
import { useMekaCoin } from '../context/MekaCoinContext';
import logo from '../assets/mainLogo.png';
// User said "when in home page... same as other pages". Implies routing.
// But for now let's stick to a simple layout. I'll use simple <a> tags or buttons for visual demo if routing isn't fully set up.
// Actually, let's use a simple state or just visual placeholder for "active".


const Navbar = () => {
    const location = useLocation();
    const { coins, addCoins } = useMekaCoin();

    let activeLink = 'Home';
    if (location.pathname === '/tts' || location.pathname === '/try' || location.pathname === '/api') {
        activeLink = 'TTS';
    } else if (location.pathname === '/aboutus') {
        activeLink = 'About Us';
    } else if (location.pathname === '/careers') {
        activeLink = 'Careers';
    }

    const handleNavClick = (e) => {
        e.stopPropagation(); // Prevent global +1 coin
        addCoins(5, e.clientX, e.clientY);
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-12 py-4 flex justify-center items-center bg-darkbg border-b border-gray-800">
            {/* Centered Navigation Group */}
            <div className="flex items-center gap-12">
                <Link
                    to="/"
                    onClick={handleNavClick}
                    className={`text-lg font-medium transition-colors relative group ${activeLink === 'Home' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    Home
                    {activeLink === 'Home' && (
                        <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"></span>
                    )}
                </Link>

                <Link
                    to="/tts"
                    onClick={handleNavClick}
                    className={`text-lg font-medium transition-colors relative group ${activeLink === 'TTS' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    TTS
                    {activeLink === 'TTS' && (
                        <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"></span>
                    )}
                </Link>

                <div className="mx-6">
                    <Link to="/" onClick={handleNavClick}>
                        <img src={logo} alt="MekaHime" className="h-12 transform scale-[1.3] cursor-pointer hover:opacity-80 transition-opacity" />
                    </Link>
                </div>

                <Link
                    to="/aboutus"
                    onClick={handleNavClick}
                    className={`text-lg font-medium transition-colors relative group ${activeLink === 'About Us' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    About Us
                    {activeLink === 'About Us' && (
                        <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"></span>
                    )}
                </Link>

                <Link
                    to="/careers"
                    onClick={handleNavClick}
                    className={`text-lg font-medium transition-colors relative group ${activeLink === 'Careers' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    Careers
                    {activeLink === 'Careers' && (
                        <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"></span>
                    )}
                </Link>
            </div>

            {/* MekaCoin Counter - Absolute Right */}
            <Link to="/mekacoin" className="absolute right-12 flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-gray-700 backdrop-blur-md hover:bg-black/60 hover:border-yellow-500 transition-all cursor-pointer group animate-glow-gold">
                <img src="/mekacoin.png" alt="Coin" className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-yellow-400 font-bold font-mono">{coins}</span>
            </Link>
        </nav>
    );
};

export default Navbar;
