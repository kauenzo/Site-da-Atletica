import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { SportsSection } from '@/components/sections/SportsSection'
import { EventsSection } from '@/components/sections/EventsSection'
import { SponsorSection } from '@/components/sections/SponsorSection'
import { Footer } from '@/components/sections/Footer'
import { Header } from '@/components/layout/Header'

export default function Home() {
  return (
    <div className='min-h-screen'>
      <Header />
      <HeroSection />
      <section id='about'>
        <AboutSection />
      </section>
      <section id='sports'>
        <SportsSection />
      </section>
      <section id='events'>
        <EventsSection />
      </section>
      <section id='sponsor'>
        <SponsorSection />
      </section>
      <Footer />
    </div>
  )
}

