import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { AlertTriangle, Lightbulb, ShieldCheck, Terminal } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ReportView({ report }: { report: any }) {
  return (
    <div className="max-h-[80vh] overflow-y-auto p-6 space-y-8 text-foreground">
      {/* Header & Score */}
      <div className="flex items-center justify-between border-b pb-6">
        <div>
          <h2 className="text-3xl font-bold">Audit Report</h2>
          <p className="text-muted-foreground">Primary Language: {report.language}</p>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium uppercase text-muted-foreground">Production Score</div>
          <div className={`text-5xl font-black ${report.productionScore > 70 ? 'text-emerald-500' : 'text-amber-500'}`}>
            {report.productionScore}%
          </div>
        </div>
      </div>

      {/* Security Alerts */}
      <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
        <div className="flex items-center gap-2 text-red-400 mb-2">
          <ShieldCheck className="h-5 w-5" />
          <h3 className="font-bold">Security Analysis</h3>
        </div>
        <ul className="list-inside list-disc text-sm space-y-1">
          {report.securityAlerts.map((alert: string, i: number) => (
            <li key={i}>{alert}</li>
          ))}
        </ul>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 font-bold"><Lightbulb className="h-4 w-4 text-primary" /> Deployment Strategy</h3>
          <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-lg italic">
            {report.deploymentTip}
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 font-bold"><AlertTriangle className="h-4 w-4 text-amber-500" /> Optimization Tips</h3>
          <div className="text-sm prose prose-invert max-w-none">
            <ReactMarkdown>{report.optimizationTips}</ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Code Generation Section */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 font-bold"><Terminal className="h-4 w-4" /> Infrastructure as Code (Generated)</h3>
        <Tabs defaultValue="docker" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="docker">Dockerfile</TabsTrigger>
            <TabsTrigger value="cicd">GitHub Actions</TabsTrigger>
          </TabsList>
          <TabsContent value="docker" className="mt-4">
            <SyntaxHighlighter language="dockerfile" style={vscDarkPlus} className="rounded-lg !bg-zinc-950 !p-4">
              {report.generatedFiles.dockerfile}
            </SyntaxHighlighter>
          </TabsContent>
          <TabsContent value="cicd" className="mt-4">
            <SyntaxHighlighter language="yaml" style={vscDarkPlus} className="rounded-lg !bg-zinc-950 !p-4">
              {report.generatedFiles.cicd}
            </SyntaxHighlighter>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}