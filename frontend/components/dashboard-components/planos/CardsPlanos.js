'use client'
import { Check, X, Zap, ArrowRight } from 'lucide-react'

export default function CardsPlanos({ planos, planoAtual, onAssinar }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {planos?.map((plano) => {
        const isAtual = plano.id === planoAtual
        const isDestaque = plano.destaque

        return (
          <div
            key={plano.id}
            className="relative rounded-2xl border transition-all hover:shadow-xl"
            style={{
              background: isDestaque ? '#0a1628' : 'white',
              borderColor: isDestaque ? '#00d4aa' : '#e5e7eb',
              transform: isDestaque ? 'scale(1.03)' : 'scale(1)',
            }}
          >
            {/* Badge destaque */}
            {isDestaque && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full" style={{background: '#00d4aa', color: '#0a1628'}}>
                  <Zap size={11} />
                  Mais popular
                </span>
              </div>
            )}

            <div className="p-6">
              {/* Header */}
              <div className="mb-6">
                <p className="text-sm font-medium mb-1" style={{color: isDestaque ? '#00d4aa' : '#64748b'}}>
                  {plano.descricao}
                </p>
                <h3 className="text-xl font-bold mb-3" style={{color: isDestaque ? 'white' : '#0a1628'}}>
                  {plano.nome}
                </h3>
                <div className="flex items-end gap-1">
                  {plano.preco === 0 ? (
                    <span className="text-4xl font-bold" style={{color: isDestaque ? 'white' : '#0a1628'}}>Grátis</span>
                  ) : (
                    <>
                      <span className="text-sm font-medium mt-2" style={{color: isDestaque ? '#94a3b8' : '#64748b'}}>R$</span>
                      <span className="text-4xl font-bold" style={{color: isDestaque ? 'white' : '#0a1628'}}>
                        {plano.preco.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-sm mb-1" style={{color: isDestaque ? '#94a3b8' : '#64748b'}}>/mês</span>
                    </>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {plano.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{
                      background: f.incluido ? (isDestaque ? '#00d4aa20' : '#e6faf6') : (isDestaque ? '#ffffff10' : '#f8fafc')
                    }}>
                      {f.incluido
                        ? <Check size={11} color="#00a884" />
                        : <X size={11} color="#94a3b8" />
                      }
                    </div>
                    <span className="text-sm" style={{
                      color: f.incluido
                        ? (isDestaque ? '#e2e8f0' : '#0a1628')
                        : (isDestaque ? '#475569' : '#94a3b8'),
                      textDecoration: f.incluido ? 'none' : 'none',
                    }}>
                      {f.texto}
                    </span>
                  </div>
                ))}
              </div>

              {/* Botão */}
              {isAtual ? (
                <div className="w-full py-3 rounded-xl text-sm font-medium text-center" style={{
                  background: isDestaque ? '#ffffff15' : '#f8fafc',
                  color: isDestaque ? '#94a3b8' : '#64748b'
                }}>
                  ✓ Plano atual
                </div>
              ) : (
                <button
                  onClick={() => onAssinar(plano)}
                  className="w-full py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 hover:opacity-90"
                  style={{
                    background: isDestaque ? '#00d4aa' : '#0a1628',
                    color: isDestaque ? '#0a1628' : 'white',
                  }}
                >
                  {plano.preco === 0 ? 'Usar grátis' : `Assinar ${plano.nome}`}
                  <ArrowRight size={15} />
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}