import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";

export default function Home() {

  return (
    <>
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <Hero />
        <HowItWorks />
        <Footer />
      </div>
    </>
  );

}
