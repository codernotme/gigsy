"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Award } from "lucide-react"

export default function Leaderboard() {
  const leaderboardData = [
    {
      rank: 1,
      name: "Sarah Connor",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      level: 75,
      earnings: "15,234",
      badge: "Elite",
    },
    {
      rank: 2,
      name: "John Smith",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400",
      level: 70,
      earnings: "12,845",
      badge: "Expert",
    },
    {
      rank: 3,
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
      level: 68,
      earnings: "11,562",
      badge: "Master",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Hall of Fame</h1>
        <p className="text-muted-foreground">Top performers of the Gigsy world</p>
      </div>

      {/* Top 3 Winners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {leaderboardData.map((user, index) => (
          <Card key={index} className={`relative ${index === 0 ? 'border-yellow-500' : index === 1 ? 'border-gray-400' : 'border-amber-700'}`}>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              {index === 0 ? (
                <Trophy className="h-8 w-8 text-yellow-500" />
              ) : index === 1 ? (
                <Star className="h-8 w-8 text-gray-400" />
              ) : (
                <Award className="h-8 w-8 text-amber-700" />
              )}
            </div>
            <CardContent className="pt-8 text-center">
              <Avatar className="h-20 w-20 mx-auto mb-4">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold mb-1">{user.name}</h3>
              <Badge variant="secondary" className="mb-4">Level {user.level}</Badge>
              <div className="text-2xl font-bold mb-2">{user.earnings} GC</div>
              <Badge variant="outline" className="bg-primary/10">{user.badge}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Leaderboard Table */}
      <Card>
        <CardHeader>
          <CardTitle>Global Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({length: 7}).map((_, i) => (
              <div key={i + 4} className="flex items-center justify-between p-4 hover:bg-accent/5 rounded-lg transition-colors">
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-medium w-8">{i + 4}</span>
                  <Avatar>
                    <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 10}`} />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">User Name</div>
                    <div className="text-sm text-muted-foreground">Level {65 - i}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{10000 - (i * 500)} GC</div>
                  <Badge variant="outline" className="ml-2">Expert</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}