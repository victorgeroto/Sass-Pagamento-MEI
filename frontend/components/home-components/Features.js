import { LayoutDashboard, RefreshCw, FileText, Bell, Shield, Zap } from 'lucide-react'

const features = [
  { icon: LayoutDashboard, title: "Dashboard unificado", desc: "Visualize receitas do YouTube, Hotmart, Kiwify e mentorias em um só painel atualizado em tempo real.", color: '#00d4aa', bg: '#e6faf6' },
  { icon: RefreshCw, title: "Assinaturas recorrentes", desc: "Crie planos mensais ou anuais e gerencie tudo automaticamente.", color: '#3b82f6', bg: '#eff6ff' },
  { icon: FileText, title: "Nota fiscal automática", desc: "Emita NFS-e automaticamente após cada venda. Fique em dia com a Receita sem esforço.", color: '#8b5cf6', bg: '#f5f3ff' },
  { icon: Bell, title: "Controle do MEI", desc: "Alertas de vencimento do DAS, limite de faturamento e declaração anual. Nunca perca um prazo.", color: '#f59e0b', bg: '#fffbeb' },
  { icon: Shield, title: "Antifraude integrado", desc: "Proteção inteligente contra transações suspeitas.", color: '#ef4444', bg: '#fff1f2' },
  { icon: Zap, title: "API poderosa", desc: "Integre com qualquer sistema usando nossa API REST documentada.", color: '#0a1628', bg: '#f8fafc' },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-6" style={{background: '#f8fffe'}}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: '#0a1628'}}>
            Tudo que um criador MEI precisa
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Pare de usar planilha. Gerencie seu negócio como os grandes.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="scroll-animate bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{background: feature.bg}}>
                  <Icon size={20} color={feature.color} />
                </div>
                <h3 className="font-semibold mb-2" style={{color: '#0a1628'}}>{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                <div className="mt-4 h-0.5 w-8 rounded-full" style={{background: feature.color}} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}