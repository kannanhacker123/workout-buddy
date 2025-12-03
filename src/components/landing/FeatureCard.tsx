"use client";

import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  
}

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <motion.div
    variants={fadeIn}
    whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
    className="h-full"
  >
    <Card className="glass h-full transition-all duration-300 hover:shadow-primary/20 hover:border-primary/50 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardHeader>
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          className="p-3 w-fit rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 mb-4 group-hover:from-primary/30 group-hover:to-purple-500/30 transition-colors ring-1 ring-primary/20"
        >
          {icon}
        </motion.div>
        <CardTitle className="font-chakra-petch text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);
