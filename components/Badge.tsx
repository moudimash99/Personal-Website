export default function Badge({ children, className='' }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border border-accent-400/30 bg-accent-500/10 px-2 py-1 text-[11px] text-accent-100 badge-shimmer ${className}`}>
      {children}
    </span>
  )
}