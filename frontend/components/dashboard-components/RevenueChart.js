'use client'
import { TrendingUp } from 'lucide-react'

export default function RevenueChart({ receitasMensais, plataformas }) {
  const maxMensal = Math.max(...(receitasMensais?.map(r => r.valor) || [1]))
  const maxPlataforma = Math.max(...(plataformas?.map(p => p.valor) || [1]))

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-lg" style={{color: '#0a1628'}}>Receita mensal</h2>
          <p className="text-sm text-gray-400">Últimos 6 meses</p>
        </div>
        <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full" style={{background: '#e6faf6', color: '#00a884'}}>
          <TrendingUp size={12} />
          +18% semestre
        </div>
      </div>

      {/* Gráfico de barras mensal */}
      <div className="flex items-end gap-2 h-40 mb-6">
        {receitasMensais?.map((item) => (
          <div key={item.mes} className="flex-1 flex flex-col items-center gap-1">
            <p className="text-xs font-medium" style={{color: '#0a1628'}}>
              {item.valor >= 1000 ? `${(item.valor/1000).toFixed(1)}k` : item.valor}
            </p>
            <div
              className="w-full rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
              style={{
                height: `${(item.valor / maxMensal) * 120}px`,
                background: 'linear-gradient(180deg, #00d4aa, #0a1628)',
                minHeight: '4px'
              }}
            />
            <p className="text-xs text-gray-400">{item.mes}</p>
          </div>
        ))}
      </div>

      {/* Divisor */}
      <div className="border-t border-gray-50 pt-6">
        <p className="text-sm font-medium mb-4" style={{color: '#0a1628'}}>Por plataforma este mês</p>
        <div className="space-y-3">
          {plataformas?.map((p) => (
            <div key={p.nome} className="flex items-center gap-3">
              <p className="text-xs text-gray-500 w-20">{p.nome}</p>
              <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(p.valor / maxPlataforma) * 100}%`,
                    background: p.cor
                  }}
                />
              </div>
              <p className="text-xs font-medium w-16 text-right" style={{color: '#0a1628'}}>
                R$ {p.valor.toLocaleString('pt-BR')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}