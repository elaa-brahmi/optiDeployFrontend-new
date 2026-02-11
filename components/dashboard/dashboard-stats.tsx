import { CheckCircle2, AlertCircle, AlertTriangle, Package } from 'lucide-react'

interface DashboardStatsProps {
  stats: {
    total: number
    ready: number
    warning: number
    critical: number
  }
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase text-muted-foreground">Total Repositories</p>
            <p className="mt-2 text-2xl font-bold text-foreground">{stats.total}</p>
          </div>
          <div className="rounded-full bg-primary/10 p-3">
            <Package className="h-6 w-6 text-primary" />
          </div>
        </div>
      </div>

      {/* Ready */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase text-muted-foreground">Production Ready</p>
            <p className="mt-2 text-2xl font-bold text-emerald-400">{stats.ready}</p>
          </div>
          <div className="rounded-full bg-emerald-400/10 p-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase text-muted-foreground">Review Required</p>
            <p className="mt-2 text-2xl font-bold text-amber-400">{stats.warning}</p>
          </div>
          <div className="rounded-full bg-amber-400/10 p-3">
            <AlertCircle className="h-6 w-6 text-amber-400" />
          </div>
        </div>
      </div>

      {/* Critical */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase text-muted-foreground">Critical Issues</p>
            <p className="mt-2 text-2xl font-bold text-red-400">{stats.critical}</p>
          </div>
          <div className="rounded-full bg-red-400/10 p-3">
            <AlertTriangle className="h-6 w-6 text-red-400" />
          </div>
        </div>
      </div>
    </div>
  )
}
