"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CameraIcon, PlusIcon, SaveIcon, XIcon } from "lucide-react"
import ProfessionalLayout from "@/components/professional-layout"

// Datos de ejemplo para el perfil profesional
const professionalProfile = {
  id: 1,
  name: "Carlos Rodríguez",
  profession: "Electricista",
  email: "carlos@ejemplo.com",
  phone: "+54 11 1234-5678",
  location: "Buenos Aires",
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
  skills: ["Instalaciones eléctricas", "Reparaciones", "Mantenimiento", "Iluminación"],
  availability: [
    { day: "Lunes", hours: "9:00 - 18:00" },
    { day: "Martes", hours: "9:00 - 18:00" },
    { day: "Miércoles", hours: "9:00 - 18:00" },
    { day: "Jueves", hours: "9:00 - 18:00" },
    { day: "Viernes", hours: "9:00 - 16:00" },
  ],
}

export default function EditProfessionalProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState(professionalProfile)
  const [activeTab, setActiveTab] = useState("personal")
  const [newSkill, setNewSkill] = useState("")
  const [newService, setNewService] = useState({ name: "", price: "$" })
  const [isSaving, setIsSaving] = useState(false)

  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Añadir una nueva habilidad
  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  // Eliminar una habilidad
  const removeSkill = (skillToRemove: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  // Añadir un nuevo servicio
  const addService = () => {
    if (newService.name.trim() !== "") {
      setProfile((prev) => ({
        ...prev,
        services: [...prev.services, { ...newService }],
      }))
      setNewService({ name: "", price: "$" })
    }
  }

  // Eliminar un servicio
  const removeService = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }))
  }

  // Simular guardado de perfil
  const handleSave = () => {
    setIsSaving(true)
    // Simular una llamada a la API
    setTimeout(() => {
      setIsSaving(false)
      // Mostrar mensaje de éxito o redirigir
      router.push("/professional")
    }, 1000)
  }

  return (
    <ProfessionalLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Editar Perfil Profesional</h1>

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
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Información Personal</TabsTrigger>
                <TabsTrigger value="services">Servicios</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Información Personal</CardTitle>
                    <CardDescription>
                      Actualiza tu información personal. Esta información será visible para los clientes.
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
                        <Label htmlFor="profession">Profesión</Label>
                        <Input
                          id="profession"
                          name="profession"
                          value={profile.profession}
                          onChange={handleChange}
                          placeholder="Tu profesión"
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
                        <Label htmlFor="location">Ubicación</Label>
                        <Input
                          id="location"
                          name="location"
                          value={profile.location}
                          onChange={handleChange}
                          placeholder="Tu ubicación"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Descripción profesional</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={profile.description}
                        onChange={handleChange}
                        placeholder="Describe tu experiencia y especialidades"
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Habilidades</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {profile.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="ml-1 text-gray-500 hover:text-gray-700"
                            >
                              <XIcon className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Nueva habilidad"
                          onKeyDown={(e) => e.key === "Enter" && addSkill()}
                        />
                        <Button type="button" onClick={addSkill} size="sm">
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="services" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Servicios</CardTitle>
                    <CardDescription>Agrega los servicios que ofreces y sus precios aproximados.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      {profile.services.map((service, index) => (
                        <div key={index} className="flex items-center justify-between border-b pb-2">
                          <div>
                            <p className="font-medium">{service.name}</p>
                            <Badge>{service.price}</Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeService(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <XIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-end">
                      <div className="md:col-span-2">
                        <Label htmlFor="serviceName">Nombre del servicio</Label>
                        <Input
                          id="serviceName"
                          value={newService.name}
                          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                          placeholder="Nombre del servicio"
                        />
                      </div>
                      <div>
                        <Label htmlFor="servicePrice">Precio</Label>
                        <Select
                          value={newService.price}
                          onValueChange={(value) => setNewService({ ...newService, price: value })}
                        >
                          <SelectTrigger id="servicePrice">
                            <SelectValue placeholder="Precio" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="$">$ (Económico)</SelectItem>
                            <SelectItem value="$$">$$ (Moderado)</SelectItem>
                            <SelectItem value="$$$">$$$ (Premium)</SelectItem>
                            <SelectItem value="$$$$">$$$$ (Exclusivo)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button type="button" onClick={addService} disabled={!newService.name.trim()} className="w-full">
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Agregar servicio
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="portfolio" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio</CardTitle>
                    <CardDescription>Sube imágenes de tus trabajos para mostrar a los clientes.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {profile.portfolio.map((image, index) => (
                        <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Trabajo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6 rounded-full"
                            onClick={() => {
                              setProfile((prev) => ({
                                ...prev,
                                portfolio: prev.portfolio.filter((_, i) => i !== index),
                              }))
                            }}
                          >
                            <XIcon className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full">
                      <CameraIcon className="h-4 w-4 mr-2" />
                      Agregar imagen
                    </Button>
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
    </ProfessionalLayout>
  )
}
