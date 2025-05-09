"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthCheckProps {
  children: React.ReactNode
  requiredRole?: "client" | "professional" | "admin" | undefined
}

export default function AuthCheck({ children, requiredRole }: AuthCheckProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar autenticación
    const checkAuth = () => {
      // Primero verificar en sessionStorage
      let userSession = sessionStorage.getItem("userSession")

      // Si no hay sesión en sessionStorage, verificar en localStorage
      if (!userSession) {
        userSession = localStorage.getItem("userSession")
      }

      if (userSession) {
        const user = JSON.parse(userSession)

        // Verificar si el usuario está autenticado
        if (user.authenticated) {
          // Si se requiere un rol específico
          if (requiredRole) {
            // Verificar si el rol activo coincide con el requerido
            if (user.activeRole === requiredRole) {
              setIsAuthenticated(true)
            } else {
              // Si el usuario tiene el perfil requerido pero no está activo
              if (
                (requiredRole === "client" && user.hasClientProfile) ||
                (requiredRole === "professional" && user.hasProfessionalProfile) ||
                (requiredRole === "admin" && user.role === "admin")
              ) {
                // Actualizar el rol activo y redirigir
                const updatedUser = {
                  ...user,
                  activeRole: requiredRole,
                }

                if (user.rememberMe) {
                  localStorage.setItem("userSession", JSON.stringify(updatedUser))
                } else {
                  sessionStorage.setItem("userSession", JSON.stringify(updatedUser))
                }

                setIsAuthenticated(true)
              } else {
                // El usuario no tiene el perfil requerido
                router.replace("/auth")
              }
            }
          } else {
            // Si no se requiere un rol específico, solo verificar autenticación
            setIsAuthenticated(true)
          }
        } else {
          // Si no está autenticado, redirigir al login
          router.replace("/auth")
        }
      } else {
        // No hay sesión, redirigir al login
        if (requiredRole) {
          router.replace("/auth")
        }
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [router, requiredRole])

  // Si está cargando, mostrar nada
  if (isLoading) {
    return null
  }

  // Si requiere autenticación y no está autenticado, no mostrar nada (se redirigirá)
  if (requiredRole && !isAuthenticated) {
    return null
  }

  // Si todo está bien, mostrar los hijos
  return <>{children}</>
}
