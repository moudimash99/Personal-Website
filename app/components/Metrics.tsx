import Badge from './Badge'
import { Activity, Rocket, Gauge } from 'lucide-react'

export default function Metrics() {
  return (
    <div className="flex flex-wrap gap-2 pt-1">
      <Badge><span className="font-medium">C++ streams</span> ~2 GB/s</Badge>
      <Badge><span className="font-medium">Dashboards</span> −80% deploy time</Badge>
      <Badge><span className="font-medium">Observability</span> ≈95% alert coverage</Badge>
    </div>
  )
}