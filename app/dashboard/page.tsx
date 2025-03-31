"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Trophy, Coins, MessageSquare, Calendar, ArrowUp, ArrowDown } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold mb-1">John Doe</h2>
              <p className="text-muted-foreground">Level 42 Freelancer</p>
              <Progress value={75} className="w-full mt-4" />
              <p className="text-sm text-muted-foreground mt-2">75% to Level 43</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Coins className="h-5 w-5 mr-2" />
              GigCoins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234 GC</div>
            <div className="flex items-center text-sm text-green-500">
              <ArrowUp className="h-4 w-4 mr-1" />
              +123 this week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2" />
              Rank
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#42</div>
            <div className="flex items-center text-sm text-red-500">
              <ArrowDown className="h-4 w-4 mr-1" />
              -3 positions
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-muted-foreground">3 unread</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Projects */}
      <h2 className="text-2xl font-bold mb-6">Active Quests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>Frontend Development Quest</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-muted-foreground">Due in 3 days</div>
                <div className="text-sm font-medium">500 GC</div>
              </div>
              <Progress value={65} className="mb-2" />
              <div className="text-sm text-muted-foreground">65% completed</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Events */}
      <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Hackathon Event
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Join our 48-hour coding challenge!</p>
              <div className="flex justify-between text-sm">
                <span>Prize Pool:</span>
                <span className="font-medium">1000 GC</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}