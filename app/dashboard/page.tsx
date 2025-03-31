"use client";

import { useAuth } from "@/hooks/use-auth";
import { useProjects } from "@/hooks/use-projects";
import { useWallet } from "@/hooks/use-wallet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Trophy, Users } from "lucide-react";

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const { projects } = useProjects();
  const { wallet } = useWallet(user?.id || "");

  const userProjects = projects.filter((project) => project.owner_id === user?.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome, {profile?.display_name || "User"}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Coins className="h-6 w-6 text-yellow-500" />
              <span className="text-2xl font-bold">{wallet?.balance || 0} GC</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Projects Owned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-green-500" />
              <span className="text-2xl font-bold">{userProjects.length}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
          {/*<div className="flex flex-wrap gap-2">
            {(profile?.skills ?? []).map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>*/}
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">Your Projects</h2>
      <div className="grid grid-cols-1 gap-6">
        {userProjects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
              <Badge variant="outline" className="mt-2">
                {project.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}