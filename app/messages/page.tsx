"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { SearchIcon, SendIcon } from "lucide-react"
import ClientLayout from "@/components/client-layout"
import AuthCheck from "@/components/auth-check"

// Datos de ejemplo para los chats
const initialChats = [
  {
    id: 1,
    professional: {
      id: 1,
      name: "Carlos Rodríguez",
      profession: "Electricista",
      image: "/placeholder.svg?height=100&width=100",
    },
    lastMessage: "Hola, ¿en qué puedo ayudarte?",
    time: "10:30",
    unread: true,
  },
  {
    id: 2,
    professional: {
      id: 2,
      name: "Laura Gómez",
      profession: "Plomera",
      image: "/placeholder.svg?height=100&width=100",
    },
    lastMessage: "Puedo pasar mañana a revisar la instalación",
    time: "Ayer",
    unread: false,
  },
  {
    id: 3,
    professional: {
      id: 3,
      name: "Martín Suárez",
      profession: "Técnico en computación",
      image: "/placeholder.svg?height=100&width=100",
    },
    lastMessage: "Ya resolví el problema con tu router",
    time: "Ayer",
    unread: false,
  },
  {
    id: 4,
    professional: {
      id: 5,
      name: "Roberto Pérez",
      profession: "Gasista",
      image: "/placeholder.svg?height=100&width=100",
    },
    lastMessage: "Necesito más detalles sobre el problema",
    time: "Lun",
    unread: false,
  },
  {
    id: 5,
    professional: {
      id: 6,
      name: "Lucía Martínez",
      profession: "Peluquera",
      image: "/placeholder.svg?height=100&width=100",
    },
    lastMessage: "¿Te gustaría agendar para el próximo sábado?",
    time: "Dom",
    unread: true,
  },
]

// Datos de ejemplo para los mensajes
const chatMessages = {
  1: [
    { id: 1, sender: "professional", text: "Hola, ¿en qué puedo ayudarte?", time: "10:30" },
    {
      id: 2,
      sender: "user",
      text: "Hola Carlos, necesito un presupuesto para instalar luces en mi jardín",
      time: "10:32",
    },
    {
      id: 3,
      sender: "professional",
      text: "Claro, puedo ayudarte con eso. ¿Cuántas luces necesitas instalar aproximadamente?",
      time: "10:33",
    },
    { id: 4, sender: "user", text: "Serían unas 6 luces para iluminar el camino principal", time: "10:35" },
    {
      id: 5,
      sender: "professional",
      text: "Perfecto. ¿Tienes alguna preferencia en cuanto al tipo de luces? ¿LED, solares, etc?",
      time: "10:36",
    },
    { id: 6, sender: "user", text: "Preferiría LED para mayor duración", time: "10:38" },
    {
      id: 7,
      sender: "professional",
      text: "Buena elección. Para darte un presupuesto más preciso, ¿podrías enviarme una foto del jardín o indicarme las dimensiones aproximadas?",
      time: "10:40",
    },
  ],
  2: [
    {
      id: 1,
      sender: "professional",
      text: "Hola, soy Laura. ¿En qué puedo ayudarte?",
      time: "09:15",
    },
    {
      id: 2,
      sender: "user",
      text: "Hola Laura, tengo una fuga en el baño",
      time: "09:20",
    },
    {
      id: 3,
      sender: "professional",
      text: "Entiendo. ¿Podrías describir dónde está la fuga exactamente?",
      time: "09:22",
    },
    {
      id: 4,
      sender: "user",
      text: "Es debajo del lavamanos, parece que viene de la tubería",
      time: "09:25",
    },
    {
      id: 5,
      sender: "professional",
      text: "Puedo pasar mañana a revisar la instalación. ¿Te parece bien por la mañana?",
      time: "09:30",
    },
  ],
  3: [
    {
      id: 1,
      sender: "user",
      text: "Hola Martín, mi router no funciona correctamente",
      time: "14:10",
    },
    {
      id: 2,
      sender: "professional",
      text: "Hola, ¿qué problemas estás teniendo exactamente?",
      time: "14:15",
    },
    {
      id: 3,
      sender: "user",
      text: "La conexión se cae constantemente y la señal es muy débil",
      time: "14:20",
    },
    {
      id: 4,
      sender: "professional",
      text: "Entiendo. ¿Has intentado reiniciar el router?",
      time: "14:22",
    },
    {
      id: 5,
      sender: "user",
      text: "Sí, varias veces, pero el problema persiste",
      time: "14:25",
    },
    {
      id: 6,
      sender: "professional",
      text: "Ya resolví el problema con tu router. Era un problema de configuración.",
      time: "16:30",
    },
  ],
}

