"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import {
  CalendarIcon,
  MoreHorizontalIcon,
  PlusIcon,
  FileIcon,
  ImageIcon,
  UsersIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
} from "lucide-react"
import ProfessionalLayout from "@/components/professional-layout"
import { Badge } from "@/components/ui/badge"

// Datos de ejemplo para los cursos
const exampleCourses = [
  {
    id: 1,
    name: "Instalaciones eléctricas básicas",
    type: "gratuito",
    modality: "virtual",
    date: new Date(2023, 5, 15),
    time: "tarde",
    description: "Aprende los fundamentos de las instalaciones eléctricas domésticas.",
    students: 24,
    status: "activo",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Reparación de electrodomésticos",
    type: "pago",
    modality: "presencial",
    date: new Date(2023, 6, 20),
    time: "mañana",
    description: "Curso práctico sobre reparación de electrodomésticos comunes.",
    students: 12,
    status: "activo",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Iluminación LED eficiente",
    type: "pago",
    modality: "pregrabado",
    date: new Date(2023, 4, 10),
    time: "noche",
    description: "Aprende a diseñar sistemas de iluminación LED eficientes.",
    students: 18,
    status: "finalizado",
    image: "/placeholder.svg?height=200&width=300",
  },
]

// Datos de ejemplo para estudiantes
const exampleStudents = [
  { id: 1, name: "Ana García", email: "ana@ejemplo.com", date: "10/05/2023", progress: 75 },
  { id: 2, name: "Luis Martínez", email: "luis@ejemplo.com", date: "12/05/2023", progress: 50 },
  { id: 3, name: "María López", email: "maria@ejemplo.com", date: "15/05/2023", progress: 90 },
  { id: 4, name: "Carlos Rodríguez", email: "carlos@ejemplo.com", date: "18/05/2023", progress: 30 },
]

