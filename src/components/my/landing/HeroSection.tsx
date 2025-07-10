/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
// page.tsx (or a new component file, e.g., components/landing/HeroSection.tsx)
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { motion } from "framer-motion";

// Animation variants (can be in a separate file)
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


// 3D Particle Component
const Particles = ({ count }: { count: number }) => {
  const mesh = useRef<THREE.InstancedMesh | null>(null);
  const light = useRef<THREE.PointLight | null>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      particle.mx += (state.mouse.x * state.viewport.width - particle.mx) * 0.01;
      particle.my += (state.mouse.y * state.viewport.height - particle.my) * 0.01;

      dummy.position.set(
        (particle.mx / 10) * b + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * a + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      if (mesh.current) {
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
    });
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <pointLight ref={light} distance={40} intensity={8} color="blue" />
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#0ea5e9" />
      </instancedMesh>
    </>
  );
};


// The New Hero Section with 3D background
const HeroSection = () => (
    <div className="relative w-full h-screen">
        <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} />
            <Particles count={50} />
            <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
        <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="container px-4 max-w-5xl mx-auto text-center space-y-8"
        >
            <motion.div variants={fadeIn} className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-2">
                <p className="text-primary font-medium text-sm">Your Fitness Journey Starts Here</p>
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Your Personal<br /><span className="text-primary">Workout Buddy</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Track your fitness journey, plan your workouts, and achieve your goals with our comprehensive workout companion.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <SignedOut>
                    <SignInButton mode="modal">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="lg" className="px-8 rounded-full font-medium">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button>
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
                    <Button size="lg" variant="outline" className="px-8 rounded-full font-medium">Learn More</Button>
                </motion.div>
            </motion.div>
        </motion.div>
        </div>
    </div>
);

export default HeroSection;