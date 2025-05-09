"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, CreditCard, Trash2, Plus, DollarSign } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import ProfessionalLayout from "@/components/professional-layout"

export default function PaymentMethodsPage() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [showAddCardDialog, setShowAddCardDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [cardToDelete, setCardToDelete] = useState<number | null>(null)

  // Estados para el formulario de tarjeta
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")

  // Datos de ejemplo para métodos de pago
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "credit",
      brand: "Visa",
      last4: "4242",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: 2,
      type: "credit",
      brand: "Mastercard",
      last4: "5678",
      expiry: "08/24",
      isDefault: false,
    },
  ])

  const handleAddCard = () => {
    // Validación básica
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      return
    }

    // Simular añadir tarjeta
    const newCard = {
      id: paymentMethods.length + 1,
      type: "credit",
      brand: cardNumber.startsWith("4") ? "Visa" : "Mastercard",
      last4: cardNumber.slice(-4),
      expiry: expiryDate,
      isDefault: paymentMethods.length === 0,
    }

    setPaymentMethods([...paymentMethods, newCard])
    setShowAddCardDialog(false)

    // Resetear formulario
    setCardNumber("")
    setCardName("")
    setExpiryDate("")
    setCvv("")

    // Mostrar mensaje de éxito
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleDeleteCard = () => {
    if (cardToDelete !== null) {
      setPaymentMethods(paymentMethods.filter((method) => method.id !== cardToDelete))
      setCardToDelete(null)
      setShowDeleteDialog(false)
    }
  }

  const setDefaultCard = (id: number) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
  }

  return (
    <ProfessionalLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <CreditCard className="mr-2 h-5 w-5" />
          <h1 className="text-3xl font-bold">Métodos de pago</h1>
        </div>

        {showSuccess && (
          <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>El método de pago se ha añadido correctamente.</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tarjetas guardadas</CardTitle>
              <CardDescription>Gestiona tus métodos de pago</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.length > 0 ? (
                paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-gray-100 rounded-md mr-4">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {method.brand} •••• {method.last4}
                        </p>
                        <p className="text-sm text-gray-500">Expira: {method.expiry}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {method.isDefault ? (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Predeterminada
                        </span>
                      ) : (
                        <Button variant="outline" size="sm" onClick={() => setDefaultCard(method.id)}>
                          Establecer como predeterminada
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          setCardToDelete(method.id)
                          setShowDeleteDialog(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">No tienes métodos de pago guardados</div>
              )}

              <Button variant="outline" className="w-full mt-4" onClick={() => setShowAddCardDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Añadir nueva tarjeta
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historial de facturación</CardTitle>
              <CardDescription>Revisa tus pagos anteriores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border-b">
                  <div>
                    <p className="font-medium">Plan Premium</p>
                    <p className="text-sm text-gray-500">01/05/2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$5.000 ARS</p>
                    <p className="text-xs text-green-600">Pagado</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 border-b">
                  <div>
                    <p className="font-medium">Plan Premium</p>
                    <p className="text-sm text-gray-500">01/04/2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$5.000 ARS</p>
                    <p className="text-xs text-green-600">Pagado</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4">
                  <div>
                    <p className="font-medium">Plan Premium</p>
                    <p className="text-sm text-gray-500">01/03/2023</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$5.000 ARS</p>
                    <p className="text-xs text-green-600">Pagado</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <DollarSign className="mr-2 h-4 w-4" />
                Ver todas las facturas
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Diálogo para añadir tarjeta */}
      <Dialog open={showAddCardDialog} onOpenChange={setShowAddCardDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir nueva tarjeta</DialogTitle>
            <DialogDescription>Introduce los datos de tu tarjeta para guardarla como método de pago</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Número de tarjeta</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-name">Nombre en la tarjeta</Label>
              <Input
                id="card-name"
                placeholder="Juan Pérez"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry-date">Fecha de expiración</Label>
                <Input
                  id="expiry-date"
                  placeholder="MM/AA"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddCardDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddCard}>Guardar tarjeta</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para eliminar tarjeta */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar tarjeta</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar esta tarjeta? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteCard}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ProfessionalLayout>
  )
}
