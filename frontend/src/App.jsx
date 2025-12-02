import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TTSProductPage from './pages/TTSProductPage';
import TryPage from './pages/TryPage';
import FloatingButtons from './components/FloatingButtons';

import WaitlistPage from './pages/WaitlistPage';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import ComingSoonPage from './pages/ComingSoonPage';
import MekaCoinPage from './pages/MekaCoinPage';
import { MekaCoinProvider } from './context/MekaCoinContext';

function App() {
    return (
        <MekaCoinProvider>
            <Router>
                <div className="font-sans text-white bg-darkbg min-h-screen">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/tts" element={<TTSProductPage />} />
                        <Route path="/try" element={<TryPage />} />
                        <Route path="/api" element={<WaitlistPage />} />
                        <Route path="/aboutus" element={<AboutPage />} />
                        <Route path="/careers" element={<CareersPage />} />
                        <Route path="/coming-soon" element={<ComingSoonPage />} />
                        <Route path="/mekacoin" element={<MekaCoinPage />} />
                    </Routes>
                </div>
            </Router>
        </MekaCoinProvider>
    );
}

export default App;
