'use client'
import Link from 'next/link'
import { Calendar, Home, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-atletica-red/5 to-atletica-burgundy/5 flex items-center justify-center p-4'>
      <div className='max-w-2xl mx-auto text-center space-y-8'>
        {/* Ícone do calendário */}
        <div className='flex justify-center'>
          <div className='relative'>
            <div className='w-32 h-32 bg-gradient-to-br from-atletica-red to-atletica-burgundy rounded-full flex items-center justify-center shadow-2xl'>
              <Calendar className='w-16 h-16 text-atletica-white' />
            </div>
            <div className='absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse'>
              <Clock className='w-4 h-4 text-yellow-800' />
            </div>
          </div>
        </div>

        {/* Título */}
        <div className='space-y-4'>
          <h1 className='text-4xl md:text-5xl font-bold text-atletica-red'>
            Calendário de eventos
          </h1>
          <div className='w-24 h-1 bg-gradient-to-r from-atletica-red to-atletica-burgundy mx-auto rounded-full'></div>
        </div>

        {/* Mensagem */}
        <div className='space-y-6'>
          <h2 className='text-2xl md:text-3xl font-semibold text-gray-800'>
            🚧 Em Construção
          </h2>
          <p className='text-lg text-gray-600 leading-relaxed'>
            Estamos trabalhando duro para criar uma experiência incrível no
            nosso calendário de eventos!
            <br />
            <span className='text-atletica-red font-medium'>
              Em breve você poderá acompanhar todos os eventos da Atlética
              Cavalo de Troia.
            </span>
          </p>
        </div>

        {/* Botão para voltar */}
        <div className='pt-8'>
          <Link href='/'>
            <Button
              variant='atletica'
              size='xl'
              className='group hover:scale-105 transition-transform duration-300'
            >
              <Home className='w-5 h-5 mr-2 group-hover:animate-pulse' />
              Voltar para o Início
            </Button>
          </Link>
        </div>

        {/* Decoração adicional */}
        <div className='flex justify-center space-x-2 pt-8'>
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
  )
}

