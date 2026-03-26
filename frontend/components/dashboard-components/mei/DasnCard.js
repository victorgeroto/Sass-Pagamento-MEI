import { FileText, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react'

export default function DasnCard({ dasn }) {
  const urgente = dasn?.dias_restantes <= 30
  const entregue = dasn?.status === 'entregue'

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-lg" style={{color: '#0a1628'}}>Declaração Anual</h2>
          <p className="text-sm text-gray-400">DASN-SIMEI {dasn?.ano_referencia}</p>
        </div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: entregue ? '#e6faf6' : '#f5f3ff'}}>
          <FileText size={20} color={entregue ? '#00a884' : '#8b5cf6'} />
        </div>
      </div>

      {/* Status */}
      <div className="p-4 rounded-xl mb-5" style={{
        background: entregue ? '#e6faf6' : urgente ? '#fff1f2' : '#f5f3ff',
        border: `1px solid ${entregue ? '#6ee7b7' : urgente ? '#fecaca' : '#ddd6fe'}`
      }}>
        <div className="flex items-center gap-3">
          {entregue
            ? <CheckCircle size={20} color="#00a884" />
            : <AlertCircle size={20} color={urgente ? '#ef4444' : '#8b5cf6'} />
          }
          <div>
            <p className="text-sm font-semibold" style={{color: '#0a1628'}}>
              {entregue ? 'Declaração entregue!' : `Entrega até ${dasn?.prazo}`}
            </p>
            <p className="text-xs text-gray-400">
              {entregue
                ? `DASN-SIMEI ${dasn?.ano_referencia} entregue com sucesso`
                : `${dasn?.dias_restantes} dias restantes para entregar`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Informações */}
      <div className="space-y-3 mb-5">
        {[
          { label: 'Ano de referência', value: dasn?.ano_referencia },
          { label: 'Prazo de entrega', value: dasn?.prazo },
          { label: 'Dias restantes', value: `${dasn?.dias_restantes} dias` },
          { label: 'Status', value: entregue ? 'Entregue' : 'Pendente' },
        ].map((info) => (
          <div key={info.label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
            <span className="text-sm text-gray-400">{info.label}</span>
            <span className="text-sm font-medium" style={{color: '#0a1628'}}>{info.value}</span>
          </div>
        ))}
      </div>

      {/* Botão */}
      {!entregue && (
        <a
          href="https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/servicos-para-mei/declaracao-anual-do-simei"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium transition-all"
          style={{background: '#0a1628', color: 'white'}}
        >
          <ExternalLink size={15} />
          Fazer declaração no Gov.br
        </a>
      )}
    </div>
  )
}