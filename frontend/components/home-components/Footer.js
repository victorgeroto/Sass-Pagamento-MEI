export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t" style={{borderColor: '#1e3a5f', background: '#0a1628'}}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md" style={{background: 'linear-gradient(135deg, #00d4aa, #0a1628)'}} />
          <span className="font-bold text-white">PayFlow</span>
        </div>
        <p className="text-sm" style={{color: '#64748b'}}>© 2026 PayFlow. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}