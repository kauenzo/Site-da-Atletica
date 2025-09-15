import { Calendar, MapPin, Trophy, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export interface EventCardProps {
  event: {
    title: string
    date: string
    location: string
    type: string
    description: string
    participants: string
    status: string
  }
}

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card className='group hover-lift shadow-card border border-atletica-sand overflow-hidden'>
      <CardContent className='p-0'>
        <div className='p-6 space-y-4'>
          {/* Header */}
          <div className='flex items-start justify-between'>
            <div className='space-y-2'>
              <div className='inline-flex items-center gap-2 px-3 py-1 bg-atletica-red rounded-full'>
                <Trophy className='w-4 h-4 text-atletica-white' />
                <span className='text-sm font-medium text-atletica-white'>
                  {event.type}
                </span>
              </div>
              <h3 className='font-bignoodle text-2xl font-black text-atletica-burgundy group-hover:text-atletica-red transition-colors duration-300'>
                {event.title}
              </h3>
            </div>
            <div className='text-right'>
              <div className='text-2xl font-black text-atletica-red'>
                {event.date}
              </div>
            </div>
          </div>
          {/* Description */}
          <p className='text-foreground leading-relaxed'>{event.description}</p>
          {/* Details */}
          <div className='space-y-3 pt-2'>
            <div className='flex items-center gap-3 text-muted-foreground'>
              <MapPin className='w-5 h-5 text-atletica-red' />
              <span>{event.location}</span>
            </div>
            <div className='flex items-center gap-3 text-muted-foreground'>
              <Users className='w-5 h-5 text-atletica-red' />
              <span>{event.participants} participantes esperados</span>
            </div>
            <div className='flex items-center gap-3 text-muted-foreground'>
              <Calendar className='w-5 h-5 text-atletica-red' />
              <span>
                {event.status === 'upcoming'
                  ? 'Evento confirmado'
                  : 'Inscrições abertas'}
              </span>
            </div>
          </div>
          {/* CTA */}
          <div className='pt-4'>
            <Button className='w-full bg-atletica-burgundy hover:bg-atletica-burgundy-light text-atletica-white font-semibold'>
              {event.status === 'registration' ? 'Inscrever-se' : 'Saiba Mais'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

