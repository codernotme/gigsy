"use client";

export default function ProjectsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Your Projects</h1>
      <p className="text-muted-foreground mb-8">Manage your active and completed projects</p>
      
      <div className="rounded-lg border shadow-sm p-4">
        <p className="text-center py-8 text-muted-foreground">
          You don&apos;t have any projects yet. Start by creating a new project!
        </p>
      </div>
    </div>
  );
}
