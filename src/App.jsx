import { useEffect } from 'react'
// Removed AnimatePresence wrapper as we don't animate route exits/entries
import AOS from 'aos'
import 'aos/dist/aos.css'
import Nav from './components/Nav.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import Contact from './components/Contact.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import HowIWork from './components/HowIWork.jsx'
import Projects from './components/Projects.jsx'
import Certificates from './components/Certificates.jsx'
import Achievements from './components/Achievements.jsx'
import Skills from './components/Skills.jsx'
// import Testimonials from './components/Testimonials.jsx' // Un-comment to enable when testimonials data is ready
import Experience from './components/Experience.jsx'
import Footer from './components/Footer.jsx'
import Doodles from './components/Doodles.jsx'

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: true })
  }, [])

  return (
    <>
      <Nav />
      <ThemeToggle />
      <main id="main" className="min-h-screen relative">
        <Doodles />
        <Hero />

  <About />

        <HowIWork />

  <Skills />

  <Projects />

  <Certificates />

  <Achievements />

        <Experience />

        {/**
         * Testimonials are currently disabled per request.
         * To enable later: add quotes to `src/data/testimonials.js` and un-comment the line below.
         */}
        {/** <Testimonials /> */}

        <Contact />
      </main>
      <Footer />
    </>
  )
}
