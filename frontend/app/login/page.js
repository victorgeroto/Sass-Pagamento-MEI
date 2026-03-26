'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, ArrowLeft, Zap, ArrowRight } from 'lucide-react'
import { LayoutDashboard, FileText, Calendar } from 'lucide-react'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setErro('')
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 12000)

    try {
      const formData = new FormData()
      formData.append('username', email)
      formData.append('password', senha)
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
        cache: 'no-store',
      })

      let data = {}
      try {
        data = await res.json()
      } catch {
        data = {}
      }

      if (!res.ok) {
        setErro(data.detail || 'Email ou senha inválidos')
        return
      }

      localStorage.setItem('token', data.access_token)
      router.push('/dashboard')
    } catch (err) {
      if (err?.name === 'AbortError') {
        setErro('Servidor demorou para responder. Tente novamente em instantes.')
      } else {
        setErro('Erro ao conectar com o servidor')
      }
    } finally {
      clearTimeout(timeoutId)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex" style={{background: '#f8fffe'}}>
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12" style={{background: '#0a1628'}}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: 'linear-gradient(135deg, #00d4aa, #0a1628)'}}>
            <Zap size={16} color="white" />
          </div>
          <span className="font-bold text-xl text-white">CreatorFlow</span>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Sua gestão financeira{' '}
            <span className="text-transparent bg-clip-text" style={{backgroundImage: 'linear-gradient(135deg, #00d4aa, #00f5c4)'}}>
              no piloto automático
            </span>
          </h2>
          <p className="text-lg mb-12" style={{color: '#64748b'}}>
            Mais de 2.000 criadores já simplificaram seu MEI com o CreatorFlow.
          </p>
          <div className="space-y-4">
            {[
              { icon: LayoutDashboard, text: 'Dashboard unificado de todas as plataformas' },
              { icon: FileText, text: 'Nota fiscal automática após cada venda' },
              { icon: Calendar, text: 'Alertas de DAS e obrigações MEI' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: '#112240'}}>
                    <Icon size={16} color="#00d4aa" />
                  </div>
                  <span className="text-sm" style={{color: '#94a3b8'}}>{item.text}</span>
                </div>
              )
            })}
          </div>
        </div>
        <p className="text-xs" style={{color: '#334155'}}>© 2026 CreatorFlow. Todos os direitos reservados.</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: 'linear-gradient(135deg, #0a1628, #00d4aa)'}}>
              <Zap size={16} color="white" />
            </div>
            <span className="font-bold text-xl" style={{color: '#0a1628'}}>CreatorFlow</span>
          </div>

          <Link href="/home" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors" style={{color: '#94a3b8'}}>
            <ArrowLeft size={16} />
            Voltar ao início
          </Link>

          <h1 className="text-3xl font-bold mb-2" style={{color: '#0a1628'}}>Bem-vindo de volta</h1>
          <p className="text-gray-400 mb-8">Entre na sua conta para continuar</p>

          {erro && (
            <div className="mb-6 p-4 rounded-xl text-sm" style={{background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca'}}>
              {erro}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{color: '#0a1628'}}>Email</label>
              <div className="relative">
                <Mail size={16} color="#94a3b8" className="absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none transition-all text-sm"
                  onFocus={(e) => e.target.style.borderColor = '#00d4aa'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium" style={{color: '#0a1628'}}>Senha</label>
                <Link href="/forgot-password" className="text-xs" style={{color: '#00d4aa'}}>Esqueceu a senha?</Link>
              </div>
              <div className="relative">
                <Lock size={16} color="#94a3b8" className="absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none transition-all text-sm"
                  onFocus={(e) => e.target.style.borderColor = '#00d4aa'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2"
              style={{background: loading ? '#94a3b8' : '#0a1628', color: 'white', cursor: loading ? 'not-allowed' : 'pointer'}}
            >
              {loading ? 'Entrando...' : <>Entrar <ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-8">
            Não tem uma conta?{' '}
            <Link href="/register" className="font-medium" style={{color: '#00d4aa'}}>
              Criar conta grátis
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}