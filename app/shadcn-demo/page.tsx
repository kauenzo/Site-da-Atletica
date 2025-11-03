'use client'

import { SidebarDemo } from '@/components/examples/sidebar-demo'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Toaster } from '@/components/ui/toaster'
import { toast } from '@/components/ui/use-toast'

export default function ShadcnDemoPage() {
  return (
    <div className='container mx-auto py-10 space-y-10'>
      <h1 className='text-3xl font-bold mb-8'>
        Demonstração dos Componentes Shadcn
      </h1>

      <section className='space-y-6'>
        <h2 className='text-2xl font-bold'>Sidebar Responsiva</h2>
        <SidebarDemo />
      </section>

      <section className='space-y-6'>
        <h2 className='text-2xl font-bold'>Componentes Básicos</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Card>
            <CardHeader>
              <CardTitle>Botões</CardTitle>
              <CardDescription>Diferentes variantes de botões</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-wrap gap-2'>
              <Button>Default</Button>
              <Button variant='secondary'>Secondary</Button>
              <Button variant='destructive'>Destructive</Button>
              <Button variant='outline'>Outline</Button>
              <Button variant='ghost'>Ghost</Button>
              <Button variant='link'>Link</Button>
              <Button variant='atletica'>Atlética</Button>
              <Button variant='atletica-outline'>Atlética Outline</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inputs e Formulários</CardTitle>
              <CardDescription>
                Componentes para entrada de dados
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  placeholder='Digite seu email'
                />
              </div>

              <div className='flex items-center space-x-2'>
                <Switch id='airplane-mode' />
                <Label htmlFor='airplane-mode'>Modo avião</Label>
              </div>

              <RadioGroup defaultValue='option-one'>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value='option-one'
                    id='option-one'
                  />
                  <Label htmlFor='option-one'>Opção 1</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value='option-two'
                    id='option-two'
                  />
                  <Label htmlFor='option-two'>Opção 2</Label>
                </div>
              </RadioGroup>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Selecione uma opção' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='option1'>Opção 1</SelectItem>
                  <SelectItem value='option2'>Opção 2</SelectItem>
                  <SelectItem value='option3'>Opção 3</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className='space-y-6'>
        <h2 className='text-2xl font-bold'>Componentes Avançados</h2>

        <Tabs defaultValue='accordion'>
          <TabsList>
            <TabsTrigger value='accordion'>Accordion</TabsTrigger>
            <TabsTrigger value='avatar'>Avatar</TabsTrigger>
            <TabsTrigger value='toast'>Toast</TabsTrigger>
          </TabsList>

          <TabsContent
            value='accordion'
            className='mt-4'
          >
            <Card>
              <CardHeader>
                <CardTitle>Accordion</CardTitle>
                <CardDescription>
                  Um componente que pode expandir/colapsar conteúdo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion
                  type='single'
                  collapsible
                >
                  <AccordionItem value='item-1'>
                    <AccordionTrigger>
                      O que é a Atlética Cavalo de Troia?
                    </AccordionTrigger>
                    <AccordionContent>
                      A Atlética Cavalo de Troia é a associação atlética dos
                      estudantes de Ciência da Computação, responsável por
                      organizar eventos esportivos e integrar os alunos através
                      do esporte e atividades sociais.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value='item-2'>
                    <AccordionTrigger>
                      Quais modalidades esportivas são oferecidas?
                    </AccordionTrigger>
                    <AccordionContent>
                      A Atlética oferece diversas modalidades como futebol,
                      vôlei, basquete, handebol, e-sports, xadrez, entre outras,
                      para participação em competições universitárias.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value='item-3'>
                    <AccordionTrigger>
                      Como participar da Atlética?
                    </AccordionTrigger>
                    <AccordionContent>
                      Para participar da Atlética, basta entrar em contato
                      através das redes sociais ou comparecer às reuniões
                      abertas que acontecem periodicamente.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value='avatar'
            className='mt-4'
          >
            <Card>
              <CardHeader>
                <CardTitle>Avatar</CardTitle>
                <CardDescription>
                  Componente para exibir imagens de perfil
                </CardDescription>
              </CardHeader>
              <CardContent className='flex flex-wrap gap-4'>
                <Avatar>
                  <AvatarImage
                    src='https://github.com/shadcn.png'
                    alt='@shadcn'
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback className='bg-atletica-red text-atletica-white'>
                    AT
                  </AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback className='bg-atletica-burgundy text-atletica-white'>
                    CC
                  </AvatarFallback>
                </Avatar>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value='toast'
            className='mt-4'
          >
            <Card>
              <CardHeader>
                <CardTitle>Toast</CardTitle>
                <CardDescription>Notificações temporárias</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => {
                    toast({
                      title: 'Ação realizada com sucesso',
                      description:
                        'A operação foi concluída conforme solicitado.',
                    })
                  }}
                >
                  Mostrar Toast
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      <Toaster />
    </div>
  )
}

