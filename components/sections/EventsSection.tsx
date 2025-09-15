// import { Button } from '@/components/ui/button'
// import { EventCard } from '@/components/ui/event-card'
import { Trophy, Clock } from 'lucide-react'
// import { Button } from '@/components/ui/button'

const events = [
  {
    title: 'InterCC 2024',
    date: '15-20 Mai',
    location: 'Campus Universitário',
    type: 'Campeonato',
    description:
      'Maior competição entre cursos de Ciência da Computação do estado',
    participants: '500+',
    status: 'upcoming',
  },
  {
    title: 'Torneio de E-Sports',
    date: '08 Jun',
    location: 'Online',
    type: 'Gaming',
    description: 'Competição de League of Legends, CS2 e Valorant',
    participants: '200+',
    status: 'upcoming',
  },
  {
    title: 'Copa de Futsal CC',
    date: '22 Jun',
    location: 'Ginásio Central',
    type: 'Futsal',
    description: 'Tradicional torneio interno de futsal da atlética',
    participants: '150+',
    status: 'upcoming',
  },
  {
    title: 'Maratona Atlética',
    date: '05 Jul',
    location: 'Parque Municipal',
    type: 'Corrida',
    description: 'Corrida de 5k e 10k para toda a comunidade acadêmica',
    participants: '300+',
    status: 'registration',
  },
]

export const EventsSection = () => {
  return (
    <section className='py-20 bg-background'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='font-bignoodle text-4xl md:text-5xl lg:text-6xl font-black text-atletica-burgundy leading-tight mb-4'>
            EVENTOS &
            <br />
            <span className='text-gradient'>CAMPEONATOS</span>
          </h2>
        </div>

        {/* Seção de desenvolvimento */}
        <div className='max-w-2xl mx-auto'>
          <div className='bg-gradient-to-br from-atletica-red/5 to-atletica-burgundy/5 rounded-2xl p-8 border border-atletica-red/10'>
            {/* Ícone central */}
            <div className='flex justify-center mb-6'>
              <div className='relative'>
                <div className='w-20 h-20 bg-gradient-to-br from-atletica-red to-atletica-burgundy rounded-full flex items-center justify-center shadow-lg'>
                  <Trophy className='w-10 h-10 text-atletica-white' />
                </div>
                <div className='absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse'>
                  <Clock className='w-3 h-3 text-yellow-800' />
                </div>
              </div>
            </div>

            {/* Mensagem */}
            <div className='text-center space-y-4'>
              <h3 className='text-2xl font-bold text-atletica-burgundy'>
                🚧 Em Desenvolvimento
              </h3>
              <p className='text-gray-600'>
                Estamos preparando uma seção incrível com todos os nossos
                eventos e campeonatos!
              </p>
              <p className='text-atletica-red font-medium text-sm'>
                Em breve você poderá acompanhar datas, locais e inscrições.
              </p>
            </div>

            {/* Decoração inferior */}
            <div className='flex justify-center space-x-2 mt-6'>
              <div className='w-2 h-2 bg-atletica-red rounded-full animate-bounce'></div>
              <div
                className='w-2 h-2 bg-atletica-burgundy rounded-full animate-bounce'
                style={{ animationDelay: '0.1s' }}
              ></div>
              <div
                className='w-2 h-2 bg-atletica-red rounded-full animate-bounce'
                style={{ animationDelay: '0.2s' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

