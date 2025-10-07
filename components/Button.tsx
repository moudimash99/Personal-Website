export default function Button({
  children,
  href,
  onClick,                 // ✅ accept onClick
  type = 'button',         // ✅ default type for buttons
  variant = 'primary',
  className = '',
}: {
  children: React.ReactNode
  href?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement> // ✅ type it
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'outline'
  className?: string
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-sm font-medium transition-colors " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2"
  const v =
    variant === 'outline'
      ? "border border-[color:var(--tw-color-accent-800,#115e59)]/60 hover:bg-white/5 focus:ring-[color:var(--tw-color-accent-800,#115e59)]"
      : "bg-[color:var(--tw-color-accent-600,#0d9488)] hover:bg-[color:var(--tw-color-accent-500,#14b8a6)] text-white focus:ring-[color:var(--tw-color-accent-700,#0f766e)]"
  const cls = `${base} ${v} ${className}`

  if (href) return <a className={cls} href={href}>{children}</a>
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  )
}
