"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useMinecraftToast } from "@/hooks/use-minecraft-toast"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, Trophy, Coins, Calendar, ArrowUp, 
  MessageSquare, CheckCircle, AlertCircle 
} from "lucide-react"

export default function GroupDashboard() {
  const user = useQuery(api.users.get)
  const router = useRouter()
  const toast = useMinecraftToast()

  useEffect(() => {
    if (!user || user.role !== "group") {
      toast.error({
        title: "Unauthorized Access",
        description: "You don't have permission to access the Team dashboard."
      })
      router.push('/dashboard')
      return
    }
  }, [user, router, toast])

  if (!user || user.role !== "group") return null

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Team Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400" />
                <AvatarFallback>TD</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold mb-1">Team Dynamix</h2>
              <p className="text-muted-foreground">Level 38 Team</p>
              <div className="flex items-center mt-2">
                <Badge className="mr-2">Verified</Badge>
                <Badge variant="outline">5 Members</Badge>
              </div>
              <Progress value={65} className="w-full mt-4" />
              <p className="text-sm text-muted-foreground mt-2">65% to Level 39</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Coins className="h-5 w-5 mr-2" />
              Team GigCoins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,820 GC</div>
            <div className="flex items-center text-sm text-green-500">
              <ArrowUp className="h-4 w-4 mr-1" />
              +560 this week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2" />
              Team Rank
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#12</div>
            <div className="flex items-center text-sm text-green-500">
              <ArrowUp className="h-4 w-4 mr-1" />
              +3 positions
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Team Chat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="text-sm text-muted-foreground">5 unread messages</div>
            <Button variant="outline" className="w-full mt-2" size="sm">Open Chat</Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="mb-8">
        <TabsList className="grid grid-cols-3 w-[400px]">
          <TabsTrigger value="projects">Active Projects</TabsTrigger>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="stats">Team Stats</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>Team Project {i}</CardTitle>
                    <Badge>{["In Progress", "Planning", "Review", "Final Stage"][i-1]}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-muted-foreground">Due in {i*2} days</div>
                    <div className="text-sm font-medium">{i*500} GC</div>
                  </div>
                  <Progress value={[65, 25, 90, 45][i-1]} className="mb-2" />
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-muted-foreground">{[65, 25, 90, 45][i-1]}% completed</div>
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((member) => (
                        <Avatar key={member} className="h-6 w-6 border-2 border-background">
                          <AvatarImage src={`https://i.pravatar.cc/150?img=${member + 50}`} />
                          <AvatarFallback>TM</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="members" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((member) => (
                  <div key={member} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/150?img=${member + 50}`} />
                        <AvatarFallback>TM</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Team Member {member}</div>
                        <div className="text-sm text-muted-foreground">
                          Level {30 + member} • {["Frontend", "Backend", "Design", "DevOps", "PM"][member-1]} Specialist
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {member === 1 && <Badge className="mr-2">Team Lead</Badge>}
                      <div className="text-sm font-medium">{[32, 28, 25, 22, 18][member-1]}% Share</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-6">Invite New Member</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stats" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Completed", "In Progress", "Cancelled"].map((status, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center">
                        {i === 0 && <CheckCircle className="h-4 w-4 text-green-500 mr-2" />}
                        {i === 1 && <Calendar className="h-4 w-4 text-blue-500 mr-2" />}
                        {i === 2 && <AlertCircle className="h-4 w-4 text-red-500 mr-2" />}
                        <span>{status} Projects</span>
                      </div>
                      <div className="font-medium">{[18, 4, 1][i]}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <div className="text-sm text-muted-foreground mb-2">Success Rate</div>
                  <Progress value={94} className="mb-1" />
                  <div className="text-sm">94%</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Earnings Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Last Month</div>
                    <div className="text-xl font-bold">2,345 GC</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">All Time</div>
                    <div className="text-xl font-bold">32,190 GC</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Team Member Contribution</div>
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((member) => (
                      <div key={member} className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={`https://i.pravatar.cc/150?img=${member + 50}`} />
                          <AvatarFallback>TM</AvatarFallback>
                        </Avatar>
                        <Progress value={[35, 25, 15, 15, 10][member-1]} className="flex-1" />
                        <span className="text-sm font-medium">{[35, 25, 15, 15, 10][member-1]}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
