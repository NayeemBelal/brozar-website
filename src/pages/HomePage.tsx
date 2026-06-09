import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../sections/Hero'
import Work from '../sections/Work'
import Services from '../sections/Services'
import About from '../sections/About'
import Contact from '../sections/Contact'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Work />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
