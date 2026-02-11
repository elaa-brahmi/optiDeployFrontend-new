'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold">D</span>
          </div>
          <span className="text-xl font-bold text-foreground">Deployment Copilot</span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex items-center gap-8">
          <a href="/#workflow" className="text-muted-foreground hover:text-foreground transition">
            How it works
          </a>
          <a href="/#features" className="text-muted-foreground hover:text-foreground transition">
            Features
          </a>
          <a href="/#" className="text-muted-foreground hover:text-foreground transition">
            Pricing
          </a>
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium">
          <Link href="/analyzer">Get Started</Link>
            
          </button>
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-card border-b border-border md:hidden">
            <div className="flex flex-col gap-4 p-4">
              <a href="/#workflow" className="text-muted-foreground hover:text-foreground">
                How it works
              </a>
              <a href="/#features" className="text-muted-foreground hover:text-foreground">
                Features
              </a>
              <a href="/#" className="text-muted-foreground hover:text-foreground">
                Pricing
              </a>
              <button className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                          <Link href="/analyzer">Get Started</Link>

              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
