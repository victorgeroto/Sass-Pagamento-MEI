import Link from 'next/link'

const plans = [
  {
    name: "Free", price: "R$ 0", period: "/mês",
    desc: "Para quem está começando",
    features: ["Até 50 lançamentos/mês", "1 fonte de receita", "Dashboard básico", "Alertas do MEI"],
    cta: "Começar grátis", highlight: false,
  },
  {
    name: "Basic", price: "R$ 29", period: "/mês",
    desc: "Para criadores em crescimento",
    features: ["Lançamentos ilimitados", "Múltiplas fontes de receita", "Gestão de alunos", "Relatórios mensais", "Suporte prioritário"],
    cta: "Assinar Basic", highlight: true,
  },
  {
    name: "Premium", price: "R$ 99", period: "/mês",
    desc: "Para grandes operações",
    features: ["Tudo do Basic", "Nota fiscal automática", "Integração Hotmart/Kiwify", "Exportação para contador", "Gerente de conta"],
    cta: "Assinar Premium", highlight: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: '#0a1628'}}>
            Planos para cada fase da sua carreira
          </h2>
          <p className="text-gray-500 text-lg">Comece grátis e escale conforme crescer.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className="scroll-animate p-8 rounded-2xl border transition-all h-full flex flex-col"
              style={plan.highlight ? {
                background: '#0a1628',
                borderColor: '#0a1628',
                boxShadow: '0 20px 60px rgba(10,22,40,0.3)'
              } : {
                background: 'white',
                borderColor: '#e5e7eb'
              }}>
              {plan.highlight && (
                <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4" style={{background: '#00d4aa', color: '#0a1628'}}>
                  MAIS POPULAR
                </span>
              )}
              <h3 className="font-bold text-xl mb-1" style={{color: plan.highlight ? 'white' : '#0a1628'}}>{plan.name}</h3>
              <p className="text-sm mb-4" style={{color: plan.highlight ? '#00d4aa' : '#9ca3af'}}>{plan.desc}</p>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-bold" style={{color: plan.highlight ? 'white' : '#0a1628'}}>{plan.price}</span>
                <span className="text-sm mb-1" style={{color: plan.highlight ? '#00d4aa' : '#9ca3af'}}>{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#00d4aa'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span style={{color: plan.highlight ? '#94a3b8' : '#4b5563'}}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/register" className="block text-center py-3 rounded-xl font-medium transition-all mt-auto"
                style={plan.highlight ? {background: '#00d4aa', color: '#0a1628'} : {background: '#f8fffe', color: '#0a1628'}}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}