import { Calendar, MapPin, Trophy, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const events = [
  {
    title: "InterCC 2024",
    date: "15-20 Mai",
    location: "Campus Universitário",
    type: "Campeonato",
    description: "Maior competição entre cursos de Ciência da Computação do estado",
    participants: "500+",
    status: "upcoming"
  },
  {
    title: "Torneio de E-Sports",
    date: "08 Jun",
    location: "Online",
    type: "Gaming",
    description: "Competição de League of Legends, CS2 e Valorant",
    participants: "200+",
    status: "upcoming"
  },
  {
    title: "Copa de Futsal CC",
    date: "22 Jun",
    location: "Ginásio Central",
    type: "Futsal",
    description: "Tradicional torneio interno de futsal da atlética",
    participants: "150+",
    status: "upcoming"
  },
  {
    title: "Maratona Atlética",
    date: "05 Jul",
    location: "Parque Municipal",
    type: "Corrida",
    description: "Corrida de 5k e 10k para toda a comunidade acadêmica",
    participants: "300+",
    status: "registration"
  }
];

export const EventsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-bignoodle text-4xl md:text-5xl lg:text-6xl font-black text-atletica-burgundy leading-tight mb-4">
            EVENTOS &
            <br />
            <span className="text-gradient">CAMPEONATOS</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Calendário repleto de competições e eventos que movimentam nossa comunidade esportiva
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <Card 
              key={index} 
              className="group hover-lift shadow-card border border-atletica-sand overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-atletica-red rounded-full">
                        <Trophy className="w-4 h-4 text-atletica-white" />
                        <span className="text-sm font-medium text-atletica-white">
                          {event.type}
                        </span>
                      </div>
                      <h3 className="font-bignoodle text-2xl font-black text-atletica-burgundy group-hover:text-atletica-red transition-colors duration-300">
                        {event.title}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-atletica-red">
                        {event.date}
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-foreground leading-relaxed">
                    {event.description}
                  </p>
                  
                  {/* Details */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-5 h-5 text-atletica-red" />
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Users className="w-5 h-5 text-atletica-red" />
                      <span>{event.participants} participantes esperados</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar className="w-5 h-5 text-atletica-red" />
                      <span>
                        {event.status === "upcoming" ? "Evento confirmado" : "Inscrições abertas"}
                      </span>
                    </div>
                  </div>
                  
                  {/* CTA */}
                  <div className="pt-4">
                    <Button 
                      className="w-full bg-atletica-burgundy hover:bg-atletica-burgundy-light text-atletica-white font-semibold"
                    >
                      {event.status === "registration" ? "Inscrever-se" : "Saiba Mais"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-atletica-red text-atletica-red hover:bg-atletica-red hover:text-atletica-white font-semibold px-8 py-3"
          >
            Ver Calendário Completo
          </Button>
        </div>
      </div>
    </section>
  );
};