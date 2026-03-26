'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, ArrowLeft, Zap, ArrowRight, CheckCircle } from 'lucide-react'

export default function Register() {
  const router = useRouter()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRegister(e) {
    e.preventDefault()
    setLoading(true)
    setErro('')
    try {
      const res = await fetch('http://localhost:8000/auth/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErro(data.detail || 'Erro ao criar conta')
        return
      }
      const formData = new FormData()
      formData.append('username', email)
      formData.append('password', senha)
      const loginRes = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        body: formData,
      })
      const loginData = await loginRes.json()
      localStorage.setItem('token', loginData.access_token)
      router.push('/dashboard')
    } catch (err) {
      setErro('Erro ao conectar com o servidor')
    } finally {
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
            Comece grátis,{' '}
            <span className="text-transparent bg-clip-text" style={{backgroundImage: 'linear-gradient(135deg, #00d4aa, #00f5c4)'}}>
              cresça sem limites
            </span>
          </h2>
          <p className="text-lg mb-12" style={{color: '#64748b'}}>
            Configure sua conta em menos de 2 minutos.
          </p>
          <div className="space-y-4">
            {[
              'Sem cartão de crédito para começar',
              'Cancele quando quiser',
              'Suporte em português',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle size={18} color="#00d4aa" />
                <span className="text-sm" style={{color: '#94a3b8'}}>{item}</span>
              </div>
            ))}
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

          <h1 className="text-3xl font-bold mb-2" style={{color: '#0a1628'}}>Criar conta grátis</h1>
          <p className="text-gray-400 mb-8">Comece a organizar suas finanças agora</p>

          {erro && (
            <div className="mb-6 p-4 rounded-xl text-sm" style={{background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca'}}>
              {erro}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{color: '#0a1628'}}>Nome completo</label>
              <div className="relative">
                <User size={16} color="#94a3b8" className="absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none transition-all text-sm"
                  onFocus={(e) => e.target.style.borderColor = '#00d4aa'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>
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
              <label className="block text-sm font-medium mb-2" style={{color: '#0a1628'}}>Senha</label>
              <div className="relative">
                <Lock size={16} color="#94a3b8" className="absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
                  minLength={6}
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
              {loading ? 'Criando conta...' : <>Criar conta grátis <ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-8">
            Já tem uma conta?{' '}
            <Link href="/login" className="font-medium" style={{color: '#00d4aa'}}>
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}