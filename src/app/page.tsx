/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import HeroSection from "@/components/my/landing/HeroSection";
import { FeatureCard } from "@/components/landing/FeatureCard";
import { TestimonialCard } from "@/components/landing/TestimonialCard";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { featuresData, testimonialsData, howItWorksSteps } from "@/data/landing";

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

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

// ============================================================================
// PAGE SECTION COMPONENTS
// ============================================================================


const FeaturesSection = () => (
    <section className="w-full py-20 bg-muted/30">
        <div className="container px-4 max-w-6xl mx-auto">
            <SectionHeader title="Powerful Features for Your Fitness Goals" subtitle="Everything you need to plan, track, and improve your workouts" />
            
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {featuresData.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                ))}
            </motion.div>
        </div>
    </section>
);

const HowItWorksSection = () => (
    <section className="w-full py-24">
        <div className="container px-4 max-w-6xl mx-auto">
            <SectionHeader title="How It Works" subtitle="Simple steps to kickstart your fitness journey" />
            
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Animated connection line for desktop */}
                <div className="hidden md:block relative h-0.5 mt-16 mb-16">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1, transition: { duration: 1.5, ease: "easeInOut" } }}
                        viewport={{ once: true }}
                        style={{ originX: 0 }}
                        className="absolute top-0 left-0 right-0 h-full bg-primary z-0"
                    ></motion.div>
                </div>

                <motion.div
                    variants={staggerContainer}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {howItWorksSteps.map((step, index) => (
                        <motion.div key={index} className="flex flex-col items-center text-center relative z-10">
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1, transition: { type: "spring", stiffness: 200, delay: index * 0.3 } }}
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
);

const TestimonialsSection = () => (
    <section className="w-full py-20 bg-gradient-to-t from-primary/5 to-background">
        <div className="container px-4 max-w-6xl mx-auto">
            <SectionHeader title="What Our Users Say" subtitle="Join thousands of satisfied users transforming their fitness routines" />

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
                {testimonialsData.map((testimonial, index) => (
                    <TestimonialCard key={index} {...testimonial} />
                ))}
            </motion.div>
            
        </div>
    </section>
);

const CtaSection = () => (
    <section className="w-full py-16 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden relative">
        {/* Animated background element */}
        <motion.div
            animate={{ x: ["0%", "100%", "0%"], transition: { duration: 15, repeat: Infinity, ease: "linear" } }}
            className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary to-primary/80 opacity-30"
        />
        <div className="container px-4 max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <motion.h2 variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Fitness Journey?
            </motion.h2>
            <motion.p variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-6 max-w-2xl mx-auto text-primary-foreground/90">
                Join Workout Buddy today and take the first step toward achieving your fitness goals with a personalized experience.
            </motion.p>
            {/* CTA Buttons */}
        </div>
    </section>
);

const Footer = () => {
    const socialLinks = [
        { href: "https://linkedin.com/in/your-linkedin", alt: "Follow us on LinkedIn", src: "https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" },
        { href: "https://youtube.com/your-channel", alt: "Subscribe on YouTube", src: "https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" },
        { href: "https://twitter.com/your-twitter", alt: "Follow us on Twitter", src: "https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" }
    ];

    return (
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
                <br />
                <p>Made with ❤️ by <a href="https://github.com/kannanhacker123" target="_blank" rel="noopener noreferrer" className="text-primary underline">Kannan</a></p>
                <div className="flex flex-col space-y-2 items-center justify-center mt-4 sm:flex-row sm:space-y-0 sm:space-x-2">
                    <p>Follow us on:</p>
                    <div className="flex space-x-2">
                        {socialLinks.map(link => (
                            <a key={link.alt} href={link.href} target="_blank" rel="noopener noreferrer">
                                <img src={link.src} alt={link.alt} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </motion.footer>
    );
};

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-full pt-16">
      <HeroSection/>
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
      
    </div>
  );
}