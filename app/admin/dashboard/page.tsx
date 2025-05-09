"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Briefcase, MessageSquare, TrendingUp, DollarSign } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Última actualización: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Usuarios</p>
                <h3 className="text-2xl font-bold">1,248</h3>
                <p className="text-xs text-green-600">+12% este mes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-full">
                <Briefcase className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Profesionales</p>
                <h3 className="text-2xl font-bold">342</h3>
                <p className="text-xs text-green-600">+8% este mes</p>
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
                <p className="text-sm text-gray-500">Mensajes</p>
                <h3 className="text-2xl font-bold">5,782</h3>
                <p className="text-xs text-green-600">+24% este mes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-yellow-100 rounded-full">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Ingresos</p>
                <h3 className="text-2xl font-bold">$12,450</h3>
                <p className="text-xs text-green-600">+18% este mes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="analytics">Analíticas</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Actividad reciente</CardTitle>
              <CardDescription>Resumen de las últimas actividades en la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "Nuevo usuario registrado",
                    name: "María González",
                    time: "Hace 10 minutos",
                    type: "client",
                  },
                  {
                    action: "Nuevo profesional registrado",
                    name: "Carlos Rodríguez",
                    time: "Hace 25 minutos",
                    type: "professional",
                  },
                  {
                    action: "Suscripción premium",
                    name: "Laura Martínez",
                    time: "Hace 1 hora",
                    type: "professional",
                  },
                  {
                    action: "Reseña publicada",
                    name: "Juan Pérez",
                    time: "Hace 2 horas",
                    type: "client",
                  },
                  {
                    action: "Nuevo servicio añadido",
                    name: "Roberto Sánchez",
                    time: "Hace 3 horas",
                    type: "professional",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 pb-4 border-b last:border-0">
                    <div className={`p-2 rounded-full ${activity.type === "client" ? "bg-blue-100" : "bg-purple-100"}`}>
                      {activity.type === "client" ? (
                        <Users className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Briefcase className="h-4 w-4 text-purple-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.name}</p>
                    </div>
                    <div className="text-sm text-gray-500">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tendencias de crecimiento</CardTitle>
              <CardDescription>Análisis de crecimiento de usuarios y profesionales</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Gráfico de tendencias (simulado)</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reportes mensuales</CardTitle>
              <CardDescription>Resumen de reportes generados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Reporte de usuarios - Abril 2023", date: "01/05/2023" },
                  { name: "Reporte de ingresos - Abril 2023", date: "01/05/2023" },
                  { name: "Reporte de actividad - Abril 2023", date: "01/05/2023" },
                  { name: "Reporte de usuarios - Marzo 2023", date: "01/04/2023" },
                  { name: "Reporte de ingresos - Marzo 2023", date: "01/04/2023" },
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between pb-4 border-b last:border-0">
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-gray-500">Generado: {report.date}</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Descargar</button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
