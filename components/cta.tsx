import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 border-y border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Ready to Ship with <span className="text-primary">Confidence?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of developers who trust Deployment Copilot to ensure their applications are production-ready.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-semibold text-lg">
            Scan Your Repo Now
            <ArrowRight size={22} />
          </button>
          <button className="flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition font-semibold text-lg">
            Schedule a Demo
          </button>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-3">
            <CheckCircle2 className="text-primary" size={24} />
            <p className="text-sm text-muted-foreground">No credit card required</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <CheckCircle2 className="text-primary" size={24} />
            <p className="text-sm text-muted-foreground">Free for first 5 scans</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <CheckCircle2 className="text-primary" size={24} />
            <p className="text-sm text-muted-foreground">Instant results</p>
          </div>
        </div>
      </div>
    </section>
  )
}
