import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Services } from '../components/Services';
import { Instagram } from '../components/Instagram';
import { Pricing } from '../components/Pricing';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import { FAQ } from '../components/FAQ';

export function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-['Inter']">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Instagram />
        <Pricing />
        <CTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}