import { ReactNode } from 'react'

export default function SectionHeader({ icon, title, subtitle }: { icon: ReactNode, title: string, subtitle?: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-xl bg-accent-500/10 ring-1 ring-accent-500/30">
        {icon}
      </div>
      <div>
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight font-display">{title}</h2>
        {subtitle && <p className="text-sm text-muted mt-0.5">{subtitle}</p>}
      </div>
    </div>
  )
}