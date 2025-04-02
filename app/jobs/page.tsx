"use client"

export default function JobsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
      <p className="text-muted-foreground mb-8">Find freelance work opportunities</p>
      
      <div className="rounded-lg border shadow-sm p-4">
        <p className="text-center py-8 text-muted-foreground">
          No jobs available at the moment. Check back soon!
        </p>
      </div>
    </div>
  );
}