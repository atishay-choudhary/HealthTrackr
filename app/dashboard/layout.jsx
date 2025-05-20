"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Icons } from "@/components/ui/icons"
import { ErrorBoundaryWrapper } from "@/components/error-boundary-wrapper"
import { Logo } from "@/components/logo"

export default function DashboardLayout({ children }) {
  const pathname = usePathname()
  const { toast } = useToast()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Delay setting isMounted to ensure all client-side code is ready
    const timer = setTimeout(() => {
      setIsMounted(true)
    }, 500) // Increased delay for better stability

    return () => clearTimeout(timer)
  }, [])

  const handleLogout = () => {
    // This would be replaced with actual logout logic
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })

    // Add a small delay before navigation to ensure toast is shown
    setTimeout(() => {
      router.push("/")
    }, 500)
  }

  // Return a skeleton layout until client-side code is hydrated
  if (!isMounted) {
    return <DashboardSkeleton />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
              <Logo size="small" />
              <span className="font-bold text-xl">HealthTrackr</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === item.href ? "text-foreground" : "text-foreground/60",
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="mr-2 md:hidden">
                <Icons.Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <Logo size="small" />
                <span className="font-bold text-xl">HealthTrackr</span>
              </Link>
              <nav className="mt-8 flex flex-col space-y-3">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-2 py-1 text-base font-medium rounded-md",
                      pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <ModeToggle />
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="User profile">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Logout">
                <Icons.LogOut className="h-5 w-5" />
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <ErrorBoundaryWrapper>
          <Suspense
            fallback={
              <div className="animate-pulse space-y-4">
                <div className="h-8 w-64 bg-muted rounded mb-4"></div>
                <div className="h-4 w-full bg-muted rounded mb-2"></div>
                <div className="h-4 w-full bg-muted rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-muted rounded"></div>
              </div>
            }
          >
            {children}
          </Suspense>
        </ErrorBoundaryWrapper>
      </main>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <div className="mr-6 flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-muted"></div>
              <div className="h-5 w-32 bg-muted rounded"></div>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="h-8 w-8 rounded-full bg-muted"></div>
            <div className="h-8 w-8 rounded-full bg-muted"></div>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-muted rounded mb-4"></div>
          <div className="h-4 w-full bg-muted rounded mb-2"></div>
          <div className="h-4 w-full bg-muted rounded mb-2"></div>
          <div className="h-4 w-3/4 bg-muted rounded"></div>
        </div>
      </main>
    </div>
  )
}

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Icons.Home,
  },
  {
    title: "Log Entry",
    href: "/dashboard/log",
    icon: Icons.PlusCircle,
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: Icons.Calendar,
  },
  {
    title: "Progress",
    href: "/dashboard/progress",
    icon: Icons.LineChart,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: Icons.BarChart,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Icons.Settings,
  },
]
