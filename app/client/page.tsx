"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { StarIcon, MessageCircleIcon, MapPinIcon, SearchIcon } from "lucide-react"
import ClientLayout from "@/components/client-layout"

// Datos de ejemplo para profesionales
const professionals = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    profession: "Electricistas",
    rating: 4.8,
    reviewsCount: 56,
    location: "Buenos Aires",
    distance: "2.5 km",
    price: "$$$",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Laura Gómez",
    profession: "Plomeros",
    rating: 4.9,
    reviewsCount: 124,
    location: "Buenos Aires",
    distance: "3.8 km",
    price: "$$",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Martín Suárez",
    profession: "Técnicos en computación",
    rating: 4.7,
    reviewsCount: 89,
    location: "Buenos Aires",
    distance: "1.2 km",
    price: "$$$$",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Ana Fernández",
    profession: "Manicuras",
    rating: 4.6,
    reviewsCount: 42,
    location: "Buenos Aires",
    distance: "4.1 km",
    price: "$",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Roberto Pérez",
    profession: "Gasistas",
    rating: 4.9,
    reviewsCount: 78,
    location: "Buenos Aires",
    distance: "5.3 km",
    price: "$$$",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "Lucía Martínez",
    profession: "Peluqueros",
    rating: 4.8,
    reviewsCount: 112,
    location: "Buenos Aires",
    distance: "2.9 km",
    price: "$$",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 7,
    name: "Miguel Torres",
    profession: "Cerrajeros",
    rating: 4.5,
    reviewsCount: 45,
    location: "Buenos Aires",
    distance: "3.2 km",
    price: "$$",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 8,
    name: "Sofía López",
    profession: "Pintores",
    rating: 4.7,
    reviewsCount: 67,
    location: "Buenos Aires",
    distance: "4.5 km",
    price: "$$$",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 9,
    name: "Javier García",
    profession: "Carpinteros",
    rating: 4.9,
    reviewsCount: 93,
    location: "Buenos Aires",
    distance: "2.1 km",
    price: "$$$$",
    image: "/placeholder.svg?height=100&width=100",
  },
]

// Categorías de servicios (versión reducida para los botones)
const serviceCategories = [
  "Todos",
  "Electricistas",
  "Plomeros",
  "Gasistas",
  "Técnicos IT",
  "Manicuras",
  "Peluqueros",
  "Cerrajeros",
  "Pintores",
  "Carpinteros",
]

// Lista completa de categorías
const allServiceCategories = [
  "Electricistas",
  "Plomeros",
  "Gasistas",
  "Técnicos en computación",
  "Manicuras",
  "Peluqueros",
  "Cerrajeros",
  "Albañiles",
  "Pintores",
  "Carpinteros",
  "Herreros",
  "Jardineros",
  "Fumigadores",
  "Vidrieros",
  "Tapiceros",
  "Técnicos en electrodomésticos",
  "Técnicos en aire acondicionado",
  "Instaladores de cámaras de seguridad",
  "Fotógrafos",
  "Maquilladores",
  "Entrenadores personales",
  "Profesores particulares",
  "Diseñadores gráficos",
  "Desarrolladores web",
  "Contadores",
  "Abogados",
  "Traductores",
  "Costureras",
  "Niñeras",
  "Cuidadores de adultos mayores",
  "Paseadores de perros",
  "Veterinarios",
  "Mecánicos",
  "Choferes particulares",
  "Limpiadores profesionales",
  "Decoradores de interiores",
  "Organizadores de eventos",
  "DJ",
  "Animadores infantiles",
  "Técnicos en telefonía móvil",
  "Reparadores de consolas",
  "Instaladores de Internet",
]

