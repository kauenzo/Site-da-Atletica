'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import {
  Star,
  TrendingUp,
  Award,
  Handshake,
  Check,
  Users,
  Calendar,
  Trophy,
  Target,
  Send,
} from 'lucide-react'

const plans = [
  {
    id: 'bronze',
    name: 'Bronze',
    price: 'R$ 500',
    color: 'bg-atletica-sand',
    benefits: [
      'Logo em materiais impressos',
      'Menção em redes sociais',
      'Certificado de apoio',
      'Relatório de impacto',
    ],
    features: [
      { icon: Users, text: 'Alcance: 500+ pessoas' },
      { icon: Calendar, text: 'Duração: 6 meses' },
    ],
  },
  {
    id: 'prata',
    name: 'Prata',
    price: 'R$ 1.500',
    color: 'bg-atletica-red',
    popular: true,
    benefits: [
      'Todos os benefícios Bronze',
      'Logo em uniformes esportivos',
      'Stand em eventos principais',
      'Newsletter exclusiva',
      'Prioridade em parcerias',
    ],
    features: [
      { icon: Users, text: 'Alcance: 1.500+ pessoas' },
      { icon: Calendar, text: 'Duração: 1 ano' },
      { icon: Trophy, text: 'Patrocínio de campeonatos' },
    ],
  },
  {
    id: 'ouro',
    name: 'Ouro',
    price: 'R$ 3.000',
    color: 'bg-atletica-burgundy',
    benefits: [
      'Todos os benefícios Prata',
      'Naming rights de eventos',
      'Logo principal em materiais',
      'Consultoria em tech',
      'Acesso prioritário a talentos',
      'Eventos exclusivos',
    ],
    features: [
      { icon: Users, text: 'Alcance: 3.000+ pessoas' },
      { icon: Calendar, text: 'Duração: 1 ano' },
      { icon: Trophy, text: 'Naming rights' },
      { icon: Target, text: 'ROI garantido' },
    ],
  },
]

const additionalBenefits = [
  {
    icon: Star,
    title: 'Visibilidade Máxima',
    description:
      'Exposição da sua marca em todos os eventos universitários, atingindo mais de 3.000 estudantes ativamente.',
  },
  {
    icon: TrendingUp,
    title: 'Networking Estratégico',
    description:
      'Acesso direto aos melhores talentos em tecnologia e futuros profissionais da área.',
  },
  {
    icon: Award,
    title: 'Impacto Social',
    description:
      'Contribuição direta para o desenvolvimento esportivo e educacional da comunidade universitária.',
  },
  {
    icon: Handshake,
    title: 'Parcerias Duradouras',
    description:
      'Oportunidades de colaboração em projetos de inovação e desenvolvimento tecnológico.',
  },
]

