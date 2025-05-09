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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MoreHorizontal,
  Plus,
  Edit,
  Trash,
  UserCheck,
  UserX,
  UserPlus,
  StarIcon,
  ShieldIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Datos de ejemplo para usuarios
const initialUsers = [
  {
    id: 1,
    name: "María González",
    email: "maria@ejemplo.com",
    hasDualProfile: false,
    hasClientProfile: true,
    hasProfessionalProfile: false,
    clientPlan: "free",
    professionalPlan: null,
    status: "active",
    registeredDate: "15/04/2023",
    lastLogin: "05/05/2023",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    email: "carlos@ejemplo.com",
    hasDualProfile: false,
    hasClientProfile: false,
    hasProfessionalProfile: true,
    clientPlan: null,
    professionalPlan: "premium",
    status: "active",
    registeredDate: "10/03/2023",
    lastLogin: "04/05/2023",
  },
  {
    id: 3,
    name: "Laura Martínez",
    email: "laura@ejemplo.com",
    hasDualProfile: true,
    hasClientProfile: true,
    hasProfessionalProfile: true,
    clientPlan: "free",
    professionalPlan: "premium",
    status: "active",
    registeredDate: "05/04/2023",
    lastLogin: "06/05/2023",
  },
  {
    id: 4,
    name: "Juan Pérez",
    email: "juan@ejemplo.com",
    hasDualProfile: false,
    hasClientProfile: true,
    hasProfessionalProfile: false,
    clientPlan: "premium",
    professionalPlan: null,
    status: "inactive",
    registeredDate: "20/02/2023",
    lastLogin: "15/03/2023",
  },
  {
    id: 5,
    name: "Ana López",
    email: "ana@ejemplo.com",
    hasDualProfile: true,
    hasClientProfile: true,
    hasProfessionalProfile: true,
    clientPlan: "premium",
    professionalPlan: "free",
    status: "active",
    registeredDate: "12/04/2023",
    lastLogin: "07/05/2023",
  },
  {
    id: 6,
    name: "Roberto Sánchez",
    email: "roberto@ejemplo.com",
    hasDualProfile: false,
    hasClientProfile: false,
    hasProfessionalProfile: true,
    clientPlan: null,
    professionalPlan: "free",
    status: "active",
    registeredDate: "08/03/2023",
    lastLogin: "03/05/2023",
  },
  {
    id: 7,
    name: "Sofía Ramírez",
    email: "sofia@ejemplo.com",
    hasDualProfile: false,
    hasClientProfile: true,
    hasProfessionalProfile: false,
    clientPlan: "free",
    professionalPlan: null,
    status: "active",
    registeredDate: "25/03/2023",
    lastLogin: "02/05/2023",
  },
  {
    id: 8,
    name: "Miguel Torres",
    email: "miguel@ejemplo.com",
    hasDualProfile: false,
    hasClientProfile: false,
    hasProfessionalProfile: true,
    clientPlan: null,
    professionalPlan: "free",
    status: "inactive",
    registeredDate: "15/02/2023",
    lastLogin: "20/03/2023",
  },
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [profileFilter, setProfileFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [planFilter, setPlanFilter] = useState("all")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [showEnableProfileDialog, setShowEnableProfileDialog] = useState(false)
  const [profileToEnable, setProfileToEnable] = useState<"client" | "professional" | null>(null)
  const [showChangePlanDialog, setShowChangePlanDialog] = useState(false)
  const [planToChange, setPlanToChange] = useState<{
    type: "client" | "professional"
    plan: "free" | "premium"
  } | null>(null)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    hasClientProfile: true,
    hasProfessionalProfile: false,
    hasDualProfile: false,
    clientPlan: "free",
    professionalPlan: null,
    status: "active",
  })

  // Filtrar usuarios según la búsqueda y filtros
  const filteredUsers = users.filter((user) => {
    // Filtro de búsqueda
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtro de perfil
    const matchesProfile =
      profileFilter === "all" ||
      (profileFilter === "client" && user.hasClientProfile) ||
      (profileFilter === "professional" && user.hasProfessionalProfile) ||
      (profileFilter === "dual" && user.hasDualProfile)

    // Filtro de estado
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    // Filtro de plan
    const matchesPlan =
      planFilter === "all" ||
      (planFilter === "free" && (user.clientPlan === "free" || user.professionalPlan === "free")) ||
      (planFilter === "premium" && (user.clientPlan === "premium" || user.professionalPlan === "premium"))

    return matchesSearch && matchesProfile && matchesStatus && matchesPlan
  })

  // Manejar la adición de un nuevo usuario
  const handleAddUser = () => {
    const id = Math.max(...users.map((user) => user.id)) + 1
    const today = new Date()
    const registeredDate = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${today.getFullYear()}`

    const hasDualProfile = newUser.hasClientProfile && newUser.hasProfessionalProfile

    setUsers([
      ...users,
      {
        id,
        ...newUser,
        hasDualProfile,
        registeredDate,
        lastLogin: registeredDate,
      },
    ])
    setShowAddDialog(false)
    setNewUser({
      name: "",
      email: "",
      hasClientProfile: true,
      hasProfessionalProfile: false,
      hasDualProfile: false,
      clientPlan: "free",
      professionalPlan: null,
      status: "active",
    })
  }

  // Manejar la edición de un usuario
  const handleEditUser = () => {
    const hasDualProfile = currentUser.hasClientProfile && currentUser.hasProfessionalProfile

    setUsers(
      users.map((user) => {
        if (user.id === currentUser.id) {
          return {
            ...currentUser,
            hasDualProfile,
          }
        }
        return user
      }),
    )
    setShowEditDialog(false)
    setCurrentUser(null)
  }

  // Manejar la eliminación de un usuario
  const handleDeleteUser = () => {
    setUsers(users.filter((user) => user.id !== currentUser.id))
    setShowDeleteDialog(false)
    setCurrentUser(null)
  }

  // Manejar el cambio de estado de un usuario
  const handleToggleStatus = (id: number) => {
    setUsers(
      users.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            status: user.status === "active" ? "inactive" : "active",
          }
        }
        return user
      }),
    )
  }

  // Manejar la habilitación de un perfil
  const handleEnableProfile = () => {
    if (currentUser && profileToEnable) {
      const updatedUser = { ...currentUser }

      if (profileToEnable === "client") {
        updatedUser.hasClientProfile = true
        updatedUser.clientPlan = "free"
      } else {
        updatedUser.hasProfessionalProfile = true
        updatedUser.professionalPlan = "free"
      }

      updatedUser.hasDualProfile = updatedUser.hasClientProfile && updatedUser.hasProfessionalProfile

      setUsers(
        users.map((user) => {
          if (user.id === currentUser.id) {
            return updatedUser
          }
          return user
        }),
      )

      setShowEnableProfileDialog(false)
      setProfileToEnable(null)
      setCurrentUser(null)
    }
  }

  // Manejar el cambio de plan
  const handleChangePlan = () => {
    if (currentUser && planToChange) {
      const updatedUser = { ...currentUser }

      if (planToChange.type === "client") {
        updatedUser.clientPlan = planToChange.plan
      } else {
        updatedUser.professionalPlan = planToChange.plan
      }

      setUsers(
        users.map((user) => {
          if (user.id === currentUser.id) {
            return updatedUser
          }
          return user
        }),
      )

      setShowChangePlanDialog(false)
      setPlanToChange(null)
      setCurrentUser(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Añadir Usuario
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative w-full md:w-auto md:flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Buscar usuarios..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={profileFilter} onValueChange={setProfileFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filtrar por perfil" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los perfiles</SelectItem>
            <SelectItem value="client">Solo cliente</SelectItem>
            <SelectItem value="professional">Solo profesional</SelectItem>
            <SelectItem value="dual">Perfil dual</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="active">Activos</SelectItem>
            <SelectItem value="inactive">Inactivos</SelectItem>
          </SelectContent>
        </Select>
        <Select value={planFilter} onValueChange={setPlanFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filtrar por plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los planes</SelectItem>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Perfiles</TableHead>
              <TableHead>Planes</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Último acceso</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {user.hasClientProfile && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                        Cliente
                      </Badge>
                    )}
                    {user.hasProfessionalProfile && (
                      <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200">
                        Profesional
                      </Badge>
                    )}
                    {user.hasDualProfile && (
                      <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                        Dual
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {user.hasClientProfile && (
                      <div className="flex items-center">
                        <Badge
                          variant={user.clientPlan === "premium" ? "default" : "outline"}
                          className={user.clientPlan === "premium" ? "bg-yellow-400 text-yellow-900" : ""}
                        >
                          {user.clientPlan === "premium" ? "Premium" : "Free"}
                        </Badge>
                        <span className="ml-1 text-xs text-gray-500">Cliente</span>
                      </div>
                    )}
                    {user.hasProfessionalProfile && (
                      <div className="flex items-center">
                        <Badge
                          variant={user.professionalPlan === "premium" ? "default" : "outline"}
                          className={user.professionalPlan === "premium" ? "bg-yellow-400 text-yellow-900" : ""}
                        >
                          {user.professionalPlan === "premium" ? "Premium" : "Free"}
                        </Badge>
                        <span className="ml-1 text-xs text-gray-500">Profesional</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status === "active" ? "Activo" : "Inactivo"}
                  </span>
                </TableCell>
                <TableCell>{user.lastLogin}</TableCell>
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
                          setCurrentUser(user)
                          setShowEditDialog(true)
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Perfiles</DropdownMenuLabel>

                      {!user.hasClientProfile && (
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentUser(user)
                            setProfileToEnable("client")
                            setShowEnableProfileDialog(true)
                          }}
                        >
                          <UserPlus className="mr-2 h-4 w-4" />
                          Habilitar perfil cliente
                        </DropdownMenuItem>
                      )}

                      {!user.hasProfessionalProfile && (
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentUser(user)
                            setProfileToEnable("professional")
                            setShowEnableProfileDialog(true)
                          }}
                        >
                          <UserPlus className="mr-2 h-4 w-4" />
                          Habilitar perfil profesional
                        </DropdownMenuItem>
                      )}

                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Planes</DropdownMenuLabel>

                      {user.hasClientProfile && (
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentUser(user)
                            setPlanToChange({
                              type: "client",
                              plan: user.clientPlan === "premium" ? "free" : "premium",
                            })
                            setShowChangePlanDialog(true)
                          }}
                        >
                          <StarIcon className="mr-2 h-4 w-4" />
                          {user.clientPlan === "premium"
                            ? "Cambiar a plan Free (Cliente)"
                            : "Cambiar a plan Premium (Cliente)"}
                        </DropdownMenuItem>
                      )}

                      {user.hasProfessionalProfile && (
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentUser(user)
                            setPlanToChange({
                              type: "professional",
                              plan: user.professionalPlan === "premium" ? "free" : "premium",
                            })
                            setShowChangePlanDialog(true)
                          }}
                        >
                          <StarIcon className="mr-2 h-4 w-4" />
                          {user.professionalPlan === "premium"
                            ? "Cambiar a plan Free (Profesional)"
                            : "Cambiar a plan Premium (Profesional)"}
                        </DropdownMenuItem>
                      )}

                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleToggleStatus(user.id)}>
                        {user.status === "active" ? (
                          <>
                            <UserX className="mr-2 h-4 w-4" />
                            Desactivar
                          </>
                        ) : (
                          <>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Activar
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setCurrentUser(user)
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

      {/* Diálogo para añadir usuario */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir Usuario</DialogTitle>
            <DialogDescription>Completa los campos para crear un nuevo usuario.</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Información</TabsTrigger>
              <TabsTrigger value="profiles">Perfiles</TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="pt-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="Nombre completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select
                    value={newUser.status}
                    onValueChange={(value: "active" | "inactive") => setNewUser({ ...newUser, status: value })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="inactive">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="profiles" className="pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <h3 className="text-sm font-medium">Perfil Cliente</h3>
                    <p className="text-xs text-gray-500">Habilitar perfil de cliente</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="hasClientProfile"
                      checked={newUser.hasClientProfile}
                      onChange={(e) => setNewUser({ ...newUser, hasClientProfile: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                  </div>
                </div>

                {newUser.hasClientProfile && (
                  <div className="space-y-2 pl-4">
                    <Label htmlFor="clientPlan">Plan de cliente</Label>
                    <Select
                      value={newUser.clientPlan}
                      onValueChange={(value: "free" | "premium") => setNewUser({ ...newUser, clientPlan: value })}
                    >
                      <SelectTrigger id="clientPlan">
                        <SelectValue placeholder="Seleccionar plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <h3 className="text-sm font-medium">Perfil Profesional</h3>
                    <p className="text-xs text-gray-500">Habilitar perfil de profesional</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="hasProfessionalProfile"
                      checked={newUser.hasProfessionalProfile}
                      onChange={(e) => setNewUser({ ...newUser, hasProfessionalProfile: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                  </div>
                </div>

                {newUser.hasProfessionalProfile && (
                  <div className="space-y-2 pl-4">
                    <Label htmlFor="professionalPlan">Plan de profesional</Label>
                    <Select
                      value={newUser.professionalPlan || "free"}
                      onValueChange={(value: "free" | "premium") => setNewUser({ ...newUser, professionalPlan: value })}
                    >
                      <SelectTrigger id="professionalPlan">
                        <SelectValue placeholder="Seleccionar plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddUser}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar usuario */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogDescription>Modifica los campos para actualizar el usuario.</DialogDescription>
          </DialogHeader>
          {currentUser && (
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">Información</TabsTrigger>
                <TabsTrigger value="profiles">Perfiles</TabsTrigger>
              </TabsList>
              <TabsContent value="info" className="pt-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Nombre</Label>
                    <Input
                      id="edit-name"
                      value={currentUser.name}
                      onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={currentUser.email}
                      onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-status">Estado</Label>
                    <Select
                      value={currentUser.status}
                      onValueChange={(value) => setCurrentUser({ ...currentUser, status: value })}
                    >
                      <SelectTrigger id="edit-status">
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Activo</SelectItem>
                        <SelectItem value="inactive">Inactivo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="profiles" className="pt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <h3 className="text-sm font-medium">Perfil Cliente</h3>
                      <p className="text-xs text-gray-500">Habilitar/deshabilitar perfil de cliente</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="edit-hasClientProfile"
                        checked={currentUser.hasClientProfile}
                        onChange={(e) => setCurrentUser({ ...currentUser, hasClientProfile: e.target.checked })}
                        className="rounded border-gray-300"
                      />
                    </div>
                  </div>

                  {currentUser.hasClientProfile && (
                    <div className="space-y-2 pl-4">
                      <Label htmlFor="edit-clientPlan">Plan de cliente</Label>
                      <Select
                        value={currentUser.clientPlan}
                        onValueChange={(value: "free" | "premium") =>
                          setCurrentUser({ ...currentUser, clientPlan: value })
                        }
                      >
                        <SelectTrigger id="edit-clientPlan">
                          <SelectValue placeholder="Seleccionar plan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="free">Free</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <h3 className="text-sm font-medium">Perfil Profesional</h3>
                      <p className="text-xs text-gray-500">Habilitar/deshabilitar perfil de profesional</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="edit-hasProfessionalProfile"
                        checked={currentUser.hasProfessionalProfile}
                        onChange={(e) => setCurrentUser({ ...currentUser, hasProfessionalProfile: e.target.checked })}
                        className="rounded border-gray-300"
                      />
                    </div>
                  </div>

                  {currentUser.hasProfessionalProfile && (
                    <div className="space-y-2 pl-4">
                      <Label htmlFor="edit-professionalPlan">Plan de profesional</Label>
                      <Select
                        value={currentUser.professionalPlan || "free"}
                        onValueChange={(value: "free" | "premium") =>
                          setCurrentUser({ ...currentUser, professionalPlan: value })
                        }
                      >
                        <SelectTrigger id="edit-professionalPlan">
                          <SelectValue placeholder="Seleccionar plan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="free">Free</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditUser}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para eliminar usuario */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Usuario</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar a este usuario? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="py-4">
              <p>
                Estás a punto de eliminar a <strong>{currentUser.name}</strong> ({currentUser.email}).
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para habilitar perfil */}
      <Dialog open={showEnableProfileDialog} onOpenChange={setShowEnableProfileDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Habilitar perfil de {profileToEnable === "client" ? "cliente" : "profesional"}</DialogTitle>
            <DialogDescription>
              Vas a habilitar el perfil de {profileToEnable === "client" ? "cliente" : "profesional"} para este usuario.
            </DialogDescription>
          </DialogHeader>
          {currentUser && (
            <div className="py-4">
              <p>
                Estás a punto de habilitar el perfil de {profileToEnable === "client" ? "cliente" : "profesional"} para{" "}
                <strong>{currentUser.name}</strong>.
              </p>
              <div className="mt-4">
                <p className="font-medium">Detalles:</p>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li>El perfil se creará con plan FREE.</li>
                  <li>El usuario podrá cambiar entre sus perfiles desde su cuenta.</li>
                  <li>Podrás cambiar el plan en cualquier momento.</li>
                </ul>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEnableProfileDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEnableProfile}>Habilitar perfil</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para cambiar plan */}
      <Dialog open={showChangePlanDialog} onOpenChange={setShowChangePlanDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Cambiar a plan {planToChange?.plan === "premium" ? "Premium" : "Free"} (
              {planToChange?.type === "client" ? "Cliente" : "Profesional"})
            </DialogTitle>
            <DialogDescription>
              Vas a cambiar el plan del perfil de {planToChange?.type === "client" ? "cliente" : "profesional"} para
              este usuario.
            </DialogDescription>
          </DialogHeader>
          {currentUser && planToChange && (
            <div className="py-4">
              <p>
                Estás a punto de cambiar el plan del perfil {planToChange.type} de <strong>{currentUser.name}</strong> a{" "}
                <strong>{planToChange.plan}</strong>.
              </p>
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
                <p className="font-medium flex items-center">
                  <ShieldIcon className="h-5 w-5 mr-2 text-amber-600" />
                  Información importante:
                </p>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li>Los planes de los perfiles de cliente y profesional son independientes.</li>
                  <li>El cambio de plan se aplica inmediatamente.</li>
                  <li>
                    {planToChange.plan === "premium"
                      ? "El plan Premium otorga acceso a todas las funcionalidades avanzadas."
                      : "Al cambiar a Free, el usuario perderá el acceso a las funcionalidades premium."}
                  </li>
                </ul>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowChangePlanDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleChangePlan}>Cambiar plan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
