"use client"

import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { TowerControl, Trophy, Coins, Users, MessageSquare, Calendar, ChevronDown, Settings2, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { useUser, SignOutButton } from "@clerk/nextjs"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const isAuthPage = pathname === "/auth"
  const { theme } = useTheme()
  const { user, isLoaded } = useUser()

  if (isAuthPage) return null

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <TowerControl className="h-6 w-6" />
          <span className="font-bold text-xl">GIGSY</span>
        </Link>
        
        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex space-x-4">
            <NavigationMenuItem>
              <Link href="/dashboard" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/jobs" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Jobs
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/leaderboard" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Leaderboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          
          {isLoaded && user ? (
            <>
              {/* User Menu (Desktop) */}
              <div className="hidden md:flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 cursor-pointer focus:outline-none"
                    >
                      <Avatar
                        className={`h-8 w-8 rounded-full border-2 ${
                          theme === "dark" ? "border-blue-500" : "border-blue-600"
                        }`}
                      >
                        <AvatarImage src={user?.imageUrl} alt={user?.username || "User"} />
                        <AvatarFallback>{user?.firstName?.charAt(0) || user?.username?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <span className="hidden lg:inline-block font-medium">
                        {user?.firstName || user?.username}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 p-2">
                    <DropdownMenuLabel>
                      <p className="font-semibold">Signed in as</p>
                      <p className="font-semibold text-primary">
                        {user?.emailAddresses[0]?.emailAddress}
                      </p>
                    </DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/settings"
                        className="flex items-center px-2 py-2 text-sm rounded-md cursor-pointer"
                      >
                        <Settings2 className="mr-2 h-4 w-4" />
                        My Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <SignOutButton>
                        <button
                          className="flex items-center w-full px-2 py-2 text-sm rounded-md text-destructive cursor-pointer"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Log out
                        </button>
                      </SignOutButton>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {/* Mobile Menu with User Options */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                  <div className="py-4 flex flex-col h-full">
                    <div className="flex items-center space-x-3 mb-8">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.imageUrl} alt={user?.username || "User"} />
                        <AvatarFallback>{user?.firstName?.charAt(0) || user?.username?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user?.firstName || user?.username}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.emailAddresses[0]?.emailAddress}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Link href="/dashboard" className="block">
                        <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
                      </Link>
                      <Link href="/jobs" className="block">
                        <Button variant="ghost" className="w-full justify-start">Jobs</Button>
                      </Link>
                      <Link href="/leaderboard" className="block">
                        <Button variant="ghost" className="w-full justify-start">Leaderboard</Button>
                      </Link>
                      <Link href="/settings" className="block">
                        <Button variant="ghost" className="w-full justify-start">
                          <Settings2 className="mr-2 h-4 w-4" />
                          Settings
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="mt-auto">
                      <SignOutButton>
                        <Button variant="destructive" className="w-full">
                          <LogOut className="mr-2 h-4 w-4" />
                          Log out
                        </Button>
                      </SignOutButton>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </>
          ) : (
            <Link href="/auth">
              <Button variant="default">
                Login / Sign Up
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}