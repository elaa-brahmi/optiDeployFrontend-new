import { Check, GitBranch, Zap, CheckCircle2 } from 'lucide-react'

export default function Workflow() {
  const steps = [
    {
      number: '01',
      title: 'Connect & Select',
      description: 'Log in via GitHub and select a repository to initiate a deep-scan audit of your source code.',
      icon: GitBranch,
      color: 'from-blue-500 to-primary',
    },
    {
      number: '02',
      title: 'Scan & Generate',
      description: 'The engine detects your stack, identifies production readiness gaps, and auto-generates required infra-as-code files.',
      icon: Zap,
      color: 'from-primary to-cyan-500',
    },
    {
      number: '03',
      title: 'Verdict & Fix',
      description: 'Receive a "Pass/Fail" production verdict and push suggested fixes directly to your repo via a Pull Request.',
      icon: CheckCircle2,
      color: 'from-cyan-500 to-emerald-500',
    },
  ]

  return (
    <section id="workflow" className="py-20 sm:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Three Steps to <span className="text-primary">Production Ready</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, automated workflow that takes you from source code to deployment-ready infrastructure
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection lines */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {/* Step card */}
                <div className="relative bg-card border border-border rounded-2xl p-8 h-full hover:border-primary/50 transition group">
                  {/* Number badge */}
                  <div className="absolute -top-4 -left-4 flex items-center justify-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center font-bold text-xl text-white shadow-lg`}>
                      {step.number}
                    </div>
                  </div>

                  <div className="pt-8 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition">
                      <Icon className="text-primary" size={24} />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>

                    <div className="pt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check size={16} className="text-primary" />
                        <span>GitHub integration</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check size={16} className="text-primary" />
                        <span>Automatic detection</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check size={16} className="text-primary" />
                        <span>One-click deploy</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow indicator */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
                      <span className="text-primary font-bold">→</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-semibold">
            Start Free Scan
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}

function ArrowRight({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}
