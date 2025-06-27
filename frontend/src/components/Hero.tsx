import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import InfiniteLogo from "./InfiniteLogo";

const Hero = () => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-accent-100 to-background text-foreground relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10 pt-20">
        <div className="mb-8">
          <InfiniteLogo />
        </div>
        
        <div className="relative flex justify-center items-center w-full mb-6">
          <div className="inline-flex items-center border-2 border-accent-400/50 rounded-full px-6 py-1 bg-transparent">
            <h1 className="text-5xl md:text-7xl font-bold animate-fade-in font-display text-center">
              dev<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-600">Xsphere</span>
            </h1>
          </div>
        </div>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-700 dark:text-gray-200 animate-fade-in font-body">
          Bringing together like-minded developers through meetups, tech events, and open source contributions. 
          Join our global community of innovators and creators.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
          <Button size="lg" className="bg-accent-600 hover:bg-accent-700 text-white px-8 py-3">
            Join Community
          </Button>
          <Button size="lg" variant="outline" className="border-accent-600 text-accent-700 dark:text-accent-300 hover:bg-accent-700/20 hover:text-accent-900 px-8 py-3">
            Explore Events
          </Button>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onClick={scrollToNext}>
          <ArrowDown className="w-8 h-8 text-accent-700/70 dark:text-accent-400/80" />
        </div>
      </div>
      
      {/* Background decor for entire hero */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;
