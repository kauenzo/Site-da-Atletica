'use client'
import { useState } from 'react'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, MapPin, Clock } from 'lucide-react'

const events = [
  {
    id: 1,
    title: 'Treino de Futebol',
    date: new Date(2024, 6, 15),
    time: '19:00',
    location: 'Campo da Universidade',
    type: 'treino',
  },
  {
    id: 2,
    title: 'Campeonato de Vôlei',
    date: new Date(2024, 6, 20),
    time: '14:00',
    location: 'Ginásio Central',
    type: 'campeonato',
  },
  {
    id: 3,
    title: 'Torneio de Basquete',
    date: new Date(2024, 6, 25),
    time: '16:00',
    location: 'Quadra Externa',
    type: 'torneio',
  },
  {
    id: 4,
    title: 'Reunião Geral',
    date: new Date(2024, 6, 30),
    time: '18:00',
    location: 'Auditório CC',
    type: 'reuniao',
  },
]

const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'treino':
      return 'bg-atletica-red'
    case 'campeonato':
      return 'bg-atletica-burgundy'
    case 'torneio':
      return 'bg-atletica-sand'
    case 'reuniao':
      return 'bg-atletica-black'
    default:
      return 'bg-atletica-red'
  }
}

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const selectedEvents = events.filter(
    (event) =>
      selectedDate && event.date.toDateString() === selectedDate.toDateString()
  )

  const eventDates = events.map((event) => event.date)

  return (
    <div className='min-h-screen bg-atletica-sand-light pt-20'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='font-bignoodle text-4xl md:text-5xl lg:text-6xl font-black text-atletica-burgundy mb-4'>
            CALENDÁRIO DE
            <br />
            <span className='text-atletica-red'>EVENTOS</span>
          </h1>
          <p className='text-xl text-atletica-burgundy max-w-3xl mx-auto'>
            Acompanhe todos os treinos, campeonatos e eventos da Atlética
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Calendar */}
          <div className='lg:col-span-2'>
            <Card className='bg-atletica-white shadow-hero'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2 text-atletica-burgundy'>
                  <CalendarDays className='w-5 h-5' />
                  Calendário de Eventos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  mode='single'
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  modifiers={{
                    eventDay: eventDates,
                  }}
                  modifiersStyles={{
                    eventDay: {
                      backgroundColor: '#9f292c',
                      color: 'white',
                      fontWeight: 'bold',
                    },
                  }}
                  className='rounded-md border-0'
                />
              </CardContent>
            </Card>
          </div>

          {/* Events List */}
          <div className='space-y-6'>
            <h2 className='font-bignoodle text-2xl font-black text-atletica-burgundy'>
              {selectedDate
                ? `Eventos - ${selectedDate.toLocaleDateString('pt-BR')}`
                : 'Próximos Eventos'}
            </h2>

            {(selectedEvents.length > 0
              ? selectedEvents
              : events.slice(0, 4)
            ).map((event) => (
              <Card
                key={event.id}
                className='bg-atletica-white shadow-button hover-lift'
              >
                <CardContent className='p-6 space-y-3'>
                  <div className='flex items-start justify-between'>
                    <h3 className='font-semibold text-atletica-burgundy'>
                      {event.title}
                    </h3>
                    <Badge
                      className={`${getEventTypeColor(
                        event.type
                      )} text-atletica-white`}
                    >
                      {event.type}
                    </Badge>
                  </div>

                  <div className='space-y-2 text-sm text-atletica-burgundy'>
                    <div className='flex items-center gap-2'>
                      <Clock className='w-4 h-4' />
                      {event.time}
                    </div>
                    <div className='flex items-center gap-2'>
                      <MapPin className='w-4 h-4' />
                      {event.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {selectedEvents.length === 0 && selectedDate && (
              <Card className='bg-atletica-white/50'>
                <CardContent className='p-6 text-center'>
                  <p className='text-atletica-burgundy'>
                    Nenhum evento agendado para esta data
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar
