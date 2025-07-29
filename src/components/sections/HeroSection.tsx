import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-atletica.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Atlética CC Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="space-y-6 md:space-y-8">
          {/* Logo Placeholder */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-atletica-white rounded-full shadow-hero flex items-center justify-center">
              <span className="text-atletica-red font-bold text-lg sm:text-2xl">LOGO</span>
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="font-bignoodle text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-atletica-white leading-none tracking-wider">
            ATLÉTICA
            <br />
            <span className="text-gradient">CIÊNCIA DA</span>
            <br />
            COMPUTAÇÃO
          </h1>
          
          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-atletica-sand-light font-light max-w-3xl mx-auto leading-relaxed px-4">
            Onde a tecnologia encontra o esporte. Junte-se à nossa comunidade de 
            atletas-programadores e viva a experiência universitária completa.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-6 md:pt-8 px-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-atletica-red hover:bg-atletica-red-light text-atletica-white font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-button hover-glow transition-all duration-300"
            >
              Junte-se a Nós
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto border-atletica-white text-atletica-white hover:bg-atletica-white hover:text-atletica-red font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-300"
            >
              Saiba Mais
            </Button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-atletica-white rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-atletica-white rounded-full mt-1 sm:mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};