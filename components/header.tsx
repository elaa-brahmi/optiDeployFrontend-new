'use client'

import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status } = useSession()
  const isLoading = status === "loading"
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/analyzer";

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold">O</span>
          </div>
          <span className="text-xl font-bold text-foreground">OptiDeploy </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#workflow" className="text-muted-foreground hover:text-foreground transition">
            How it works
          </Link>
          <Link href="/#features" className="text-muted-foreground hover:text-foreground transition">
            Features
          </Link>

          {!session ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => signIn("github", { callbackUrl })}
                disabled={isLoading}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium disabled:opacity-50"
              >
                {isLoading ? "Connecting..." : "GitHub"}
              </button>
              <button
                onClick={() => signIn("google", { callbackUrl })}
                disabled={isLoading}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition font-medium disabled:opacity-50"
              >
                Google
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
               {/* <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition flex items-center gap-2">
                <LayoutDashboard size={18} />
                Dashboard
              </Link> */}
              <div className="w-px h-6 bg-border" />
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 transition font-medium"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-card border-b border-border md:hidden">
            <div className="flex flex-col gap-4 p-4">
              <Link href="/#workflow" className="text-muted-foreground">How it works</Link>
              <Link href="/#features" className="text-muted-foreground">Features</Link>
              
              {!session ? (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => signIn('github', { callbackUrl })}
                    disabled={isLoading}
                    className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50"
                  >
                    Continue with GitHub
                  </button>
                  <button
                    onClick={() => signIn('google', { callbackUrl })}
                    disabled={isLoading}
                    className="w-full px-6 py-2 bg-secondary text-secondary-foreground rounded-lg disabled:opacity-50"
                  >
                    Continue with Google
                  </button>
                </div>
              ) : (
                <>
                  
                  <button 
                    onClick={() => signOut()}
                    className="w-full px-6 py-2 bg-destructive text-destructive-foreground rounded-lg"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}