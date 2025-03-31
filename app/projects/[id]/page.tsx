"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, DollarSign, Users, MessageSquare, FileText } from "lucide-react"

export default function ProjectPage() {
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  // Extract the ID from the URL path
  const id = pathname?.split('/').pop() || ''

  useEffect(() => {
    // Fetch the project data based on the ID
    const fetchProject = async () => {
      try {
        setLoading(true)
        // This is a mock fetch - in a real app, you'd fetch from your API
        // await fetch(`/api/projects/${id}`)
        
        // Mock data for demonstration
        const mockProject = {
          id: id,
          title: "Interactive Mobile Game Development",
          status: "In Progress",
          description: "Looking for an experienced developer to create a cross-platform mobile game with multiplayer features and in-app purchases. The game should be built using React Native and integrate with our existing backend services.",
          budget: "2,500",
          deadline: "March 15, 2024",
          skills: ["React Native", "JavaScript", "Redux", "Mobile Development", "Game Development"],
          client: {
            name: "Tech Innovators Ltd",
            avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400",
            rating: 4.8,
            projectsPosted: 24
          },
          milestones: [
            { name: "Project Setup & Design", progress: 100, complete: true },
            { name: "Core Gameplay Features", progress: 75, complete: false },
            { name: "Multiplayer Implementation", progress: 30, complete: false },
            { name: "Testing & Optimization", progress: 0, complete: false },
            { name: "Final Deployment", progress: 0, complete: false }
          ],
          bidCount: 16,
          averageBid: "2,350",
          completionRate: 60
        }
        
        setProject(mockProject)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching project:", error)
        setLoading(false)
      }
    }

    if (id) {
      fetchProject()
    }
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading project details...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <p className="text-muted-foreground mb-6">The project you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={project.status === "In Progress" ? "default" : project.status === "Completed" ? "outline" : "secondary"}>
              {project.status}
            </Badge>
            <Badge variant="outline">ID: {project.id}</Badge>
          </div>
          <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.skills.map((skill: string, i: number) => (
              <Badge key={i} variant="secondary">{skill}</Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact Client
          </Button>
          <Button>
            Place Bid
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="client">Client</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{project.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Budget</div>
                    <div className="text-muted-foreground">{project.budget} GC</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Deadline</div>
                    <div className="text-muted-foreground">{project.deadline}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Bids</div>
                    <div className="text-muted-foreground">{project.bidCount} (Avg: {project.averageBid} GC)</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Overall Progress</h3>
                <Progress value={project.completionRate} className="mb-2" />
                <div className="text-sm text-muted-foreground">{project.completionRate}% complete</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="milestones" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {project.milestones.map((milestone: any, i: number) => (
                  <div key={i} className="border-b pb-5 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{i + 1}. {milestone.name}</h3>
                      <Badge variant={milestone.complete ? "default" : "outline"}>
                        {milestone.complete ? "Completed" : "In Progress"}
                      </Badge>
                    </div>
                    <Progress value={milestone.progress} className="mb-1" />
                    <div className="text-sm text-muted-foreground">{milestone.progress}% complete</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="client" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={project.client.avatar} />
                  <AvatarFallback>{project.client.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{project.client.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div>Rating: {project.client.rating}/5</div>
                    <div>•</div>
                    <div>{project.client.projectsPosted} Projects Posted</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  View All Projects
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Client
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}