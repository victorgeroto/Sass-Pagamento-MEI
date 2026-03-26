import { TrendingUp, AlertCircle } from 'lucide-react'

export default function FaturamentoMEI({ faturamento }) {
  const percentual = faturamento?.percentual || 0
  const cor = percentual < 50 ? '#00d4aa' : percentual < 75 ? '#f59e0b' : '#ef4444'
  const bgCor = percentual < 50 ? '#e6faf6' : percentual < 75 ? '#fffbeb' : '#fff1f2'

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-lg" style={{color: '#0a1628'}}>Faturamento anual</h2>
          <p className="text-sm text-gray-400">Limite MEI 2026</p>
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: '#eff6ff'}}>
          <TrendingUp size={20} color="#3b82f6" />
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-bold text-2xl" style={{color: '#0a1628'}}>
            R$ {faturamento?.anual?.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
          </span>
          <span className="text-gray-400 text-sm self-end">
            de R$ {faturamento?.limite?.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
          </span>
        </div>
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{width: `${percentual}%`, background: cor}}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs font-medium" style={{color: cor}}>{percentual}% utilizado</span>
          <span className="text-xs text-gray-400">
            Restam R$ {faturamento?.restante?.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
          </span>
        </div>
      </div>

      {/* Faturamento mensal */}
      <div className="border-t border-gray-50 pt-5">
        <p className="text-sm font-medium mb-4" style={{color: '#0a1628'}}>Por mês em {new Date().getFullYear()}</p>
        <div className="flex items-end gap-2 h-24">
          {faturamento?.mensal?.map((item) => {
            const max = Math.max(...(faturamento?.mensal?.map(m => m.valor) || [1]))
            return (
              <div key={item.mes} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg"
                  style={{height: `${(item.valor / max) * 72}px`, background: 'linear-gradient(180deg, #00d4aa, #0a1628)', minHeight: '4px'}}
                />
                <p className="text-xs text-gray-400">{item.mes}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Alerta */}
      {percentual >= 75 && (
        <div className="mt-4 p-3 rounded-xl flex items-center gap-3" style={{background: bgCor}}>
          <AlertCircle size={16} color={cor} />
          <p className="text-xs font-medium" style={{color: cor}}>
            Atenção! Você está se aproximando do limite MEI.
          </p>
        </div>
      )}
    </div>
  )
}