"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, SearchIcon, StarIcon, UsersIcon, ClockIcon, MapPinIcon, CrownIcon } from "lucide-react"
import ClientLayout from "@/components/client-layout"
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
    time: "tarde",
    description: "Aprende los fundamentos de las instalaciones eléctricas domésticas.",
    students: 24,
    rating: 4.8,
    category: "Electricidad",
    status: "activo",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Reparación de electrodomésticos",
    instructor: "Ana Martínez",
    type: "pago",
    modality: "presencial",
    date: new Date(2023, 6, 20),
    time: "mañana",
    description: "Curso práctico sobre reparación de electrodomésticos comunes.",
    students: 12,
    rating: 4.5,
    category: "Reparaciones",
    status: "activo",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Iluminación LED eficiente",
    instructor: "Miguel López",
    type: "pago",
    modality: "pregrabado",
    date: new Date(2023, 4, 10),
    time: "noche",
    description: "Aprende a diseñar sistemas de iluminación LED eficientes.",
    students: 18,
    rating: 4.2,
    category: "Electricidad",
    status: "finalizado",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "Fontanería básica",
    instructor: "Laura Sánchez",
    type: "gratuito",
    modality: "virtual",
    date: new Date(2023, 7, 5),
    time: "tarde",
    description: "Aprende los conceptos básicos de fontanería para el hogar.",
    students: 30,
    rating: 4.7,
    category: "Fontanería",
    status: "activo",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    name: "Pintura decorativa",
    instructor: "Roberto Gómez",
    type: "pago",
    modality: "presencial",
    date: new Date(2023, 8, 15),
    time: "mañana",
    description: "Aprende técnicas de pintura decorativa para interiores.",
    students: 15,
    rating: 4.6,
    category: "Decoración",
    status: "activo",
    image: "/placeholder.svg?height=200&width=300",
  },
]

