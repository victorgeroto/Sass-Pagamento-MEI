import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-20 px-6" style={{background: '#0a1628'}}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Chega de planilha. Comece agora.
        </h2>
        <p className="text-lg mb-8" style={{color: '#94a3b8'}}>
          Junte-se a mais de 2.000 criadores que já colocaram a gestão financeira no piloto automático.
        </p>
        <Link href="/register" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-lg transition-all" style={{background: '#00d4aa', color: '#0a1628', boxShadow: '0 10px 30px rgba(0,212,170,0.3)'}}>
          Criar conta grátis
          <ArrowRight size={20} />
        </Link>
        <p className="text-sm mt-4" style={{color: '#475569'}}>Sem cartão de crédito. Cancele quando quiser.</p>
      </div>
    </section>
  )
}