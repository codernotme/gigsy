"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TowerControl as GameController, Trophy, Coins, Users, ArrowRight, Star, Code, Globe } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const FloatingIcons = [Trophy, Star, Coins, Users, Code]

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pixel-bg">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'64\' height=\'64\' viewBox=\'0 0 64 64\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h8v8H0zM16 0h8v8h-8zM32 0h8v8h-8zM48 0h8v8h-8zM8 8h8v8H8zM24 8h8v8h-8zM40 8h8v8h-8zM56 8h8v8h-8z\' fill=\'%23000\' fill-opacity=\'0.1\' /%3E%3C/svg%3E')] bg-repeat opacity-20" />
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(var(--primary-rgb), 0.1) 0%, transparent 50%)',
          }}
        />
        <div className="relative z-10 text-center space-y-8 px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50 mb-4">
              GIGSY
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Level Up Your Freelance Career in the Gaming-Inspired Marketplace
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth" className="w-full">
              <Button size="lg" className="minecraft-button text-lg px-8 py-6 bg-primary hover:bg-primary/90">
                <GameController className="mr-2 h-6 w-6" />
                Start Your Journey
              </Button>
              </Link>
              <Link href="/jobs" className="w-full">
              <Button size="lg" className="minecraft-button text-lg px-8 py-6" variant="outline">
                Explore Quests
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {FloatingIcons.map((Icon, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            >
              <Icon className="h-8 w-8 text-primary/20" />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Freelancers", value: "10,000+" },
              { label: "Completed Quests", value: "25,000+" },
              { label: "GigCoins Earned", value: "1M+" },
              { label: "Success Rate", value: "95%" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Quests</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join the revolution of gamified freelancing where every project is an adventure
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 space-y-4 hover:scale-105 transition-transform bg-gradient-to-br from-background to-accent/5 pixel-border">
              <Trophy className="h-12 w-12 text-primary" />
              <h3 className="text-2xl font-bold">Leaderboard</h3>
              <p className="text-muted-foreground">Compete with fellow freelancers and earn exclusive rewards</p>
              <Button variant="ghost" className="w-full">
                View Rankings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
            <Card className="p-6 space-y-4 hover:scale-105 transition-transform bg-gradient-to-br from-background to-accent/5 pixel-border">
              <Coins className="h-12 w-12 text-primary" />
              <h3 className="text-2xl font-bold">GigCoin</h3>
              <p className="text-muted-foreground">Earn and spend digital currency on the platform</p>
              <Button variant="ghost" className="w-full">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
            <Card className="p-6 space-y-4 hover:scale-105 transition-transform bg-gradient-to-br from-background to-accent/5 pixel-border">
              <Globe className="h-12 w-12 text-primary" />
              <h3 className="text-2xl font-bold">Global Network</h3>
              <p className="text-muted-foreground">Connect with talented freelancers worldwide</p>
              <Button variant="ghost" className="w-full">
                Explore Network
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Adventure?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of freelancers who have transformed their careers through gamified experiences
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Join Gigsy Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </main>
  )
}