import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "UPserv - Conecta con profesionales",
  description: "Plataforma para conectar clientes con profesionales de diversos rubros",
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="https://res.cloudinary.com/dbn7neeea/image/upload/v1746227678/N_fyt5bm.png"
              alt="UPserv Logo"
              className="h-8 w-8 mr-2"
            />
            <h1 className="text-2xl font-bold text-gray-900">UPserv</h1>
          </div>
          <Link href="/auth">
            <Button>Iniciar sesión o Registrarse</Button>
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Conecta con profesionales de confianza</h2>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Encuentra electricistas, plomeros, gasistas, técnicos y más profesionales para resolver tus necesidades.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth?role=client">
                <Button size="lg" className="w-full sm:w-auto">
                  Buscar Profesionales
                </Button>
              </Link>
              <Link href="/auth?role=professional">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20">
                  Ofrecer mis Servicios
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">¿Cómo funciona?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Busca el servicio</h3>
                <p className="text-gray-600">Selecciona tu ubicación y el tipo de servicio que necesitas.</p>
              </div>
              <div className="text-center p-6 rounded-lg">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Elige un profesional</h3>
                <p className="text-gray-600">
                  Compara perfiles, valoraciones y precios para encontrar el profesional ideal.
                </p>
              </div>
              <div className="text-center p-6 rounded-lg">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Contacta y coordina</h3>
                <p className="text-gray-600">Chatea directamente con el profesional y coordina el servicio.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Servicios disponibles</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                "Electricistas",
                "Plomeros",
                "Gasistas",
                "Técnicos IT",
                "Manicuras",
                "Peluqueros",
                "Cerrajeros",
                "Pintores",
                "Carpinteros",
                "Jardineros",
                "Limpieza",
                "Mudanzas",
              ].map((service) => (
                <div
                  key={service}
                  className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow"
                >
                  <p className="font-medium">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">UPserv</h3>
              <p className="text-gray-400">Conectando clientes con profesionales de confianza.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Enlaces rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/auth" className="text-gray-400 hover:text-white">
                    Iniciar sesión
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    Acerca de
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <p className="text-gray-400">info@upserv.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} UPserv. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
