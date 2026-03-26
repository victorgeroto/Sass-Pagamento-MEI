'use client'
import { X } from 'lucide-react'
import { useState, useEffect } from 'react'

const inputStyle = {
  base: "w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm transition-all",
  focus: "#00d4aa",
  blur: "#e5e7eb"
}

export default function ModalAluno({ aberto, onFechar, onSalvar, alunoEditando }) {
  const [form, setForm] = useState({
    nome: '', email: '', telefone: '', status: 'ativo', data_inicio: '', data_termino: ''
  })

  useEffect(() => {
    if (alunoEditando) {
      setForm({
        nome: alunoEditando.nome || '',
        email: alunoEditando.email || '',
        telefone: alunoEditando.telefone || '',
        status: alunoEditando.status || 'ativo',
        data_inicio: alunoEditando.data_inicio || '',
        data_termino: alunoEditando.data_termino || '',
      })
    } else {
      setForm({ nome: '', email: '', telefone: '', status: 'ativo', data_inicio: '', data_termino: '' })
    }
  }, [alunoEditando, aberto])

  if (!aberto) return null

  function handleSubmit(e) {
    e.preventDefault()
    onSalvar(form)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background: 'rgba(0,0,0,0.5)'}}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-bold text-lg" style={{color: '#0a1628'}}>
            {alunoEditando ? 'Editar aluno' : 'Novo aluno'}
          </h2>
          <button onClick={onFechar} className="p-2 rounded-xl hover:bg-gray-100 transition-all">
            <X size={18} color="#64748b" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{color: '#0a1628'}}>Nome completo</label>
            <input
              type="text" required value={form.nome}
              onChange={(e) => setForm({...form, nome: e.target.value})}
              placeholder="Nome do aluno"
              className={inputStyle.base}
              onFocus={(e) => e.target.style.borderColor = inputStyle.focus}
              onBlur={(e) => e.target.style.borderColor = inputStyle.blur}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{color: '#0a1628'}}>Email</label>
            <input
              type="email" required value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              placeholder="email@exemplo.com"
              className={inputStyle.base}
              onFocus={(e) => e.target.style.borderColor = inputStyle.focus}
              onBlur={(e) => e.target.style.borderColor = inputStyle.blur}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{color: '#0a1628'}}>Telefone</label>
            <input
              type="text" value={form.telefone}
              onChange={(e) => setForm({...form, telefone: e.target.value})}
              placeholder="(11) 99999-9999"
              className={inputStyle.base}
              onFocus={(e) => e.target.style.borderColor = inputStyle.focus}
              onBlur={(e) => e.target.style.borderColor = inputStyle.blur}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{color: '#0a1628'}}>Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({...form, status: e.target.value})}
              className={inputStyle.base}
              style={{cursor: 'pointer'}}
            >
              <option value="ativo">Ativo</option>
              <option value="pausado">Pausado</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{color: '#0a1628'}}>Data início</label>
              <input
                type="date" required value={form.data_inicio}
                onChange={(e) => setForm({...form, data_inicio: e.target.value})}
                className={inputStyle.base}
                onFocus={(e) => e.target.style.borderColor = inputStyle.focus}
                onBlur={(e) => e.target.style.borderColor = inputStyle.blur}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{color: '#0a1628'}}>Data término</label>
              <input
                type="date" value={form.data_termino}
                onChange={(e) => setForm({...form, data_termino: e.target.value})}
                className={inputStyle.base}
                onFocus={(e) => e.target.style.borderColor = inputStyle.focus}
                onBlur={(e) => e.target.style.borderColor = inputStyle.blur}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onFechar} className="flex-1 py-3 rounded-xl text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-all" style={{color: '#64748b'}}>
              Cancelar
            </button>
            <button type="submit" className="flex-1 py-3 rounded-xl text-sm font-medium text-white transition-all" style={{background: '#0a1628'}}>
              {alunoEditando ? 'Salvar alterações' : 'Cadastrar aluno'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}