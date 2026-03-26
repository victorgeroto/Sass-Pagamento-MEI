import { Users, UserCheck, UserX, PauseCircle } from 'lucide-react'

export default function AlunosCards({ resumo }) {
  const cards = [
    { icon: Users,       label: 'Total de alunos', value: resumo?.total,    color: '#0a1628', bg: '#f8fafc' },
    { icon: UserCheck,   label: 'Ativos',          value: resumo?.ativos,   color: '#00d4aa', bg: '#e6faf6' },
    { icon: PauseCircle, label: 'Pausados',         value: resumo?.pausados, color: '#f59e0b', bg: '#fffbeb' },
    { icon: UserX,       label: 'Inativos',         value: resumo?.inativos, color: '#ef4444', bg: '#fff1f2' },
  ]

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div key={card.label} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{background: card.bg}}>
              <Icon size={20} color={card.color} />
            </div>
            <p className="text-sm text-gray-400 mb-1">{card.label}</p>
            <p className="text-3xl font-bold" style={{color: '#0a1628'}}>{card.value ?? 0}</p>
          </div>
        )
      })}
    </div>
  )
}