"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  UserIcon,
  MessageCircleIcon,
  ImageIcon,
  SettingsIcon,
  StarIcon,
  UsersIcon,
  TrendingUpIcon,
  CalendarIcon,
  CrownIcon,
  PlusIcon,
} from "lucide-react"
import ProfessionalLayout from "@/components/professional-layout"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Datos de ejemplo para el perfil profesional
const professionalProfile = {
  id: 1,
  name: "Carlos Rodríguez",
  profession: "Electricista",
  rating: 4.8,
  reviewsCount: 56,
  location: "Buenos Aires",
  description:
    "Electricista matriculado con más de 10 años de experiencia en instalaciones residenciales y comerciales.",
  image: "/placeholder.svg?height=100&width=100",
  portfolio: [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ],
  stats: {
    views: 245,
    contacts: 32,
    completedJobs: 48,
  },
  recentMessages: [
    { id: 1, name: "Laura Gómez", message: "Hola, necesito un presupuesto para...", time: "10:30", unread: true },
    { id: 2, name: "Martín Suárez", message: "Gracias por el trabajo realizado", time: "Ayer", unread: false },
    { id: 3, name: "Ana Fernández", message: "¿Podrías venir mañana a revisar...?", time: "Ayer", unread: false },
  ],
}

export default function ProfessionalPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [portfolio, setPortfolio] = useState(professionalProfile.portfolio)
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)
  const [userInfo, setUserInfo] = useState<any>(null)
  const [imageInputRef, setImageInputRef] = useState<HTMLInputElement | null>(null)

  useEffect(() => {
    // Obtener información del usuario
    const getUserInfo = () => {
      // Primero verificar en sessionStorage
      let userSession = sessionStorage.getItem("userSession")

      // Si no hay sesión en sessionStorage, verificar en localStorage
      if (!userSession) {
        userSession = localStorage.getItem("userSession")
      }

      if (userSession) {
        setUserInfo(JSON.parse(userSession))
      }
    }

    getUserInfo()
  }, [])

  // Verificar si el usuario tiene plan premium
  const isPremium = () => {
    if (!userInfo) return false

    // Verificar según el rol activo
    if (userInfo.activeRole === "professional") {
      return userInfo.professionalPlan === "premium"
    }
    return false
  }

  // Función para manejar la carga de imágenes
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    // Verificar límite para usuarios free
    if (!isPremium() && portfolio.length >= 3) {
      setShowUpgradeDialog(true)
      return
    }

    const file = files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      if (e.target?.result) {
        setPortfolio([...portfolio, e.target.result as string])
      }
    }

    reader.readAsDataURL(file)
  }

  // Función para manejar la redirección a WhatsApp
  const handleWhatsAppRedirect = () => {
    window.open("https://wa.me/5493521536819", "_blank")
    setShowUpgradeDialog(false)
  }

  return (
    <ProfessionalLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={professionalProfile.image || "/placeholder.svg"} alt={professionalProfile.name} />
                    <AvatarFallback>{professionalProfile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{professionalProfile.name}</h2>
                  <p className="text-gray-500">{professionalProfile.profession}</p>
                  <div className="flex items-center mt-2">
                    <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-medium">{professionalProfile.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({professionalProfile.reviewsCount} reseñas)</span>
                  </div>
                  <Badge className="mt-2">{professionalProfile.location}</Badge>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab("dashboard")}>
                    <TrendingUpIcon className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab("profile")}>
                    <UserIcon className="mr-2 h-4 w-4" />
                    Mi Perfil
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab("portfolio")}>
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Portfolio
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab("messages")}>
                    <MessageCircleIcon className="mr-2 h-4 w-4" />
                    Mensajes
                    {professionalProfile.recentMessages.some((m) => m.unread) && (
                      <Badge variant="destructive" className="ml-auto">
                        Nuevo
                      </Badge>
                    )}
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab("settings")}>
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    Configuración
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <Link href="/client">
                    <Button variant="secondary" className="w-full">
                      Cambiar a vista cliente
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-full mr-4">
                          <UsersIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Visitas al perfil</p>
                          <h3 className="text-2xl font-bold">{professionalProfile.stats.views}</h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-full mr-4">
                          <MessageCircleIcon className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Contactos</p>
                          <h3 className="text-2xl font-bold">{professionalProfile.stats.contacts}</h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-full mr-4">
                          <CalendarIcon className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Trabajos completados</p>
                          <h3 className="text-2xl font-bold">{professionalProfile.stats.completedJobs}</h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Mensajes recientes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {professionalProfile.recentMessages.map((message) => (
                        <div key={message.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50">
                          <Avatar>
                            <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">{message.name}</h4>
                              <span className="text-xs text-gray-500">{message.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{message.message}</p>
                          </div>
                          {message.unread && (
                            <Badge variant="destructive" className="ml-2">
                              Nuevo
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="link" onClick={() => setActiveTab("messages")}>
                        Ver todos los mensajes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">Mi Perfil</h1>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Información personal</h3>
                        <p className="text-gray-600">{professionalProfile.description}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Ubicación</h3>
                        <p className="text-gray-600">{professionalProfile.location}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Servicios ofrecidos</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge>Instalaciones eléctricas</Badge>
                          <Badge>Reparaciones</Badge>
                          <Badge>Mantenimiento</Badge>
                          <Badge>Iluminación</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button>Editar perfil</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "portfolio" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">Portfolio</h1>
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {portfolio.map((image, index) => (
                        <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Trabajo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        {!isPremium() && portfolio.length >= 3 && (
                          <div className="flex items-center">
                            <CrownIcon className="h-4 w-4 text-yellow-500 mr-1" />
                            <span>Límite de 3 imágenes (Plan Free)</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={(ref) => setImageInputRef(ref)}
                          onChange={handleImageUpload}
                        />
                        <Button onClick={() => imageInputRef?.click()} disabled={!isPremium() && portfolio.length >= 3}>
                          <PlusIcon className="h-4 w-4 mr-2" />
                          Agregar imágenes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "messages" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">Mensajes</h1>
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {professionalProfile.recentMessages.map((message) => (
                        <div key={message.id} className="flex items-start gap-4 p-4 hover:bg-gray-50">
                          <Avatar>
                            <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">{message.name}</h4>
                              <span className="text-xs text-gray-500">{message.time}</span>
                            </div>
                            <p className="text-sm text-gray-600">{message.message}</p>
                          </div>
                          {message.unread && <Badge variant="destructive">Nuevo</Badge>}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">Configuración</h1>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Preferencias de cuenta</h3>
                    <div className="space-y-4">
                      <div>
                        <Link href="/professional/settings/notifications">
                          <Button variant="outline" className="w-full justify-between">
                            Notificaciones
                            <SettingsIcon className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                      <div>
                        <Link href="/professional/settings/privacy">
                          <Button variant="outline" className="w-full justify-between">
                            Privacidad
                            <SettingsIcon className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                      <div>
                        <Link href="/professional/settings/payment">
                          <Button variant="outline" className="w-full justify-between">
                            Métodos de pago
                            <SettingsIcon className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Diálogo para actualizar plan */}
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Límite alcanzado</DialogTitle>
            <DialogDescription>Límite alcanzado. Esta función está disponible solo con plan premium.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpgradeDialog(false)}>
              Cerrar
            </Button>
            <Button onClick={handleWhatsAppRedirect} className="bg-purple-600 hover:bg-purple-700">
              Mejorar mi plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ProfessionalLayout>
  )
}
