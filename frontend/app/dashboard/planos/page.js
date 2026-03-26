'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/dashboard-components/Sidebar'
import Header from '@/components/dashboard-components/Header'
import CardsPlanos from '@/components/dashboard-components/planos/CardsPlanos'
import ComparativoPlanos from '@/components/dashboard-components/planos/ComparativoPlanos'
import FaqPlanos from '@/components/dashboard-components/planos/FaqPlanos'

export default function Planos() {
  const router = useRouter()
  const [dados, setDados] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/login'); return }

    fetch('http://localhost:8000/planos-dashboard/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => { if (res.status === 401) { router.push('/login'); return } return res.json() })
      .then((data) => { setDados(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function handleAssinar(plano) {
    if (plano.preco === 0) return
    const token = localStorage.getItem('token')
    const res = await fetch(`http://localhost:8000/pagamentos/criar-sessao/${plano.id}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: '#f8fffe'}}>
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-2 animate-spin mx-auto mb-4" style={{borderColor: '#00d4aa', borderTopColor: 'transparent'}} />
          <p className="text-sm text-gray-400">Carregando planos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{background: '#f8fffe'}}>
      <Sidebar />
      <main className="ml-64 p-8">
        <Header titulo="Planos" usuario={dados?.usuario} />

        {/* Hero */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-2" style={{color: '#0a1628'}}>
            Escolha o plano ideal para você
          </h2>
          <p className="text-gray-400">Sem contratos. Cancele quando quiser.</p>
        </div>

        <CardsPlanos
          planos={dados?.planos}
          planoAtual={dados?.plano_atual}
          onAssinar={handleAssinar}
        />
        <ComparativoPlanos />
        <FaqPlanos faq={dados?.faq} />
      </main>
    </div>
  )
}