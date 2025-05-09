"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Bell, Mail, Smartphone } from "lucide-react"
import ProfessionalLayout from "@/components/professional-layout"

export default function NotificationsPage() {
  const [showSuccess, setShowSuccess] = useState(false)

  // Estados para las notificaciones
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [newMessageNotifications, setNewMessageNotifications] = useState(true)
  const [newClientNotifications, setNewClientNotifications] = useState(true)
  const [reviewNotifications, setReviewNotifications] = useState(true)
  const [marketingNotifications, setMarketingNotifications] = useState(false)

  const handleSave = () => {
    // Aquí se guardarían las preferencias en una base de datos real
    console.log("Guardando preferencias de notificaciones:", {
      emailNotifications,
      pushNotifications,
      newMessageNotifications,
      newClientNotifications,
      reviewNotifications,
      marketingNotifications,
    })

    // Mostrar mensaje de éxito
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <ProfessionalLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Bell className="mr-2 h-5 w-5" />
          <h1 className="text-3xl font-bold">Notificaciones</h1>
        </div>

        {showSuccess && (
          <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Las preferencias de notificaciones se han guardado correctamente.</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Canales de notificación</CardTitle>
              <CardDescription>Configura cómo quieres recibir las notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <Label htmlFor="email-notifications">Notificaciones por email</Label>
                </div>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-5 w-5 text-gray-500" />
                  <Label htmlFor="push-notifications">Notificaciones push</Label>
                </div>
                <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tipos de notificaciones</CardTitle>
              <CardDescription>Selecciona qué notificaciones quieres recibir</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="new-message-notifications">Nuevos mensajes</Label>
                <Switch
                  id="new-message-notifications"
                  checked={newMessageNotifications}
                  onCheckedChange={setNewMessageNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="new-client-notifications">Nuevos clientes interesados</Label>
                <Switch
                  id="new-client-notifications"
                  checked={newClientNotifications}
                  onCheckedChange={setNewClientNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="review-notifications">Nuevas reseñas</Label>
                <Switch
                  id="review-notifications"
                  checked={reviewNotifications}
                  onCheckedChange={setReviewNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="marketing-notifications">Ofertas y novedades</Label>
                <Switch
                  id="marketing-notifications"
                  checked={marketingNotifications}
                  onCheckedChange={setMarketingNotifications}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Guardar preferencias</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </ProfessionalLayout>
  )
}
