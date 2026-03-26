'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/dashboard-components/Sidebar'
import Header from '@/components/dashboard-components/Header'
import StatsCards from '@/components/dashboard-components/StatsCards'
import RevenueChart from '@/components/dashboard-components/RevenueChart'
import RecentTransactions from '@/components/dashboard-components/RecentTransactions'
import MeiProgress from '@/components/dashboard-components/MeiProgress'

export default function Dashboard() {
  const router = useRouter()
  const [dados, setDados] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    fetch('http://localhost:8000/dashboard/resumo', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        if (res.status === 401) {
          router.push('/login')
          return
        }
        return res.json()
      })
      .then((data) => {
        setDados(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: '#f8fffe'}}>
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-4" style={{borderColor: '#00d4aa', borderTopColor: 'transparent'}} />
          <p className="text-sm text-gray-400">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{background: '#f8fffe'}}>
      <Sidebar />
      <main className="ml-64 p-8">
        <Header titulo="Dashboard" usuario={dados?.usuario} />
        <StatsCards resumo={dados?.resumo} das={dados?.das} />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <RevenueChart
              receitasMensais={dados?.receitas_mensais}
              plataformas={dados?.plataformas}
            />
          </div>
          <div>
            <MeiProgress resumo={dados?.resumo} das={dados?.das} />
            <RecentTransactions transacoes={dados?.transacoes} />
          </div>
        </div>
      </main>
    </div>
  )
}