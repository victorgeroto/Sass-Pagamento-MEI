'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft, Zap, ArrowRight, CheckCircle, Lock, Shield } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setEnviado(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex" style={{background: '#f8fffe'}}>

      {/* Lado esquerdo */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12" style={{background: '#0a1628'}}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: 'linear-gradient(135deg, #00d4aa, #0a1628)'}}>
            <Zap size={16} color="white" />
          </div>
          <span className="font-bold text-xl text-white">CreatorFlow</span>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Sem estresse,{' '}
            <span className="text-transparent bg-clip-text" style={{backgroundImage: 'linear-gradient(135deg, #00d4aa, #00f5c4)'}}>
              a gente te ajuda
            </span>
          </h2>
          <p className="text-lg mb-12" style={{color: '#64748b'}}>
            Acontece com todo mundo. Vamos recuperar seu acesso rapidinho.
          </p>
          <div className="space-y-4">
            {[
              { icon: Mail, text: 'Enviaremos um link para seu email' },
              { icon: Lock, text: 'Link expira em 30 minutos por segurança' },
              { icon: Shield, text: 'Seus dados continuam protegidos' },
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

      {/* Lado direito */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: 'linear-gradient(135deg, #0a1628, #00d4aa)'}}>
              <Zap size={16} color="white" />
            </div>
            <span className="font-bold text-xl" style={{color: '#0a1628'}}>CreatorFlow</span>
          </div>

          <Link href="/login" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors" style={{color: '#94a3b8'}}>
            <ArrowLeft size={16} />
            Voltar ao login
          </Link>

          {!enviado ? (
            <>
              <h1 className="text-3xl font-bold mb-2" style={{color: '#0a1628'}}>Esqueceu a senha?</h1>
              <p className="text-gray-400 mb-8">Digite seu email e enviaremos um link para redefinir sua senha.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2"
                  style={{background: loading ? '#94a3b8' : '#0a1628', color: 'white', cursor: loading ? 'not-allowed' : 'pointer'}}
                >
                  {loading ? 'Enviando...' : <>Enviar link de recuperação <ArrowRight size={16} /></>}
                </button>
              </form>

              <p className="text-center text-sm text-gray-400 mt-8">
                Lembrou a senha?{' '}
                <Link href="/login" className="font-medium" style={{color: '#00d4aa'}}>
                  Voltar ao login
                </Link>
              </p>
            </>
          ) : (
            // Tela de sucesso
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{background: '#e6faf6'}}>
                <CheckCircle size={32} color="#00d4aa" />
              </div>
              <h1 className="text-2xl font-bold mb-2" style={{color: '#0a1628'}}>Email enviado!</h1>
              <p className="text-gray-400 mb-2">Enviamos um link de recuperação para</p>
              <p className="font-medium mb-8" style={{color: '#0a1628'}}>{email}</p>
              <p className="text-sm text-gray-400 mb-8">
                Não recebeu? Verifique sua caixa de spam ou{' '}
                <button onClick={() => setEnviado(false)} className="font-medium" style={{color: '#00d4aa'}}>
                  tente novamente
                </button>
              </p>
              <Link href="/login" className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium text-sm transition-all" style={{background: '#0a1628', color: 'white'}}>
                <ArrowLeft size={16} />
                Voltar ao login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}