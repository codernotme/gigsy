"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Clock, DollarSign, MessageSquare, Star, CheckCircle2 } from "lucide-react"

export default function ProjectDetails({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Project Info */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-2">React Native Game Development</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Mobile</Badge>
                    <Badge variant="secondary">React Native</Badge>
                    <Badge variant="secondary">Gaming</Badge>
                  </div>
                </div>
                <Button size="lg" className="bg-primary">
                  Submit Proposal
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Project Description</h3>
                  <p className="text-muted-foreground">
                    Looking for an experienced React Native developer to create a mobile game. 
                    The game should include real-time multiplayer features and integrate with our existing backend.
                    The ideal candidate will have experience with game development and React Native.
                  </p>
                </div>

                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Budget</div>
                      <div className="text-muted-foreground">1000 GC</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Timeline</div>
                      <div className="text-muted-foreground">2 weeks</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Project Milestones</h3>
                  <div className="space-y-4">
                    {[
                      "Project Setup & Design",
                      "Core Game Mechanics",
                      "Multiplayer Integration",
                      "Testing & Polish"
                    ].map((milestone, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        <span>{milestone}</span>
                        <Progress value={25 * (index + 1)} className="flex-1" />
                        <span className="text-sm text-muted-foreground">{25 * (index + 1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Submit Your Proposal</h3>
                  <div className="space-y-4">
                    <Input type="number" placeholder="Bid Amount (GC)" />
                    <Textarea placeholder="Describe why you're the best fit for this project..." className="min-h-[150px]" />
                    <Button className="w-full">Submit Bid</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Owner */}
          <Card>
            <CardHeader>
              <CardTitle>Project Owner</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" />
                  <AvatarFallback>PO</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Alex Thompson</div>
                  <div className="text-sm text-muted-foreground">Level 45 • 4.9 Rating</div>
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <Star className="h-4 w-4 text-yellow-500" />
                <Star className="h-4 w-4 text-yellow-500" />
                <Star className="h-4 w-4 text-yellow-500" />
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm text-muted-foreground">(48 reviews)</span>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Owner
              </Button>
            </CardContent>
          </Card>

          {/* Top Bidders */}
          <Card>
            <CardHeader>
              <CardTitle>Top Bidders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 20}`} />
                        <AvatarFallback>TB</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Bidder {i}</div>
                        <div className="text-sm text-muted-foreground">Level {40 + i}</div>
                      </div>
                    </div>
                    <Badge variant="outline">{900 + (i * 50)} GC</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}