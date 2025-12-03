import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion";

// Animation variants
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// The New Hero Section without 3D background
const HeroSection = () => (
  <div className="relative w-full h-[90vh] overflow-hidden bg-gradient-to-b from-background to-background/50 flex items-center justify-center">
    {/* Abstract Background Elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px] " />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[100px] " />
    </div>

    <div className="relative z-10 container px-4 max-w-5xl mx-auto text-center space-y-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="space-y-8"
      >
        <motion.div
          variants={fadeIn}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-4 backdrop-blur-sm mx-auto"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <p className="text-primary font-medium text-sm">
            AI-Powered Fitness Revolution
          </p>
        </motion.div>

        <motion.h1
          variants={fadeIn}
          className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight font-chakra-petch"
        >
          Train Smarter with
          <br />
          <span className="text-gradient drop-shadow-sm">Workout Buddy</span>
        </motion.h1>

        <motion.p
          variants={fadeIn}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Your personal AI coach. Track progress, get custom plans, and crush your goals with the power of data.
        </motion.p>

        <motion.div
          variants={fadeIn}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="px-8 h-12 rounded-full font-bold text-lg shadow-lg shadow-primary/25 bg-gradient-to-r from-primary to-purple-600 hover:to-purple-700 border-0"
              asChild
            >
              <a href="/dashboard">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="px-8 h-12 rounded-full font-bold text-lg border-2 hover:bg-primary/5"
            >
              View Demo
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  </div>
);

export default HeroSection;
