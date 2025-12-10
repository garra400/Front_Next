// Estrutura da aplicacao (afeta todas as paginas)
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SiloManager - Sistema de Monitoramento IoT",
  description:
    "Sistema integrado para gestao e monitoramento de silos agricolas em tempo real",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-2">
                  <div className="bg-gradient-to-br from-primary to-primary-dark p-2 rounded-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                    SiloManager
                  </span>
                </Link>

                <nav className="hidden md:flex items-center space-x-1">
                  <Link
                    href="/silo"
                    className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                  >
                    Silos
                  </Link>
                  <Link
                    href="/sensor"
                    className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                  >
                    Sensores
                  </Link>
                  <Link
                    href="/device"
                    className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                  >
                    Dispositivos
                  </Link>
                  <Link
                    href="/property"
                    className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                  >
                    Propriedades
                  </Link>
                  <Link
                    href="/person"
                    className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                  >
                    Pessoas
                  </Link>
                  <Link
                    href="/user"
                    className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
                  >
                    Usuarios
                  </Link>
                </nav>
              </div>

              <div className="flex items-center gap-3">
                <button className="relative p-2 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary rounded-lg shadow-sm hover:shadow transition-all"
                >
                  Registro
                </Link>
              </div>
            </div>
          </div>
        </header>

        {children}

        <footer className="bg-gray-900 text-gray-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-gradient-to-br from-primary to-primary-dark p-2 rounded-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <span className="text-xl font-bold text-white">SiloManager</span>
                </div>
                <p className="text-sm text-gray-400 max-w-md">
                  Sistema integrado para gestao e monitoramento de silos agricolas em
                  tempo real, utilizando IoT e DevOps.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">Links rapidos</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/silo" className="hover:text-primary transition-colors">
                      Silos
                    </Link>
                  </li>
                  <li>
                    <Link href="/sensor" className="hover:text-primary transition-colors">
                      Sensores
                    </Link>
                  </li>
                  <li>
                    <Link href="/device" className="hover:text-primary transition-colors">
                      Dispositivos
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">Suporte</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Documentacao
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      API
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Contato
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2025 SiloManager. Sistema de Monitoramento IoT - DevOps Project.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
