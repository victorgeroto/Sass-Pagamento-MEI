'use client'
import { useState } from 'react'
import { Bell, ChevronDown, LogOut, AlertCircle, TrendingUp, FileText, X } from 'lucide-react'

const notificacoes = [
  { icon: AlertCircle, color: '#f59e0b', bg: '#fffbeb', titulo: 'DAS vence em 8 dias', desc: 'Boleto de R$ 71,60 com vencimento em 20/03/2026', tempo: 'Agora' },
  { icon: TrendingUp,  color: '#00a884', bg: '#e6faf6', titulo: 'Nova venda no Hotmart', desc: 'Venda de R$ 297,00 — Curso Python', tempo: '2h atrás' },
  { icon: FileText,    color: '#8b5cf6', bg: '#f5f3ff', titulo: 'DASN-SIMEI pendente', desc: 'Declaração anual deve ser entregue até 31/05/2026', tempo: '1 dia atrás' },
]

export default function Header({ titulo, usuario }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)

  return (
    <header className="flex items-center justify-between mb-8 relative">
      <div>
        <h1 className="text-2xl font-bold" style={{color: '#0a1628'}}>{titulo}</h1>
        <p className="text-sm text-gray-400 mt-1">
          {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </div>

      <div className="flex items-center gap-3">

        {/* Notificações */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen((p) => !p); setDropdownOpen(false) }}
            className="relative p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all"
          >
            <Bell size={18} color="#64748b" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{background: '#00d4aa'}} />
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-14 w-80 rounded-2xl border border-gray-100 shadow-xl z-50 bg-white overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-50">
                <p className="font-semibold text-sm" style={{color: '#0a1628'}}>Notificações</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{background: '#e6faf6', color: '#00a884'}}>
                    {notificacoes.length} novas
                  </span>
                  <button onClick={() => setNotifOpen(false)} className="p-1 rounded-lg hover:bg-gray-100">
                    <X size={14} color="#94a3b8" />
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                {notificacoes.map((n, i) => {
                  const Icon = n.icon
                  return (
                    <div key={i} className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-all cursor-pointer">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{background: n.bg}}>
                        <Icon size={16} color={n.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium" style={{color: '#0a1628'}}>{n.titulo}</p>
                        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{n.desc}</p>
                        <p className="text-xs mt-1" style={{color: '#00a884'}}>{n.tempo}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="p-3 border-t border-gray-50">
                <button className="w-full text-xs font-medium py-2 rounded-xl hover:bg-gray-50 transition-all" style={{color: '#64748b'}}>
                  Ver todas as notificações
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Perfil */}
        <div className="relative">
          <button
            onClick={() => { setDropdownOpen((p) => !p); setNotifOpen(false) }}
            className="flex items-center gap-3 px-3 py-2 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{background: '#0a1628'}}>
              {usuario?.nome?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium" style={{color: '#0a1628'}}>{usuario?.nome || 'Usuário'}</p>
              <p className="text-xs text-gray-400">{usuario?.email || ''}</p>
            </div>
            <ChevronDown size={14} color="#94a3b8" className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-14 w-64 rounded-2xl border border-gray-100 shadow-xl z-50 bg-white overflow-hidden">
              <div className="p-4 border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold" style={{background: '#0a1628'}}>
                    {usuario?.nome?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{color: '#0a1628'}}>{usuario?.nome}</p>
                    <p className="text-xs text-gray-400">{usuario?.email}</p>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <button
                  onClick={() => { localStorage.removeItem('token'); window.location.href = '/login' }}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-all hover:bg-red-500/10"
                  style={{color: '#ef4444'}}
                >
                  <LogOut size={16} />
                  Sair da conta
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fecha dropdowns ao clicar fora */}
      {(dropdownOpen || notifOpen) && (
        <div className="fixed inset-0 z-40" onClick={() => { setDropdownOpen(false); setNotifOpen(false) }} />
      )}
    </header>
  )
}