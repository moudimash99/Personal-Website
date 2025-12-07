import Image from 'next/image'

export default function CommandCenterBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {/* Next/Image: uses your file at /public/images/opsroom-1248x832.png */}
      <Image
        src="/images/opsroom-1248x832.png"
        alt="Ops room control center (background)"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
      {/* dark overlay so UI remains readable */}
      <div className="absolute inset-0 bg-black/40" />
      {/* soft gradient to fade toward the bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(11,18,20,0.75)] to-[rgba(11,18,20,1)]" />
    </div>
  )
}
