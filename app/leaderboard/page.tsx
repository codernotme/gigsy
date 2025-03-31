"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState<{ user_id: string; balance: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from("wallets")
        .select("user_id, balance")
        .order("balance", { ascending: false })
        .limit(10);

      if (error) console.error("Error fetching leaderboard:", error);
      else setLeaders(data || []);

      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Leaderboard</h1>
      <div className="grid grid-cols-1 gap-6">
        {leaders.map((leader, index) => (
          <Card key={leader.user_id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Trophy className="h-6 w-6 text-yellow-500" />
                <CardTitle>
                  #{index + 1} - User {leader.user_id}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold">{leader.balance} GC</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}