export default function ProfessionalCoursesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("mis-cursos")
  const [courses, setCourses] = useState(exampleCourses)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showStudentsDialog, setShowStudentsDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [date, setDate] = useState<Date>()
  const [fileInputRef, setFileInputRef] = useState<HTMLInputElement | null>(null)
  const [imageInputRef, setImageInputRef] = useState<HTMLInputElement | null>(null)
  const [showPremiumFeatureDialog, setShowPremiumFeatureDialog] = useState(false)
  const [userInfo, setUserInfo] = useState<any>(null)

  // Formulario para crear curso
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "gratuito",
    modality: "virtual",
    date: new Date(),
    time: "mañana",
    description: "",
    image: "/placeholder.svg?height=200&width=300",
    files: [] as File[],
    images: [] as File[],
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "files" | "images") => {
    if (!e.target.files) return
    const newFiles = Array.from(e.target.files)
    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], ...newFiles],
    }))
  }

  useEffect(() => {
    const getUserInfo = () => {
      let userSession = sessionStorage.getItem("userSession")
      if (!userSession) {
        userSession = localStorage.getItem("userSession")
      }
      if (userSession) {
        setUserInfo(JSON.parse(userSession))
      }
    }
    getUserInfo()
  }, [])

  const isPremiumFunc = () => {
    if (!userInfo) return false
    if (userInfo.activeRole === "professional") {
      return userInfo.professionalPlan === "premium"
    }
    return false
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDate(date)
      setFormData({ ...formData, date })
    }
  }

  const handleCreateCourse = () => {
    const newCourse = {
      id: courses.length + 1,
      ...formData,
      students: 0,
      status: "activo",
    }
    setCourses([...courses, newCourse])
    setShowCreateDialog(false)
    setFormData({
      name: "",
      price: "",
      type: "gratuito",
      modality: "virtual",
      date: new Date(),
      time: "mañana",
      description: "",
      image: "/placeholder.svg?height=200&width=300",
      files: [],
      images: [],
    })
  }

  const handleDeleteCourse = () => {
    if (selectedCourse) {
      setCourses(courses.filter((course) => course.id !== selectedCourse.id))
      setShowDeleteDialog(false)
      setSelectedCourse(null)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Archivo cargado:", e.target.files?.[0]?.name)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Imagen cargada:", e.target.files?.[0]?.name)
  }

  useEffect(() => {
    if (!isPremiumFunc()) {
      setShowPremiumFeatureDialog(true)
    }
  }, [userInfo])

  return (
    <ProfessionalLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Cursos</h1>
        </div>

        <Tabs defaultValue="mis-cursos" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="mis-cursos">Mis cursos</TabsTrigger>
            <TabsTrigger value="analiticas">Analíticas</TabsTrigger>
            <TabsTrigger value="gestion">Gestión de usuarios</TabsTrigger>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="w-full">
                  Crear curso
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 p-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nombre del curso</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ej: Instalaciones eléctricas básicas"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Precio</Label>
                      <Select value={formData.price} onValueChange={(value) => handleSelectChange("price", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un precio" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gratuito">Gratuito</SelectItem>
                          <SelectItem value="pago">Pago</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="modality">Modalidad</Label>
                      <Select value={formData.modality} onValueChange={(value) => handleSelectChange("modality", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una modalidad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="virtual">Virtual</SelectItem>
                          <SelectItem value="presencial">Presencial</SelectItem>
                          <SelectItem value="pregrabado">Pregrabado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Fecha</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label htmlFor="time">Horario</Label>
                      <Select value={formData.time} onValueChange={(value) => handleSelectChange("time", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un horario" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mañana">Mañana</SelectItem>
                          <SelectItem value="tarde">Tarde</SelectItem>
                          <SelectItem value="noche">Noche</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Descripción del curso"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="files">Archivos</Label>
                    <Input
                      id="files"
                      type="file"
                      multiple
                      onChange={(e) => handleFileChange(e, "files")}
                    />
                  </div>

                  <div>
                    <Label htmlFor="images">Imágenes</Label>
                    <Input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "images")}
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleCreateCourse}>Crear curso</Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </TabsList>

          <TabsContent value="mis-cursos">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{course.name}</CardTitle>
                        <CardDescription>
                          {course.modality} • {format(course.date, "dd/MM/yyyy", { locale: es })} • {course.time}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedCourse(course)
                              setShowStudentsDialog(true)
                            }}
                          >
                            <UsersIcon className="h-4 w-4 mr-2" />
                            Ver estudiantes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <EditIcon className="h-4 w-4 mr-2" />
                            Editar curso
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              setSelectedCourse(course)
                              setShowDeleteDialog(true)
                            }}
                          >
                            <TrashIcon className="h-4 w-4 mr-2" />
                            Eliminar curso
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Badge variant={course.type === "gratuito" ? "outline" : "default"}>
                        {course.type === "gratuito" ? "Gratuito" : "Pago"}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          course.status === "activo"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : course.status === "finalizado"
                            ? "bg-gray-100 text-gray-800 border-gray-200"
                            : "bg-red-100 text-red-800 border-red-200"
                        }
                      >
                        {course.status === "activo"
                          ? "Activo"
                          : course.status === "finalizado"
                          ? "Finalizado"
                          : "Cancelado"}
                      </Badge>
                      <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <UsersIcon className="h-4 w-4 mr-1" />
                      {course.students} estudiantes
                    </div>
                    <Button variant="outline" size="sm">
                      Ver detalles
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analiticas">
            <Card>
              <CardHeader>
                <CardTitle>Analíticas de cursos</CardTitle>
                <CardDescription>Estadísticas de participación y rendimiento de tus cursos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Participación por curso</h3>
                    <div className="space-y-4">
                      {courses.map((course) => (
                        <div key={course.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{course.name}</span>
                            <span>{course.students} estudiantes</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full"
                              style={{ width: `${Math.min(course.students * 3, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Estadísticas generales</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-gray-500">Total de estudiantes</p>
                            <h3 className="text-3xl font-bold">
                              {courses.reduce((total, course) => total + course.students, 0)}
                            </h3>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-gray-500">Cursos activos</p>
                            <h3 className="text-3xl font-bold">
                              {courses.filter((course) => course.status === "activo").length}
                            </h3>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-gray-500">Tasa de finalización</p>
                            <h3 className="text-3xl font-bold">78%</h3>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gestion">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de usuarios</CardTitle>
                <CardDescription>Administra los usuarios registrados en tus cursos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label>Seleccionar curso</Label>
                    <Select defaultValue="1">
                      <SelectTrigger className="w-full md:w-[300px]">
                        <SelectValue placeholder="Selecciona un curso" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id.toString()}>
                            {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Fecha de inscripción</TableHead>
                        <TableHead>Progreso</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {exampleStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.date}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-purple-600 h-2 rounded-full"
                                  style={{ width: `${student.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs">{student.progress}%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Diálogo para crear curso */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Crear nuevo curso</DialogTitle>
            <DialogDescription>Completa la información para crear un nuevo curso</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name">Nombre del curso</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ej: Instalaciones eléctricas básicas"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Tipo</Label>
                  <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gratuito">Gratuito</SelectItem>
                      <SelectItem value="pago">Pago</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="modality">Modalidad</Label>
                  <Select value={formData.modality} onValueChange={(value) => handleSelectChange("modality", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una modalidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="virtual">Virtual</SelectItem>
                      <SelectItem value="presencial">Presencial</SelectItem>
                      <SelectItem value="pregrabado">Pregrabado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Fecha</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateCourse}>Crear curso</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para ver estudiantes */}
      <Dialog open={showStudentsDialog} onOpenChange={setShowStudentsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Estudiantes inscritos</DialogTitle>
            <DialogDescription>{selectedCourse && `Curso: ${selectedCourse.name}`}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Fecha de inscripción</TableHead>
                  <TableHead>Progreso</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exampleStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs">{student.progress}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowStudentsDialog(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para confirmar eliminación */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar este curso? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteCourse}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para función premium */}
      <Dialog open={showPremiumFeatureDialog} onOpenChange={setShowPremiumFeatureDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Función Premium</DialogTitle>
          </DialogHeader>
          <DialogDescription>Esta es una función premium. Para acceder, actualiza tu plan.</DialogDescription>
          <DialogFooter>
            {/* Botón deshabilitado temporalmente para evitar error */}
            <Button variant="default" disabled>
              Mejorar mi plan
            </Button>
            <Button variant="outline" onClick={() => setShowPremiumFeatureDialog(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ProfessionalLayout>
  )
}
