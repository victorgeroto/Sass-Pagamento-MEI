import { PieChart } from 'lucide-react'

const cores = {
  Infoproduto: '#0a1628',
  Mentoria: '#00d4aa',
  Publicidade: '#3b82f6',
  Imposto: '#ef4444',
  Ferramenta: '#f59e0b',
  Infraestrutura: '#8b5cf6',
}

export default function CategoriasChart({ porCategoria }) {
  const total = porCategoria?.reduce((acc, c) => acc + c.valor, 0) || 1

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background: '#f5f3ff'}}>
          <PieChart size={18} color="#8b5cf6" />
        </div>
        <div>
          <h2 className="font-bold" style={{color: '#0a1628'}}>Por categoria</h2>
          <p className="text-xs text-gray-400">Entradas do mês</p>
        </div>
      </div>

      <div className="space-y-3">
        {porCategoria?.map((item) => {
          const percentual = ((item.valor / total) * 100).toFixed(1)
          const cor = cores[item.categoria] || '#94a3b8'
          return (
            <div key={item.categoria}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium" style={{color: '#0a1628'}}>{item.categoria}</span>
                <span className="text-gray-400">{percentual}% • R$ {item.valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{width: `${percentual}%`, background: cor}}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}