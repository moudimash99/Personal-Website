export default function Panel({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`glass ${className}`}>
      {children}
    </div>
  )
}