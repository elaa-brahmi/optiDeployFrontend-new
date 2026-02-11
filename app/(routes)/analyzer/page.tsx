'use client'

import { useState } from 'react'
import { Search, ChevronRight, CheckCircle2, AlertCircle, Clock, GitBranch, Code2, Calendar } from 'lucide-react'
import RepoCard from '@/components/dashboard/repo-card'
import DashboardStats from '@/components/dashboard/dashboard-stats'
import FilterBar from '@/components/dashboard/filter-bar'
import RootLayout from '@/components/dashboard/RootLayout'

const mockRepos = [
  {
    id: 1,
    name: 'api-server',
    owner: 'Your Organization',
    language: 'TypeScript',
    stars: 245,
    description: 'Production API server with REST endpoints',
    status: 'ready',
    lastUpdated: '2 hours ago',
    coverage: 92,
    issues: 0,
  },
  {
    id: 2,
    name: 'web-dashboard',
    owner: 'Your Organization',
    language: 'React',
    stars: 156,
    description: 'Admin dashboard for monitoring',
    status: 'warning',
    lastUpdated: '1 day ago',
    coverage: 78,
    issues: 3,
  },
  {
    id: 3,
    name: 'mobile-app',
    owner: 'Your Organization',
    language: 'React Native',
    stars: 89,
    description: 'Cross-platform mobile application',
    status: 'ready',
    lastUpdated: '3 hours ago',
    coverage: 85,
    issues: 0,
  },
  {
    id: 4,
    name: 'data-pipeline',
    owner: 'Your Organization',
    language: 'Python',
    stars: 312,
    description: 'ETL pipeline for data processing',
    status: 'critical',
    lastUpdated: '5 days ago',
    coverage: 45,
    issues: 7,
  },
  {
    id: 5,
    name: 'auth-service',
    owner: 'Your Organization',
    language: 'Go',
    stars: 198,
    description: 'OAuth 2.0 authentication service',
    status: 'ready',
    lastUpdated: '12 hours ago',
    coverage: 88,
    issues: 1,
  },
  {
    id: 6,
    name: 'docs-site',
    owner: 'Your Organization',
    language: 'MDX',
    stars: 67,
    description: 'API documentation and guides',
    status: 'ready',
    lastUpdated: '2 weeks ago',
    coverage: 100,
    issues: 0,
  },
]

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [sortBy, setSortBy] = useState('updated')

  const filtered = mockRepos.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || repo.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'updated') {
      return b.lastUpdated.localeCompare(a.lastUpdated)
    }
    if (sortBy === 'stars') {
      return b.stars - a.stars
    }
    return a.name.localeCompare(b.name)
  })

  const stats = {
    total: mockRepos.length,
    ready: mockRepos.filter((r) => r.status === 'ready').length,
    warning: mockRepos.filter((r) => r.status === 'warning').length,
    critical: mockRepos.filter((r) => r.status === 'critical').length,
  }

  return (
     <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-balance text-3xl font-bold text-foreground">Repository Audit</h1>
              <p className="mt-2 text-muted-foreground">
                Select a repository to analyze its production readiness
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Stats Section */}
        <DashboardStats stats={stats} />

        {/* Search and Filters */}
        <div className="mt-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-foreground placeholder-muted-foreground transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <FilterBar selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} sortBy={sortBy} onSortChange={setSortBy} />
        </div>

        {/* Results */}
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{sorted.length}</span> repositories
            </p>
          </div>

          {sorted.length === 0 ? (
            <div className="rounded-lg border border-border bg-card/50 py-12 text-center">
              <p className="text-muted-foreground">No repositories found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sorted.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>


  )
}
