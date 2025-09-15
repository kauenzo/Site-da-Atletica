'use client'
import {
  Zap,
  Target,
  Gamepad2,
  Users,
  Trophy,
  Heart,
  Dumbbell,
  Timer,
  Dice1,
  Shield,
  Beer,
  PhoneCallIcon,
  PhoneIcon,
  MessageSquareIcon,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { CONTATOS } from '@/contants/contatos'
import { MENSAGENS } from '@/contants/mensagens'
import { useWhatsAppLink } from '@/hooks/use-whatsapp-link'

const sports = [
  {
    name: 'Futebol',
    icon: Target,
    description: 'Modalidade tradicional com times masculino e feminino',
  },
  {
    name: 'Futsal',
    icon: Zap,
    description: 'Velocidade e técnica em quadra coberta',
  },
  {
    name: 'Vôlei',
    icon: Users,
    description: 'Trabalho em equipe e estratégia',
  },
  {
    name: 'Basquete',
    icon: Trophy,
    description: 'Agilidade e precisão nas cestas',
  },
  {
    name: 'E-Sports',
    icon: Gamepad2,
    description: 'CS2, Valorant, League Of Legends, Mortal Kombat e muito mai',
  },
  {
    name: 'Corrida',
    icon: Timer,
    description: 'Resistência e superação pessoal',
  },
  {
    name: 'Jogos de boteco',
    icon: Beer,
    description: 'Sinuca, pacau e truco',
  },
  {
    name: 'Xadrez',
    icon: Shield,
    description: 'Estratégia, concentração e raciocínio lógico',
  },
]

export const SportsSection = () => {
  const generateWhatsAppLink = useWhatsAppLink()
  return (
    <section className='py-20 bg-atletica-sand-light'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='font-bignoodle text-4xl md:text-5xl lg:text-6xl font-black text-atletica-burgundy leading-tight mb-4'>
            NOSSAS
            <br />
            <span className='text-gradient'>MODALIDADES</span>
          </h2>
          <p className='text-lg text-atletica-burgundy max-w-3xl mx-auto'>
            Diversas opções para você encontrar sua paixão esportiva e fazer
            parte da nossa família
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {sports.map((sport, index) => {
            const IconComponent = sport.icon
            return (
              <Card
                key={index}
                className='group hover-lift shadow-card border-0 card-gradient overflow-hidden'
              >
                <CardContent className='p-6 text-center space-y-4'>
                  <div className='w-16 h-16 bg-atletica-red group-hover:bg-atletica-burgundy rounded-full flex items-center justify-center mx-auto transition-colors duration-300 shadow-card'>
                    <IconComponent className='w-8 h-8 text-atletica-white' />
                  </div>
                  <h3 className='font-bignoodle text-xl font-black text-atletica-burgundy group-hover:text-atletica-red transition-colors duration-300'>
                    {sport.name}
                  </h3>
                  <p className='text-sm text-atletica-burgundy opacity-80 leading-relaxed'>
                    {sport.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className='text-center mt-12'>
          <p className='text-atletica-burgundy font-medium mb-6'>
            Quer ser um verdadeiro atleta troiano?
          </p>
          <a
            href={generateWhatsAppLink({
              phone: CONTATOS.ESPORTES,
              message: MENSAGENS.WHATSAPP.ATLETA,
            })}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 px-6 py-3 bg-atletica-white rounded-full shadow-card transition-transform transform hover:scale-105'
          >
            <MessageSquareIcon className='w-5 h-5 text-atletica-red' />
            <span className='text-atletica-burgundy font-semibold'>
              Entre em contato conosco!{' '}
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

