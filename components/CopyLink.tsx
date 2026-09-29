'use client'
import { useState } from 'react'
import { Check, Link2 } from 'lucide-react'

// Copies the absolute URL of the current page with #anchor, e.g. https://…/experience#murex
export default function CopyLink({ anchor, label = 'Copy link', className = '' }: { anchor: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const url = `${window.location.origin}${window.location.pathname}#${anchor}`
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      window.prompt('Copy this link', url)
    }
    history.replaceState(null, '', `#${anchor}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Link copied' : label}
      title={copied ? 'Link copied' : label}
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[11px] transition-colors ${copied ? 'border-teal-400/60 text-teal-300' : 'border-white/10 text-muted hover:border-teal-400/40 hover:text-teal-300'} ${className}`}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
      <span className="hidden sm:inline">{copied ? 'Copied' : 'Link'}</span>
    </button>
  )
}
