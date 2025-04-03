'use client';

import { Button } from "@/components/ui/button";
import { useMinecraftToast } from "@/hooks/use-minecraft-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ToastExample() {
  const { 
    success, 
    error, 
    info, 
    warning, 
    achievement 
  } = useMinecraftToast();

  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Minecraft Toast Examples</CardTitle>
          <CardDescription>
            Click the buttons below to see different types of Minecraft-styled toasts
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button
            onClick={() => 
              success({
                title: "Mission Complete!",
                description: "You've successfully completed the task",
              })
            }
          >
            Show Success Toast
          </Button>
          
          <Button
            variant="destructive"
            onClick={() => 
              error({
                title: "Creeper Alert!",
                description: "Something went wrong with your action",
              })
            }
          >
            Show Error Toast
          </Button>
          
          <Button
            variant="outline"
            onClick={() => 
              info({
                title: "Did you know?",
                description: "You can customize these toasts with your own icons and sounds",
              })
            }
          >
            Show Info Toast
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => 
              warning({
                title: "Low Health Warning",
                description: "You should address this issue soon",
              })
            }
          >
            Show Warning Toast
          </Button>
          
          <Button
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => 
              achievement({
                title: "Achievement Unlocked!",
                description: "Minecraft Toast Master",
                icon: "🏆",
              })
            }
          >
            Show Achievement Toast
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
