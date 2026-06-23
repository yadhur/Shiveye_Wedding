import Navbar from '../components/Navbar'
import React from 'react'
import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'
import Service from '../components/Service'
import IconicMoments from '../components/IconicMoment'
import ContactPage from './Contact'

function Home() {
  return (
    <>
      <Navbar />

      <HeroSection />
      <IconicMoments />
      <Service />
      <section id='contactForm'>
      <ContactPage/>
      </section>
      <Footer />
    </>
  )
}

export default Home;