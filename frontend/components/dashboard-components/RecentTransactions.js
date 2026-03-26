import { ShoppingCart, User, Play, FileText, ShoppingBag, ArrowUpRight, ArrowDownLeft } from 'lucide-react'

const icones = {
  Hotmart: ShoppingCart,
  Mentoria: User,
  YouTube: Play,
  MEI: FileText,
  Kiwify: ShoppingBag,
}

export default function RecentTransactions({ transacoes }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-lg" style={{color: '#0a1628'}}>Últimas transações</h2>
          <p className="text-sm text-gray-400">Movimentações recentes</p>
        </div>
        <button className="text-xs font-medium px-3 py-1.5 rounded-lg" style={{background: '#e6faf6', color: '#00a884'}}>
          Ver todas
        </button>
      </div>

      <div className="space-y-3">
        {transacoes?.map((tx, i) => {
          const Icon = icones[tx.plataforma] || ShoppingCart
          return (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{
                  background: tx.tipo === 'entrada' ? '#e6faf6' : '#fff1f2'
                }}>
                  <Icon size={16} color={tx.tipo === 'entrada' ? '#00a884' : '#ef4444'} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{color: '#0a1628'}}>{tx.descricao}</p>
                  <p className="text-xs text-gray-400">{tx.plataforma} • {tx.data}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {tx.tipo === 'entrada'
                  ? <ArrowUpRight size={14} color="#00a884" />
                  : <ArrowDownLeft size={14} color="#ef4444" />
                }
                <span className="text-sm font-bold" style={{color: tx.tipo === 'entrada' ? '#00a884' : '#ef4444'}}>
                  {tx.tipo === 'entrada' ? '+' : '-'}R$ {tx.valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}