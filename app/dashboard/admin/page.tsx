"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useMinecraftToast } from "@/hooks/use-minecraft-toast"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Coins, Flag, Calendar } from "lucide-react"

export default function AdminDashboard() {
  const user = useQuery(api.users.get)
  const router = useRouter()
  const toast = useMinecraftToast()

  useEffect(() => {
    if (!user || user.role !== "admin") {
      toast.error({
        title: "Unauthorized Access",
        description: "You don't have permission to access the Admin dashboard."
      })
      router.push('/dashboard')
      return
    }
  }, [user, router, toast])

  if (!user || user.role !== "admin") return null

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Control Tower</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+180 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GigCoins Issued</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2K</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">4 this week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}