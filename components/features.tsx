import { Shield, Zap, Code2, GitBranch, BarChart3, Cpu } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Shield,
      title: 'Production Audit',
      description: 'Deep-scan your repository to identify security, deployment, and infrastructure gaps.',
    },
    {
      icon: Code2,
      title: 'Auto-Generate Files',
      description: 'Automatically generate Dockerfile, docker-compose.yml, CI/CD configs, and more.',
    },
    {
      icon: Zap,
      title: 'Smart Detection',
      description: 'AI engine recognizes your tech stack and best practices automatically.',
    },
    {
      icon: GitBranch,
      title: 'One-Click PR',
      description: 'Push all generated fixes directly to GitHub as a pull request for review.',
    },
    {
      icon: BarChart3,
      title: 'Pass/Fail Verdict',
      description: 'Get a comprehensive production readiness score and actionable recommendations.',
    },
    {
      icon: Cpu,
      title: 'Real-time Scanning',
      description: 'Complete analysis in under 2 minutes with detailed insights and metrics.',
    },
  ]

  return (
    <section id="features" className="py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Powerful Features for Modern Teams
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to ensure your application is production-ready and secure
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                  <Icon className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Stats section */}
        <div className="mt-20 grid sm:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">10K+</p>
            <p className="text-muted-foreground">Repositories Scanned</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">98%</p>
            <p className="text-muted-foreground">Detection Accuracy</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">2min</p>
            <p className="text-muted-foreground">Average Scan Time</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">50+</p>
            <p className="text-muted-foreground">Stack Types Supported</p>
          </div>
        </div>
      </div>
    </section>
  )
}
