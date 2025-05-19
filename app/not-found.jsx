import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md p-8 rounded-lg border bg-card text-card-foreground shadow-lg">
        <h2 className="text-2xl font-bold mb-4">404 - Page Not Found</h2>
        <p className="mb-6 text-muted-foreground">The page you are looking for doesn't exist or has been moved.</p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/">Go to Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
