'use client'
import { useState } from 'react'
import { ShoppingCart, User, Play, FileText, ShoppingBag, Server, Wrench, ArrowUpRight, ArrowDownLeft, Search, Filter } from 'lucide-react'

const icones = {
  Hotmart: ShoppingCart,
  Mentoria: User,
  YouTube: Play,
  MEI: FileText,
  Kiwify: ShoppingBag,
  AWS: Server,
  Adobe: Wrench,
}

export default function TabelaTransacoes({ transacoes }) {
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState('todos')

  const filtradas = transacoes?.filter((t) => {
    const matchBusca = t.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      t.plataforma.toLowerCase().includes(busca.toLowerCase())
    const matchFiltro = filtro === 'todos' || t.tipo === filtro
    return matchBusca && matchFiltro
  })

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-lg" style={{color: '#0a1628'}}>Todas as transações</h2>
          <p className="text-sm text-gray-400">Março 2026</p>
        </div>
        <button className="inline-flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all" style={{color: '#64748b'}}>
          <Filter size={14} />
          Exportar
        </button>
      </div>

      {/* Busca e filtro */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} color="#94a3b8" className="absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar transação..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm transition-all"
            onFocus={(e) => e.target.style.borderColor = '#00d4aa'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>
        <div className="flex rounded-xl border border-gray-200 overflow-hidden text-xs font-medium">
          {['todos', 'entrada', 'saida'].map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className="px-4 py-2.5 transition-all capitalize"
              style={{
                background: filtro === f ? '#0a1628' : 'white',
                color: filtro === f ? 'white' : '#64748b',
              }}
            >
              {f === 'todos' ? 'Todos' : f === 'entrada' ? 'Entradas' : 'Saídas'}
            </button>
          ))}
        </div>
      </div>

      {/* Tabela */}
      <div className="space-y-2">
        {filtradas?.length === 0 && (
          <p className="text-center text-sm text-gray-400 py-8">Nenhuma transação encontrada</p>
        )}
        {filtradas?.map((tx) => {
          const Icon = icones[tx.plataforma] || ShoppingCart
          return (
            <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{
                  background: tx.tipo === 'entrada' ? '#e6faf6' : '#fff1f2'
                }}>
                  <Icon size={15} color={tx.tipo === 'entrada' ? '#00a884' : '#ef4444'} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{color: '#0a1628'}}>{tx.descricao}</p>
                  <p className="text-xs text-gray-400">{tx.plataforma} • {tx.data}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs px-2 py-1 rounded-full hidden md:block" style={{
                  background: '#f8fafc',
                  color: '#64748b'
                }}>
                  {tx.categoria}
                </span>
                <div className="flex items-center gap-1">
                  {tx.tipo === 'entrada'
                    ? <ArrowUpRight size={14} color="#00a884" />
                    : <ArrowDownLeft size={14} color="#ef4444" />
                  }
                  <span className="text-sm font-bold" style={{color: tx.tipo === 'entrada' ? '#00a884' : '#ef4444'}}>
                    {tx.tipo === 'entrada' ? '+' : '-'}R$ {tx.valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}