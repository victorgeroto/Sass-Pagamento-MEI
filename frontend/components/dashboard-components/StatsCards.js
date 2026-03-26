import { TrendingUp, Users, AlertCircle, BarChart2 } from 'lucide-react'

export default function StatsCards({ resumo, das }) {
  const stats = [
    {
      icon: TrendingUp,
      label: 'Receita do mês',
      value: `R$ ${resumo?.receita_mes?.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`,
      change: '+12% vs mês anterior',
      positive: true,
      color: '#00d4aa',
      bg: '#e6faf6',
    },
    {
      icon: Users,
      label: 'Alunos ativos',
      value: resumo?.alunos_ativos,
      change: '+3 novos este mês',
      positive: true,
      color: '#3b82f6',
      bg: '#eff6ff',
    },
    {
      icon: AlertCircle,
      label: 'DAS vencendo',
      value: `${das?.dias_para_vencer} dias`,
      change: `Vence em ${das?.data_vencimento}`,
      positive: das?.dias_para_vencer > 5,
      color: das?.dias_para_vencer > 5 ? '#f59e0b' : '#ef4444',
      bg: das?.dias_para_vencer > 5 ? '#fffbeb' : '#fff1f2',
    },
    {
      icon: BarChart2,
      label: 'Faturamento anual',
      value: `R$ ${resumo?.faturamento_anual?.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`,
      change: `${resumo?.percentual_mei}% do limite MEI`,
      positive: resumo?.percentual_mei < 80,
      color: '#8b5cf6',
      bg: '#f5f3ff',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: stat.bg}}>
                <Icon size={20} color={stat.color} />
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full" style={{
                background: stat.positive ? '#e6faf6' : '#fff1f2',
                color: stat.positive ? '#00a884' : '#ef4444'
              }}>
                {stat.positive ? '↑' : '⚠'}
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold mb-1" style={{color: '#0a1628'}}>{stat.value}</p>
            <p className="text-xs" style={{color: stat.positive ? '#00a884' : '#ef4444'}}>{stat.change}</p>
          </div>
        )
      })}
    </div>
  )
}