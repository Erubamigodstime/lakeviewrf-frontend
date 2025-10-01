import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import BookingForm from "@/components/BookingForm";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="scroll-smooth">
      <Navbar />
      <Hero />
      <Services />
      <Pricing />
      <FAQ />
      <BookingForm />
      <ContactForm />
      <Footer />
    </main>
  );
}
