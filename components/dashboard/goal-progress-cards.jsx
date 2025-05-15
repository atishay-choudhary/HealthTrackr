import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Mock data for goals
const goals = [
  {
    id: 1,
    title: "Weight Loss",
    current: 18,
    target: 20,
    unit: "lbs",
    progress: 90,
    startDate: "Jan 1, 2025",
    endDate: "May 31, 2025",
  },
  {
    id: 2,
    title: "Weekly Activity",
    current: 305,
    target: 300,
    unit: "min",
    progress: 102,
    startDate: "Weekly Goal",
    endDate: "Recurring",
  },
  {
    id: 3,
    title: "Daily Water Intake",
    current: 1.5,
    target: 2.5,
    unit: "L",
    progress: 60,
    startDate: "Daily Goal",
    endDate: "Recurring",
  },
  {
    id: 4,
    title: "Daily Protein",
    current: 125,
    target: 130,
    unit: "g",
    progress: 96,
    startDate: "Daily Goal",
    endDate: "Recurring",
  },
]

export function GoalProgressCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {goals.map((goal) => (
        <Card key={goal.id}>
          <CardHeader className="pb-2">
            <CardTitle>{goal.title}</CardTitle>
            <CardDescription>
              {goal.startDate} - {goal.endDate}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <span>
                {goal.current} / {goal.target} {goal.unit}
              </span>
              <span className={goal.progress >= 100 ? "text-green-500" : ""}>{goal.progress}%</span>
            </div>
            <Progress value={Math.min(goal.progress, 100)} className="h-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
