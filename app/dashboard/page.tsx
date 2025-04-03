"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useMinecraftToast } from "@/hooks/use-minecraft-toast"
import { useQuery } from "convex/react"
import MaintainerDashboard from "./maintainer/page"
import IndividualDashboard from "./individual/page"
import GroupDashboard from "./group/page"
import AmbassadorDashboard from "./ambassador/page"
import AdminDashboard from "./admin/page"
import { api } from "@/convex/_generated/api"

export default function DashboardPage() {
  const user = useQuery(api.users.get)
  const router = useRouter()
  const toast = useMinecraftToast()

  useEffect(() => {
    if (!user) {
      toast.error({
        title: "Authentication Required",
        description: "Please log in to access the dashboard."
      })
      router.push('/auth')
      return
    }
  }, [user, router, toast])

  if (!user) return null

  // Render the appropriate dashboard based on user role
  switch (user.role) {
    case "maintainer":
      return <MaintainerDashboard />
    case "individual":
      return <IndividualDashboard />
    case "group":
      return <GroupDashboard />
    case "ambassador":
      return <AmbassadorDashboard />
    case "admin":
      return <AdminDashboard />
    default:
      toast.warning({
        title: "Unknown Role",
        description: "Your account has an unrecognized role."
      })
      return <div className="text-center py-8">Role not recognized. Please contact support.</div>
  }
}