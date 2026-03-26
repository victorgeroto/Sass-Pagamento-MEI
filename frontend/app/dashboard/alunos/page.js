'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/dashboard-components/Sidebar'
import Header from '@/components/dashboard-components/Header'
import AlunosCards from '@/components/dashboard-components/alunos/AlunosCards'
import TabelaAlunos from '@/components/dashboard-components/alunos/TabelaAlunos'
import ModalAluno from '@/components/dashboard-components/alunos/ModalAluno'

export default function Alunos() {
  const router = useRouter()
  const [dados, setDados] = useState(null)
  const [loading, setLoading] = useState(true)
  const [modalAberto, setModalAberto] = useState(false)
  const [alunoEditando, setAlunoEditando] = useState(null)

  function getToken() {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/login'); return null }
    return token
  }

  async function carregarAlunos() {
    const token = getToken()
    if (!token) return
    const res = await fetch('http://localhost:8000/alunos/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (res.status === 401) { router.push('/login'); return }
    const data = await res.json()
    setDados(data)
    setLoading(false)
  }

  useEffect(() => { carregarAlunos() }, [])

  async function handleSalvar(form) {
    const token = getToken()
    if (!token) return
    const url = alunoEditando
      ? `http://localhost:8000/alunos/${alunoEditando.id}`
      : 'http://localhost:8000/alunos/'
    const method = alunoEditando ? 'PUT' : 'POST'
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form)
    })
    setModalAberto(false)
    setAlunoEditando(null)
    carregarAlunos()
  }

  async function handleDeletar(id) {
    if (!confirm('Remover este aluno?')) return
    const token = getToken()
    if (!token) return
    await fetch(`http://localhost:8000/alunos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    carregarAlunos()
  }

  function handleEditar(aluno) {
    setAlunoEditando(aluno)
    setModalAberto(true)
  }

  function handleNovo() {
    setAlunoEditando(null)
    setModalAberto(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: '#f8fffe'}}>
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-2 animate-spin mx-auto mb-4" style={{borderColor: '#00d4aa', borderTopColor: 'transparent'}} />
          <p className="text-sm text-gray-400">Carregando alunos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{background: '#f8fffe'}}>
      <Sidebar />
      <main className="ml-64 p-8">
        <Header titulo="Alunos" usuario={dados?.usuario} />
        <AlunosCards resumo={dados?.resumo} />
        <TabelaAlunos
          alunos={dados?.alunos}
          onNovo={handleNovo}
          onEditar={handleEditar}
          onDeletar={handleDeletar}
        />
      </main>
      <ModalAluno
        aberto={modalAberto}
        onFechar={() => { setModalAberto(false); setAlunoEditando(null) }}
        onSalvar={handleSalvar}
        alunoEditando={alunoEditando}
      />
    </div>
  )
}