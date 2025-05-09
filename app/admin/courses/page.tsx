"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { PlusIcon, MoreHorizontalIcon, EditIcon, TrashIcon, EyeIcon, CheckIcon, XIcon, UsersIcon } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import { Badge } from "@/components/ui/badge"

// Datos de ejemplo para los cursos
const exampleCourses = [
  {
    id: 1,
    name: "Instalaciones eléctricas básicas",
    instructor: "Carlos Rodríguez",
    type: "gratuito",
    modality: "virtual",
    date: new Date(2023, 5, 15),
    students: 24,
    status: "activo",
  },
  {
    id: 2,
    name: "Reparación de electrodomésticos",
    instructor: "Ana Martínez",
    type: "pago",
    modality: "presencial",
    date: new Date(2023, 6, 20),
    students: 12,
    status: "activo",
  },
  {
    id: 3,
    name: "Iluminación LED eficiente",
    instructor: "Miguel López",
    type: "pago",
    modality: "pregrabado",
    date: new Date(2023, 4, 10),
    students: 18,
    status: "finalizado",
  },
  {
    id: 4,
    name: "Fontanería básica",
    instructor: "Laura Sánchez",
    type: "gratuito",
    modality: "virtual",
    date: new Date(2023, 7, 5),
    students: 30,
    status: "activo",
  },
  {
    id: 5,
    name: "Pintura decorativa",
    instructor: "Roberto Gómez",
    type: "pago",
    modality: "presencial",
    date: new Date(2023, 8, 15),
    students: 15,
    status: "pendiente",
  },
]

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState(exampleCourses)
  const [activeTab, setActiveTab] = useState("todos")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showStudentsDialog, setShowStudentsDialog] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Datos de ejemplo para estudiantes
  const exampleStudents = [
    { id: 1, name: "Ana García", email: "ana@ejemplo.com", date: "10/05/2023", status: "activo" },
    { id: 2, name: "Luis Martínez", email: "luis@ejemplo.com", date: "12/05/2023", status: "activo" },
    { id: 3, name: "María López", email: "maria@ejemplo.com", date: "15/05/2023", status: "inactivo" },
    { id: 4, name: "Carlos Rodríguez", email: "carlos@ejemplo.com", date: "18/05/2023", status: "activo" },
  ]

  // Filtrar cursos según la pestaña activa
  const filteredCourses = courses.filter((course) => {
    // Filtrar por búsqueda
    if (
      searchQuery &&
      !course.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filtrar por estado
    if (activeTab !== "todos" && course.status !== activeTab) {
      return false
    }

    return true
  })

  const handleDeleteCourse = () => {
    if (selectedCourse) {
      setCourses(courses.filter((course) => course.id !== selectedCourse.id))
      setShowDeleteDialog(false)
      setSelectedCourse(null)
    }
  }

  const handleToggleCourseStatus = (courseId: number, newStatus: string) => {
    setCourses(courses.map((course) => (course.id === courseId ? { ...course, status: newStatus } : course)))
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Administración de Cursos</h1>
          <Button onClick={() => setShowCreateDialog(true)}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Crear curso de prueba
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Buscar cursos</Label>
                <Input
                  id="search"
                  placeholder="Buscar por nombre o instructor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full md:w-[200px]">
                <Label htmlFor="status-filter">Filtrar por estado</Label>
                <Select value={activeTab} onValueChange={setActiveTab}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los estados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los estados</SelectItem>
                    <SelectItem value="activo">Activos</SelectItem>
                    <SelectItem value="pendiente">Pendientes</SelectItem>
                    <SelectItem value="finalizado">Finalizados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Listado de cursos</CardTitle>
            <CardDescription>{filteredCourses.length} cursos encontrados</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Modalidad</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estudiantes</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.name}</TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>
                      <Badge variant={course.type === "gratuito" ? "outline" : "default"}>
                        {course.type === "gratuito" ? "Gratuito" : "Pago"}
                      </Badge>
                    </TableCell>
                    <TableCell>{course.modality}</TableCell>
                    <TableCell>{format(course.date, "dd/MM/yyyy", { locale: es })}</TableCell>
                    <TableCell>{course.students}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          course.status === "activo"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : course.status === "pendiente"
                              ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                              : "bg-gray-100 text-gray-800 border-gray-200"
                        }
                      >
                        {course.status === "activo"
                          ? "Activo"
                          : course.status === "pendiente"
                            ? "Pendiente"
                            : "Finalizado"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
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
                          {course.status === "pendiente" ? (
                            <DropdownMenuItem onClick={() => handleToggleCourseStatus(course.id, "activo")}>
                              <CheckIcon className="h-4 w-4 mr-2" />
                              Aprobar curso
                            </DropdownMenuItem>
                          ) : course.status === "activo" ? (
                            <DropdownMenuItem onClick={() => handleToggleCourseStatus(course.id, "finalizado")}>
                              <XIcon className="h-4 w-4 mr-2" />
                              Finalizar curso
                            </DropdownMenuItem>
                          ) : null}
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No se encontraron cursos</h3>
                <p className="text-gray-500">Prueba con otros filtros de búsqueda</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

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
                  <TableHead>Fecha inscripción</TableHead>
                  <TableHead>Estado</TableHead>
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
                      <Badge
                        variant={student.status === "activo" ? "outline" : "secondary"}
                        className={student.status === "activo" ? "bg-green-100 text-green-800 border-green-200" : ""}
                      >
                        {student.status === "activo" ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <EyeIcon className="h-4 w-4 mr-2" />
                            Ver perfil
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {student.status === "activo" ? (
                              <>
                                <XIcon className="h-4 w-4 mr-2" />
                                Deshabilitar acceso
                              </>
                            ) : (
                              <>
                                <CheckIcon className="h-4 w-4 mr-2" />
                                Habilitar acceso
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <TrashIcon className="h-4 w-4 mr-2" />
                            Eliminar del curso
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

      {/* Diálogo para crear curso de prueba */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Crear curso de prueba</DialogTitle>
            <DialogDescription>Completa la información para crear un curso de prueba</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="name">Nombre del curso</Label>
              <Input id="name" placeholder="Nombre del curso" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Tipo</Label>
                <Select defaultValue="gratuito">
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
                <Select defaultValue="virtual">
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setShowCreateDialog(false)}>Crear curso</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
