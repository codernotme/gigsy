"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Users, Trophy, Clock, ArrowRight } from "lucide-react"

export default function Events() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Featured Event */}
      <Card className="mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=1920')] bg-cover bg-center opacity-10" />
        <CardContent className="relative py-12">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-primary/10">Featured Event</Badge>
            <h1 className="text-4xl font-bold mb-4">Web3 Gaming Hackathon</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Join us for a 48-hour coding challenge to build the next generation of web3 games
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                <div>
                  <div className="font-medium">Date</div>
                  <div className="text-muted-foreground">March 15-17, 2024</div>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                <div>
                  <div className="font-medium">Participants</div>
                  <div className="text-muted-foreground">234/500</div>
                </div>
              </div>
              <div className="flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-muted-foreground" />
                <div>
                  <div className="font-medium">Prize Pool</div>
                  <div className="text-muted-foreground">10,000 GC</div>
                </div>
              </div>
            </div>
            <Button size="lg" className="bg-primary">
              Register Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[1, 2, 3].map((event) => (
          <Card key={event}>
            <CardHeader>
              <Badge className="w-fit mb-2" variant="outline">
                {["Workshop", "Tournament", "Meetup"][event - 1]}
              </Badge>
              <CardTitle>Tech Event {event}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Join us for an exciting event focused on the latest technologies and networking opportunities.
              </p>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Participants</span>
                  <span className="font-medium">125/200</span>
                </div>
                <Progress value={62.5} />
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    2 days left
                  </div>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Past Events */}
      <h2 className="text-2xl font-bold mb-6">Past Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((event) => (
          <Card key={event}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary">Completed</Badge>
                <div className="text-sm text-muted-foreground">2 weeks ago</div>
              </div>
              <h3 className="font-semibold mb-2">Past Event {event}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                A successful event with over 200 participants and amazing projects.
              </p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
                  <span>15 Winners</span>
                </div>
                <Button variant="ghost" size="sm">
                  View Results
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}