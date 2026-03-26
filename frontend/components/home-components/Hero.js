import Link from 'next/link'
import { ArrowRight, BarChart2, FileText, Calendar } from 'lucide-react'

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full mb-6" style={{background: '#e6faf6', color: '#00a884'}}>
            <span className="w-1.5 h-1.5 rounded-full" style={{background: '#00d4aa'}} />
            Feito para criadores digitais e MEI brasileiros
          </span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6" style={{color: '#0a1628'}}>
            Sua gestão financeira{' '}
            <span className="text-transparent bg-clip-text" style={{backgroundImage: 'linear-gradient(135deg, #0a1628, #00d4aa)'}}>
              no piloto automático
            </span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-xl">
            Controle receitas de todas as plataformas, emita notas fiscais automaticamente e nunca perca um prazo do MEI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/register" className="inline-flex items-center justify-center gap-2 text-white px-8 py-4 rounded-xl transition-all font-medium text-lg" style={{background: '#0a1628', boxShadow: '0 10px 30px rgba(10,22,40,0.2)'}}>
              Criar conta grátis
              <ArrowRight size={20} />
            </Link>
            <a href="#pricing" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl transition-all font-medium text-lg" style={{background: '#e6faf6', color: '#0a1628'}}>
              Ver planos
            </a>
          </div>
          <p className="text-sm text-gray-400 mt-4">Sem cartão de crédito. Cancele quando quiser.</p>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-20 pt-10 border-t border-gray-100 max-w-lg">
          {[
            { icon: BarChart2, value: "+2mil", label: "Criadores ativos", color: '#00d4aa' },
            { icon: FileText, value: "R$0", label: "Para começar", color: '#3b82f6' },
            { icon: Calendar, value: "100%", label: "MEI compliant", color: '#8b5cf6' },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="flex flex-col gap-2">
                <Icon size={20} color={stat.color} />
                <p className="text-2xl font-bold" style={{color: '#0a1628'}}>{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}