

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StarIcon, MessageCircleIcon, MapPinIcon, ClockIcon } from "lucide-react"
import ClientLayout from "@/components/client-layout"
import ProfessionalProfileClient from "./ProfessionalProfileClient"
import { generateStaticParams } from "./generateStaticParams"

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

export { generateStaticParams }

export default function ProfessionalProfilePage({ params }: { params: { id: string } }) {
  return <ProfessionalProfileClient professional={professionalProfile} id={params.id} />
}


