"use client";

// page.tsx
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Calendar, TrendingUp, Heart, Clock, ArrowRight } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const pulseAnimation = {
  initial: { scale: 1 },
  pulse: {
    scale: 1.05,
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "reverse" as const, // Explicitly cast to the correct type
    },
  },
};

const floatingAnimation = {
  initial: { y: 0 },
  float: {
    y: [-8, 8],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "mirror" as const, // Changed from "reverse" to "mirror"
      ease: "easeInOut",
    },
  },
};

export default function HomePage() {
  const containerRef = useRef(null);

  const features = [
    {
      icon: <Dumbbell className="h-6 w-6 text-primary" />,
      title: "Custom Workout Plans",
      description: "Create and customize workout routines tailored to your fitness goals."
    },
    {
      icon: <Calendar className="h-6 w-6 text-primary" />,
      title: "Workout Scheduling",
      description: "Plan your exercise schedule and receive reminders for upcoming sessions."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: "Progress Tracking",
      description: "Monitor your fitness journey with detailed progress analytics and insights."
    },
    {
      icon: <Heart className="h-6 w-6 text-primary" />,
      title: "Health Metrics",
      description: "Record and analyze vital health metrics to optimize your fitness routine."
    }
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      quote: "Workout Buddy has transformed my fitness routine. I'm more consistent and seeing better results than ever before.",
      role: "Fitness Enthusiast"
    },
    {
      name: "Sarah Miller",
      quote: "The progress tracking feature keeps me motivated. I love seeing how far I've come since I started.",
      role: "Marathon Runner"
    }
  ];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section with Gradient Background & Animations */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="w-full bg-gradient-to-br from-primary/10 via-background to-secondary/5 py-20"
        ref={containerRef}
      >
        <div className="container px-4 max-w-5xl mx-auto text-center space-y-8">
          <motion.div 
            variants={fadeIn}
            className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-2"
          >
            <p className="text-primary font-medium text-sm">Your Fitness Journey Starts Here</p>
          </motion.div>
          
          <motion.h1 
            variants={fadeIn}
            className="text-4xl md:text-6xl font-extrabold tracking-tight font-chakra-petch leading-tight"
          >
            Your Personal<br /><span className="text-primary">Workout Buddy</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeIn}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Track your fitness journey, plan your workouts, and achieve your goals with our comprehensive workout companion.
          </motion.p>
          
          <motion.div 
            variants={fadeIn}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <SignedOut>
              <SignInButton mode="modal">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="px-8 rounded-full font-medium">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="px-8 rounded-full font-medium" asChild>
                  <a href="/dashboard">Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" /></a>
                </Button>
              </motion.div>
            </SignedIn>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="px-8 rounded-full font-medium">
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* App Preview with Floating Cards and Dashboard Mockup */}
      <section className="w-full py-24 relative">
        <div className="container px-4 max-w-6xl mx-auto">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Fitness Journey at a Glance</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Beautiful, intuitive interface to manage all your workout needs
            </p>
          </motion.div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Main Preview with Dashboard Mockup */}
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl shadow-xl border border-border/40 overflow-hidden relative"
            >
              {/* Dashboard Mockup - simplified version */}
              <div className="absolute inset-0 p-6">
                <div className="h-full flex flex-col">
                  {/* Dashboard Header */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Dumbbell className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="font-bold">Dashboard</h3>
                    </div>
                    <div className="bg-card px-3 py-1 rounded-full text-xs font-medium">April 10, 2025</div>
                  </div>
                  
                  {/* Dashboard Content */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-card rounded-lg p-4 shadow-sm border border-border/30">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium">Weekly Progress</h4>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="h-24 flex items-end justify-between gap-1 mt-2">
                        {[20, 45, 30, 70, 60, 80, 50].map((height, i) => (
                          <div key={i} className="relative flex-1">
                            <div 
                              className="bg-primary/80 rounded-t-sm w-full absolute bottom-0"
                              style={{ height: `${height}%` }}
                            ></div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>Mon</span>
                        <span>Wed</span>
                        <span>Fri</span>
                        <span>Sun</span>
                      </div>
                    </div>
                    
                    <div className="bg-card rounded-lg p-4 shadow-sm border border-border/30">
                      <h4 className="text-sm font-medium mb-2">Activity Overview</h4>
                      <div className="space-y-2">
                        {[
                          { name: 'Strength', value: 70 },
                          { name: 'Cardio', value: 45 },
                          { name: 'Flexibility', value: 60 }
                        ].map((item, i) => (
                          <div key={i}>
                            <div className="flex justify-between text-xs mb-1">
                              <span>{item.name}</span>
                              <span>{item.value}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary" 
                                style={{ width: `${item.value}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Upcoming Workouts */}
                  <div className="bg-card rounded-lg p-4 shadow-sm border border-border/30 flex-1">
                    <h4 className="text-sm font-medium mb-3">Upcoming Workouts</h4>
                    <div className="space-y-2">
                      {[
                        { name: 'Upper Body', time: '6:00 PM Today', completed: false },
                        { name: 'Cardio Session', time: '7:30 AM Tomorrow', completed: false },
                        { name: 'Leg Day', time: '5:00 PM Friday', completed: false }
                      ].map((workout, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-border/20 last:border-0">
                          <div className="flex items-center gap-3">
                            <div className={`h-3 w-3 rounded-full ${workout.completed ? 'bg-green-500' : 'bg-primary'}`}></div>
                            <span className="font-medium text-sm">{workout.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{workout.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Shimmer effect */}
              <motion.div 
                initial={{ x: "-100%", opacity: 0.5 }}
                animate={{ 
                  x: "200%", 
                  opacity: [0.5, 0.8, 0.5],
                  transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                }}
                className="absolute top-0 left-0 right-0 h-full w-1/3 bg-gradient-to-r from-transparent via-primary/10 to-transparent -skew-x-12"
              />
            </motion.div>
            
            {/* Floating cards with animation */}
            <motion.div 
              initial="initial"
              animate="float"
              variants={floatingAnimation}
              className="hidden md:block absolute -top-8 -left-8 bg-card p-4 rounded-lg shadow-lg border border-border/40 w-64 rotate-6 z-10"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Weekly Progress</h4>
                  <p className="text-sm text-muted-foreground">+15% from last week</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial="initial"
              animate="float"
              variants={{
                ...floatingAnimation,
                float: {
                  ...floatingAnimation.float,
                  transition: { 
                    ...floatingAnimation.float.transition,
                    delay: 1.5 
                  }
                }
              }}
              className="hidden md:block absolute -bottom-6 -right-8 bg-card p-4 rounded-lg shadow-lg border border-border/40 w-64 -rotate-3 z-10"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Next Workout</h4>
                  <p className="text-sm text-muted-foreground">Today at 6:00 PM</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features with Animated Cards */}
      <section className="w-full py-20 bg-muted/30">
        <div className="container px-4 max-w-6xl mx-auto">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Your Fitness Goals</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to plan, track, and improve your workouts
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                className="h-full"
              >
                <Card className="transition-all hover:shadow-lg border border-border/50 overflow-hidden group h-full">
                  <div className="absolute h-1 bg-primary w-0 group-hover:w-full transition-all duration-300"></div>
                  <CardHeader>
                    <motion.div 
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="p-3 w-fit rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors"
                    >
                      {feature.icon}
                    </motion.div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works with Animated Connection */}
      <section className="w-full py-24">
        <div className="container px-4 max-w-6xl mx-auto">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple steps to kickstart your fitness journey
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Animated connection line for desktop */}
            <div className="hidden md:block relative h-0.5 mt-16 mb-16">
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ 
                  scaleX: 1,
                  transition: { duration: 1.5, ease: "easeInOut" }
                }}
                viewport={{ once: true }}
                style={{ originX: 0 }}
                className="absolute top-0 left-0 right-0 h-full bg-primary z-0"
              ></motion.div>
            </div>
            
            <motion.div 
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                {
                  step: "1",
                  title: "Create Your Account",
                  description: "Sign up and set your fitness goals and preferences."
                },
                {
                  step: "2",
                  title: "Plan Your Workouts",
                  description: "Build custom workout routines or choose from templates."
                },
                {
                  step: "3",
                  title: "Track & Improve",
                  description: "Log your progress and adjust your plans as you get stronger."
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className="flex flex-col items-center text-center relative z-10"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ 
                      scale: 1,
                      transition: { 
                        type: "spring", 
                        stiffness: 200, 
                        delay: index * 0.3 
                      }
                    }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                    className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl mb-6 shadow-md"
                  >
                    {step.step}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials with Animation */}
      <section className="w-full py-20 bg-gradient-to-t from-primary/5 to-background">
        <div className="container px-4 max-w-6xl mx-auto">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied users transforming their fitness routines
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                custom={index}
              >
                <Card className="bg-card border border-border/50 overflow-hidden h-full">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      {[...Array(5)].map((_, i) => (
                        <motion.span 
                          key={i}
                          initial={{ opacity: 0 }}
                          whileInView={{ 
                            opacity: 1,
                            transition: { delay: 0.1 * i }
                          }}
                          viewport={{ once: true }}
                          className="text-yellow-500 mr-1 inline-block"
                        >
                          ★
                        </motion.span>
                      ))}
                    </div>
                    <p className="italic mb-6 text-lg">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <span className="font-semibold text-primary">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA with Animated Gradient and Button */}
      <section className="w-full py-16 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden relative">
        {/* Animated background gradient */}
        <motion.div 
          animate={{ 
            x: ["0%", "100%", "0%"],
            transition: { 
              duration: 15, 
              repeat: Infinity,
              ease: "linear" 
            }
          }}
          className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary to-primary/80 opacity-30"
        />
        
        <div className="container px-4 max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <motion.h2 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Ready to Transform Your Fitness Journey?
          </motion.h2>
          
          <motion.p 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-6 max-w-2xl mx-auto text-primary-foreground/90"
          >
            Join Workout Buddy today and take the first step toward achieving your fitness goals with a personalized experience.
          </motion.p>
          
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            variants={fadeIn}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <SignedOut>
              <SignInButton mode="modal">
                <motion.div 
                  initial="initial"
                  animate="pulse"
                  variants={pulseAnimation}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" variant="secondary" className="px-8 rounded-full font-medium">
                    Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <motion.div 
                initial="initial"
                animate="pulse"
                variants={pulseAnimation}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="secondary" className="px-8 rounded-full font-medium" asChild>
                  <a href="/dashboard">Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" /></a>
                </Button>
              </motion.div>
            </SignedIn>
          </motion.div>
        </div>
      </section>

      {/* Footer with Simple Animation */}
      <motion.footer 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="w-full py-12 bg-background border-t border-border"
      >
        <div className="container px-4 max-w-6xl mx-auto text-center">
          <h3 className="font-chakra-petch font-bold text-xl mb-4">Workout Buddy</h3>
          <p className="text-muted-foreground">© {new Date().getFullYear()} Workout Buddy. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
}