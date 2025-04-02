import React from 'react';

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      <p className="text-muted-foreground mb-8">Top performers on the platform</p>
      
      <div className="rounded-lg border shadow-sm">
        <div className="bg-muted/50 p-4 rounded-t-lg border-b">
          <div className="grid grid-cols-12 font-semibold">
            <div className="col-span-1">#</div>
            <div className="col-span-5">User</div>
            <div className="col-span-2">Level</div>
            <div className="col-span-2">Projects</div>
            <div className="col-span-2">Rating</div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-center py-8 text-muted-foreground">
            Leaderboard data will be available soon
          </p>
        </div>
      </div>
    </div>
  );
}