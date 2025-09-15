'use client'

import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
const brasaoImage = '/assets/brasao-atletica.png'
import { CONTATOS } from '@/contants/contatos'
import { useFormatPhone } from '@/hooks/use-format-phone'
import { URLS } from '@/contants/urls'
import { useWhatsAppLink } from '@/hooks/use-whatsapp-link'

export const Footer = () => {
  const formattedPhone = useFormatPhone()
  const generateWhatsAppLink = useWhatsAppLink()

  const contatosInfo = [
    {
      href: 'mailto:atletica.aaact@unesc.net',
      icon: Mail,
      label: 'atletica.aaact@unesc.net',
      external: true,
    },
    {
      href: `tel:${CONTATOS.PRESIDENTE}`,
      icon: Phone,
      label: formattedPhone(CONTATOS.PRESIDENTE),
      external: true,
    },
    {
      href: URLS.LOCALIZACAO,
      icon: MapPin,
      label: 'UNESC, Bloco XXI C',
      external: true,
    },
  ]

  const navLinks = [
    { href: '#about', label: 'Sobre a Atlética' },
    { href: '#sports', label: 'Modalidades' },
    // { href: '#events', label: 'Eventos' },
    { href: '#sponsor', label: 'Seja Sócio' },
    { href: '/links', label: 'Links' },
  ]

  return (
    <footer className='bg-atletica-black text-atletica-white py-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Logo and Description */}
          <div className='space-y-6'>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 bg-atletica-red rounded-full flex items-center justify-center'>
                <img
                  src={brasaoImage}
                  alt='Atlética CC Hero'
                  className='w-full h-full object-cover'
                />
              </div>
              <div>
                <h3 className='font-bignoodle text-xl font-black text-atletica-white'>
                  CAVALO DE TROIA
                </h3>
                <p className='text-atletica-sand text-sm'>
                  Ciência da Computação
                </p>
              </div>
            </div>
            <p className='text-atletica-sand text-sm leading-relaxed'>
              Conectando tecnologia e esporte, criando uma comunidade forte de
              atletas-programadores unidos pela paixão.
            </p>
          </div>
          {/* Quick Links */}
          <div className='space-y-6'>
            <h4 className='font-bignoodle text-lg font-black text-atletica-white'>
              NAVEGAÇÃO
            </h4>
            <ul className='space-y-3'>
              {navLinks.map(({ href, label }, idx) => (
                <li key={idx}>
                  <a
                    href={href}
                    className='text-atletica-sand hover:text-atletica-white transition-colors duration-300'
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className='space-y-6'>
            <h4 className='font-bignoodle text-lg font-black text-atletica-white'>
              CONTATO
            </h4>
            <div className='space-y-3'>
              {contatosInfo.map(
                ({ href, icon: Icon, label, external }, idx) => (
                  <a
                    key={idx}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className='flex items-center gap-3 text-atletica-sand hover:text-atletica-white transition-colors duration-300'
                  >
                    <Icon className='w-4 h-4 text-atletica-red' />
                    <span className='text-sm'>{label}</span>
                  </a>
                )
              )}
            </div>

            <Button
              size='sm'
              className='bg-atletica-red hover:bg-atletica-red-light text-atletica-white font-semibold'
              onClick={() =>
                (window.location.href = generateWhatsAppLink({
                  phone: CONTATOS.PRESIDENTE,
                }))
              }
            >
              Entre em contato
            </Button>
          </div>
          {/* Social Media */}
          <div className='space-y-6'>
            <h4 className='font-bignoodle text-lg font-black text-atletica-white'>
              REDES SOCIAIS
            </h4>
            <div className='flex gap-4'>
              <a
                href={URLS.INSTAGRAM}
                className='w-10 h-10 bg-atletica-burgundy hover:bg-atletica-red rounded-full flex items-center justify-center transition-colors duration-300 hover-lift'
              >
                <Instagram className='w-5 h-5 text-atletica-white' />
              </a>
              <a
                href='#'
                className='w-10 h-10 bg-atletica-burgundy hover:bg-atletica-red rounded-full flex items-center justify-center transition-colors duration-300 hover-lift'
              >
                <Facebook className='w-5 h-5 text-atletica-white' />
              </a>
              <a
                href='#'
                className='w-10 h-10 bg-atletica-burgundy hover:bg-atletica-red rounded-full flex items-center justify-center transition-colors duration-300 hover-lift'
              >
                <Twitter className='w-5 h-5 text-atletica-white' />
              </a>
            </div>
            <p className='text-atletica-sand text-sm'>
              Siga-nos para ficar por dentro de todas as novidades, eventos e
              conquistas da nossa atlética!
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-atletica-burgundy mt-12 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-atletica-sand text-sm'>
              © {new Date().getFullYear()} Atlética Cavalo de Troia. Todos os
              direitos reservados.
            </p>
            <div className='flex gap-6 text-sm'>
              {/* <a
                href='#'
                className='text-atletica-sand hover:text-atletica-white transition-colors duration-300'
              >
                Política de Privacidade
              </a>
              <a
                href='#'
                className='text-atletica-sand hover:text-atletica-white transition-colors duration-300'
              >
                Termos de Uso
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

