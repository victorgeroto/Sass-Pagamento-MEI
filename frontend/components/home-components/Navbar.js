import Link from 'next/link'
import { Zap } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: 'linear-gradient(135deg, #0a1628, #00d4aa)'}}>
            <Zap size={16} color="white" />
          </div>
          <span className="font-bold text-xl" style={{color: '#0a1628'}}>CreatorFlow</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Funcionalidades</a>
          <a href="#pricing" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Planos</a>
          <a href="#about" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Sobre</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Entrar</Link>
          <Link href="/register" className="text-sm text-white px-4 py-2 rounded-lg transition-colors" style={{background: '#0a1628'}}>
            Começar grátis
          </Link>
        </div>
      </div>
    </nav>
  )
}