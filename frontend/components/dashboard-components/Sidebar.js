'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, DollarSign, Users, FileText, Zap, LogOut } from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard',  href: '/dashboard' },
  { icon: DollarSign,      label: 'Financeiro', href: '/dashboard/financeiro' },
  { icon: Users,           label: 'Alunos',     href: '/dashboard/alunos' },
  { icon: FileText,        label: 'MEI',        href: '/dashboard/mei' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-64 flex flex-col z-40" style={{background: '#0a1628'}}>
      <div className="p-6 border-b" style={{borderColor: '#1e3a5f'}}>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: 'linear-gradient(135deg, #00d4aa, #0a1628)'}}>
            <Zap size={16} color="white" />
          </div>
          <span className="font-bold text-lg text-white">CreatorFlow</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium"
              style={{
                background: isActive ? '#00d4aa15' : 'transparent',
                color: isActive ? '#00d4aa' : '#64748b',
                borderLeft: isActive ? '3px solid #00d4aa' : '3px solid transparent'
              }}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4">
        <div className="p-4 rounded-xl" style={{background: '#112240'}}>
          <p className="text-xs font-medium mb-1" style={{color: '#94a3b8'}}>Plano atual</p>
          <p className="text-sm font-bold text-white mb-3">Free</p>
          <Link href="/dashboard/planos" className="block text-center text-xs font-medium py-2 rounded-lg" style={{background: '#00d4aa', color: '#0a1628'}}>
            Fazer upgrade
          </Link>
        </div>
      </div>

      <div className="p-4 border-t" style={{borderColor: '#1e3a5f'}}>
        <button
          onClick={() => { localStorage.removeItem('token'); window.location.href = '/login' }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium w-full hover:bg-red-500/10"
          style={{color: '#64748b'}}
        >
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </aside>
  )
}