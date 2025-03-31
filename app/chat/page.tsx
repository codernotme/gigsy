"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Send, Smile, Paperclip } from "lucide-react"

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState(1)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
        {/* Chat List */}
        <Card className="md:col-span-1 overflow-hidden">
          <CardHeader className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search chats..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {[1, 2, 3, 4, 5].map((chat) => (
                <button
                  key={chat}
                  onClick={() => setSelectedChat(chat)}
                  className={`w-full p-4 text-left hover:bg-accent/5 transition-colors ${
                    selectedChat === chat ? "bg-accent/10" : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={`https://i.pravatar.cc/150?img=${chat + 30}`} />
                      <AvatarFallback>CH</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="font-medium truncate">Chat {chat}</div>
                        <span className="text-xs text-muted-foreground">2m ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        Latest message preview...
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="md:col-span-3 flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={`https://i.pravatar.cc/150?img=${selectedChat + 30}`} />
                  <AvatarFallback>CH</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>Project Chat {selectedChat}</CardTitle>
                  <div className="text-sm text-muted-foreground">React Native Game Development</div>
                </div>
              </div>
              <Badge variant="outline">Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {[1, 2, 3, 4, 5].map((message) => (
              <div
                key={message}
                className={`flex ${message % 2 === 0 ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message % 2 === 0
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p>This is a sample message in the chat. It could be longer or shorter.</p>
                  <div className={`text-xs mt-1 ${
                    message % 2 === 0 ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}>
                    12:34 PM
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Smile className="h-4 w-4" />
              </Button>
              <Input placeholder="Type your message..." className="flex-1" />
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}