export default function MessagesPage() {
  const [chats, setChats] = useState(initialChats)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [userInfo, setUserInfo] = useState<any>(null)

  // Obtener información del usuario
  useEffect(() => {
    const getUserInfo = () => {
      // Primero verificar en sessionStorage
      let userSession = sessionStorage.getItem("userSession")

      // Si no hay sesión en sessionStorage, verificar en localStorage
      if (!userSession) {
        userSession = localStorage.getItem("userSession")
      }

      if (userSession) {
        setUserInfo(JSON.parse(userSession))
      }
    }

    getUserInfo()
  }, [])

  // Cargar mensajes cuando se selecciona un chat
  useEffect(() => {
    if (selectedChat) {
      setMessages(chatMessages[selectedChat as keyof typeof chatMessages] || [])

      // Marcar como leído
      setChats(chats.map((chat) => (chat.id === selectedChat ? { ...chat, unread: false } : chat)))
    }
  }, [selectedChat])

  // Scroll al último mensaje cuando se añade uno nuevo
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Filtrar chats según la búsqueda
  const filteredChats = chats.filter(
    (chat) =>
      chat.professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.professional.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Función para enviar un mensaje
  const sendMessage = () => {
    if (newMessage.trim() === "" || !selectedChat) return

    const message = {
      id: messages.length + 1,
      sender: "user",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Actualizar el último mensaje en la lista de chats
    setChats(
      chats.map((chat) =>
        chat.id === selectedChat
          ? {
              ...chat,
              lastMessage: newMessage,
              time: "Ahora",
            }
          : chat,
      ),
    )

    // Simular respuesta del profesional después de un tiempo
    setTimeout(() => {
      const selectedProfessional = chats.find((chat) => chat.id === selectedChat)?.professional.name

      const responses = [
        `Gracias por tu mensaje. Te responderé lo antes posible.`,
        `Entendido. ¿Hay algo más en lo que pueda ayudarte?`,
        `Perfecto. Me pondré en contacto contigo para coordinar los detalles.`,
        `Gracias por la información. ¿Prefieres que te llame o seguimos por chat?`,
        `Excelente. ¿Cuándo sería un buen momento para realizar el trabajo?`,
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const response = {
        id: messages.length + 2,
        sender: "professional",
        text: randomResponse,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, response])

      // Actualizar el último mensaje en la lista de chats
      setChats(
        chats.map((chat) =>
          chat.id === selectedChat
            ? {
                ...chat,
                lastMessage: randomResponse,
                time: "Ahora",
              }
            : chat,
        ),
      )
    }, 2000)
  }

  // Simular nuevos mensajes cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      if (chats.length > 0) {
        const randomChatIndex = Math.floor(Math.random() * chats.length)
        const randomChat = chats[randomChatIndex]

        const newChats = [...chats]
        newChats[randomChatIndex] = {
          ...randomChat,
          lastMessage: `Nuevo mensaje simulado: ${new Date().toLocaleTimeString()}`,
          time: "Ahora",
          unread: randomChat.id !== selectedChat,
        }

        setChats(newChats)

        // Si el chat está seleccionado, añadir el mensaje a la conversación
        if (randomChat.id === selectedChat) {
          const newMessage = {
            id: messages.length + 1,
            sender: "professional",
            text: `Nuevo mensaje simulado: ${new Date().toLocaleTimeString()}`,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          }

          setMessages((prev) => [...prev, newMessage])
        }
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [chats, selectedChat, messages])

  return (
    <AuthCheck>
      <ClientLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Mensajes</h1>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Lista de chats */}
            <div className="w-full md:w-1/3">
              <div className="mb-6">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Buscar en conversaciones..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2 overflow-y-auto max-h-[600px]">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedChat === chat.id ? "bg-gray-100 border-gray-300" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={chat.professional.image || "/placeholder.svg"} alt={chat.professional.name} />
                      <AvatarFallback>{chat.professional.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{chat.professional.name}</h3>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                      <p className="text-xs text-gray-500">{chat.professional.profession}</p>
                    </div>
                    {chat.unread && (
                      <Badge variant="destructive" className="ml-2">
                        Nuevo
                      </Badge>
                    )}
                  </div>
                ))}

                {filteredChats.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No se encontraron conversaciones que coincidan con tu búsqueda.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Área de chat */}
            <div className="flex-1">
              {selectedChat ? (
                <div className="flex flex-col h-[600px] border rounded-lg overflow-hidden">
                  {/* Header del chat */}
                  <div className="border-b p-4 flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage
                        src={chats.find((c) => c.id === selectedChat)?.professional.image || "/placeholder.svg"}
                        alt={chats.find((c) => c.id === selectedChat)?.professional.name}
                      />
                      <AvatarFallback>
                        {chats.find((c) => c.id === selectedChat)?.professional.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-medium">{chats.find((c) => c.id === selectedChat)?.professional.name}</h2>
                      <p className="text-sm text-gray-500">
                        {chats.find((c) => c.id === selectedChat)?.professional.profession}
                      </p>
                    </div>
                    <div className="ml-auto flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      <span className="text-sm">En línea</span>
                    </div>
                  </div>

                  {/* Área de mensajes */}
                  <div className="flex-grow overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.sender === "professional" && (
                          <Avatar className="h-8 w-8 mr-2 mt-1">
                            <AvatarImage
                              src={chats.find((c) => c.id === selectedChat)?.professional.image || "/placeholder.svg"}
                              alt={chats.find((c) => c.id === selectedChat)?.professional.name}
                            />
                            <AvatarFallback>
                              {chats.find((c) => c.id === selectedChat)?.professional.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div>
                          <div
                            className={`max-w-xs sm:max-w-md rounded-lg p-3 ${
                              message.sender === "user"
                                ? "bg-purple-600 text-white rounded-tr-none"
                                : "bg-gray-200 text-gray-800 rounded-tl-none"
                            }`}
                          >
                            <p>{message.text}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Área de entrada de mensaje */}
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className="flex-grow"
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      />
                      <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                        <SendIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-[600px] border rounded-lg flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <SendIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Tus mensajes</h3>
                    <p className="text-gray-500 mb-4">Selecciona una conversación para ver los mensajes</p>
                    <Link href="/client">
                      <Button>Buscar profesionales</Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </ClientLayout>
    </AuthCheck>
  )
}
