import { TrendingUp, TrendingDown, DollarSign, ArrowLeftRight } from 'lucide-react'

export default function FinanceiroCards({ resumo }) {
  const cards = [
    {
      icon: TrendingUp,
      label: 'Total entradas',
      value: `R$ ${resumo?.total_entradas?.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`,
      color: '#00d4aa',
      bg: '#e6faf6',
    },
    {
      icon: TrendingDown,
      label: 'Total saídas',
      value: `R$ ${resumo?.total_saidas?.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`,
      color: '#ef4444',
      bg: '#fff1f2',
    },
    {
      icon: DollarSign,
      label: 'Saldo do mês',
      value: `R$ ${resumo?.saldo?.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`,
      color: '#3b82f6',
      bg: '#eff6ff',
    },
    {
      icon: ArrowLeftRight,
      label: 'Transações',
      value: resumo?.total_transacoes,
      color: '#8b5cf6',
      bg: '#f5f3ff',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div key={card.label} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{background: card.bg}}>
              <Icon size={20} color={card.color} />
            </div>
            <p className="text-sm text-gray-400 mb-1">{card.label}</p>
            <p className="text-2xl font-bold" style={{color: '#0a1628'}}>{card.value}</p>
          </div>
        )
      })}
    </div>
  )
}