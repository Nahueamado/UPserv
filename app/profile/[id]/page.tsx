"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StarIcon, MessageCircleIcon, MapPinIcon, ClockIcon } from "lucide-react"
import ClientLayout from "@/components/client-layout"

// Datos de ejemplo para el perfil profesional
const professionalProfile = {
  id: 1,
  name: "Carlos Rodríguez",
  profession: "Electricista",
  rating: 4.8,
  reviewsCount: 56,
  location: "Buenos Aires",
  distance: "2.5 km",
  price: "$$$",
  description:
    "Electricista matriculado con más de 10 años de experiencia en instalaciones residenciales y comerciales. Especializado en soluciones eléctricas eficientes y seguras.",
  image: "/placeholder.svg?height=100&width=100",
  portfolio: [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ],
  services: [
    { name: "Instalación eléctrica completa", price: "$$$" },
    { name: "Reparación de cortocircuitos", price: "$$" },
    { name: "Instalación de luces", price: "$" },
    { name: "Mantenimiento preventivo", price: "$$" },
  ],
  reviews: [
    {
      id: 1,
      name: "Laura Gómez",
      rating: 5,
      comment: "Excelente trabajo, muy profesional y puntual.",
      date: "15/04/2023",
    },
    {
      id: 2,
      name: "Martín Suárez",
      rating: 4,
      comment: "Buen servicio, resolvió el problema rápidamente.",
      date: "02/03/2023",
    },
    {
      id: 3,
      name: "Ana Fernández",
      rating: 5,
      comment: "Muy recomendable, trabajo de calidad y precio justo.",
      date: "18/01/2023",
    },
  ],
  availability: [
    { day: "Lunes", hours: "9:00 - 18:00" },
    { day: "Martes", hours: "9:00 - 18:00" },
    { day: "Miércoles", hours: "9:00 - 18:00" },
    { day: "Jueves", hours: "9:00 - 18:00" },
    { day: "Viernes", hours: "9:00 - 16:00" },
  ],
}

export default function ProfessionalProfilePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("info")

  // En una implementación real, usaríamos el ID para obtener los datos del profesional
  const professional = professionalProfile

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/client" className="text-sm text-gray-500 hover:text-gray-700">
            ← Volver a la búsqueda
          </Link>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={professional.image || "/placeholder.svg"} alt={professional.name} />
                <AvatarFallback>{professional.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold">{professional.name}</h1>
                    <p className="text-gray-500">{professional.profession}</p>
                    <div className="flex items-center mt-2">
                      <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
                      <span className="font-medium">{professional.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">({professional.reviewsCount} reseñas)</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href={`/chat/${params.id}`}>
                      <Button>
                        <MessageCircleIcon className="mr-2 h-4 w-4" />
                        Contactar
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-4">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPinIcon className="h-3 w-3" />
                    {professional.distance}
                  </Badge>
                  <Badge variant="outline">{professional.price}</Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <ClockIcon className="h-3 w-3" />
                    Responde en menos de 1 hora
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 md:w-auto md:inline-grid">
            <TabsTrigger value="info">Información</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="reviews">Reseñas</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Acerca de</h2>
                <p className="text-gray-600">{professional.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Servicios</h2>
                <div className="space-y-3">
                  {professional.services.map((service, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                      <span>{service.name}</span>
                      <Badge>{service.price}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Disponibilidad</h2>
                <div className="space-y-2">
                  {professional.availability.map((slot, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                      <span className="font-medium">{slot.day}</span>
                      <span className="text-gray-600">{slot.hours}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Trabajos realizados</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {professional.portfolio.map((image, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Trabajo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Reseñas de clientes</h2>
                <div className="space-y-6">
                  {professional.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{review.name}</h4>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <StarIcon
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ClientLayout>
  )
}
