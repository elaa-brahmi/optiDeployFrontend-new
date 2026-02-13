import { CheckCircle2, AlertCircle, AlertTriangle, Code2, Calendar, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GitHubRepo } from '@/types/githubRepo'


export default function RepoCard({ repo }: { repo: GitHubRepo }) {
  const statusConfig = {
    ready: {
      icon: CheckCircle2,
      label: 'Production Ready',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10',
    },
    warning: {
      icon: AlertCircle,
      label: 'Review Required',
      color: 'text-amber-400',
      bgColor: 'bg-amber-400/10',
    },
    critical: {
      icon: AlertTriangle,
      label: 'Critical Issues',
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
    },
  }

  /* const status = statusConfig[repo.status]
  const StatusIcon = status.icon */

  return (
    <div className="group relative rounded-lg border border-border bg-card transition hover:border-primary/50 hover:bg-card/80">
      {/* Status Badge */}
     {/*  <div className={`absolute right-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1 ${status.bgColor}`}>
        <StatusIcon className={`h-4 w-4 ${status.color}`} />
        <span className={`text-xs font-medium ${status.color}`}>{status.label}</span>
      </div> */}

      <div className="space-y-4 p-5">
        {/* Header */}
        <div className="pr-32">
          <h3 className="text-lg font-semibold text-foreground">{repo.name}</h3>
          <p className="text-sm text-muted-foreground">{repo.owner}</p>
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-sm text-muted-foreground">{repo.description}</p>

        {/* Tech Stack */}
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{repo.language}</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Coverage</p>
            <p className="text-lg font-semibold text-foreground">{repo.coverage}%</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Issues</p>
            <p className="text-lg font-semibold text-foreground">{repo.issues}</p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-amber-400" />
            <p className="text-lg font-semibold text-foreground">{repo.stars}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border/50 pt-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {repo.lastUpdated}
          </div>
          <Button
            className="bg-primary text-primary-foreground transition hover:bg-primary/90"
            size="sm"
          >
            Analyze Now
          </Button>
        </div>
      </div>
    </div>
  )
}
