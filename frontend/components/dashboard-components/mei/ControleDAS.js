import { CheckCircle, Clock, AlertCircle, Circle, ExternalLink } from 'lucide-react'

const statusConfig = {
  pago:     { icon: CheckCircle, label: 'Pago',    color: '#00a884', bg: '#e6faf6' },
  pendente: { icon: AlertCircle, label: 'Pendente', color: '#f59e0b', bg: '#fffbeb' },
  vencido:  { icon: AlertCircle, label: 'Vencido',  color: '#ef4444', bg: '#fff1f2' },
  futuro:   { icon: Circle,      label: 'Futuro',   color: '#94a3b8', bg: '#f8fafc' },
}

export default function ControleDAS({ das }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-lg" style={{color: '#0a1628'}}>Controle do DAS</h2>
          <p className="text-sm text-gray-400">Contribuição mensal MEI</p>
        </div>
        <a
          href="https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/servicos-para-mei/boleto-mei"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all"
          style={{color: '#64748b'}}
        >
          <ExternalLink size={13} />
          Gerar boleto
        </a>
      </div>

      {/* Próximo DAS */}
      <div className="p-4 rounded-xl mb-6" style={{
        background: das?.dias_para_vencer <= 5 ? '#fff1f2' : '#fffbeb',
        border: `1px solid ${das?.dias_para_vencer <= 5 ? '#fecaca' : '#fde68a'}`
      }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock size={18} color={das?.dias_para_vencer <= 5 ? '#ef4444' : '#f59e0b'} />
            <div>
              <p className="text-sm font-semibold" style={{color: '#0a1628'}}>
                Próximo DAS — R$ {das?.valor_mensal?.toFixed(2)}
              </p>
              <p className="text-xs text-gray-400">
                Vence em {das?.data_vencimento} • {das?.dias_para_vencer} dias restantes
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full" style={{
            background: das?.dias_para_vencer <= 5 ? '#fee2e2' : '#fef9c3',
            color: das?.dias_para_vencer <= 5 ? '#ef4444' : '#ca8a04'
          }}>
            {das?.dias_para_vencer <= 5 ? 'Urgente' : 'Pendente'}
          </span>
        </div>
      </div>

      {/* Total pago no ano */}
      <div className="flex items-center justify-between p-4 rounded-xl mb-6" style={{background: '#f8fafc'}}>
        <p className="text-sm text-gray-500">Total pago em {new Date().getFullYear()}</p>
        <p className="text-sm font-bold" style={{color: '#0a1628'}}>
          R$ {das?.total_pago_ano?.toFixed(2)}
        </p>
      </div>

      {/* Histórico */}
      <div>
        <p className="text-sm font-medium mb-3" style={{color: '#0a1628'}}>Histórico {new Date().getFullYear()}</p>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {das?.historico?.map((item) => {
            const config = statusConfig[item.status] || statusConfig.futuro
            const Icon = config.icon
            return (
              <div key={item.mes} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: config.bg}}>
                    <Icon size={15} color={config.color} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{color: '#0a1628'}}>{item.mes}</p>
                    <p className="text-xs text-gray-400">Venc. {item.vencimento}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium" style={{color: '#0a1628'}}>R$ {item.valor.toFixed(2)}</p>
                  <span className="text-xs font-medium" style={{color: config.color}}>{config.label}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}