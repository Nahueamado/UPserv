"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Database, Download, RefreshCw, CheckCircle, FileText, HardDrive, Upload, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Datos de ejemplo para los respaldos
const backupsList = [
  {
    id: 1,
    name: "Respaldo completo",
    date: "2023-05-01T10:30:00",
    size: "256 MB",
    type: "full",
    status: "completed",
  },
  {
    id: 2,
    name: "Respaldo de base de datos",
    date: "2023-04-28T14:45:00",
    size: "128 MB",
    type: "database",
    status: "completed",
  },
  {
    id: 3,
    name: "Respaldo de archivos",
    date: "2023-04-25T09:15:00",
    size: "156 MB",
    type: "files",
    status: "completed",
  },
  {
    id: 4,
    name: "Respaldo completo",
    date: "2023-04-20T11:20:00",
    size: "245 MB",
    type: "full",
    status: "completed",
  },
  {
    id: 5,
    name: "Respaldo de base de datos",
    date: "2023-04-15T16:30:00",
    size: "120 MB",
    type: "database",
    status: "completed",
  },
]

// Función para formatear la fecha
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export default function AdminBackupsPage() {
  const [backups, setBackups] = useState(backupsList)
  const [backupInProgress, setBackupInProgress] = useState(false)
  const [backupSuccess, setBackupSuccess] = useState(false)
  const [backupError, setBackupError] = useState(false)
  const [backupProgress, setBackupProgress] = useState(0)
  const [showBackupDialog, setShowBackupDialog] = useState(false)
  const [backupType, setBackupType] = useState<"full" | "database" | "files">("full")
  const [showRestoreDialog, setShowRestoreDialog] = useState(false)
  const [selectedBackup, setSelectedBackup] = useState<any>(null)
  const [restoreInProgress, setRestoreInProgress] = useState(false)
  const [restoreSuccess, setRestoreSuccess] = useState(false)
  const [restoreError, setRestoreError] = useState(false)
  const [restoreProgress, setRestoreProgress] = useState(0)

  // Iniciar respaldo
  const startBackup = () => {
    setBackupInProgress(true)
    setBackupProgress(0)
    setBackupSuccess(false)
    setBackupError(false)
    setShowBackupDialog(false)

    // Simular progreso
    const interval = setInterval(() => {
      setBackupProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 500)

    // Simular finalización
    setTimeout(() => {
      clearInterval(interval)
      setBackupInProgress(false)
      setBackupProgress(100)

      // Simular éxito o error (90% de probabilidad de éxito)
      if (Math.random() > 0.1) {
        setBackupSuccess(true)

        // Añadir nuevo respaldo a la lista
        const newBackup = {
          id: backups.length + 1,
          name:
            backupType === "full"
              ? "Respaldo completo"
              : backupType === "database"
                ? "Respaldo de base de datos"
                : "Respaldo de archivos",
          date: new Date().toISOString(),
          size: `${Math.floor(Math.random() * 200) + 100} MB`,
          type: backupType,
          status: "completed",
        }

        setBackups([newBackup, ...backups])

        setTimeout(() => {
          setBackupSuccess(false)
        }, 3000)
      } else {
        setBackupError(true)

        setTimeout(() => {
          setBackupError(false)
        }, 3000)
      }
    }, 5000)
  }

  // Iniciar restauración
  const startRestore = () => {
    setRestoreInProgress(true)
    setRestoreProgress(0)
    setRestoreSuccess(false)
    setRestoreError(false)
    setShowRestoreDialog(false)

    // Simular progreso
    const interval = setInterval(() => {
      setRestoreProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 300)

    // Simular finalización
    setTimeout(() => {
      clearInterval(interval)
      setRestoreInProgress(false)
      setRestoreProgress(100)

      // Simular éxito o error (90% de probabilidad de éxito)
      if (Math.random() > 0.1) {
        setRestoreSuccess(true)

        setTimeout(() => {
          setRestoreSuccess(false)
        }, 3000)
      } else {
        setRestoreError(true)

        setTimeout(() => {
          setRestoreError(false)
        }, 3000)
      }
    }, 6000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold">Respaldos del Sistema</h1>
        <Button onClick={() => setShowBackupDialog(true)} disabled={backupInProgress}>
          <Database className="mr-2 h-4 w-4" />
          Nuevo respaldo
        </Button>
      </div>

      {/* Alertas */}
      {backupInProgress && (
        <Alert className="bg-blue-50 text-blue-800 border-blue-200">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <AlertTitle>Respaldo en progreso</AlertTitle>
          <AlertDescription>
            <div className="mt-2">
              <Progress value={backupProgress} className="h-2" />
              <p className="text-xs mt-1">{backupProgress}% completado</p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {backupSuccess && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Respaldo completado</AlertTitle>
          <AlertDescription>El respaldo se ha generado correctamente.</AlertDescription>
        </Alert>
      )}

      {backupError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Ha ocurrido un error al generar el respaldo. Por favor, inténtalo de nuevo.
          </AlertDescription>
        </Alert>
      )}

      {restoreInProgress && (
        <Alert className="bg-blue-50 text-blue-800 border-blue-200">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <AlertTitle>Restauración en progreso</AlertTitle>
          <AlertDescription>
            <div className="mt-2">
              <Progress value={restoreProgress} className="h-2" />
              <p className="text-xs mt-1">{restoreProgress}% completado</p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {restoreSuccess && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Restauración completada</AlertTitle>
          <AlertDescription>El sistema se ha restaurado correctamente.</AlertDescription>
        </Alert>
      )}

      {restoreError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Ha ocurrido un error al restaurar el sistema. Por favor, inténtalo de nuevo.
          </AlertDescription>
        </Alert>
      )}

      {/* Información del sistema */}
      <Card>
        <CardHeader>
          <CardTitle>Información del sistema</CardTitle>
          <CardDescription>Estadísticas y detalles del sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <HardDrive className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Espacio total</p>
                <h3 className="text-xl font-bold">10 GB</h3>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-full">
                <Database className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Base de datos</p>
                <h3 className="text-xl font-bold">2.5 GB</h3>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-full">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Archivos</p>
                <h3 className="text-xl font-bold">5.8 GB</h3>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Uso de almacenamiento</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "83%" }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">8.3 GB de 10 GB utilizados (83%)</p>
          </div>
        </CardContent>
      </Card>

      {/* Lista de respaldos */}
      <Card>
        <CardHeader>
          <CardTitle>Respaldos disponibles</CardTitle>
          <CardDescription>Historial de respaldos del sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Tamaño</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {backups.map((backup) => (
                <TableRow key={backup.id}>
                  <TableCell className="font-medium">{backup.name}</TableCell>
                  <TableCell>{formatDate(backup.date)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {backup.type === "full" ? "Completo" : backup.type === "database" ? "Base de datos" : "Archivos"}
                    </Badge>
                  </TableCell>
                  <TableCell>{backup.size}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedBackup(backup)
                          setShowRestoreDialog(true)
                        }}
                        disabled={restoreInProgress}
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Restaurar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Descargar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Diálogo de nuevo respaldo */}
      <Dialog open={showBackupDialog} onOpenChange={setShowBackupDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuevo respaldo</DialogTitle>
            <DialogDescription>Selecciona el tipo de respaldo que deseas generar</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div
              className={`p-4 rounded-lg border cursor-pointer ${backupType === "full" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-200"}`}
              onClick={() => setBackupType("full")}
            >
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-full mr-3">
                  <Database className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Respaldo completo</h3>
                  <p className="text-sm text-gray-500">Base de datos y archivos</p>
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-lg border cursor-pointer ${backupType === "database" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-200"}`}
              onClick={() => setBackupType("database")}
            >
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-full mr-3">
                  <Database className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Respaldo de base de datos</h3>
                  <p className="text-sm text-gray-500">Solo datos de la base de datos</p>
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-lg border cursor-pointer ${backupType === "files" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-200"}`}
              onClick={() => setBackupType("files")}
            >
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-full mr-3">
                  <FileText className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">Respaldo de archivos</h3>
                  <p className="text-sm text-gray-500">Solo archivos del sistema</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBackupDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={startBackup}>Generar respaldo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de restauración */}
      <Dialog open={showRestoreDialog} onOpenChange={setShowRestoreDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restaurar sistema</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas restaurar el sistema a partir de este respaldo?
            </DialogDescription>
          </DialogHeader>
          {selectedBackup && (
            <div className="py-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-yellow-800">Advertencia</h3>
                    <p className="text-sm text-yellow-700">
                      Esta acción reemplazará todos los datos actuales con los del respaldo seleccionado. Este proceso
                      no se puede deshacer.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Nombre:</span>
                  <span>{selectedBackup.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Fecha:</span>
                  <span>{formatDate(selectedBackup.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Tipo:</span>
                  <span>
                    {selectedBackup.type === "full"
                      ? "Completo"
                      : selectedBackup.type === "database"
                        ? "Base de datos"
                        : "Archivos"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Tamaño:</span>
                  <span>{selectedBackup.size}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRestoreDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={startRestore}>
              Restaurar sistema
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
