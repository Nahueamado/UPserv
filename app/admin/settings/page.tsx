"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Save, RefreshCw, Shield, Globe, Database, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function AdminSettingsPage() {
  // Estado para el modo mantenimiento
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [maintenanceMessage, setMaintenanceMessage] = useState(
    "Estamos realizando tareas de mantenimiento. Por favor, vuelve más tarde.",
  )
  const [estimatedTime, setEstimatedTime] = useState("1")
  const [showMaintenanceSuccess, setShowMaintenanceSuccess] = useState(false)

  // Estado para respaldos
  const [backupInProgress, setBackupInProgress] = useState(false)
  const [backupSuccess, setBackupSuccess] = useState(false)
  const [lastBackup, setLastBackup] = useState<string | null>(null)
  const [showBackupDialog, setShowBackupDialog] = useState(false)

  // Estado para configuración general
  const [siteName, setSiteName] = useState("UPserv")
  const [siteDescription, setSiteDescription] = useState(
    "Plataforma para conectar clientes con profesionales de diversos rubros",
  )
  const [contactEmail, setContactEmail] = useState("info@upserv.com")
  const [showGeneralSuccess, setShowGeneralSuccess] = useState(false)

  // Manejar cambio de modo mantenimiento
  const handleMaintenanceModeChange = () => {
    setMaintenanceMode(!maintenanceMode)
  }

  // Guardar configuración de mantenimiento
  const saveMaintenanceSettings = () => {
    // Aquí se guardaría la configuración en una base de datos real
    console.log("Guardando configuración de mantenimiento:", {
      enabled: maintenanceMode,
      message: maintenanceMessage,
      estimatedTime,
    })

    // Mostrar mensaje de éxito
    setShowMaintenanceSuccess(true)
    setTimeout(() => setShowMaintenanceSuccess(false), 3000)
  }

  // Iniciar respaldo
  const startBackup = () => {
    setBackupInProgress(true)
    setShowBackupDialog(false)

    // Simular proceso de respaldo
    setTimeout(() => {
      setBackupInProgress(false)
      setBackupSuccess(true)
      setLastBackup(new Date().toLocaleString())

      setTimeout(() => {
        setBackupSuccess(false)
      }, 3000)
    }, 3000)
  }

  // Guardar configuración general
  const saveGeneralSettings = () => {
    // Aquí se guardaría la configuración en una base de datos real
    console.log("Guardando configuración general:", {
      siteName,
      siteDescription,
      contactEmail,
    })

    // Mostrar mensaje de éxito
    setShowGeneralSuccess(true)
    setTimeout(() => setShowGeneralSuccess(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold">Configuración</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="maintenance">Mantenimiento</TabsTrigger>
          <TabsTrigger value="backups">Respaldos</TabsTrigger>
        </TabsList>

        {/* Configuración General */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>Configura los ajustes básicos del sitio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {showGeneralSuccess && (
                <Alert className="bg-green-50 text-green-800 border-green-200 mb-4">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Éxito</AlertTitle>
                  <AlertDescription>La configuración general se ha guardado correctamente.</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="site-name">Nombre del sitio</Label>
                <Input id="site-name" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="site-description">Descripción del sitio</Label>
                <Textarea
                  id="site-description"
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">Email de contacto</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveGeneralSettings}>
                <Save className="mr-2 h-4 w-4" />
                Guardar cambios
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO</CardTitle>
              <CardDescription>Configuración para motores de búsqueda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Título meta</Label>
                <Input id="meta-title" defaultValue="UPserv - Conecta con profesionales" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-description">Descripción meta</Label>
                <Textarea
                  id="meta-description"
                  defaultValue="Plataforma para conectar clientes con profesionales de diversos rubros"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Palabras clave</Label>
                <Input id="keywords" defaultValue="profesionales, servicios, electricistas, plomeros, gasistas" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Globe className="mr-2 h-4 w-4" />
                Actualizar SEO
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Configuración de Mantenimiento */}
        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Modo Mantenimiento</CardTitle>
              <CardDescription>Configura el modo mantenimiento del sitio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {showMaintenanceSuccess && (
                <Alert className="bg-green-50 text-green-800 border-green-200 mb-4">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Éxito</AlertTitle>
                  <AlertDescription>La configuración de mantenimiento se ha guardado correctamente.</AlertDescription>
                </Alert>
              )}

              {maintenanceMode && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Advertencia</AlertTitle>
                  <AlertDescription>
                    El modo mantenimiento está activado. El sitio no será accesible para los usuarios.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-mode">Activar modo mantenimiento</Label>
                  <p className="text-sm text-gray-500">
                    Cuando está activado, los usuarios verán una página de mantenimiento
                  </p>
                </div>
                <Switch id="maintenance-mode" checked={maintenanceMode} onCheckedChange={handleMaintenanceModeChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maintenance-message">Mensaje de mantenimiento</Label>
                <Textarea
                  id="maintenance-message"
                  value={maintenanceMessage}
                  onChange={(e) => setMaintenanceMessage(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimated-time">Tiempo estimado (horas)</Label>
                <Input
                  id="estimated-time"
                  type="number"
                  min="1"
                  value={estimatedTime}
                  onChange={(e) => setEstimatedTime(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveMaintenanceSettings}>
                <Shield className="mr-2 h-4 w-4" />
                Guardar configuración
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Configuración de Respaldos */}
        <TabsContent value="backups" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Respaldos del Sistema</CardTitle>
              <CardDescription>Gestiona los respaldos de la base de datos y archivos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {backupInProgress && (
                <Alert className="bg-blue-50 text-blue-800 border-blue-200 mb-4">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <AlertTitle>Respaldo en progreso</AlertTitle>
                  <AlertDescription>
                    Se está generando un respaldo completo del sistema. Esto puede tardar unos minutos.
                  </AlertDescription>
                </Alert>
              )}

              {backupSuccess && (
                <Alert className="bg-green-50 text-green-800 border-green-200 mb-4">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Respaldo completado</AlertTitle>
                  <AlertDescription>El respaldo se ha generado correctamente.</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">Respaldo completo</h3>
                    <p className="text-sm text-gray-500">Genera un respaldo completo de la base de datos y archivos</p>
                  </div>
                  <Button onClick={() => setShowBackupDialog(true)} disabled={backupInProgress}>
                    <Database className="mr-2 h-4 w-4" />
                    Generar respaldo
                  </Button>
                </div>

                {lastBackup && <div className="text-sm text-gray-500">Último respaldo: {lastBackup}</div>}

                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-2">Respaldos anteriores</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium">Respaldo completo</p>
                        <p className="text-sm text-gray-500">01/05/2023 10:30</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Descargar
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium">Respaldo completo</p>
                        <p className="text-sm text-gray-500">15/04/2023 14:45</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Descargar
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium">Respaldo completo</p>
                        <p className="text-sm text-gray-500">01/04/2023 09:15</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Descargar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Programación de respaldos</CardTitle>
              <CardDescription>Configura respaldos automáticos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Respaldos automáticos</Label>
                  <p className="text-sm text-gray-500">
                    Genera respaldos automáticamente según la frecuencia seleccionada
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backup-frequency">Frecuencia</Label>
                <select
                  id="backup-frequency"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="daily"
                >
                  <option value="hourly">Cada hora</option>
                  <option value="daily">Diario</option>
                  <option value="weekly">Semanal</option>
                  <option value="monthly">Mensual</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="retention-days">Días de retención</Label>
                <Input id="retention-days" type="number" min="1" defaultValue="30" />
                <p className="text-xs text-gray-500">Número de días que se conservarán los respaldos automáticos</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Guardar configuración
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Diálogo de confirmación de respaldo */}
      <Dialog open={showBackupDialog} onOpenChange={setShowBackupDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generar respaldo</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas generar un respaldo completo del sistema? Este proceso puede tardar varios
              minutos.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBackupDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={startBackup}>Generar respaldo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
