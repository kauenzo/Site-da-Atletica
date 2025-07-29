import { 
  Zap, 
  Target, 
  Gamepad2, 
  Users, 
  Trophy, 
  Heart,
  Dumbbell,
  Timer
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const sports = [
  {
    name: "Futebol",
    icon: Target,
    description: "Modalidade tradicional com times masculino e feminino"
  },
  {
    name: "Futsal",
    icon: Zap,
    description: "Velocidade e técnica em quadra coberta"
  },
  {
    name: "Vôlei",
    icon: Users,
    description: "Trabalho em equipe e estratégia"
  },
  {
    name: "Basquete",
    icon: Trophy,
    description: "Agilidade e precisão nas cestas"
  },
  {
    name: "E-Sports",
    icon: Gamepad2,
    description: "Competições virtuais de alta performance"
  },
  {
    name: "Corrida",
    icon: Timer,
    description: "Resistência e superação pessoal"
  },
  {
    name: "Natação",
    icon: Heart,
    description: "Técnica e condicionamento físico"
  },
  {
    name: "Musculação",
    icon: Dumbbell,
    description: "Força e disciplina para o corpo"
  }
];

export const SportsSection = () => {
  return (
    <section className="py-20 bg-atletica-sand-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-bignoodle text-4xl md:text-5xl lg:text-6xl font-black text-atletica-burgundy leading-tight mb-4">
            NOSSAS
            <br />
            <span className="text-gradient">MODALIDADES</span>
          </h2>
          <p className="text-lg text-atletica-burgundy max-w-3xl mx-auto">
            Diversas opções para você encontrar sua paixão esportiva e fazer parte da nossa família
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sports.map((sport, index) => {
            const IconComponent = sport.icon;
            return (
              <Card 
                key={index} 
                className="group hover-lift shadow-card border-0 card-gradient overflow-hidden"
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-atletica-red group-hover:bg-atletica-burgundy rounded-full flex items-center justify-center mx-auto transition-colors duration-300 shadow-card">
                    <IconComponent className="w-8 h-8 text-atletica-white" />
                  </div>
                  <h3 className="font-bignoodle text-xl font-black text-atletica-burgundy group-hover:text-atletica-red transition-colors duration-300">
                    {sport.name}
                  </h3>
                  <p className="text-sm text-atletica-burgundy opacity-80 leading-relaxed">
                    {sport.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-atletica-burgundy font-medium mb-6">
            Não encontrou sua modalidade? Entre em contato conosco!
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-atletica-white rounded-full shadow-card">
            <Trophy className="w-5 h-5 text-atletica-red" />
            <span className="text-atletica-burgundy font-semibold">
              Sempre abertos a novas modalidades
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};