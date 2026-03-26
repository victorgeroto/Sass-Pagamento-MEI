import { BarChart2, DollarSign, Star, AlertCircle } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="py-20 px-6" style={{background: '#f8fffe'}}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full mb-6" style={{background: '#e6faf6', color: '#00a884'}}>
              <span className="w-1.5 h-1.5 rounded-full" style={{background: '#00d4aa'}} />
              Nossa história
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: '#0a1628'}}>
              Criado por criadores,{' '}
              <span className="text-transparent bg-clip-text" style={{backgroundImage: 'linear-gradient(135deg, #0a1628, #00d4aa)'}}>
                para criadores
              </span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              O CreatorFlow nasceu de uma dor real. Vimos criadores incríveis perdendo dinheiro, pagando multas e até fechando o MEI por falta de organização financeira.
            </p>
            <p className="text-gray-500 leading-relaxed mb-4">
              A maioria das ferramentas financeiras foi feita para empresas grandes, com linguagem complicada e processos burocráticos. Nenhuma foi pensada para quem vive de conteúdo, mentoria e infoprodutos.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Nossa missão é simples: deixar a parte chata do seu negócio no piloto automático para que você possa focar no que realmente importa — criar.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: BarChart2, value: "+2.000", label: "Criadores ativos", color: '#00d4aa', bg: '#e6faf6' },
                { icon: DollarSign, value: "R$12M+", label: "Gerenciados", color: '#3b82f6', bg: '#eff6ff' },
                { icon: Star, value: "98%", label: "Satisfação", color: '#f59e0b', bg: '#fffbeb' },
                { icon: AlertCircle, value: "Zero", label: "Multas DAS", color: '#8b5cf6', bg: '#f5f3ff' },
              ].map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{background: stat.bg}}>
                      <Icon size={18} color={stat.color} />
                    </div>
                    <div>
                      <p className="text-lg font-bold" style={{color: '#0a1628'}}>{stat.value}</p>
                      <p className="text-xs text-gray-400">{stat.label}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="space-y-4">
            {[
              { name: "Ana Paula", role: "Coach de carreira • 8k seguidores", text: "Antes eu gastava 3 horas por mês organizando planilhas. Hoje o CreatorFlow faz tudo automaticamente e ainda me avisa quando o DAS vence.", avatar: "AP" },
              { name: "Marcos Vinicius", role: "Infoprodutor • Hotmart Top Seller", text: "Finalmente consigo ver quanto ganho em cada plataforma sem precisar abrir 5 abas diferentes. A nota fiscal automática salvou meu MEI.", avatar: "MV" },
              { name: "Juliana Costa", role: "Youtuber • 45k inscritos", text: "Simples, rápido e sem burocracia. Exatamente o que eu precisava para não me perder na gestão do meu canal e das mentorias.", avatar: "JC" },
            ].map((dep) => (
              <div key={dep.name} className="scroll-animate bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{background: '#0a1628'}}>
                    {dep.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{color: '#0a1628'}}>{dep.name}</p>
                    <p className="text-xs text-gray-400">{dep.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="#00d4aa" color="#00d4aa" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">"{dep.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}