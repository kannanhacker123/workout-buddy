"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
    quote: string;
    name: string;
    role: string;
}

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export const TestimonialCard = ({ quote, name, role }: TestimonialCardProps) => (
    <motion.div variants={fadeIn} whileHover={{ y: -5 }}>
        <Card className="glass h-full border-none bg-secondary/30 relative">
            <CardContent className="p-8">
                <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/20 rotate-180" />
                <div className="mb-6">
                    {[...Array(5)].map((_, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1, transition: { delay: 0.1 * i } }}
                            viewport={{ once: true }}
                            className="text-yellow-500 mr-1 inline-block"
                        >
                            ★
                        </motion.span>
                    ))}
                </div>
                <p className="italic mb-6 text-lg text-foreground/90 font-medium">&quot;{quote}&quot;</p>
                <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mr-4 shadow-md">
                        <span className="font-bold text-white text-lg">{name.charAt(0)}</span>
                    </div>
                    <div>
                        <p className="font-bold font-chakra-petch">{name}</p>
                        <p className="text-sm text-primary font-medium">{role}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    </motion.div>
);
