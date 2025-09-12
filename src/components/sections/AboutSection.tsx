import { Users, Trophy, Code } from 'lucide-react'

export const AboutSection = () => {
  // utils/date.ts
  const getYearsSince2018 = (): number => {
    const startDate = new Date(2018, 8, 12) // setembro = 8 (zero-based)
    const today = new Date()

    let years = today.getFullYear() - startDate.getFullYear()

    if (
      today.getMonth() < startDate.getMonth() ||
      (today.getMonth() === startDate.getMonth() &&
        today.getDate() < startDate.getDate())
    ) {
      years--
    }

    return years
  }
  return (
    <section className='py-20 bg-background'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Content */}
          <div className='space-y-8'>
            <div className='space-y-4'>
              <h2 className='font-bignoodle text-4xl md:text-5xl lg:text-6xl font-black text-atletica-burgundy leading-tight'>
                SOBRE A
                <br />
                <span className='text-gradient'>ATLÉTICA</span>
              </h2>
              <p className='text-lg text-muted-foreground leading-relaxed'>
                A Cavalo de Troia é a atlética oficial dos curso de Ciência da
                Computação, Sistemas da Informação, Analise e Desenvolvimento de
                Sistemas e Jogos Digitais, unindo mais de 700 estudantes em uma
                comunidade forte e engajada.
              </p>
            </div>

            <div className='space-y-6'>
              <p className='text-foreground leading-relaxed'>
                Nossa missão é promover o esporte, a cultura e a integração
                entre os alunos, fortalecendo o espírito acadêmico e construindo
                experiências inesquecíveis dentro e fora da universidade.
              </p>

              <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
                <div className='text-center space-y-2'>
                  <div className='w-16 h-16 bg-atletica-red rounded-full flex items-center justify-center mx-auto shadow-card'>
                    <Users className='w-8 h-8 text-atletica-white' />
                  </div>
                  <h4 className='font-semibold text-atletica-burgundy'>
                    Comunidade
                  </h4>
                  <p className='text-sm text-muted-foreground'>
                    Unidos pelo esporte
                  </p>
                </div>

                <div className='text-center space-y-2'>
                  <div className='w-16 h-16 bg-atletica-burgundy rounded-full flex items-center justify-center mx-auto shadow-card'>
                    <Trophy className='w-8 h-8 text-atletica-white' />
                  </div>
                  <h4 className='font-semibold text-atletica-burgundy'>
                    Competição
                  </h4>
                  <p className='text-sm text-muted-foreground'>
                    Espírito vencedor
                  </p>
                </div>

                <div className='text-center space-y-2'>
                  <div className='w-16 h-16 bg-atletica-red rounded-full flex items-center justify-center mx-auto shadow-card'>
                    <Code className='w-8 h-8 text-atletica-white' />
                  </div>
                  <h4 className='font-semibold text-atletica-burgundy'>
                    Tecnologia
                  </h4>
                  <p className='text-sm text-muted-foreground'>
                    Inovação e aprendizado
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className='relative'>
            <div className='bg-gradient-to-br from-atletica-red to-atletica-burgundy rounded-3xl p-8 shadow-hero'>
              <div className='bg-atletica-white rounded-2xl p-8 space-y-6'>
                <div className='text-center space-y-4'>
                  <h3 className='font-bignoodle text-3xl font-black text-atletica-burgundy'>
                    NOSSA FORÇA
                  </h3>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='text-center'>
                      <div className='text-3xl font-black text-atletica-red'>
                        750+
                      </div>
                      <div className='text-sm text-atletica-burgundy'>
                        Alunos abrangidos
                      </div>
                    </div>
                    <div className='text-center'>
                      <div className='text-3xl font-black text-atletica-red'>
                        {getYearsSince2018()}
                      </div>
                      <div className='text-sm text-atletica-burgundy'>
                        Anos de História
                      </div>
                    </div>
                    <div className='text-center'>
                      <div className='text-3xl font-black text-atletica-red'>
                        12+
                      </div>
                      <div className='text-sm text-atletica-burgundy'>
                        Modalidades
                      </div>
                    </div>
                    <div className='text-center'>
                      <div className='text-3xl font-black text-atletica-red'>
                        50+
                      </div>
                      <div className='text-sm text-atletica-burgundy'>
                        Atletas
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

