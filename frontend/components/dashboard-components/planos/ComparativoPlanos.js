import { Check, X } from 'lucide-react'
import { Fragment } from 'react'

const recursos = [
  { categoria: "Dashboard",   itens: [
    { nome: "Dashboard básico",         free: true,  basic: true,  premium: true  },
    { nome: "Plataformas ilimitadas",   free: false, basic: true,  premium: true  },
    { nome: "Histórico completo",       free: false, basic: true,  premium: true  },
    { nome: "Gráficos de receita",      free: false, basic: true,  premium: true  },
  ]},
  { categoria: "Financeiro",  itens: [
    { nome: "Últimas 5 transações",     free: true,  basic: true,  premium: true  },
    { nome: "Exportação PDF/Excel",     free: false, basic: true,  premium: true  },
    { nome: "Relatórios personalizados",free: false, basic: false, premium: true  },
    { nome: "Nota fiscal automática",   free: false, basic: false, premium: true  },
  ]},
  { categoria: "Alunos",      itens: [
    { nome: "Até 10 alunos",            free: true,  basic: true,  premium: true  },
    { nome: "Até 50 alunos",            free: false, basic: true,  premium: true  },
    { nome: "Alunos ilimitados",        free: false, basic: false, premium: true  },
  ]},
  { categoria: "MEI",         itens: [
    { nome: "Alerta básico DAS",        free: true,  basic: true,  premium: true  },
    { nome: "Alertas avançados MEI",    free: false, basic: true,  premium: true  },
  ]},
  { categoria: "Suporte",     itens: [
    { nome: "Suporte por email",        free: true,  basic: true,  premium: true  },
    { nome: "Suporte via WhatsApp",     free: false, basic: false, premium: true  },
    { nome: "Consultoria mensal",       free: false, basic: false, premium: true  },
  ]},
]

function Celula({ valor }) {
  return (
    <td className="py-3 text-center">
      <div className="flex justify-center">
        {valor
          ? <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{background: '#e6faf6'}}><Check size={13} color="#00a884" /></div>
          : <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{background: '#f8fafc'}}><X size={13} color="#94a3b8" /></div>
        }
      </div>
    </td>
  )
}

export default function ComparativoPlanos() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-10">
      <div className="p-6 border-b border-gray-50">
        <h2 className="font-bold text-lg" style={{color: '#0a1628'}}>Comparativo de recursos</h2>
        <p className="text-sm text-gray-400">Veja o que cada plano oferece em detalhes</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{background: '#f8fafc'}}>
              <th className="text-left py-4 px-6 text-sm font-medium" style={{color: '#64748b', width: '45%'}}>Recurso</th>
              <th className="py-4 text-sm font-bold text-center" style={{color: '#64748b'}}>Free</th>
              <th className="py-4 text-sm font-bold text-center" style={{color: '#0a1628'}}>Basic</th>
              <th className="py-4 text-sm font-bold text-center" style={{color: '#00a884'}}>Premium</th>
            </tr>
          </thead>
          <tbody>
            {recursos.map((grupo) => (
              <Fragment key={grupo.categoria}>
                <tr style={{background: '#f8fffe'}}>
                  <td colSpan={4} className="py-2 px-6 text-xs font-bold uppercase tracking-wider" style={{color: '#00a884'}}>
                    {grupo.categoria}
                  </td>
                </tr>
                {grupo.itens.map((item) => (
                  <tr key={`${grupo.categoria}-${item.nome}`} className="border-t border-gray-50 hover:bg-gray-50 transition-all">
                    <td className="py-3 px-6 text-sm" style={{color: '#0a1628'}}>{item.nome}</td>
                    <Celula valor={item.free} />
                    <Celula valor={item.basic} />
                    <Celula valor={item.premium} />
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}