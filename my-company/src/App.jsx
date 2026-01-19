import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // optional

import Home     from "./components/Home";
import About    from "./components/About";
import Services from "./components/Services";
import Contact  from "./components/Contact";

import './index.css'; // optional

function App() {
  return (
    <BrowserRouter>
      <div style={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Navbar />
        
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            {/* Optional: 404 page */}
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </main>

        <Footer /> {/* optional */}
      </div>
    </BrowserRouter>
  );
}

export default App;