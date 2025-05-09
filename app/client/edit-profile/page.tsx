"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CameraIcon, SaveIcon } from "lucide-react"
import ClientLayout from "@/components/client-layout"

// Datos de ejemplo para el perfil del cliente
const clientProfile = {
  id: 1,
  name: "Usuario Cliente",
  email: "usuario@ejemplo.com",
  phone: "+54 11 1234-5678",
  address: "Av. Corrientes 1234, Buenos Aires",
  image: "/placeholder.svg?height=100&width=100",
  preferences: {
    notifications: true,
    newsletter: false,
    language: "es",
  },
}

export default function EditClientProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState(clientProfile)
  const [activeTab, setActiveTab] = useState("personal")
  const [isSaving, setIsSaving] = useState(false)

  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Manejar cambios en las preferencias
  const handlePreferenceChange = (key: string, value: any) => {
    setProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value,
      },
    }))
  }

  // Simular guardado de perfil
  const handleSave = () => {
    setIsSaving(true)
    // Simular una llamada a la API
    setTimeout(() => {
      setIsSaving(false)
      // Mostrar mensaje de éxito o redirigir
      router.push("/client")
    }, 1000)
  }

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Editar Perfil</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sección de avatar */}
          <Card className="w-full md:w-1/3 lg:w-1/4">
            <CardHeader>
              <CardTitle>Foto de perfil</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={profile.image || "/placeholder.svg"} alt={profile.name} />
                  <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full bg-purple-600 hover:bg-purple-700"
                >
                  <CameraIcon className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-500 text-center">
                Haz clic en el ícono de cámara para cambiar tu foto de perfil
              </p>
            </CardContent>
          </Card>

          {/* Sección de información */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal">Información Personal</TabsTrigger>
                <TabsTrigger value="preferences">Preferencias</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Información Personal</CardTitle>
                    <CardDescription>
                      Actualiza tu información personal. Esta información será visible para los profesionales con los
                      que te contactes.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input
                          id="name"
                          name="name"
                          value={profile.name}
                          onChange={handleChange}
                          placeholder="Tu nombre completo"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profile.email}
                          onChange={handleChange}
                          placeholder="tu@email.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={profile.phone}
                          onChange={handleChange}
                          placeholder="+54 11 1234-5678"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Dirección</Label>
                        <Input
                          id="address"
                          name="address"
                          value={profile.address}
                          onChange={handleChange}
                          placeholder="Tu dirección"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferencias</CardTitle>
                    <CardDescription>Personaliza tus preferencias de notificaciones y comunicación.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Idioma</Label>
                      <Select
                        value={profile.preferences.language}
                        onValueChange={(value) => handlePreferenceChange("language", value)}
                      >
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Selecciona un idioma" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="en">Inglés</SelectItem>
                          <SelectItem value="pt">Portugués</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="notifications"
                        checked={profile.preferences.notifications}
                        onChange={(e) => handlePreferenceChange("notifications", e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="notifications">Recibir notificaciones por correo electrónico</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="newsletter"
                        checked={profile.preferences.newsletter}
                        onChange={(e) => handlePreferenceChange("newsletter", e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="newsletter">Suscribirse al boletín de noticias</Label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-end gap-4">
              <Button variant="outline" onClick={() => router.back()}>
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={isSaving} className="bg-purple-600 hover:bg-purple-700">
                {isSaving ? (
                  "Guardando..."
                ) : (
                  <>
                    <SaveIcon className="mr-2 h-4 w-4" />
                    Guardar cambios
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}
