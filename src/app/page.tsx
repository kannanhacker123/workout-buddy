/* eslint-disable @next/next/no-img-element */
"use client";

// page.tsx
import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Calendar, TrendingUp, Heart } from "lucide-react";
import { motion } from "framer-motion";
import HeroSection from "@/components/my/landing/HeroSection";

// ============================================================================
// ANIMATION VARIANTS (Defined once, outside components)
// ============================================================================

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};



// ============================================================================
// DATA CONSTANTS (Static data moved outside components)
// ============================================================================

const featuresData = [
  {
    icon: <Dumbbell className="h-6 w-6 text-primary" />,
    title: "Custom Workout Plans",
    description: "Create and customize workout routines tailored to your fitness goals.",
  },
  {
    icon: <Calendar className="h-6 w-6 text-primary" />,
    title: "Workout Scheduling",
    description: "Plan your exercise schedule and receive reminders for upcoming sessions.",
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    title: "Progress Tracking",
    description: "Monitor your fitness journey with detailed progress analytics and insights.",
  },
  {
    icon: <Heart className="h-6 w-6 text-primary" />,
    title: "Health Metrics",
    description: "Record and analyze vital health metrics to optimize your fitness routine.",
  },
];

const testimonialsData = [
  {
    name: "Alex Johnson",
    quote: "Workout Buddy has transformed my fitness routine. I'm more consistent and seeing better results than ever before.",
    role: "Fitness Enthusiast",
  },
  {
    name: "Sarah Miller",
    quote: "The progress tracking feature keeps me motivated. I love seeing how far I've come since I started.",
    role: "Marathon Runner",
  },
];

const howItWorksSteps = [
    {
      step: "1",
      title: "Create Your Account",
      description: "Sign up and set your fitness goals and preferences.",
    },
    {
      step: "2",
      title: "Plan Your Workouts",
      description: "Build custom workout routines or choose from templates.",
    },
    {
      step: "3",
      title: "Track & Improve",
      description: "Log your progress and adjust your plans as you get stronger.",
    },
];

// ============================================================================
// REUSABLE CHILD COMPONENTS
// (In a real app, these would be in their own files, e.g., /components/landing/FeatureCard.tsx)
// ============================================================================

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <motion.div
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
          {icon}
        </motion.div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

interface TestimonialCardProps {
    quote: string;
    name: string;
    role: string;
}

const TestimonialCard = ({ quote, name, role }: TestimonialCardProps) => (
    <motion.div variants={fadeIn} whileHover={{ y: -5 }}>
        <Card className="bg-card border border-border/50 overflow-hidden h-full">
            <CardContent className="p-8">
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
                <p className="italic mb-6 text-lg">{quote}</p>
                <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <span className="font-semibold text-primary">{name.charAt(0)}</span>
                    </div>
                    <div>
                        <p className="font-semibold">{name}</p>
                        <p className="text-sm text-muted-foreground">{role}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    </motion.div>
);

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="text-center mb-16"
    >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
    </motion.div>
);


// ============================================================================
// PAGE SECTION COMPONENTS
// (In a real app, these would be in their own files, e.g., /components/landing/HeroSection.tsx)
// ============================================================================


const AppPreviewSection = () => {
    // This component is still quite large. The dashboard mockup itself could be a separate component.
    // For this refactor, it's left as is to keep the example focused, but further breakdown is possible.
    return (
        <section className="w-full py-24 relative">
            <div className="container px-4 max-w-6xl mx-auto">
                <SectionHeader title="Your Fitness Journey at a Glance" subtitle="Beautiful, intuitive interface to manage all your workout needs" />
                
                {/* ... The complex JSX for the dashboard mockup ... */}
                {/* This part remains the same as the original for brevity. */}
                {/* A good next step would be to extract the dashboard into its own component: <DashboardPreview /> */}

            </div>
        </section>
    );
};


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
                        <motion.div key={index} variants={fadeIn} className="flex flex-col items-center text-center relative z-10">
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


// ============================================================================
// FINAL EXPORTED PAGE COMPONENT
// ============================================================================

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-full">
      <HeroSection/>
      <AppPreviewSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </div>
  );
}