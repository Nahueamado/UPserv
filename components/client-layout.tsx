"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MessageSquare, User, Search, Menu, X, LogOut, Settings, BookOpen, Crown } from "lucide-react"
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
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [isPremium, setIsPremium] = useState(false)
  const [userType, setUserType] = useState("")
  const [showPremiumDialog, setShowPremiumDialog] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

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
  }

  const switchProfile = () => {
    if (userType === "dual") {
      localStorage.setItem("userType", "professional")
      router.push("/professional")
    }
  }

  const handlePremiumFeature = () => {
    if (!isPremium) {
      setShowPremiumDialog(true)
    } else {
      router.push("/client/courses")
    }
  }

  const handleUpgradePlan = () => {
    setShowPremiumDialog(false)
    router.push("/professional/subscription")
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Link href="/client" className="flex items-center">
              <span className="text-xl font-bold">UPSERV</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="/client"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/client"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Home className="mr-2 h-4 w-4" />
              Inicio
            </Link>
            <Link
              href="/messages"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/messages"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Mensajes
            </Link>
            <Link
              href="/client/edit-profile"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/client/edit-profile"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <User className="mr-2 h-4 w-4" />
              Mi Perfil
            </Link>
            <Button
              onClick={handlePremiumFeature}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md relative ${
                pathname === "/client/courses"
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
              href="/search"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                pathname === "/search"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Search className="mr-2 h-4 w-4" />
              Buscar
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
                <DropdownMenuItem className="flex items-center" onClick={() => router.push("/client/edit-profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center" onClick={() => router.push("/messages")}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Mensajes
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center" onClick={() => router.push("/client/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </DropdownMenuItem>
                {userType === "dual" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={switchProfile}>Cambiar a perfil profesional</DropdownMenuItem>
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

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="container py-2 px-4 space-y-1">
              <Link
                href="/client"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  pathname === "/client"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="mr-2 h-4 w-4" />
                Inicio
              </Link>
              <Link
                href="/messages"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  pathname === "/messages"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Mensajes
              </Link>
              <Link
                href="/client/edit-profile"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  pathname === "/client/edit-profile"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="mr-2 h-4 w-4" />
                Mi Perfil
              </Link>
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  handlePremiumFeature()
                }}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full justify-start relative ${
                  pathname === "/client/courses"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                } ${!isPremium ? "opacity-70" : ""}`}
                variant="ghost"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Cursos
                <span className="absolute top-0 right-2 bg-red-500 text-white text-xs px-1 rounded-full">Nuevo</span>
                {!isPremium && <Crown className="ml-1 h-3 w-3 text-yellow-500" />}
              </Button>
              <Link
                href="/search"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  pathname === "/search"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Search className="mr-2 h-4 w-4" />
                Buscar
              </Link>
            </div>
          </div>
        )}
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
    </div>
  )
}
