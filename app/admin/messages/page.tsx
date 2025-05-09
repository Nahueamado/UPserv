"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Trash, MessageSquare, CheckCircle, XCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Datos de ejemplo para los mensajes
const initialMessages = [
  {
    id: 1,
    from: {
      id: 1,
      name: "María González",
      role: "client",
      image: "/placeholder.svg?height=100&width=100",
    },
    to: {
      id: 2,
      name: "Carlos Rodríguez",
      role: "professional",
      image: "/placeholder.svg?height=100&width=100",
    },
    content: "Hola, necesito un presupuesto para instalar luces en mi jardín",
    timestamp: "2023-05-01T10:32:00",
    read: true,
  },
  {
    id: 2,
    from: {
      id: 2,
      name: "Carlos Rodríguez",
      role: "professional",
      image: "/placeholder.svg?height=100&width=100",
    },
    to: {
      id: 1,
      name: "María González",
      role: "client",
      image: "/placeholder.svg?height=100&width=100",
    },
    content: "Claro, puedo ayudarte con eso. ¿Cuántas luces necesitas instalar aproximadamente?",
    timestamp: "2023-05-01T10:33:00",
    read: true,
  },
  {
    id: 3,
    from: {
      id: 1,
      name: "María González",
      role: "client",
      image: "/placeholder.svg?height=100&width=100",
    },
    to: {
      id: 2,
      name: "Carlos Rodríguez",
      role: "professional",
      image: "/placeholder.svg?height=100&width=100",
    },
    content: "Serían unas 6 luces para iluminar el camino principal",
    timestamp: "2023-05-01T10:35:00",
    read: true,
  },
  {
    id: 4,
    from: {
      id: 3,
      name: "Juan Pérez",
      role: "client",
      image: "/placeholder.svg?height=100&width=100",
    },
    to: {
      id: 4,
      name: "Laura Martínez",
      role: "professional",
      image: "/placeholder.svg?height=100&width=100",
    },
    content: "Hola Laura, ¿podrías venir a revisar una fuga en mi baño?",
    timestamp: "2023-05-02T09:15:00",
    read: false,
  },
  {
    id: 5,
    from: {
      id: 4,
      name: "Laura Martínez",
      role: "professional",
      image: "/placeholder.svg?height=100&width=100",
    },
    to: {
      id: 3,
      name: "Juan Pérez",
      role: "client",
      image: "/placeholder.svg?height=100&width=100",
    },
    content: "Hola Juan, sí puedo. ¿Te parece bien mañana por la tarde?",
    timestamp: "2023-05-02T09:20:00",
    read: false,
  },
  {
    id: 6,
    from: {
      id: 5,
      name: "Ana López",
      role: "client",
      image: "/placeholder.svg?height=100&width=100",
    },
    to: {
      id: 6,
      name: "Roberto Sánchez",
      role: "professional",
      image: "/placeholder.svg?height=100&width=100",
    },
    content: "Necesito pintar mi casa, ¿podrías darme un presupuesto?",
    timestamp: "2023-05-03T14:10:00",
    read: true,
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

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [messageToDelete, setMessageToDelete] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all")

  // Agrupar mensajes por conversación
  const conversations = messages.reduce((acc: any, message) => {
    const conversationId = `${Math.min(message.from.id, message.to.id)}-${Math.max(message.from.id, message.to.id)}`

    if (!acc[conversationId]) {
      acc[conversationId] = {
        id: conversationId,
        participants: [message.from, message.to],
        messages: [],
        lastMessage: null,
        unreadCount: 0,
      }
    }

    acc[conversationId].messages.push(message)

    // Actualizar el último mensaje
    if (
      !acc[conversationId].lastMessage ||
      new Date(message.timestamp) > new Date(acc[conversationId].lastMessage.timestamp)
    ) {
      acc[conversationId].lastMessage = message
    }

    // Contar mensajes no leídos
    if (!message.read) {
      acc[conversationId].unreadCount++
    }

    return acc
  }, {})

  // Filtrar conversaciones según la búsqueda
  const filteredConversations = Object.values(conversations).filter((conversation: any) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      conversation.participants.some((participant: any) => participant.name.toLowerCase().includes(searchLower)) ||
      conversation.messages.some((message: any) => message.content.toLowerCase().includes(searchLower))
    )
  })

  // Filtrar por pestaña activa
  const displayedConversations =
    activeTab === "unread"
      ? (filteredConversations as any[]).filter((conv: any) => conv.unreadCount > 0)
      : filteredConversations

  // Ordenar conversaciones por fecha del último mensaje (más reciente primero)
  const sortedConversations = (displayedConversations as any[]).sort(
    (a, b) => new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime(),
  )

  // Manejar la eliminación de un mensaje
  const handleDeleteMessage = () => {
    if (messageToDelete !== null) {
      setMessages(messages.filter((message) => message.id !== messageToDelete))
      setMessageToDelete(null)
      setShowDeleteDialog(false)
    }
  }

  // Manejar marcar como leído/no leído
  const handleToggleRead = (messageId: number) => {
    setMessages(messages.map((message) => (message.id === messageId ? { ...message, read: !message.read } : message)))
  }

  // Simular nuevos mensajes cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * initialMessages.length)
      const randomMessage = initialMessages[randomIndex]

      const newMessage = {
        ...randomMessage,
        id: messages.length + 1,
        timestamp: new Date().toISOString(),
        read: false,
        content: `Nuevo mensaje simulado #${messages.length + 1}: ${randomMessage.content}`,
      }

      setMessages((prev) => [...prev, newMessage])
    }, 30000)

    return () => clearInterval(interval)
  }, [messages])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold">Mensajes</h1>
        <div className="flex gap-2">
          <Button variant={activeTab === "all" ? "default" : "outline"} onClick={() => setActiveTab("all")}>
            Todos
          </Button>
          <Button variant={activeTab === "unread" ? "default" : "outline"} onClick={() => setActiveTab("unread")}>
            No leídos
            {activeTab === "all" && messages.filter((m) => !m.read).length > 0 && (
              <Badge className="ml-2 bg-red-500">{messages.filter((m) => !m.read).length}</Badge>
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Lista de conversaciones */}
        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Conversaciones</CardTitle>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Buscar conversaciones..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y max-h-[600px] overflow-y-auto">
                {sortedConversations.length > 0 ? (
                  sortedConversations.map((conversation: any) => (
                    <div
                      key={conversation.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedConversation === conversation.id ? "bg-gray-50" : ""}`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage
                              src={
                                conversation.participants[0].role === "client"
                                  ? conversation.participants[0].image
                                  : conversation.participants[1].image
                              }
                              alt="Avatar"
                            />
                            <AvatarFallback>
                              {conversation.participants[0].role === "client"
                                ? conversation.participants[0].name.charAt(0)
                                : conversation.participants[1].name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <p className="font-medium truncate">
                              {conversation.participants[0].role === "client"
                                ? conversation.participants[0].name
                                : conversation.participants[1].name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatDate(conversation.lastMessage.timestamp).split(",")[0]}
                            </p>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{conversation.lastMessage.content}</p>
                          <div className="flex items-center mt-1">
                            <Badge variant="outline" className="text-xs">
                              {conversation.participants[0].role === "client" ? "Cliente" : "Profesional"}
                            </Badge>
                            <span className="mx-2">→</span>
                            <Badge variant="outline" className="text-xs">
                              {conversation.participants[1].role === "client" ? "Cliente" : "Profesional"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">No se encontraron conversaciones</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detalle de la conversación */}
        <div className="flex-1">
          <Card className="h-full">
            {selectedConversation ? (
              <>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={(conversations as any)[selectedConversation].participants[0].image || "/placeholder.svg"}
                          alt="Avatar"
                        />
                        <AvatarFallback>
                          {(conversations as any)[selectedConversation].participants[0].name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">
                          {(conversations as any)[selectedConversation].participants[0].name} y{" "}
                          {(conversations as any)[selectedConversation].participants[1].name}
                        </CardTitle>
                        <p className="text-sm text-gray-500">
                          {(conversations as any)[selectedConversation].messages.length} mensajes
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-4 max-h-[500px] overflow-y-auto space-y-4">
                    {(conversations as any)[selectedConversation].messages.map((message: any) => (
                      <div key={message.id} className="relative group">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage src={message.from.image || "/placeholder.svg"} alt="Avatar" />
                            <AvatarFallback>{message.from.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{message.from.name}</p>
                                <Badge variant="outline" className="text-xs">
                                  {message.from.role === "client" ? "Cliente" : "Profesional"}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">{formatDate(message.timestamp)}</span>
                                {!message.read ? (
                                  <Badge variant="destructive" className="text-xs">
                                    No leído
                                  </Badge>
                                ) : null}
                              </div>
                            </div>
                            <p className="mt-1 text-gray-700">{message.content}</p>
                          </div>
                        </div>
                        <div className="absolute right-0 top-0 hidden group-hover:flex gap-1">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleToggleRead(message.id)}>
                                {message.read ? (
                                  <>
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Marcar como no leído
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Marcar como leído
                                  </>
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-700"
                            onClick={() => {
                              setMessageToDelete(message.id)
                              setShowDeleteDialog(true)
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="h-full flex items-center justify-center p-6">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Selecciona una conversación</h3>
                  <p className="text-gray-500">Elige una conversación de la lista para ver los mensajes</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Diálogo para eliminar mensaje */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar mensaje</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar este mensaje? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteMessage}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
