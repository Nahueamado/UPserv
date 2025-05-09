"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckIcon, StarIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function SubscriptionPage() {
  const router = useRouter()
  const [showWhatsAppDialog, setShowWhatsAppDialog] = useState(false)
  const [showPremiumPopup, setShowPremiumPopup] = useState(false)

  const handleFreePlan = () => {
    router.push("/professional")
  }

  const handlePremiumPlan = () => {
    setShowWhatsAppDialog(true)
  }

  const handleWhatsAppRedirect = () => {
    // Abrir WhatsApp en una nueva ventana
    window.open("https://wa.me/5493521536819", "_blank")
    setShowWhatsAppDialog(false)
    setShowPremiumPopup(true)
    // Redirigir a la página principal de profesionales después de un breve retraso
    setTimeout(() => {
      router.push("/professional")
    }, 500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-2">Elige tu plan</h1>
        <p className="text-gray-600 text-center mb-8">
          Selecciona el plan que mejor se adapte a tus necesidades como profesional
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plan Gratuito */}
          <Card className="border-2 border-gray-200 hover:border-gray-300 transition-all">
            <CardHeader>
              <CardTitle className="text-2xl">Plan FREE</CardTitle>
              <CardDescription>Ideal para comenzar</CardDescription>
              <div className="mt-2 text-3xl font-bold">$0</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Perfil profesional básico</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Hasta 2 imágenes en portfolio</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Chat con clientes</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Recibir valoraciones</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button onClick={handleFreePlan} variant="outline" className="w-full">
                Comenzar gratis
              </Button>
            </CardFooter>
          </Card>

          {/* Plan Premium */}
          <Card className="border-2 border-purple-200 bg-purple-50 hover:border-purple-300 transition-all">
            <CardHeader className="relative">
              <div className="absolute -top-4 right-0 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Recomendado
              </div>
              <CardTitle className="text-2xl flex items-center">
                Plan PREMIUM <StarIcon className="h-5 w-5 text-yellow-500 ml-2" />
              </CardTitle>
              <CardDescription>Para profesionales exigentes</CardDescription>
              <div className="mt-2 text-3xl font-bold">$5.000 ARS</div>
              <CardDescription>por mes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>Todo lo incluido en el plan FREE</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="font-medium">Crear y vender cursos online</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="font-medium">Ver perfiles detallados de clientes</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="font-medium">Enviar archivos en el chat</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="font-medium">Portfolio ilimitado</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span className="font-medium">Posicionamiento destacado</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col">
              <p className="text-sm text-gray-600 mb-3 text-center">
                Habla con nuestros asesores mediante WhatsApp para subscribirte a premium
              </p>
              <Button onClick={handlePremiumPlan} className="w-full bg-purple-600 hover:bg-purple-700">
                Adquirir plan
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Diálogo de WhatsApp */}
      <Dialog open={showWhatsAppDialog} onOpenChange={setShowWhatsAppDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contactar con un asesor</DialogTitle>
            <DialogDescription>
              Serás redirigido a WhatsApp para hablar con uno de nuestros asesores y completar tu suscripción.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>
              Nuestros asesores te guiarán en el proceso de pago y responderán todas tus dudas sobre el plan Premium.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWhatsAppDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleWhatsAppRedirect} className="bg-green-600 hover:bg-green-700">
              Ir a WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* PopUp de Premium */}
      <Dialog open={showPremiumPopup} onOpenChange={setShowPremiumPopup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>¡Gracias por elegir el Plan Premium!</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Una vez que hayas hablado con nuestros asesores y concretado el pago se habilitarán tus funciones premium.
              Gracias por confiar en nosotros.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowPremiumPopup(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
