import { Users, Trophy, Code } from "lucide-react";

export const AboutSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="font-bignoodle text-4xl md:text-5xl lg:text-6xl font-black text-atletica-burgundy leading-tight">
                SOBRE A
                <br />
                <span className="text-gradient">ATLÉTICA</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Somos a representação esportiva do curso de Ciência da Computação, 
                unindo paixão pela tecnologia e pelo esporte em uma só comunidade.
              </p>
            </div>
            
            <div className="space-y-6">
              <p className="text-foreground leading-relaxed">
                Nossa missão é promover a integração entre os estudantes através do esporte, 
                criando laços que vão além da sala de aula. Participamos de campeonatos 
                universitários, organizamos eventos esportivos e culturais, e fomentamos 
                o espírito de equipe que é essencial tanto no código quanto em campo.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-atletica-red rounded-full flex items-center justify-center mx-auto shadow-card">
                    <Users className="w-8 h-8 text-atletica-white" />
                  </div>
                  <h4 className="font-semibold text-atletica-burgundy">Comunidade</h4>
                  <p className="text-sm text-muted-foreground">Unidos pelo esporte</p>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-atletica-burgundy rounded-full flex items-center justify-center mx-auto shadow-card">
                    <Trophy className="w-8 h-8 text-atletica-white" />
                  </div>
                  <h4 className="font-semibold text-atletica-burgundy">Competição</h4>
                  <p className="text-sm text-muted-foreground">Espírito vencedor</p>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-atletica-red rounded-full flex items-center justify-center mx-auto shadow-card">
                    <Code className="w-8 h-8 text-atletica-white" />
                  </div>
                  <h4 className="font-semibold text-atletica-burgundy">Tecnologia</h4>
                  <p className="text-sm text-muted-foreground">Inovação e código</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Visual Element */}
          <div className="relative">
            <div className="bg-gradient-to-br from-atletica-red to-atletica-burgundy rounded-3xl p-8 shadow-hero">
              <div className="bg-atletica-white rounded-2xl p-8 space-y-6">
                <div className="text-center space-y-4">
                  <h3 className="font-bignoodle text-3xl font-black text-atletica-burgundy">
                    NOSSA FORÇA
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-black text-atletica-red">200+</div>
                      <div className="text-sm text-atletica-burgundy">Membros Ativos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-atletica-red">15+</div>
                      <div className="text-sm text-atletica-burgundy">Modalidades</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-atletica-red">10+</div>
                      <div className="text-sm text-atletica-burgundy">Troféus</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-atletica-red">5</div>
                      <div className="text-sm text-atletica-burgundy">Anos de História</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};