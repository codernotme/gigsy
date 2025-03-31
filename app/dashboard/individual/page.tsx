"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Trophy, Coins, MessageSquare, Calendar, ArrowUp, 
  ArrowDown, CheckCircle, Star, BookOpen
} from "lucide-react"
import { useAuthStore } from "@/lib/store/auth-store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function IndividualDashboard() {
  const { user } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!user || user.accountType !== 'individual') {
      router.push('/dashboard')
    }
  }, [user, router])

  if (!user || user.accountType !== 'individual') return null

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Freelancer Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold mb-1">Sarah Johnson</h2>
              <p className="text-muted-foreground">Level 42 Freelancer</p>
              <div className="flex items-center mt-2">
                <Badge className="mr-2">Verified</Badge>
                <Badge variant="outline">Frontend Expert</Badge>
              </div>
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
            <div className="text-2xl font-bold">2,456 GC</div>
            <div className="flex items-center text-sm text-green-500">
              <ArrowUp className="h-4 w-4 mr-1" />
              +350 this week
            </div>
            <Button variant="outline" size="sm" className="w-full mt-2">View Wallet</Button>
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
            <div className="text-2xl font-bold">#28</div>
            <div className="flex items-center text-sm text-green-500">
              <ArrowUp className="h-4 w-4 mr-1" />
              +5 positions
            </div>
            <Button variant="outline" size="sm" className="w-full mt-2">View Leaderboard</Button>
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
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm text-muted-foreground">3 unread</div>
            <Button variant="outline" size="sm" className="w-full mt-2">Open Inbox</Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="mb-8">
        <TabsList className="grid grid-cols-4 w-[500px]">
          <TabsTrigger value="projects">Active Projects</TabsTrigger>
          <TabsTrigger value="bids">Pending Bids</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>Frontend Development Project {i}</CardTitle>
                    <Badge>{["In Progress", "Final Review"][i-1]}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {i === 1 ? "Creating a responsive dashboard with React and Tailwind CSS" : "Implementing authentication flows and user profiles"}
                  </p>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm text-muted-foreground">Due in {i*3} days</div>
                    <div className="text-sm font-medium">{i*450} GC</div>
                  </div>
                  <Progress value={[45, 85][i-1]} className="mb-1" />
                  <div className="text-sm text-muted-foreground">{[45, 85][i-1]}% completed</div>
                  <Button size="sm" className="w-full mt-4">Continue Working</Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline">Find More Projects</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="bids" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {[1, 2, 3].map((bid) => (
                  <div key={bid} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div>
                      <h3 className="font-medium">Mobile App UI Design</h3>
                      <p className="text-sm text-muted-foreground">Bid Amount: {[600, 450, 580][bid-1]} GC</p>
                      <div className="text-sm text-muted-foreground mt-1">
                        Submitted {bid} days ago • {[12, 8, 5][bid-1]} other proposals
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge variant="outline" className="mb-2">
                        {["Under Review", "Shortlisted", "Pending"][bid-1]}
                      </Badge>
                      <Button variant="ghost" size="sm">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="skills" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Technical Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "React.js", level: 90 },
                    { name: "TypeScript", level: 85 },
                    { name: "UI/UX Design", level: 70 },
                    { name: "Next.js", level: 75 },
                    { name: "Tailwind CSS", level: 95 }
                  ].map((skill, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">Level {skill.level}</span>
                      </div>
                      <Progress value={skill.level} />
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6" variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Take Skill Assessment
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Badges & Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Frontend Expert", icon: <CheckCircle className="h-8 w-8 text-green-500" /> },
                    { name: "Top Rated", icon: <Star className="h-8 w-8 text-yellow-500" /> },
                    { name: "Fast Delivery", icon: <Calendar className="h-8 w-8 text-blue-500" /> },
                    { name: "Quality Assurance", icon: <Trophy className="h-8 w-8 text-purple-500" /> }
                  ].map((badge, i) => (
                    <Card key={i} className="p-4 flex flex-col items-center text-center">
                      {badge.icon}
                      <span className="mt-2 font-medium">{badge.name}</span>
                    </Card>
                  ))}
                </div>
                <Button className="w-full mt-6" variant="outline">View All Achievements</Button>
              </CardContent>
            </Card>
          </div>
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
                        {i === 2 && <ArrowDown className="h-4 w-4 text-red-500 mr-2" />}
                        <span>{status} Projects</span>
                      </div>
                      <div className="font-medium">{[24, 2, 1][i]}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <div className="text-sm text-muted-foreground mb-2">Success Rate</div>
                  <Progress value={96} className="mb-1" />
                  <div className="text-sm">96%</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">This Month</div>
                    <div className="text-xl font-bold">1,345 GC</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">All Time</div>
                    <div className="text-xl font-bold">28,450 GC</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Monthly Earnings</div>
                  <div className="h-[100px] flex items-end justify-between">
                    {[65, 80, 45, 95, 70, 60].map((height, i) => (
                      <div key={i} className="relative flex flex-col items-center">
                        <div 
                          className="w-10 bg-primary/20 rounded-t-sm" 
                          style={{ height: `${height}px` }}
                        />
                        <span className="text-xs text-muted-foreground mt-1">
                          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
                        </span>
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
