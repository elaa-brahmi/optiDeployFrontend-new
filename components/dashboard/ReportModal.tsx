'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import {
  AlertTriangle, Lightbulb, ShieldCheck, Terminal,
  DollarSign, TrendingUp, ShieldAlert, GitPullRequest,
  Loader2, CheckCircle2, ExternalLink, Cpu, HardDrive,
  Cloud,
  Info,
  ListChecks
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { ReportData } from '@/types/ReportData'

export default function ReportView({ initialReport }: { initialReport: ReportData }) {
  const [isGeneratingIaC, setIsGeneratingIaC] = useState(false)
  const [report, setReport] = useState(initialReport)
  const [selectedCloud, setSelectedCloud] = useState<'aws' | 'azure' | 'gcp'>(() => {
    if (initialReport.iacConfigurations?.azure?.terraformCode) return 'azure';
    if (initialReport.iacConfigurations?.gcp?.terraformCode) return 'gcp';
    return 'aws';
  });
  useEffect(() => {
    setReport(initialReport)
  }, [initialReport])

  const lastUpdated = new Date(report.createdAt).toLocaleString();


  const handleIaC = async (provider: string) => {
    setIsGeneratingIaC(true)
    setSelectedCloud(provider as any)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/repos/iac/generate/${report.repoId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider }),
      })
      const data = await res.json()
      if (data.success) {
        setReport(prev => ({
          ...prev,
          iacConfigurations: {
            ...prev.iacConfigurations,
            [provider]: data.iac
          }
        }))
      }
    } catch (err) {
      alert("An error occurred while generating IaC files")
    } finally {
      setIsGeneratingIaC(false)
    }
  }

  const currentIaC = report.iacConfigurations?.[selectedCloud];

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-emerald-500'
    if (score >= 5) return 'bg-amber-500'
    return 'bg-red-500'
  }

  return (
    <div className="max-h-[80vh] overflow-y-auto p-6 space-y-8 text-foreground">
      {/* Header & Meta */}
      <div className="flex justify-between items-center border-b pb-4">
        <div className="text-xs text-muted-foreground font-mono">
          Scan: {lastUpdated}
        </div>


      </div>

      <div className="flex items-center justify-between border-b pb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Audit Report</h2>
          <p className="text-muted-foreground flex items-center gap-2">
            Environment: <span className="text-primary font-semibold">{report.language}</span>
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium uppercase text-muted-foreground">Production Score</div>
          <div className={`text-5xl font-black ${report.productionScore > 70 ? 'text-emerald-500' : 'text-amber-500'}`}>
            {report.productionScore}%
          </div>
        </div>
      </div>

      {/* Analysis Grid */}
      <div className="grid grid-cols-1 gap-6">

        {/* DevSecOps Security Guard */}
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5 space-y-4">
          <div className="flex items-center gap-2 text-red-400">
            <ShieldAlert className="h-6 w-6" />
            <h3 className="font-bold text-lg">DevSecOps Security Guard</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(report.securityHeatmap || {}).map(([key, value]: [string, any]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between text-xs uppercase font-bold text-muted-foreground">
                  <span>{key}</span>
                  <span>{value}/10</span>
                </div>
                <Progress value={value * 10} className={`h-2 ${getScoreColor(value)}`} />
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-red-500/10 pt-4">
            <h4 className="text-xs font-bold uppercase text-red-400 mb-2">Active Vulnerabilities</h4>
            <ul className="list-inside list-disc text-sm space-y-1 text-muted-foreground">
              {report.securityAlerts.map((alert: string, i: number) => (
                <li key={i}>{alert}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cloud Architect & Resource Optimizer Row */}
        <div className="grid grid-cols-1  gap-6">
          {/* Cloud Architect (Pricing) */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <DollarSign className="h-6 w-6" />
              <h3 className="font-bold text-lg">Cloud Architect</h3>
            </div>
            <div className="flex flex-wrap gap-8">
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold">Est. Monthly</p>
                <p className="text-3xl font-black text-foreground">${report.costAnalysis?.estimatedMonthly || 0}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold">Tier</p>
                <p className="text-sm font-semibold">{report.costAnalysis?.tier || 'Hobby'}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic leading-tight bg-primary/10 p-3 rounded-lg border-l-2 border-primary">
              "{report.costAnalysis?.reason}"
            </p>
          </div>

          {/* NEW: Cloud Cost Optimizer (Resources) */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-500">
              <Cpu className="h-6 w-6" />
              <h3 className="font-bold text-lg">Resource Optimizer</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background/40 p-3 rounded-lg border border-emerald-500/10 text-center">
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">CPU Limit</p>
                <p className="text-lg font-mono font-bold text-emerald-400">{report.resourceOptimizer?.cpuLimit || '0.5 vCPU'}</p>
              </div>
              <div className="bg-background/40 p-3 rounded-lg border border-emerald-500/10 text-center">
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">RAM Limit</p>
                <p className="text-lg font-mono font-bold text-emerald-400">{report.resourceOptimizer?.memoryLimit || '512Mi'}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 pt-1">
              <Lightbulb className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
              <p className="text-[11px] text-muted-foreground leading-snug">
                {report.resourceOptimizer?.explanation || "Based on the generated Dockerfile, these limits prevent OOM kills while minimizing idle costs."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 font-bold"><Lightbulb className="h-4 w-4 text-primary" /> Deployment Strategy</h3>
          <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-lg italic border-l-4 border-primary">
            {report.deploymentTip}
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 font-bold"><TrendingUp className="h-4 w-4 text-amber-500" /> Optimization Roadmap</h3>
          <div className="text-sm prose prose-invert max-w-none bg-muted/20 p-4 rounded-lg">
            <ReactMarkdown>{report.optimizationTips}</ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Code Generation Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-bold"><Terminal className="h-4 w-4 text-primary" /> Infrastructure as Code</h3>
          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded uppercase font-bold">AI Generated</span>
        </div>
        <Tabs defaultValue="docker" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50">
            <TabsTrigger value="docker" className="data-[state=active]:bg-primary">Dockerfile</TabsTrigger>
            <TabsTrigger value="cicd" className="data-[state=active]:bg-primary">GitHub Actions</TabsTrigger>
          </TabsList>
          <TabsContent value="docker" className="mt-4 ring-1 ring-border rounded-lg overflow-hidden">
            <SyntaxHighlighter language="dockerfile" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1.5rem' }}>
              {report.generatedFiles?.dockerfile || ""}
            </SyntaxHighlighter>
          </TabsContent>
          <TabsContent value="cicd" className="mt-4 ring-1 ring-border rounded-lg overflow-hidden">
            <SyntaxHighlighter language="yaml" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1.5rem' }}>
              {report.generatedFiles?.cicd || ""}
            </SyntaxHighlighter>
          </TabsContent>
        </Tabs>
      </div>
      <div className="space-y-6 pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="flex items-center gap-2 font-bold text-xl text-blue-400">
              <Cloud className="h-5 w-5" /> Cloud Infrastructure Engine
            </h3>
            <p className="text-sm text-muted-foreground">Select a provider to generate environment-specific Terraform code.</p>
          </div>

          <div className="flex gap-2 p-1 bg-muted/50 rounded-lg border w-fit">
            {(['aws', 'azure', 'gcp'] as const).map((provider) => (
              <Button
                key={provider}
                onClick={() => handleIaC(provider)}
                variant={selectedCloud === provider ? 'default' : 'ghost'}
                size="sm"
                className={`text-xs h-8 uppercase font-bold transition-all ${selectedCloud === provider ? 'bg-blue-600' : ''}`}
                disabled={isGeneratingIaC}
              >
                {provider}
              </Button>
            ))}
          </div>
        </div>

        {isGeneratingIaC ? (
          <div className="h-64 flex flex-col items-center justify-center space-y-4 rounded-xl border border-dashed border-blue-500/30 bg-blue-500/5">
            <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
            <p className="text-sm text-blue-300 font-mono animate-pulse">Architecting {selectedCloud.toUpperCase()} resources...</p>
          </div>
        ) : currentIaC ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Architecture Detail Cards */}
            {/* --- IaC Content Display --- */}
            <div className="grid grid-cols-1  gap-6">
              {/* Architectural Explanation Card */}
              <div className="md:col-span-2 rounded-xl border border-blue-500/20 bg-blue-500/5 p-5 space-y-3">
                <h4 className="text-sm font-bold flex items-center gap-2 text-blue-400 italic">
                  <Info className="h-4 w-4" /> Architectural Explanation
                </h4>
                {/* Using ReactMarkdown to render the bold text and lists properly */}
                <div className="text-sm text-muted-foreground leading-relaxed prose prose-invert prose-blue max-w-none">
                  <ReactMarkdown>{currentIaC.explanation}</ReactMarkdown>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {currentIaC.cloudResources?.map((res: string, i: number) => (
                    <span key={i} className="text-[10px] px-2 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/20 font-mono uppercase">
                      {res}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deployment Guide Card */}
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5 space-y-4">
                <h4 className="text-sm font-bold flex items-center gap-2 text-blue-400">
                  <ListChecks className="h-4 w-4" /> Deployment Guide
                </h4>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {/* Since your data shows deploymentSteps is an array containing ONE long string, 
         we map through the array but render each item as Markdown.
      */}
                  {currentIaC.deploymentSteps?.map((step: string, i: number) => (
                    <div key={i} className="relative pl-2 border-l-2 border-blue-500/30">
                      <div className="text-xs text-muted-foreground prose prose-invert prose-sm prose-blue">
                        <ReactMarkdown>{step}</ReactMarkdown>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Code Block */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-2">
                <h4 className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2 tracking-widest">
                  <Terminal className="h-3 w-3" /> main.tf (HCL)
                </h4>
                <span className="text-[10px] text-blue-500 font-mono">terraform_version: `{'>'}` 1.0</span>
              </div>
              <div className="rounded-xl overflow-hidden ring-1 ring-blue-500/30 shadow-2xl shadow-blue-500/5">
                <SyntaxHighlighter language="hcl" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1.5rem', fontSize: '12px', lineHeight: '1.6' }}>
                  {currentIaC.terraformCode}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-48 flex flex-col items-center justify-center rounded-xl border border-dashed border-muted bg-muted/10">
            <Cloud className="h-10 w-10 text-muted-foreground mb-2 opacity-20" />
            <p className="text-sm text-muted-foreground italic">Ready to provision cloud resources.</p>
          </div>
        )}
      </div>
    </div>
  )
}