const Sponsor = () => {
  const [selectedPlan, setSelectedPlan] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  })
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !selectedPlan ||
      !formData.name ||
      !formData.email ||
      !formData.company
    ) {
      toast({
        title: 'Erro no formulário',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive',
      })
      return
    }

    toast({
      title: 'Solicitação enviada!',
      description: 'Entraremos em contato em até 24 horas.',
    })

    // Reset form
    setFormData({ name: '', email: '', company: '', phone: '', message: '' })
    setSelectedPlan('')
  }

  return (
    <div className='min-h-screen bg-atletica-sand-light pt-20'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='font-bignoodle text-4xl md:text-5xl lg:text-6xl font-black text-atletica-burgundy mb-4'>
            SEJA UM
            <br />
            <span className='text-atletica-red'>APOIADOR</span>
          </h1>
          <p className='text-xl text-atletica-burgundy max-w-4xl mx-auto leading-relaxed'>
            Faça parte da nossa jornada e ajude a fortalecer o esporte
            universitário. Juntos, podemos transformar sonhos em realidade e
            formar os profissionais do futuro.
          </p>
        </div>

        {/* Benefits Section */}
        <div className='mb-16'>
          <h2 className='font-bignoodle text-3xl font-black text-atletica-burgundy text-center mb-12'>
            POR QUE APOIAR A ATLÉTICA?
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {additionalBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <Card
                  key={index}
                  className='bg-atletica-white shadow-button hover-lift text-center'
                >
                  <CardContent className='p-6 space-y-4'>
                    <div className='w-16 h-16 bg-atletica-red rounded-full flex items-center justify-center mx-auto'>
                      <IconComponent className='w-8 h-8 text-atletica-white' />
                    </div>
                    <h3 className='font-bignoodle text-lg font-black text-atletica-burgundy'>
                      {benefit.title}
                    </h3>
                    <p className='text-sm text-atletica-burgundy leading-relaxed'>
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Plans Section */}
        <div className='mb-16'>
          <h2 className='font-bignoodle text-3xl font-black text-atletica-burgundy text-center mb-12'>
            PLANOS DE APOIO
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative bg-atletica-white shadow-hero hover-lift transition-all duration-300 ${
                  selectedPlan === plan.id ? 'ring-2 ring-atletica-red' : ''
                } ${plan.popular ? 'transform scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                    <span className='bg-atletica-red text-atletica-white px-4 py-1 rounded-full text-sm font-semibold'>
                      MAIS POPULAR
                    </span>
                  </div>
                )}

                <CardHeader
                  className={`${plan.color} text-atletica-white text-center py-8`}
                >
                  <CardTitle className='font-bignoodle text-2xl font-black'>
                    {plan.name}
                  </CardTitle>
                  <div className='text-3xl font-bold'>{plan.price}</div>
                </CardHeader>

                <CardContent className='p-6 space-y-6'>
                  {/* Features */}
                  <div className='space-y-3'>
                    {plan.features.map((feature, index) => {
                      const IconComponent = feature.icon
                      return (
                        <div
                          key={index}
                          className='flex items-center gap-3 text-sm text-atletica-burgundy'
                        >
                          <IconComponent className='w-4 h-4 text-atletica-red' />
                          {feature.text}
                        </div>
                      )
                    })}
                  </div>

                  {/* Benefits */}
                  <div className='space-y-3'>
                    {plan.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className='flex items-start gap-3'
                      >
                        <Check className='w-4 h-4 text-atletica-red mt-0.5 flex-shrink-0' />
                        <span className='text-sm text-atletica-burgundy'>
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full ${plan.color} hover:opacity-90 text-atletica-white font-semibold py-3 shadow-button`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    Escolher {plan.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className='max-w-2xl mx-auto'>
          <Card className='bg-atletica-white shadow-hero'>
            <CardHeader>
              <CardTitle className='font-bignoodle text-2xl font-black text-atletica-burgundy text-center'>
                FORMULÁRIO DE CONTATO
              </CardTitle>
              <p className='text-center text-atletica-burgundy'>
                Preencha os dados abaixo e entraremos em contato
              </p>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={handleSubmit}
                className='space-y-6'
              >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label
                      htmlFor='name'
                      className='text-atletica-burgundy font-medium'
                    >
                      Nome Completo *
                    </Label>
                    <Input
                      id='name'
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange('name', e.target.value)
                      }
                      className='border-atletica-burgundy/20 focus:border-atletica-red'
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label
                      htmlFor='email'
                      className='text-atletica-burgundy font-medium'
                    >
                      E-mail *
                    </Label>
                    <Input
                      id='email'
                      type='email'
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                      className='border-atletica-burgundy/20 focus:border-atletica-red'
                      required
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label
                      htmlFor='company'
                      className='text-atletica-burgundy font-medium'
                    >
                      Empresa *
                    </Label>
                    <Input
                      id='company'
                      value={formData.company}
                      onChange={(e) =>
                        handleInputChange('company', e.target.value)
                      }
                      className='border-atletica-burgundy/20 focus:border-atletica-red'
                      required
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label
                      htmlFor='phone'
                      className='text-atletica-burgundy font-medium'
                    >
                      Telefone
                    </Label>
                    <Input
                      id='phone'
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange('phone', e.target.value)
                      }
                      className='border-atletica-burgundy/20 focus:border-atletica-red'
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label
                    htmlFor='plan'
                    className='text-atletica-burgundy font-medium'
                  >
                    Plano de Interesse *
                  </Label>
                  <Select
                    value={selectedPlan}
                    onValueChange={setSelectedPlan}
                    required
                  >
                    <SelectTrigger className='border-atletica-burgundy/20 focus:border-atletica-red'>
                      <SelectValue placeholder='Selecione um plano' />
                    </SelectTrigger>
                    <SelectContent>
                      {plans.map((plan) => (
                        <SelectItem
                          key={plan.id}
                          value={plan.id}
                        >
                          {plan.name} - {plan.price}
                        </SelectItem>
                      ))}
                      <SelectItem value='custom'>
                        Plano Personalizado
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label
                    htmlFor='message'
                    className='text-atletica-burgundy font-medium'
                  >
                    Mensagem
                  </Label>
                  <Textarea
                    id='message'
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange('message', e.target.value)
                    }
                    placeholder='Conte-nos mais sobre seus objetivos e como podemos ajudar...'
                    className='border-atletica-burgundy/20 focus:border-atletica-red min-h-24'
                  />
                </div>

                <Button
                  type='submit'
                  size='lg'
                  className='w-full bg-atletica-red hover:bg-atletica-red-light text-atletica-white font-semibold py-4 shadow-button hover-glow'
                >
                  <Send className='w-4 h-4 mr-2' />
                  Enviar Solicitação
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* CTA Bottom */}
        <div className='text-center mt-16'>
          <div className='inline-flex items-center gap-2 px-6 py-3 bg-atletica-burgundy/10 backdrop-blur-sm rounded-full border border-atletica-burgundy/20'>
            <Handshake className='w-5 h-5 text-atletica-burgundy' />
            <span className='text-atletica-burgundy font-medium'>
              Parcerias que transformam sonhos em realidade
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sponsor
