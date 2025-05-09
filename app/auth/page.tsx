"use client"

import React, { useState } from "react"
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { FaGoogle, FaFacebook } from "react-icons/fa"
import { Loader2 } from "lucide-react"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("client")
  const [activeTab, setActiveTab] = useState("login")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert("Error al iniciar sesión: " + error.message)
      setIsLoading(false)
      return
    }

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role, is_premium")
      .eq("email", email)
      .single()

    if (userError || !userData) {
      alert("No se pudo obtener el rol del usuario")
      setIsLoading(false)
      return
    }

    localStorage.setItem("userType", userData.role)
    localStorage.setItem("userEmail", email)
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("isPremium", userData.is_premium ? "true" : "false")

    if (userData.role === "client") {
      router.push("/client")
    } else if (userData.role === "professional") {
      router.push("/professional")
    } else if (userData.role === "admin") {
      router.push("/admin/dashboard")
    } else {
      router.push("/")
    }

    setIsLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert("Error al registrar: " + error.message)
      setIsLoading(false)
      return
    }

    const { error: insertError } = await supabase.from("users").insert([
      {
        email,
        role,
        first_name: "",
        last_name: "",
        is_premium: false,
      },
    ])

    if (insertError) {
      alert("Error al guardar datos del usuario: " + insertError.message)
      setIsLoading(false)
      return
    }

    alert("Registro exitoso. Por favor, verifica tu correo y luego inicia sesión.")
    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">UPSERV</CardTitle>
          <CardDescription className="text-center">Inicia sesión o regístrate para continuar</CardDescription>
        </CardHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Contraseña</Label>
                    <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tipo de usuario</Label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="role"
                        value="client"
                        checked={role === "client"}
                        onChange={() => setRole("client")}
                      />
                      <span>Cliente</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="role"
                        value="professional"
                        checked={role === "professional"}
                        onChange={() => setRole("professional")}
                      />
                      <span>Profesional</span>
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cargando...
                    </>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </Button>
                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">O continúa con</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="w-full" type="button">
                    <FaGoogle className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                  <Button variant="outline" className="w-full" type="button">
                    <FaFacebook className="mr-2 h-4 w-4" />
                    Facebook
                  </Button>
                </div>
              </CardFooter>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input id="firstName" placeholder="Juan" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input id="lastName" placeholder="Pérez" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" type="email" placeholder="correo@ejemplo.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input id="password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                  <Input id="confirmPassword" type="password" required />
                </div>
                <div className="space-x-4">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="role" value="client" defaultChecked />
                    <span>Cliente</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="role" value="professional" />
                    <span>Profesional</span>
                  </label>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cargando...
                    </>
                  ) : (
                    "Crear cuenta"
                  )}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