export default function ClientPage() {
  const [location, setLocation] = useState("Buenos Aires")
  const [category, setCategory] = useState("Todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("rating")
  const [previewProfessional, setPreviewProfessional] = useState<(typeof professionals)[0] | null>(null)
  const [showAllCategories, setShowAllCategories] = useState(false)

  // Filtrar profesionales según la búsqueda y categoría
  const filteredProfessionals = professionals.filter((pro) => {
    const matchesSearch =
      pro.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pro.profession.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = category === "Todos" || pro.profession === category
    return matchesSearch && matchesCategory
  })

  // Ordenar profesionales
  const sortedProfessionals = [...filteredProfessionals].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating
    if (sortBy === "distance") return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
    if (sortBy === "price") return a.price.length - b.price.length
    return 0
  })

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Encuentra profesionales</h1>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Buscar profesionales..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ubicación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Buenos Aires">Buenos Aires</SelectItem>
                  <SelectItem value="Córdoba">Córdoba</SelectItem>
                  <SelectItem value="Rosario">Rosario</SelectItem>
                  <SelectItem value="Mendoza">Mendoza</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Mejor valorados</SelectItem>
                  <SelectItem value="distance">Distancia</SelectItem>
                  <SelectItem value="price">Precio (menor a mayor)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex overflow-x-auto pb-2 gap-2 mb-4">
            {serviceCategories.map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  if (cat === "Todos") {
                    setShowAllCategories(true)
                  } else {
                    setCategory(cat)
                  }
                }}
                className="whitespace-nowrap"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProfessionals.map((professional) => (
            <Card key={professional.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={professional.image || "/placeholder.svg"} alt={professional.name} />
                      <AvatarFallback>{professional.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg">{professional.name}</h3>
                      <p className="text-gray-500">{professional.profession}</p>
                      <div className="flex items-center mt-1">
                        <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{professional.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({professional.reviewsCount} reseñas)</span>
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        <span>{professional.distance}</span>
                      </div>
                    </div>
                    <Badge variant="outline">{professional.price}</Badge>
                  </div>
                </div>
                <div className="flex border-t">
                  <button
                    onClick={() => setPreviewProfessional(professional)}
                    className="flex-1 py-3 text-center text-sm font-medium hover:bg-gray-50"
                  >
                    Ver perfil
                  </button>
                  <div className="w-px bg-gray-200"></div>
                  <Link
                    href={`/chat/${professional.id}`}
                    className="flex-1 py-3 text-center text-sm font-medium hover:bg-gray-50 flex items-center justify-center"
                  >
                    <MessageCircleIcon className="h-4 w-4 mr-1" />
                    Contactar
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedProfessionals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron profesionales que coincidan con tu búsqueda.</p>
            <Button
              variant="link"
              onClick={() => {
                setSearchTerm("")
                setCategory("Todos")
              }}
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>

      {/* Vista previa del perfil */}
      <Dialog open={previewProfessional !== null} onOpenChange={(open) => !open && setPreviewProfessional(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Perfil Profesional</DialogTitle>
          </DialogHeader>

          {previewProfessional && (
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={previewProfessional.image || "/placeholder.svg"} alt={previewProfessional.name} />
                  <AvatarFallback>{previewProfessional.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{previewProfessional.name}</h3>
                  <p className="text-gray-500">{previewProfessional.profession}</p>
                  <div className="flex items-center mt-1">
                    <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{previewProfessional.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({previewProfessional.reviewsCount} reseñas)</span>
                  </div>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    <span>{previewProfessional.distance}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Precio</h4>
                <Badge>{previewProfessional.price}</Badge>
              </div>

              <div>
                <h4 className="font-medium mb-2">Ubicación</h4>
                <p className="text-gray-600">{previewProfessional.location}</p>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between sm:justify-between">
            <Button variant="outline" onClick={() => setPreviewProfessional(null)}>
              Cerrar
            </Button>
            <div className="flex gap-2">
              <Link href={previewProfessional ? `/chat/${previewProfessional.id}` : "#"}>
                <Button variant="outline">
                  <MessageCircleIcon className="h-4 w-4 mr-1" />
                  Contactar
                </Button>
              </Link>
              <Link href={previewProfessional ? `/profile/${previewProfessional.id}` : "#"}>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <span className="flex items-center">
                    Ver perfil completo
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </span>
                </Button>
              </Link>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para mostrar todas las categorías */}
      <Dialog open={showAllCategories} onOpenChange={setShowAllCategories}>
        <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Todas las categorías</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-4">
            {allServiceCategories.map((cat) => (
              <Button
                key={cat}
                variant="outline"
                className="justify-start"
                onClick={() => {
                  setCategory(cat)
                  setShowAllCategories(false)
                }}
              >
                {cat}
              </Button>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAllCategories(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ClientLayout>
  )
}
