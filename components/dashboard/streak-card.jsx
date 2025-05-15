import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame } from "lucide-react"

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
            <Flame className="h-8 w-8 text-orange-500" />
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
