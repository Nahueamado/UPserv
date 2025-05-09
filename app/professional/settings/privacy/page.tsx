"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Shield, Eye, Lock } from "lucide-react"
import ProfessionalLayout from "@/components/professional-layout"

export default function PrivacyPage() {
  const [showSuccess, setShowSuccess] = useState(false)

  // Estados para las configuraciones de privacidad
  const [profileVisibility, setProfileVisibility] = useState(true)
  const [showContactInfo, setShowContactInfo] = useState(false)
  const [showPortfolio, setShowPortfolio] = useState(true)
  const [allowReviews, setAllowReviews] = useState(true)
  const [dataCollection, setDataCollection] = useState(true)

  const handleSave = () => {
    // Aquí se guardarían las preferencias en una base de datos real
    console.log("Guardando configuración de privacidad:", {
      profileVisibility,
      showContactInfo,
      showPortfolio,
      allowReviews,
      dataCollection,
    })

    // Mostrar mensaje de éxito
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <ProfessionalLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Shield className="mr-2 h-5 w-5" />
          <h1 className="text-3xl font-bold">Privacidad</h1>
        </div>

        {showSuccess && (
          <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>La configuración de privacidad se ha guardado correctamente.</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visibilidad del perfil</CardTitle>
              <CardDescription>Controla quién puede ver tu perfil y tu información</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-gray-500" />
                  <Label htmlFor="profile-visibility">Perfil visible en búsquedas</Label>
                </div>
                <Switch id="profile-visibility" checked={profileVisibility} onCheckedChange={setProfileVisibility} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-gray-500" />
                  <Label htmlFor="show-contact-info">Mostrar información de contacto</Label>
                </div>
                <Switch id="show-contact-info" checked={showContactInfo} onCheckedChange={setShowContactInfo} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-gray-500" />
                  <Label htmlFor="show-portfolio">Mostrar portfolio</Label>
                </div>
                <Switch id="show-portfolio" checked={showPortfolio} onCheckedChange={setShowPortfolio} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interacciones</CardTitle>
              <CardDescription>Configura cómo interactúas con otros usuarios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="allow-reviews">Permitir reseñas</Label>
                <Switch id="allow-reviews" checked={allowReviews} onCheckedChange={setAllowReviews} />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="data-collection">Recopilación de datos para mejorar el servicio</Label>
                <Switch id="data-collection" checked={dataCollection} onCheckedChange={setDataCollection} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Guardar configuración</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Zona de peligro</CardTitle>
              <CardDescription>Acciones que afectan permanentemente a tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Desactivar cuenta</p>
                  <p className="text-sm text-gray-500">Tu cuenta quedará oculta temporalmente</p>
                </div>
                <Button variant="outline">Desactivar</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-red-600">Eliminar cuenta</p>
                  <p className="text-sm text-gray-500">Esta acción es irreversible</p>
                </div>
                <Button variant="destructive">Eliminar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProfessionalLayout>
  )
}
