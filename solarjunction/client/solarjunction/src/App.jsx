import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import ServicesProjects from './sections/Services'
import About from './sections/About'
import FAQLegal from './sections/FAQ'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import ScrollToTop from './components/ScrollToTop'
import Marquee from './components/Marquee'
import CursorGlow from './components/CursorGlow'
import CalcButton from './components/CalcButton'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

// Main marketing site (single-page scroll)
function MainSite() {
  return (
    <main className="bg-[#E8F0E8] text-[#22382B] overflow-x-hidden">
      <Navbar />
      <Hero />
      <Marquee />
      <ServicesProjects />
      <About />
      <FAQLegal />
      <CalcButton />
      <Contact />
      <Footer />
      <ScrollToTop />
      <CursorGlow />
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public site */}
        <Route path="/" element={<MainSite />} />

        {/* Admin */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Catch-all → home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}