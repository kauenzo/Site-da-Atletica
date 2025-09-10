import { Button } from '@/components/ui/button'
import { EventCard } from '@/components/ui/event-card'
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
          <p className='text-lg text-muted-foreground max-w-3xl mx-auto'>
            Em breve você poderá acompanhar aqui nossos próximos eventos e competições.
          </p>
          {/* <p className='text-lg text-muted-foreground max-w-3xl mx-auto'>
            Calendário repleto de competições e eventos que movimentam nossa
            comunidade esportiva
          </p> */}
        </div>

        {/* <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {events.map((event, index) => (
            <EventCard
              key={index}
              event={event}
            />
          ))}
        </div> */}

        {/* <div className='text-center mt-12'>
          <Button
            variant='outline'
            size='lg'
            className='border-atletica-red text-atletica-red hover:bg-atletica-red hover:text-atletica-white font-semibold px-8 py-3'
          >
            Ver Calendário Completo
          </Button>
        </div> */}
      </div>
    </section>
  )
}

