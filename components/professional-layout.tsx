"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Home, MessageSquare, User, Search, Menu, X, LogOut, Settings, BookOpen, Crown, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

export default function ProfessionalLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [isPremium, setIsPremium] = useState(false)
  const [userType, setUserType] = useState("")
  const [showPremiumDialog, setShowPremiumDialog] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showEnableClientDialog, setShowEnableClientDialog] = useState(false)
  const [showPremiumFeatureDialog, setShowPremiumFeatureDialog] = useState(false)

  useEffect(() => {
    // Verificar si el usuario está logueado
    const email = localStorage.getItem("userEmail") || ""
    const premium = localStorage.getItem("isPremium") === "true"
    const type = localStorage.getItem("userType") || ""

    setUserEmail(email)
    setIsPremium(premium)
    setUserType(type)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userType")
    localStorage.removeItem("isPremium")
    router.push("/")

    // Eliminar sesión
    sessionStorage.removeItem("userSession")
    localStorage.removeItem("userSession")

    // Redirigir al login
    router.push("/auth")
  }

  const switchProfile = () => {
    if (userType === "dual") {
      localStorage.setItem("userType", "client")
      router.push("/client")
    }
  }

  const handleUpgradePlan = () => {
    setShowPremiumDialog(false)
    router.push("/professional/subscription")
    setShowUpgradeDialog(true)
  }

  const handleWhatsAppRedirect = () => {
    window.open("https://wa.me/5493521536819", "_blank")
    setShowUpgradeDialog(false)
    setShowSuccessDialog(true)
    setShowPremiumFeatureDialog(false)
  }

  const handleSwitchToClient = () => {
    router.push("/client")
  }

  const handleEnableClientProfile = () => {
    setShowEnableClientDialog(false)
  }

  const handlePremiumFeature = () => {
    if (!isPremium) {
      setShowPremiumDialog(true)
    } else {
      router.push("/professional/courses")
    }
  }

  const handleCoursesClick = () => {
    if (isPremium) {
      router.push("/professional/courses")
    } else {
      setShowPremiumFeatureDialog(true)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Link href="/professional" className="flex items-center">
              <span className="text-xl font-bold">UPSERV</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="/professional"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/professional"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Home className="mr-2 h-4 w-4" />
              Inicio
            </Link>
            <Link
              href="/professional/messages"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/professional/messages"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Mensajes
            </Link>
            <Link
              href="/professional/edit-profile"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/professional/edit-profile"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <User className="mr-2 h-4 w-4" />
              Mi Perfil
            </Link>
            <Button
              onClick={handleCoursesClick}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md relative ${
                pathname === "/professional/courses"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              } ${!isPremium ? "opacity-70" : ""}`}
              variant="ghost"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Cursos
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">Nuevo</span>
              {!isPremium && <Crown className="ml-1 h-3 w-3 text-yellow-500" />}
            </Button>
            <Link
              href="/professional/statistics"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/professional/statistics"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <BarChart2 className="mr-2 h-4 w-4" />
              Estadísticas
            </Link>
            <Link
              href="/professional/settings"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/professional/settings"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Settings className="mr-2 h-4 w-4" />
              Configuración
            </Link>
          </nav>

          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt={userEmail} />
                    <AvatarFallback>{userEmail.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {isPremium && (
                    <span className="absolute -top-1 -right-1">
                      <Crown className="h-4 w-4 text-yellow-500" />
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuItem className="flex items-center" onClick={() => router.push("/professional/edit-profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center" onClick={() => router.push("/professional/messages")}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Mensajes
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center" onClick={() => router.push("/professional/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </DropdownMenuItem>
                {userType === "dual" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={switchProfile}>Cambiar a perfil cliente</DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center text-red-600" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Premium Feature Dialog */}
      <Dialog open={showPremiumDialog} onOpenChange={setShowPremiumDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Crown className="mr-2 h-5 w-5 text-yellow-500" />
              Función Premium
            </DialogTitle>
            <DialogDescription>Esta es una función premium. Para acceder, actualiza tu plan.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button variant="default" onClick={handleUpgradePlan}>
              Mejorar mi plan
            </Button>
            <Button variant="outline" onClick={() => setShowPremiumDialog(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upgrade Dialog */}
      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mejora tu experiencia con nuestro Plan Premium</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 p-4 text-sm">
            <p>$5.0 ARS</p>
            <p>Características premium: Todo lo incluido en el plan FREE</p>
            <p>Crear y vender cursos online</p>
            <p>Ver perfiles detallados de clientes</p>
            <p>Enviar archivos en el chat</p>
            <p>Portfolio ilimitado</p>
            <p>Posicionamiento destacado</p>
            <p>Para mejorar tu plan serás redirigido a nuestro WhatsApp de soporte</p>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button variant="default" onClick={handleWhatsAppRedirect}>
              Ir a WhatsApp
            </Button>
            <Button variant="outline" onClick={() => setShowUpgradeDialog(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¡Estás muy cerca!</DialogTitle>
          </DialogHeader>
          <div className="p-4 text-sm">
            Estás muy cerca de mejorar tu plan. En cuanto un representante de soporte te dé el OK ya podrás empezar a disfrutar de nuevas y mejores funciones!
          </div>
          <DialogFooter className="sm:justify-start">
            <Button variant="default" onClick={() => setShowSuccessDialog(false)}>
              Entendido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Enable Client Profile Dialog */}
      <Dialog open={showEnableClientDialog} onOpenChange={setShowEnableClientDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Habilitar perfil de cliente</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 p-4 text-sm">
            <p>Estás a punto de habilitar tu perfil de cliente, lo que te permitirá cambiar entre los roles de profesional y cliente. Al habilitar tu perfil de cliente:</p>
            <ul className="list-disc pl-5">
              <li>Podrás buscar otros profesionales para tus propias necesidades</li>
              <li>Tu perfil de cliente será creado con plan FREE inicialmente</li>
              <li>Podrás cambiar entre tus perfiles de profesional y cliente en cualquier momento</li>
            </ul>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button variant="default" onClick={handleEnableClientProfile}>
              Habilitar perfil de cliente
            </Button>
            <Button variant="outline" onClick={() => setShowEnableClientDialog(false)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Premium Feature Dialog (Courses) */}
      <Dialog open={showPremiumFeatureDialog} onOpenChange={setShowPremiumFeatureDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Función Premium</DialogTitle>
          </DialogHeader>
          <DialogDescription>Esta es una función premium. Para acceder, actualiza tu plan.</DialogDescription>
          <DialogFooter className="sm:justify-start">
            <Button variant="default" onClick={handleUpgradePlan}>
              Mejorar mi plan
            </Button>
            <Button variant="outline" onClick={() => setShowPremiumFeatureDialog(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
