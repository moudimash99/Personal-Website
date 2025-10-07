import Container from './Container'
export default function Footer() {
  return (
    <footer className="border-t border-border/60 mt-16">
      <Container>
        <div className="py-6 text-xs text-muted flex items-center justify-between">
          <p>© {new Date().getFullYear()} Mohammad Machaka • Toulouse, France</p>
          <a href="#debrief" className="hover:text-accent-300">Back to top</a>
        </div>
      </Container>
    </footer>
  )
}