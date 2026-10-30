import { Amenities } from "@/components/amenities";
import { BookingProvider } from "@/components/booking-provider";
import { Calculator } from "@/components/calculator";
import { Faq } from "@/components/faq";
import { ClosingBand, Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Launch } from "@/components/launch";
import { ReservationModal } from "@/components/reservation-modal";
import { SiteMap } from "@/components/site-map";
import { Stays } from "@/components/stays";

export default function Home() {
  return (
    <BookingProvider>
      <Header />
      <main>
        <Hero />
        <Stays />
        <Launch />
        <Calculator />
        <Amenities />
        <SiteMap />
        <Faq />
        <ClosingBand />
      </main>
      <Footer />
      <ReservationModal />
    </BookingProvider>
  );
}
