"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Trophy, MessageSquare, Plus } from "lucide-react"

export default function Teams() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Your Crew</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Team
        </Button>
      </div>

      {/* Active Teams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {[1, 2].map((team) => (
          <Card key={team} className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`https://i.pravatar.cc/150?img=${team + 50}`} />
                    <AvatarFallback>TM</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Team Alpha {team}</CardTitle>
                    <div className="text-sm text-muted-foreground">Created 3 months ago</div>
                  </div>
                </div>
                <Button variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Team Chat
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Team Level</div>
                  <div className="font-semibold">Level 23</div>
                  <Progress value={65} />
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Team Rank</div>
                  <div className="font-semibold">#42 Global</div>
                  <div className="flex items-center text-sm text-green-500">
                    <Trophy className="h-4 w-4 mr-1" />
                    Top 10%
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Team Members</div>
                  <Badge variant="outline">
                    <Users className="h-3 w-3 mr-1" />
                    4/6
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((member) => (
                    <div key={member} className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/150?img=${member + 60}`} />
                        <AvatarFallback>MB</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Member {member}</div>
                        <div className="text-sm text-muted-foreground">Level {20 + member}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team Achievements */}
      <h2 className="text-2xl font-bold mb-6">Team Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((achievement) => (
          <Card key={achievement}>
            <CardContent className="pt-6">
              <Trophy className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Achievement {achievement}</h3>
              <p className="text-muted-foreground mb-4">
                Completed 10 team projects with 5-star ratings
              </p>
              <Progress value={75} className="mb-2" />
              <div className="text-sm text-muted-foreground">75% to next level</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}