import { ArrowRight, Github } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 md:py-48">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/30 rounded-full">
                <span className="text-primary text-sm font-medium">AI-Powered Infrastructure</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Production-Ready in <span className="text-primary">Minutes</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Connect your GitHub repo and let our AI engine scan for production gaps, generate missing infrastructure, and deliver a Pass/Fail verdict.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button  className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-semibold">
                <Github size={20} />
                
                <Link href="/analyzer">Connect GitHub</Link>
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition font-semibold">
              <Link href="/feedback">Provide Feedback</Link>
                <ArrowRight size={20} />
              </button>
            </div>

            <div className="flex items-center gap-8 text-sm text-muted-foreground pt-4">
              <div>
                <p className="font-semibold text-foreground">10K+</p>
                <p>Repos Scanned</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <p className="font-semibold text-foreground">98%</p>
                <p>Detection Rate</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <p className="font-semibold text-foreground">2min</p>
                <p>Avg Scan Time</p>
              </div>
            </div>
          </div>

          <div className="relative h-96 md:h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl" />
            <div className="relative bg-card border border-border rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="space-y-3 font-mono text-sm">
                <p className="text-muted-foreground">
                  <span className="text-primary">→</span> Scanning repository...
                </p>
                <p className="text-muted-foreground">
                  <span className="text-primary">→</span> Detecting stack...
                </p>
                <p className="text-muted-foreground">
                  <span className="text-primary">→</span> Analyzing CI/CD...
                </p>
                <p className="text-muted-foreground">
                  <span className="text-primary">→</span> Checking Dockerfile...
                </p>
                <p className="text-primary animate-pulse">
                  <span className="text-primary">→</span> Generating fixes...
                </p>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="px-3 py-1 bg-primary/20 border border-primary/50 text-primary rounded text-xs font-semibold">
                    IN PROGRESS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
