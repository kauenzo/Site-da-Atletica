'use client'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Image as ImageIcon, Calendar } from 'lucide-react'

// Mock data - em produção virá da API
const galleryImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=500',
    title: 'Campeonato de Futebol 2024',
    category: 'futebol',
    date: '2024-06-15',
    description: 'Final do campeonato universitário',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1498050108023-4542c06a5843?w=500',
    title: 'Hackathon Atlética',
    category: 'eventos',
    date: '2024-05-20',
    description: 'Evento de programação da Atlética',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500',
    title: 'Treino de Vôlei',
    category: 'volei',
    date: '2024-06-10',
    description: 'Preparação para o campeonato',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=500',
    title: 'Confraternização',
    category: 'eventos',
    date: '2024-05-30',
    description: 'Evento de integração dos membros',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500',
    title: 'Torneio de Basquete',
    category: 'basquete',
    date: '2024-06-05',
    description: 'Semifinal do torneio',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=500',
    title: 'Copa de Futsal',
    category: 'futsal',
    date: '2024-05-25',
    description: 'Disputas da copa interna',
  },
]

const categories = [
  { value: 'all', label: 'Todas' },
  { value: 'futebol', label: 'Futebol' },
  { value: 'volei', label: 'Vôlei' },
  { value: 'basquete', label: 'Basquete' },
  { value: 'futsal', label: 'Futsal' },
  { value: 'eventos', label: 'Eventos' },
]

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedImage, setSelectedImage] = useState<
    (typeof galleryImages)[0] | null
  >(null)

  const filteredImages = galleryImages.filter((image) => {
    const matchesCategory =
      selectedCategory === 'all' || image.category === selectedCategory
    const matchesSearch =
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className='min-h-screen bg-atletica-sand-light pt-20'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='font-bignoodle text-4xl md:text-5xl lg:text-6xl font-black text-atletica-burgundy mb-4'>
            GALERIA DE
            <br />
            <span className='text-atletica-red'>FOTOS</span>
          </h1>
          <p className='text-xl text-atletica-burgundy max-w-3xl mx-auto'>
            Reviva os melhores momentos da nossa Atlética
          </p>
        </div>

        {/* Filters */}
        <div className='mb-8 space-y-4'>
          <div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
            {/* Search */}
            <div className='relative w-full md:w-auto'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-atletica-burgundy' />
              <Input
                placeholder='Buscar fotos...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 w-full md:w-64 bg-atletica-white border-atletica-burgundy/20'
              />
            </div>

            {/* Categories */}
            <div className='flex flex-wrap gap-2'>
              {categories.map((category) => (
                <Badge
                  key={category.value}
                  variant={
                    selectedCategory === category.value ? 'default' : 'outline'
                  }
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedCategory === category.value
                      ? 'bg-atletica-red text-atletica-white'
                      : 'border-atletica-burgundy text-atletica-burgundy hover:bg-atletica-burgundy hover:text-atletica-white'
                  }`}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  {category.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {filteredImages.map((image) => (
            <Card
              key={image.id}
              className='bg-atletica-white shadow-button hover-lift cursor-pointer overflow-hidden'
              onClick={() => setSelectedImage(image)}
            >
              <div className='aspect-square overflow-hidden'>
                <img
                  src={image.url}
                  alt={image.title}
                  className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                />
              </div>
              <CardContent className='p-4 space-y-2'>
                <h3 className='font-semibold text-atletica-burgundy text-sm'>
                  {image.title}
                </h3>
                <div className='flex items-center gap-2 text-xs text-atletica-burgundy/70'>
                  <Calendar className='w-3 h-3' />
                  {new Date(image.date).toLocaleDateString('pt-BR')}
                </div>
                <p className='text-xs text-atletica-burgundy/60 line-clamp-2'>
                  {image.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className='text-center py-16'>
            <ImageIcon className='w-16 h-16 text-atletica-burgundy/50 mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-atletica-burgundy mb-2'>
              Nenhuma foto encontrada
            </h3>
            <p className='text-atletica-burgundy/70'>
              Tente ajustar os filtros ou termo de busca
            </p>
          </div>
        )}

        {/* Modal para visualizar imagem */}
        {selectedImage && (
          <div
            className='fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4'
            onClick={() => setSelectedImage(null)}
          >
            <div
              className='max-w-4xl max-h-full bg-atletica-white rounded-lg overflow-hidden'
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className='w-full max-h-96 object-cover'
              />
              <div className='p-6'>
                <h3 className='text-xl font-bold text-atletica-burgundy mb-2'>
                  {selectedImage.title}
                </h3>
                <div className='flex items-center gap-2 text-sm text-atletica-burgundy/70 mb-3'>
                  <Calendar className='w-4 h-4' />
                  {new Date(selectedImage.date).toLocaleDateString('pt-BR')}
                </div>
                <p className='text-atletica-burgundy'>
                  {selectedImage.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Gallery
