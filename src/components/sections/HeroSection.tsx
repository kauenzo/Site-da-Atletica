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
        <div className="space-y-8">
          {/* Logo Placeholder */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 bg-atletica-white rounded-full shadow-hero flex items-center justify-center">
              <span className="text-atletica-red font-bold text-2xl">LOGO</span>
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="font-bignoodle text-6xl md:text-8xl lg:text-9xl font-black text-atletica-white leading-none tracking-wider">
            ATLÉTICA
            <br />
            <span className="text-gradient">CIÊNCIA DA</span>
            <br />
            COMPUTAÇÃO
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-atletica-sand-light font-light max-w-3xl mx-auto leading-relaxed">
            Onde a tecnologia encontra o esporte. Junte-se à nossa comunidade de 
            atletas-programadores e viva a experiência universitária completa.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              size="lg" 
              className="bg-atletica-red hover:bg-atletica-red-light text-atletica-white font-semibold px-8 py-4 text-lg shadow-button hover-glow transition-all duration-300"
            >
              Junte-se a Nós
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-atletica-white text-atletica-white hover:bg-atletica-white hover:text-atletica-red font-semibold px-8 py-4 text-lg transition-all duration-300"
            >
              Saiba Mais
            </Button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-atletica-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-atletica-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};