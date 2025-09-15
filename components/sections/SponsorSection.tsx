'use client'
import { Handshake, Star, TrendingUp, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useWhatsAppLink } from '@/hooks/use-whatsapp-link'
import { CONTATOS } from '@/contants/contatos'

const benefits = [
  {
    icon: Star,
    title: 'Visibilidade',
    description:
      'Exposição da sua marca em eventos e competições universitárias',
  },
  {
    icon: TrendingUp,
    title: 'Networking',
    description:
      'Acesso direto a talentos em tecnologia e futuros profissionais',
  },
  {
    icon: Award,
    title: 'Impacto Social',
    description: 'Contribuição para o desenvolvimento esportivo e educacional',
  },
  {
    icon: Handshake,
    title: 'Parcerias',
    description: 'Oportunidades de colaboração e projetos em conjunto',
  },
]

export const SponsorSection = () => {
  const generateWhatsAppLink = useWhatsAppLink()

  return (
    <section className='py-20 hero-gradient'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='font-bignoodle text-4xl md:text-5xl lg:text-6xl font-black text-atletica-white leading-tight mb-6'>
            SEJA UM
            <br />
            <span className='text-atletica-sand-light'>SÓCIO</span>
          </h2>
          <p className='text-xl text-atletica-sand-light max-w-3xl mx-auto leading-relaxed'>
            Faça parte da nossa jornada e ajude a fortalecer o esporte
            universitário. Juntos, podemos ir mais longe!
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Benefits */}
          <div className='space-y-8'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <Card
                    key={index}
                    className='bg-atletica-white/10 border-atletica-white/20 backdrop-blur-sm hover-lift'
                  >
                    <CardContent className='p-6 text-center space-y-4'>
                      <div className='w-12 h-12 bg-atletica-white rounded-full flex items-center justify-center mx-auto'>
                        <IconComponent className='w-6 h-6 text-atletica-red' />
                      </div>
                      <h3 className='font-bignoodle text-lg font-black text-atletica-white'>
                        {benefit.title}
                      </h3>
                      <p className='text-sm text-atletica-sand-light leading-relaxed'>
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* CTA Content */}
          <div className='space-y-8'>
            <div className='bg-atletica-white rounded-3xl p-8 shadow-hero space-y-6'>
              <div className='text-center space-y-4'>
                <h3 className='font-bignoodle text-3xl font-black text-atletica-burgundy'>
                  PLANOS DE SÓCIO
                </h3>
                <p className='text-atletica-burgundy'>
                  Escolha o plano que melhor se adequa ao seu perfil de apoio
                </p>
              </div>

              <div className='space-y-4'>
                <div className='flex justify-between items-center p-4 bg-atletica-sand-light rounded-lg'>
                  <div>
                    <h4 className='font-semibold text-atletica-burgundy'>
                      Pleno
                    </h4>
                    <p className='text-sm text-atletica-burgundy opacity-80'>
                      Apoio básico
                    </p>
                  </div>
                  <div className='text-atletica-red font-black'>R$ 35</div>
                </div>

                <div className='flex justify-between items-center p-4 bg-atletica-red text-atletica-white rounded-lg'>
                  <div>
                    <h4 className='font-semibold'>Senior</h4>
                    <p className='text-sm opacity-80'>Apoio intermediário</p>
                  </div>
                  <div className='font-black'>R$ 50</div>
                </div>

                <div className='flex justify-between items-center p-4 bg-atletica-burgundy text-atletica-white rounded-lg'>
                  <div>
                    <h4 className='font-semibold'>Pleno - semestral</h4>
                    <p className='text-sm opacity-80'>Apoio premium</p>
                  </div>
                  <div className='font-black'>R$ 180</div>
                </div>
              </div>

              <div className='text-center space-y-4'>
                <Button
                  size='lg'
                  className='w-full bg-atletica-red hover:bg-atletica-red-light text-atletica-white font-semibold py-4 shadow-button hover-glow'
                  onClick={() =>
                    (window.location.href =
                      'https://cheers.com.br/atletica-cavalo-de-troia~13572')
                  }
                >
                  Quero Ser Sócio
                </Button>
                {/* TODO: adicionar contato do presida */}
                <p className='text-xs text-atletica-burgundy opacity-60'>
                  Para planos personalizados ou duvidas,{' '}
                  <a
                    href={generateWhatsAppLink({
                      phone: CONTATOS.PRESIDENTE,
                      message:
                        'Olá, gostaria de saber mais sobre os planos de sócio.',
                    })}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-atletica-red underline'
                  >
                    entre em contato
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='text-center mt-16'>
          <div className='inline-flex items-center gap-2 px-6 py-3 bg-atletica-white/10 backdrop-blur-sm rounded-full border border-atletica-white/20'>
            <Handshake className='w-5 h-5 text-atletica-sand-light' />
            <span className='text-atletica-sand-light font-medium'>
              Parcerias que transformam sonhos em realidade
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

