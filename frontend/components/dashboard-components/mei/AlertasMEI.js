import { AlertCircle, TrendingUp, FileText, Info } from 'lucide-react'

const urgenciaConfig = {
  alta:  { color: '#ef4444', bg: '#fff1f2', border: '#fecaca' },
  media: { color: '#f59e0b', bg: '#fffbeb', border: '#fde68a' },
  baixa: { color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe' },
}

const tipoIcon = {
  das:          AlertCircle,
  dasn:         FileText,
  faturamento:  TrendingUp,
}

export default function AlertasMEI({ alertas }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 mb-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background: '#fff1f2'}}>
          <Info size={18} color="#ef4444" />
        </div>
        <div>
          <h2 className="font-bold" style={{color: '#0a1628'}}>Alertas importantes</h2>
          <p className="text-xs text-gray-400">{alertas?.length} avisos ativos</p>
        </div>
      </div>

      <div className="space-y-3">
        {alertas?.map((alerta, i) => {
          const config = urgenciaConfig[alerta.urgencia] || urgenciaConfig.baixa
          const Icon = tipoIcon[alerta.tipo] || AlertCircle
          return (
            <div key={i} className="p-4 rounded-xl border" style={{background: config.bg, borderColor: config.border}}>
              <div className="flex items-start gap-3">
                <Icon size={17} color={config.color} className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold" style={{color: '#0a1628'}}>{alerta.titulo}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{alerta.descricao}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}