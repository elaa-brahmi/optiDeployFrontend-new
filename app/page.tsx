import Header from '@/components/header'
import Hero from '@/components/hero'
import Workflow from '@/components/workflow'
import Features from '@/components/features'
import CTA from '@/components/cta'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Workflow />
      <Features />
      <CTA />
      <Footer />
    </main>
  )
}
