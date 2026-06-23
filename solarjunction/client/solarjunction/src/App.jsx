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

export default function App() {
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