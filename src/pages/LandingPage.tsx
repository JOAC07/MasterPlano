import { useLotes } from '../hooks/useLotes';
import { Hero } from '../components/landing/Hero';
import { StatsBar } from '../components/landing/StatsBar';
import { Masterplan } from '../components/landing/Masterplan';
import { SobreElProyecto } from '../components/landing/SobreElProyecto';
import { PorQueInvertir } from '../components/landing/PorQueInvertir';
import { Galeria } from '../components/landing/Galeria';
import { Testimonios } from '../components/landing/Testimonios';
import { Faq } from '../components/landing/Faq';
import { CtaFinal } from '../components/landing/CtaFinal';
import { ContactoForm } from '../components/landing/ContactoForm';
import { Footer } from '../components/landing/Footer';
import { WhatsappFAB } from '../components/landing/WhatsappFAB';

export function LandingPage() {
  const { lotes, disponibles, total } = useLotes();

  function scrollToMasterplan() {
    document.getElementById('masterplan')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <main className="min-h-screen bg-white">
      <Hero
        lotesDisponibles={disponibles}
        lotesTotales={total}
        onVerMasterplan={scrollToMasterplan}
      />

      <StatsBar />

      <Masterplan lotes={lotes} disponibles={disponibles} total={total} />

      <SobreElProyecto />
      <PorQueInvertir />
      <Galeria />
      <Testimonios />
      <CtaFinal />
      <Faq />
      <ContactoForm />
      <Footer />

      <WhatsappFAB />
    </main>
  );
}
