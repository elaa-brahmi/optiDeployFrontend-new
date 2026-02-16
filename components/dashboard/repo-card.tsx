'use client'

import { CheckCircle2, AlertCircle, AlertTriangle, Code2, Calendar, Star, Loader2, FileText, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GitHubRepo } from '@/types/githubRepo'
import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import ReportView from '@/components/dashboard/ReportModal'; 
import { ReportData } from '@/types/ReportData';

export default function RepoCard({ repo }: { repo: GitHubRepo }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reportData, setReportData] = useState<ReportData>();
  const [isLoadingReport, setIsLoadingReport] = useState(false);

  useEffect(() => {
    const fetchExistingReport = async () => {
      if (repo.productionScore && repo.productionScore > 0) {
        setIsLoadingReport(true);
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/repos/report/${repo.repoId}`);
          if (res.ok) {
            const data = await res.json();
            setReportData(data);
          }
        } catch (error) {
        } finally {
          setIsLoadingReport(false);
        }
      }
    };
    fetchExistingReport();
  }, [repo.repoId, repo.productionScore]);

  const handleAnalyze = async () => {
    try {
      setIsAnalyzing(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/repos/analyze/${repo.repoId}`, {
        method: 'POST'
      });

      if (res.ok) {
        const data = await res.json();
        setReportData(data.report);
      }
    } catch (error) {
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatus = (score: number) => {
    if (score >= 80) return 'ready'
    if (score >= 50) return 'warning'
    return 'critical'
  }

  const currentStatus = getStatus(reportData?.productionScore || repo.productionScore || 0)

  const statusConfig = {
    ready: { icon: CheckCircle2, label: 'Production Ready', color: 'text-emerald-400', bgColor: 'bg-emerald-400/10' },
    warning: { icon: AlertCircle, label: 'Review Required', color: 'text-amber-400', bgColor: 'bg-amber-400/10' },
    critical: { icon: AlertTriangle, label: 'Critical Issues', color: 'text-red-400', bgColor: 'bg-red-400/10' },
  }

  const status = statusConfig[currentStatus]
  const StatusIcon = status.icon
  const formattedDate = new Date(repo.lastScan || repo.addedAt).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric',
  })

  return (
    <div className="group relative rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      {/* Status Badge */}
      <div className={`absolute right-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1 ${status.bgColor}`}>
        <StatusIcon className={`h-4 w-4 ${status.color}`} />
        <span className={`text-[10px] font-bold uppercase tracking-wider ${status.color}`}>
          {status.label}
        </span>
      </div>

      <div className="space-y-4 p-5">
        <div className="pr-24">
          <h3 className="truncate text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {repo.name}
          </h3>
          <p className="text-xs text-muted-foreground">@{repo.owner}</p>
        </div>

        <p className="line-clamp-2 h-10 text-sm text-muted-foreground/80">
          {repo.description || "No description provided for this repository."}
        </p>

        <div className="flex items-center gap-2">
          <div className="rounded-md bg-muted p-1">
            <Code2 className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">{repo.language}</span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 rounded-lg bg-muted/30 p-3">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-medium uppercase text-muted-foreground">Score</span>
            <span className={`text-sm font-bold ${status.color}`}>
                {reportData?.productionScore || repo.productionScore || 0}%
            </span>
          </div>
          <div className="flex flex-col gap-1 border-x border-border/50 px-2">
            <span className="text-[10px] font-medium uppercase text-muted-foreground">Stars</span>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
              <span className="text-sm font-bold text-foreground">{repo.stars}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 pl-1">
            <span className="text-[10px] font-medium uppercase text-muted-foreground">Status</span>
            <span className="text-[10px] font-bold text-foreground truncate">
                {reportData ? "Analyzed" : "Pending"}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border/50 pt-4">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formattedDate}</span>
          </div>

          {/* Conditional Button Logic */}
          {reportData ? (
            <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-2">
          <FileText className="h-3.5 w-3.5" />
          Show Report
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[700px] w-full p-0">
        <SheetHeader className="p-6 border-b flex flex-row items-center justify-between">
           <SheetTitle>Audit: {repo.name}</SheetTitle>
           {/* RE-ANALYZE BUTTON INSIDE SHEET */}
           <Button 
             onClick={handleAnalyze} 
             disabled={isAnalyzing}
             variant="secondary"
             size="sm"
             className="mr-6"
           >
             {isAnalyzing ? <Loader2 className="h-3 w-3 animate-spin" /> : "Re-scan Code"}
           </Button>
        </SheetHeader>
        <ReportView initialReport={reportData} />
      </SheetContent>
    </Sheet>
          ) : (
            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing || isLoadingReport}
              className="h-8 px-3 text-xs font-bold transition-all active:scale-95"
              size="sm"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  Scanning...
                </>
              ) : (
                "Analyze Now"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}