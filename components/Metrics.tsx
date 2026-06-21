import Badge from './Badge'
import { profile } from '@/data/profile'

export default function Metrics() {
  return (
    <div className="flex flex-wrap gap-2 pt-1">
      {profile.highlights.map((item) => (
        <Badge key={item.label}>
          <span className="font-medium">{item.label}</span> {item.value}
        </Badge>
      ))}
    </div>
  )
}