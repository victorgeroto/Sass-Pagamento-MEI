import { AlertCircle, CheckCircle, TrendingUp } from 'lucide-react'

export default function MeiProgress({ resumo, das }) {
  const percentual = resumo?.percentual_mei || 0
  const cor = percentual < 50 ? '#00d4aa' : percentual < 80 ? '#f59e0b' : '#ef4444'

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-lg" style={{color: '#0a1628'}}>Limite MEI</h2>
          <p className="text-sm text-gray-400">Faturamento anual</p>
        </div>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background: '#f5f3ff'}}>
          <TrendingUp size={18} color="#8b5cf6" />
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>R$ {resumo?.faturamento_anual?.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
          <span>R$ {resumo?.limite_mei?.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{width: `${percentual}%`, background: cor}}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">{percentual}% do limite anual utilizado</p>
      </div>

      {/* Alerta DAS */}
      <div className="p-4 rounded-xl mt-4" style={{
        background: das?.dias_para_vencer <= 5 ? '#fff1f2' : '#fffbeb',
        border: `1px solid ${das?.dias_para_vencer <= 5 ? '#fecaca' : '#fde68a'}`
      }}>
        <div className="flex items-center gap-3">
          {das?.dias_para_vencer <= 5
            ? <AlertCircle size={18} color="#ef4444" />
            : <AlertCircle size={18} color="#f59e0b" />
          }
          <div>
            <p className="text-sm font-medium" style={{color: '#0a1628'}}>
              DAS vence em {das?.dias_para_vencer} dias
            </p>
            <p className="text-xs text-gray-400">
              {das?.data_vencimento} • R$ {das?.valor?.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}