// Datos de ejemplo para mis cursos
const myEnrolledCourses = [
  {
    id: 1,
    name: "Instalaciones eléctricas básicas",
    instructor: "Carlos Rodríguez",
    progress: 75,
    nextClass: new Date(2023, 5, 18),
    status: "activo",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Iluminación LED eficiente",
    instructor: "Miguel López",
    progress: 100,
    completionDate: new Date(2023, 4, 30),
    status: "finalizado",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function ClientCoursesPage() {
  const [activeTab, setActiveTab] = useState("mis-cursos")
  const [showCourseDetails, setShowCourseDetails] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [date, setDate] = useState<Date>()

  // Filtros de búsqueda
  const [searchFilters, setSearchFilters] = useState({
    query: "",
    category: "",
    price: "",
    modality: "",
    time: "",
    date: undefined as Date | undefined,
  })

  const handleFilterChange = (name: string, value: string | Date | undefined) => {
    setSearchFilters({ ...searchFilters, [name]: value })
  }

  const filteredCourses = exampleCourses.filter((course) => {
    // Filtrar por búsqueda
    if (
      searchFilters.query &&
      !course.name.toLowerCase().includes(searchFilters.query.toLowerCase()) &&
      !course.instructor.toLowerCase().includes(searchFilters.query.toLowerCase()) &&
      !course.description.toLowerCase().includes(searchFilters.query.toLowerCase())
    ) {
      return false
    }

    // Filtrar por categoría
    if (searchFilters.category && course.category !== searchFilters.category) {
      return false
    }

    // Filtrar por precio
    if (searchFilters.price && course.type !== searchFilters.price) {
      return false
    }

    // Filtrar por modalidad
    if (searchFilters.modality && course.modality !== searchFilters.modality) {
      return false
    }

    // Filtrar por horario
    if (searchFilters.time && course.time !== searchFilters.time) {
      return false
    }

    // Filtrar por fecha
    if (searchFilters.date && format(course.date, "yyyy-MM-dd") !== format(searchFilters.date, "yyyy-MM-dd")) {
      return false
    }

    return true
  })

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Cursos</h1>
        </div>

        <Tabs defaultValue="mis-cursos" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="mis-cursos">Mis cursos</TabsTrigger>
            <TabsTrigger value="buscar">Buscar cursos</TabsTrigger>
          </TabsList>

          <TabsContent value="mis-cursos">
            {myEnrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myEnrolledCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{course.name}</CardTitle>
                      <CardDescription>Instructor: {course.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Badge
                          variant="outline"
                          className={
                            course.status === "activo"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : course.status === "finalizado"
                                ? "bg-blue-100 text-blue-800 border-blue-200"
                                : "bg-red-100 text-red-800 border-red-200"
                          }
                        >
                          {course.status === "activo"
                            ? "En curso"
                            : course.status === "finalizado"
                              ? "Finalizado"
                              : "Cancelado"}
                        </Badge>

                        {course.status === "activo" ? (
                          <div className="space-y-2">
                            <p className="text-sm text-gray-500">Progreso</p>
                            <div className="flex items-center gap-2">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-purple-600 h-2 rounded-full"
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs">{course.progress}%</span>
                            </div>
                            <p className="text-sm text-gray-500">
                              Próxima clase: {format(course.nextClass, "dd/MM/yyyy", { locale: es })}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <p className="text-sm text-gray-500">
                              Completado el {format(course.completionDate, "dd/MM/yyyy", { locale: es })}
                            </p>
                            <div className="flex items-center gap-2">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-600 h-2 rounded-full" style={{ width: "100%" }}></div>
                              </div>
                              <span className="text-xs">100%</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        onClick={() => {
                          setSelectedCourse(course)
                          setShowCourseDetails(true)
                        }}
                      >
                        Ver detalles
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No estás inscrito en ningún curso</h3>
                <p className="text-gray-500 mb-6">Explora los cursos disponibles y comienza a aprender</p>
                <Button onClick={() => setActiveTab("buscar")}>Buscar cursos</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="buscar">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Filtros de búsqueda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="search">Buscar por nombre</Label>
                    <div className="relative">
                      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        id="search"
                        placeholder="Buscar cursos..."
                        className="pl-8"
                        value={searchFilters.query}
                        onChange={(e) => handleFilterChange("query", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category">Categoría</Label>
                    <Select
                      value={searchFilters.category}
                      onValueChange={(value) => handleFilterChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Todas las categorías" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas las categorías</SelectItem>
                        <SelectItem value="Electricidad">Electricidad</SelectItem>
                        <SelectItem value="Reparaciones">Reparaciones</SelectItem>
                        <SelectItem value="Fontanería">Fontanería</SelectItem>
                        <SelectItem value="Decoración">Decoración</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="price">Precio</Label>
                    <Select value={searchFilters.price} onValueChange={(value) => handleFilterChange("price", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos los precios" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los precios</SelectItem>
                        <SelectItem value="gratuito">Gratuito</SelectItem>
                        <SelectItem value="pago">Pago</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="modality">Modalidad</Label>
                    <Select
                      value={searchFilters.modality}
                      onValueChange={(value) => handleFilterChange("modality", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Todas las modalidades" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas las modalidades</SelectItem>
                        <SelectItem value="virtual">Virtual</SelectItem>
                        <SelectItem value="presencial">Presencial</SelectItem>
                        <SelectItem value="pregrabado">Pregrabado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="time">Horario</Label>
                    <Select value={searchFilters.time} onValueChange={(value) => handleFilterChange("time", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos los horarios" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los horarios</SelectItem>
                        <SelectItem value="mañana">Mañana</SelectItem>
                        <SelectItem value="tarde">Tarde</SelectItem>
                        <SelectItem value="noche">Noche</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Fecha</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {searchFilters.date ? (
                            format(searchFilters.date, "PPP", { locale: es })
                          ) : (
                            <span>Cualquier fecha</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={searchFilters.date}
                          onSelect={(date) => handleFilterChange("date", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={() =>
                      setSearchFilters({
                        query: "",
                        category: "",
                        price: "",
                        modality: "",
                        time: "",
                        date: undefined,
                      })
                    }
                  >
                    Limpiar filtros
                  </Button>
                  <div className="relative">
                    <Button className="flex items-center">
                      <span className="mr-2">Ordenar por precio</span>
                      <CrownIcon className="h-4 w-4 text-yellow-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
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
                        <CardDescription>Instructor: {course.instructor}</CardDescription>
                      </div>
                      <Badge variant={course.type === "gratuito" ? "outline" : "default"}>
                        {course.type === "gratuito" ? "Gratuito" : "Pago"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <UsersIcon className="h-3 w-3" />
                          {course.students} estudiantes
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <StarIcon className="h-3 w-3 text-yellow-500" />
                          {course.rating}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <ClockIcon className="h-3 w-3" />
                          {course.time}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {course.modality === "virtual"
                          ? "Online"
                          : course.modality === "presencial"
                            ? "Presencial"
                            : "Pregrabado"}
                      </div>
                      <div className="text-sm text-gray-500">
                        Fecha de inicio: {format(course.date, "dd/MM/yyyy", { locale: es })}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => {
                        setSelectedCourse(course)
                        setShowCourseDetails(true)
                      }}
                    >
                      Ver detalles
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No se encontraron cursos</h3>
                <p className="text-gray-500">Prueba con otros filtros de búsqueda</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Diálogo para ver detalles del curso */}
      <Dialog open={showCourseDetails} onOpenChange={setShowCourseDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedCourse?.name}</DialogTitle>
            <DialogDescription>
              {selectedCourse?.instructor && `Instructor: ${selectedCourse.instructor}`}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedCourse && (
              <div className="space-y-4">
                <div className="aspect-video w-full overflow-hidden rounded-md">
                  <img
                    src={selectedCourse.image || "/placeholder.svg"}
                    alt={selectedCourse.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant={selectedCourse.type === "gratuito" ? "outline" : "default"}>
                    {selectedCourse.type === "gratuito" ? "Gratuito" : "Pago"}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <UsersIcon className="h-3 w-3" />
                    {selectedCourse.students} estudiantes
                  </Badge>
                  {selectedCourse.rating && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <StarIcon className="h-3 w-3 text-yellow-500" />
                      {selectedCourse.rating}
                    </Badge>
                  )}
                </div>

                {selectedCourse.description && (
                  <div>
                    <h4 className="font-medium mb-1">Descripción</h4>
                    <p className="text-gray-600">{selectedCourse.description}</p>
                  </div>
                )}

                {selectedCourse.status === "activo" && selectedCourse.progress !== undefined && (
                  <div className="space-y-2">
                    <h4 className="font-medium mb-1">Progreso</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${selectedCourse.progress}%` }}
                        ></div>
                      </div>
                      <span>{selectedCourse.progress}%</span>
                    </div>
                  </div>
                )}

                {selectedCourse.modality && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-1">Modalidad</h4>
                      <p className="text-gray-600">
                        {selectedCourse.modality === "virtual"
                          ? "Virtual"
                          : selectedCourse.modality === "presencial"
                            ? "Presencial"
                            : "Pregrabado"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Horario</h4>
                      <p className="text-gray-600">{selectedCourse.time}</p>
                    </div>
                  </div>
                )}

                {selectedCourse.date && (
                  <div>
                    <h4 className="font-medium mb-1">Fecha de inicio</h4>
                    <p className="text-gray-600">{format(selectedCourse.date, "PPP", { locale: es })}</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCourseDetails(false)}>
              Cerrar
            </Button>
            {selectedCourse && !myEnrolledCourses.some((c) => c.id === selectedCourse.id) && (
              <Button>Inscribirse</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ClientLayout>
  )
}
