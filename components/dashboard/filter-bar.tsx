'use client';

import { ChevronDown } from 'lucide-react'

interface FilterBarProps {
  selectedStatus: string
  onStatusChange: (status: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
}

export default function FilterBar({
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Status Filter */}
      <div className="flex items-center gap-2">
        <label htmlFor="status-filter" className="text-sm font-medium text-foreground">
          Status:
        </label>
        <select
          id="status-filter"
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="all">All</option>
          <option value="ready">Production Ready</option>
          <option value="warning">Review Required</option>
          <option value="critical">Critical Issues</option>
        </select>
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2">
        <label htmlFor="sort-by" className="text-sm font-medium text-foreground">
          Sort by:
        </label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="updated">Recently Updated</option>
          <option value="stars">Stars</option>
          <option value="name">Name</option>
        </select>
      </div>
    </div>
  )
}
