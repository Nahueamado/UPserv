"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MoreHorizontal, Eye, Edit, Trash, Star, CheckCircle, XCircle } from "lucide-react"

// Datos de ejemplo para profesionales
const initialProfessionals = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    profession: "Electricista",
    rating: 4.8,
    reviewsCount: 56,
    location: "Buenos Aires",
    plan: "premium",
    verified: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Laura Martínez",
    profession: "Plomera",
    rating: 4.9,
    reviewsCount: 124,
    location: "Buenos Aires",
    plan: "free",
    verified: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Martín Suárez",
    profession: "Técnico en computación",
    rating: 4.7,
    reviewsCount: 89,
    location: "Buenos Aires",
    plan: "premium",
    verified: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Roberto Pérez",
    profession: "Gasista",
    rating: 4.9,
    reviewsCount: 78,
    location: "Buenos Aires",
    plan: "free",
    verified: false,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Lucía Martínez",
    profession: "Peluquera",
    rating: 4.8,
    reviewsCount: 112,
    location: "Buenos Aires",
    plan: "premium",
    verified: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "Miguel Torres",
    profession: "Cerrajero",
    rating: 4.5,
    reviewsCount: 45,
    location: "Buenos Aires",
    plan: "free",
    verified: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 7,
    name: "Sofía López",
    profession: "Pintora",
    rating: 4.7,
    reviewsCount: 67,
    location: "Buenos Aires",
    plan: "free",
    verified: false,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 8,
    name: "Javier García",
    profession: "Carpintero",
    rating: 4.9,
    reviewsCount: 93,
    location: "Buenos Aires",
    plan: "premium",
    verified: true,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function AdminProfessionalsPage() {
  const [professionals, setProfessionals] = useState(initialProfessionals)
  const [searchTerm, setSearchTerm] = useState("")
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [currentProfessional, setCurrentProfessional] = useState<any>(null)

  // Filtrar profesionales según la búsqueda
  const filteredProfessionals = professionals.filter(
    (professional) =>
      professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.profession.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Manejar la edición de un profesional
  const handleEditProfessional = () => {
    setProfessionals(
      professionals.map((professional) => {
        if (professional.id === currentProfessional.id) {
          return { ...currentProfessional }
        }
        return professional
      }),
    )
    setShowEditDialog(false)
    setCurrentProfessional(null)
  }

  // Manejar la eliminación de un profesional
  const handleDeleteProfessional = () => {
    setProfessionals(professionals.filter((professional) => professional.id !== currentProfessional.id))
    setShowDeleteDialog(false)
    setCurrentProfessional(null)
  }

  // Manejar el cambio de verificación de un profesional
  const handleToggleVerification = (id: number) => {
    setProfessionals(
      professionals.map((professional) => {
        if (professional.id === id) {
          return {
            ...professional,
            verified: !professional.verified,
          }
        }
        return professional
      }),
    )
  }

  // Manejar el cambio de plan de un profesional
  const handleTogglePlan = (id: number) => {
    setProfessionals(
      professionals.map((professional) => {
        if (professional.id === id) {
          return {
            ...professional,
            plan: professional.plan === "free" ? "premium" : "free",
          }
        }
        return professional
      }),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold">Gestión de Profesionales</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-auto md:flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Buscar profesionales..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Profesional</TableHead>
              <TableHead>Profesión</TableHead>
              <TableHead>Valoración</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Verificado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProfessionals.map((professional) => (
              <TableRow key={professional.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={professional.image || "/placeholder.svg"} alt={professional.name} />
                      <AvatarFallback>{professional.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{professional.name}</div>
                      <div className="text-sm text-gray-500">{professional.location}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{professional.profession}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>
                      {professional.rating} ({professional.reviewsCount})
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      professional.plan === "premium" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"
                    }
                  >
                    {professional.plan === "premium" ? "Premium" : "Free"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {professional.verified ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          setCurrentProfessional(professional)
                          setShowViewDialog(true)
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Ver detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setCurrentProfessional(professional)
                          setShowEditDialog(true)
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleVerification(professional.id)}>
                        {professional.verified ? (
                          <>
                            <XCircle className="mr-2 h-4 w-4" />
                            Quitar verificación
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Verificar
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleTogglePlan(professional.id)}>
                        <Star className="mr-2 h-4 w-4" />
                        Cambiar a plan {professional.plan === "free" ? "Premium" : "Free"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setCurrentProfessional(professional)
                          setShowDeleteDialog(true)
                        }}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Diálogo para ver detalles del profesional */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Detalles del Profesional</DialogTitle>
          </DialogHeader>
          {currentProfessional && (
            <div className="py-4">
              <div className="flex flex-col items-center mb-4">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={currentProfessional.image || "/placeholder.svg"} alt={currentProfessional.name} />
                  <AvatarFallback>{currentProfessional.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{currentProfessional.name}</h2>
                <p className="text-gray-500">{currentProfessional.profession}</p>
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-medium">{currentProfessional.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({currentProfessional.reviewsCount} reseñas)</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Ubicación</span>
                  <span>{currentProfessional.location}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Plan</span>
                  <Badge
                    className={
                      currentProfessional.plan === "premium"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {currentProfessional.plan === "premium" ? "Premium" : "Free"}
                  </Badge>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Verificado</span>
                  <span>
                    {currentProfessional.verified ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowViewDialog(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar profesional */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Profesional</DialogTitle>
            <DialogDescription>Modifica los campos para actualizar el profesional.</DialogDescription>
          </DialogHeader>
          {currentProfessional && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="edit-name" className="text-sm font-medium">
                  Nombre
                </label>
                <Input
                  id="edit-name"
                  value={currentProfessional.name}
                  onChange={(e) => setCurrentProfessional({ ...currentProfessional, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-profession" className="text-sm font-medium">
                  Profesión
                </label>
                <Input
                  id="edit-profession"
                  value={currentProfessional.profession}
                  onChange={(e) => setCurrentProfessional({ ...currentProfessional, profession: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-location" className="text-sm font-medium">
                  Ubicación
                </label>
                <Input
                  id="edit-location"
                  value={currentProfessional.location}
                  onChange={(e) => setCurrentProfessional({ ...currentProfessional, location: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-verified"
                  checked={currentProfessional.verified}
                  onChange={(e) => setCurrentProfessional({ ...currentProfessional, verified: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <label htmlFor="edit-verified" className="text-sm font-medium">
                  Verificado
                </label>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Plan</label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="plan-free"
                      name="plan"
                      value="free"
                      checked={currentProfessional.plan === "free"}
                      onChange={() => setCurrentProfessional({ ...currentProfessional, plan: "free" })}
                      className="mr-2"
                    />
                    <label htmlFor="plan-free">Free</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="plan-premium"
                      name="plan"
                      value="premium"
                      checked={currentProfessional.plan === "premium"}
                      onChange={() => setCurrentProfessional({ ...currentProfessional, plan: "premium" })}
                      className="mr-2"
                    />
                    <label htmlFor="plan-premium">Premium</label>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditProfessional}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para eliminar profesional */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Profesional</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar a este profesional? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          {currentProfessional && (
            <div className="py-4">
              <p>
                Estás a punto de eliminar a <strong>{currentProfessional.name}</strong> (
                {currentProfessional.profession}).
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteProfessional}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
