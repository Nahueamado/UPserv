"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ArrowLeft, Star, Users, MessageSquare, Calendar } from "lucide-react"
import ProfessionalLayout from "@/components/professional-layout"

// Datos de ejemplo para las estadísticas
const visitData = [
  { name: "Ene", visits: 65 },
  { name: "Feb", visits: 59 },
  { name: "Mar", visits: 80 },
  { name: "Abr", visits: 81 },
  { name: "May", visits: 56 },
  { name: "Jun", visits: 55 },
  { name: "Jul", visits: 40 },
]

const ratingData = [
  { name: "5 estrellas", value: 42 },
  { name: "4 estrellas", value: 11 },
  { name: "3 estrellas", value: 2 },
  { name: "2 estrellas", value: 1 },
  { name: "1 estrella", value: 0 },
]

const COLORS = ["#4ade80", "#a3e635", "#facc15", "#fb923c", "#f87171"]

const performanceData = [
  { name: "Puntualidad", score: 95 },
  { name: "Calidad del trabajo", score: 92 },
  { name: "Comunicación", score: 88 },
  { name: "Relación calidad-precio", score: 90 },
  { name: "Profesionalismo", score: 94 },
]

const contactsData = [
  { name: "Ene", contacts: 12 },
  { name: "Feb", contacts: 19 },
  { name: "Mar", contacts: 15 },
  { name: "Abr", contacts: 21 },
  { name: "May", contacts: 18 },
  { name: "Jun", contacts: 24 },
  { name: "Jul", contacts: 20 },
]

export default function ProfessionalStatisticsPage() {
  const [period, setPeriod] = useState("month")

  return (
    <ProfessionalLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <Link href="/professional" className="text-sm text-gray-500 hover:text-gray-700 flex items-center mb-2">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver al dashboard
            </Link>
            <h1 className="text-3xl font-bold">Estadísticas detalladas</h1>
          </div>
          <div className="flex gap-2">
            <Button variant={period === "week" ? "default" : "outline"} size="sm" onClick={() => setPeriod("week")}>
              Semana
            </Button>
            <Button variant={period === "month" ? "default" : "outline"} size="sm" onClick={() => setPeriod("month")}>
              Mes
            </Button>
            <Button variant={period === "year" ? "default" : "outline"} size="sm" onClick={() => setPeriod("year")}>
              Año
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Visitas al perfil</p>
                  <h3 className="text-2xl font-bold">245</h3>
                  <p className="text-xs text-green-600">+12% este mes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-yellow-100 rounded-full">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Valoración media</p>
                  <h3 className="text-2xl font-bold">4.8</h3>
                  <p className="text-xs text-gray-500">56 reseñas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contactos</p>
                  <h3 className="text-2xl font-bold">32</h3>
                  <p className="text-xs text-green-600">+8% este mes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Trabajos completados</p>
                  <h3 className="text-2xl font-bold">48</h3>
                  <p className="text-xs text-green-600">+15% este mes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="ratings">Valoraciones</TabsTrigger>
            <TabsTrigger value="performance">Rendimiento</TabsTrigger>
            <TabsTrigger value="contacts">Contactos</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Visitas al perfil</CardTitle>
                  <CardDescription>Número de visitas a tu perfil en los últimos meses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={visitData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="visits" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribución de valoraciones</CardTitle>
                  <CardDescription>Desglose de tus valoraciones por número de estrellas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={ratingData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {ratingData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ratings">
            <Card>
              <CardHeader>
                <CardTitle>Análisis detallado de valoraciones</CardTitle>
                <CardDescription>Todas tus reseñas y valoraciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold mr-2">4.8</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={`h-5 w-5 ${star <= 4.8 ? "text-yellow-500" : "text-gray-300"}`} />
                        ))}
                      </div>
                    </div>
                    <span className="text-gray-500">Basado en 56 reseñas</span>
                  </div>

                  <div className="space-y-2">
                    {ratingData.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-32 text-sm">{item.name}</div>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-500"
                            style={{
                              width: `${(item.value / ratingData.reduce((acc, curr) => acc + curr.value, 0)) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <div className="w-10 text-right text-sm">{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6 mt-8">
                    <h3 className="text-lg font-medium">Reseñas recientes</h3>
                    {[
                      {
                        name: "Laura Gómez",
                        rating: 5,
                        comment: "Excelente trabajo, muy profesional y puntual.",
                        date: "15/04/2023",
                      },
                      {
                        name: "Martín Suárez",
                        rating: 4,
                        comment: "Buen servicio, resolvió el problema rápidamente.",
                        date: "02/03/2023",
                      },
                      {
                        name: "Ana Fernández",
                        rating: 5,
                        comment: "Muy recomendable, trabajo de calidad y precio justo.",
                        date: "18/01/2023",
                      },
                    ].map((review, index) => (
                      <div key={index} className="border-b pb-4 last:border-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{review.name}</h4>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Métricas de rendimiento</CardTitle>
                <CardDescription>Análisis de tu rendimiento en diferentes aspectos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={performanceData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" width={150} />
                      <Tooltip formatter={(value) => [`${value}%`, "Puntuación"]} />
                      <Legend />
                      <Bar dataKey="score" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4 mt-6">
                  <h3 className="text-lg font-medium">Desglose detallado</h3>
                  {performanceData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.name}</span>
                        <span className="font-medium">{item.score}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${item.score}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>Análisis de contactos</CardTitle>
                <CardDescription>Seguimiento de los contactos recibidos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={contactsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="contacts" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-6 mt-6">
                  <h3 className="text-lg font-medium">Contactos recientes</h3>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Laura Gómez",
                        message: "Hola, necesito un presupuesto para...",
                        time: "10:30",
                        date: "Hoy",
                      },
                      {
                        name: "Martín Suárez",
                        message: "Gracias por el trabajo realizado",
                        time: "15:45",
                        date: "Ayer",
                      },
                      {
                        name: "Ana Fernández",
                        message: "¿Podrías venir mañana a revisar...?",
                        time: "09:20",
                        date: "Ayer",
                      },
                      {
                        name: "Juan Pérez",
                        message: "¿Cuál es tu disponibilidad para...?",
                        time: "14:10",
                        date: "02/05/2023",
                      },
                    ].map((contact, index) => (
                      <div key={index} className="flex items-start gap-4 p-3 rounded-lg border">
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{contact.name}</h4>
                            <div className="text-xs text-gray-500">
                              {contact.date}, {contact.time}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{contact.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProfessionalLayout>
  )
}
