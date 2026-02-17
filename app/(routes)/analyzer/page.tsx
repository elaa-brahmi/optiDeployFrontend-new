'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Search, Loader2, Plus, Github, FolderKanban } from 'lucide-react'
import RepoCard from '@/components/dashboard/repo-card'
import { extractRepoFields } from '@/utils/dataSanitizer'
import { GitHubRepo } from '@/types/githubRepo'

export default function Dashboard() {
  const { data: session } = useSession()

  const [projects, setProjects] = useState<GitHubRepo[]>([])

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<GitHubRepo[]>([])

  const [isLoadingProjects, setIsLoadingProjects] = useState(true)
  const [isSearching, setIsSearching] = useState(false)
  const [isImporting, setIsImporting] = useState<number | null>(null)

  useEffect(() => {
  const fetchSavedProjects = async () => {
    if (!session?.user?.id) return;

    
    if (projects.length === 0) {
      setIsLoadingProjects(true);
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/repos/projects/${session.user.id}`);
      if (res.ok) {
        const data = await res.json();
        setProjects(data.map(extractRepoFields));
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  fetchSavedProjects();
}, [session?.user?.id]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length < 2) {
        setSearchResults([])
        return
      }

      try {
        setIsSearching(true)
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/repos/search?githubId=${session?.user?.id}&query=${searchQuery}`
        );
        const data = await res.json()

        if (res.ok) {
          const sanitized = data.map(extractRepoFields)
          const filtered = sanitized.filter(
            (s: GitHubRepo) => !projects.some((p) => p.repoId === s.repoId)
          )
          setSearchResults(filtered)
        }
      } catch (err) {
      } finally {
        setIsSearching(false)
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery, session, projects])

  const handleImport = async (repo: GitHubRepo) => {
    try {
      setIsImporting(repo.repoId)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/repos/import`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session?.user?.id,
          repoData: repo
        })
      })

      if (res.ok) {
        const newProject = await res.json()
        setProjects(prev => [extractRepoFields(newProject), ...prev])
        setSearchQuery('')
      } else {
        const errData = await res.json()
        alert(errData.error || "Import failed")
      }
    } catch (error) {
    } finally {
      setIsImporting(null)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FolderKanban className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Active Projects</h1>
            </div>

            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search your GitHub..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-foreground transition-all focus:ring-2 focus:ring-primary/20 outline-none"
              />

              {/* Search Results Dropdown */}
              {searchQuery.length >= 2 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-2xl max-h-[400px] overflow-y-auto z-50">
                  <div className="p-2 border-b border-border bg-muted/30 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase text-muted-foreground px-2">GitHub Repositories</span>
                    {isSearching && <Loader2 className="w-3 h-3 animate-spin mr-2" />}
                  </div>

                  {searchResults.length === 0 && !isSearching ? (
                    <div className="p-8 text-center text-sm text-muted-foreground italic">No new repositories found</div>
                  ) : (
                    searchResults.map((repo) => (
                      <div key={repo.repoId} className="flex items-center justify-between p-3 hover:bg-muted/50 transition-colors border-b border-border last:border-0">
                        <div className="flex flex-col min-w-0 pr-4">
                          <span className="font-semibold text-sm truncate text-foreground">{repo.name}</span>
                          <span className="text-xs text-muted-foreground">{repo.language || 'Plain Text'}</span>
                        </div>
                        <button
                          onClick={() => handleImport(repo)}
                          disabled={isImporting === repo.repoId}
                          className="flex-shrink-0 flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-50"
                        >
                          {isImporting === repo.repoId ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                          Add
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 mt-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoadingProjects ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-48 rounded-2xl bg-muted animate-pulse" />
            ))
          ) : projects.length === 0 ? (
            <div className="col-span-full border-2 border-dashed border-border rounded-3xl p-20 text-center">
              <Github className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-20" />
              <h3 className="text-xl font-semibold mb-2">Build your dashboard</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Search for a repository above to add it to your audit list.
              </p>
            </div>
          ) : (
            projects.map((repo) => (
              <RepoCard key={repo.repoId} repo={repo} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}