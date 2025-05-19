import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function StreakCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Current Streak</CardTitle>
        <CardDescription>Your consistency</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-orange-500"
            >
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
            </svg>
            <span className="text-4xl font-bold ml-2">12</span>
          </div>
          <div className="text-sm text-muted-foreground">days</div>
          <Badge variant="outline" className="mt-2">
            Personal Best: 21 days
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
