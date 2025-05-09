"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Phone } from "lucide-react"

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(true)
  const [hasBeenClosed, setHasBeenClosed] = useState(false)

  useEffect(() => {
    // Verificar si el usuario ya cerró el botón anteriormente
    const closed = localStorage.getItem("whatsappButtonClosed")
    if (closed === "true") {
      setIsVisible(false)
      setHasBeenClosed(true)
    }
  }, [])

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsVisible(false)
    localStorage.setItem("whatsappButtonClosed", "true")
    setHasBeenClosed(true)
  }

  const handleClick = () => {
    window.open("https://wa.me/5493521536819", "_blank")
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <button
        onClick={handleClick}
        className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 group"
      >
        <Phone className="h-6 w-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out">
          Contactar
        </span>
      </button>
      <button
        onClick={handleClose}
        className="mt-2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow-md"
        aria-label="Cerrar botón de WhatsApp"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
