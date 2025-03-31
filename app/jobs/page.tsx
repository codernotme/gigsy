"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Clock, DollarSign } from "lucide-react"

export default function Jobs() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filters */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-6">Mine & Craft Your Gigs</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search for projects..." className="pl-10" />
          </div>
          <Button variant="outline" className="md:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="hover:bg-accent/5 transition-colors">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-2">React Native Game Development</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Mobile</Badge>
                    <Badge variant="secondary">React Native</Badge>
                    <Badge variant="secondary">Gaming</Badge>
                  </div>
                </div>
                <Button>View Quest</Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Looking for an experienced React Native developer to create a mobile game. The game should include real-time multiplayer features and integrate with our existing backend.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>1000 GC</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>2 weeks</span>
                </div>
                <Badge variant="outline" className="ml-auto">5 bids</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}