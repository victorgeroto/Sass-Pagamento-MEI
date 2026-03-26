'use client'
import { useState } from 'react'
import { Search, Pencil, Trash2, UserPlus } from 'lucide-react'

const statusConfig = {
  ativo:   { label: 'Ativo',   bg: '#e6faf6', color: '#00a884' },
  pausado: { label: 'Pausado', bg: '#fffbeb', color: '#f59e0b' },
  inativo: { label: 'Inativo', bg: '#fff1f2', color: '#ef4444' },
}

export default function TabelaAlunos({ alunos, onNovo, onEditar, onDeletar }) {
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState('todos')

  const filtrados = alunos?.filter((a) => {
    const matchBusca = a.nome.toLowerCase().includes(busca.toLowerCase()) ||
      a.email.toLowerCase().includes(busca.toLowerCase())
    const matchFiltro = filtro === 'todos' || a.status === filtro
    return matchBusca && matchFiltro
  })

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-lg" style={{color: '#0a1628'}}>Todos os alunos</h2>
          <p className="text-sm text-gray-400">{alunos?.length || 0} alunos cadastrados</p>
        </div>
        <button
          onClick={onNovo}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all"
          style={{background: '#0a1628'}}
        >
          <UserPlus size={16} />
          Novo aluno
        </button>
      </div>

      {/* Busca e filtros */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} color="#94a3b8" className="absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text" placeholder="Buscar aluno..." value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 outline-none text-sm transition-all"
            onFocus={(e) => e.target.style.borderColor = '#00d4aa'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>
        <div className="flex rounded-xl border border-gray-200 overflow-hidden text-xs font-medium">
          {['todos', 'ativo', 'pausado', 'inativo'].map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className="px-4 py-2.5 transition-all capitalize"
              style={{background: filtro === f ? '#0a1628' : 'white', color: filtro === f ? 'white' : '#64748b'}}
            >
              {f === 'todos' ? 'Todos' : statusConfig[f]?.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lista */}
      <div className="space-y-2">
        {filtrados?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm">Nenhum aluno encontrado</p>
            <button onClick={onNovo} className="mt-3 text-sm font-medium" style={{color: '#00d4aa'}}>
              Cadastrar primeiro aluno →
            </button>
          </div>
        )}
        {filtrados?.map((aluno) => {
          const status = statusConfig[aluno.status] || statusConfig.ativo
          return (
            <div key={aluno.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{background: '#0a1628'}}>
                  {aluno.nome.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium" style={{color: '#0a1628'}}>{aluno.nome}</p>
                  <p className="text-xs text-gray-400">{aluno.email} {aluno.telefone && `• ${aluno.telefone}`}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden md:block text-right">
                  <p className="text-xs text-gray-400">Início</p>
                  <p className="text-xs font-medium" style={{color: '#0a1628'}}>
                    {new Date(aluno.data_inicio).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                {aluno.data_termino && (
                  <div className="hidden md:block text-right">
                    <p className="text-xs text-gray-400">Término</p>
                    <p className="text-xs font-medium" style={{color: '#0a1628'}}>
                      {new Date(aluno.data_termino).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                )}
                <span className="text-xs font-medium px-3 py-1 rounded-full" style={{background: status.bg, color: status.color}}>
                  {status.label}
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => onEditar(aluno)} className="p-2 rounded-lg hover:bg-gray-100 transition-all">
                    <Pencil size={15} color="#64748b" />
                  </button>
                  <button onClick={() => onDeletar(aluno.id)} className="p-2 rounded-lg hover:bg-red-50 transition-all">
                    <Trash2 size={15} color="#ef4444" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}