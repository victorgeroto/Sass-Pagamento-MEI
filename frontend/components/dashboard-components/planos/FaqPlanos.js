'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FaqPlanos({ faq }) {
  const [aberto, setAberto] = useState(null)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-10">
      <div className="p-6 border-b border-gray-50">
        <h2 className="font-bold text-lg" style={{color: '#0a1628'}}>Perguntas frequentes</h2>
        <p className="text-sm text-gray-400">Tire suas dúvidas sobre os planos</p>
      </div>

      <div className="divide-y divide-gray-50">
        {faq?.map((item, i) => (
          <div key={i}>
            <button
              onClick={() => setAberto(aberto === i ? null : i)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-all"
            >
              <span className="text-sm font-medium pr-4" style={{color: '#0a1628'}}>{item.pergunta}</span>
              <ChevronDown
                size={18}
                color="#94a3b8"
                className="flex-shrink-0 transition-transform"
                style={{transform: aberto === i ? 'rotate(180deg)' : 'rotate(0deg)'}}
              />
            </button>
            {aberto === i && (
              <div className="px-6 pb-5">
                <p className="text-sm text-gray-500 leading-relaxed">{item.resposta}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}