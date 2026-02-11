import Header from '@/components/header'
import Hero from '@/components/hero'
import Workflow from '@/components/workflow'
import Features from '@/components/features'
import CTA from '@/components/cta'
import Footer from '@/components/footer'
import RootLayout from '@/components/dashboard/RootLayout'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Workflow />
      <Features />
      <CTA />
    </main>
  )
}
