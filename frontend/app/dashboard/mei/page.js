'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/dashboard-components/Sidebar'
import Header from '@/components/dashboard-components/Header'
import FaturamentoMEI from '@/components/dashboard-components/mei/FaturamentoMEI'
import ControleDAS from '@/components/dashboard-components/mei/ControleDAS'
import DasnCard from '@/components/dashboard-components/mei/DasnCard'
import AlertasMEI from '@/components/dashboard-components/mei/AlertasMEI'

export default function MEI() {
  const router = useRouter()
  const [dados, setDados] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/login'); return }

    fetch('http://localhost:8000/mei/resumo', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => { if (res.status === 401) { router.push('/login'); return } return res.json() })
      .then((data) => { setDados(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: '#f8fffe'}}>
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-2 animate-spin mx-auto mb-4" style={{borderColor: '#00d4aa', borderTopColor: 'transparent'}} />
          <p className="text-sm text-gray-400">Carregando MEI...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{background: '#f8fffe'}}>
      <Sidebar />
      <main className="ml-64 p-8">
        <Header titulo="MEI" usuario={dados?.usuario} />
        <AlertasMEI alertas={dados?.alertas} />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <FaturamentoMEI faturamento={dados?.faturamento} />
            <ControleDAS das={dados?.das} />
          </div>
          <div>
            <DasnCard dasn={dados?.dasn} />
          </div>
        </div>
      </main>
    </div>
  )
}