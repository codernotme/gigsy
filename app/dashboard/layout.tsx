"use client";
import { Authenticated } from "convex/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <Authenticated>
  <div className="min-h-screen bg-background">{children}</div>
  </Authenticated>
  );
}