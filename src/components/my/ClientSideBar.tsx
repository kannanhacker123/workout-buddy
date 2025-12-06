"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home, 
  ChevronLeft, 
  ChevronRight,
  Menu
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Inline useMediaQuery hook
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);

    // Create listener function
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener
    media.addEventListener("change", listener);

    // Remove listener on cleanup
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-5 w-5" />,
  },
];

const ClientSideBar = () => {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const sidebar = (
    <div className={cn(
      "flex flex-col h-[calc(100vh-64px)] bg-background border-r transition-all duration-300",
      expanded ? "w-64" : "w-20"
    )}>
      <div className="flex items-center justify-between p-4">
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-chakra-petch text-xl font-bold"
          >
            Workout-Buddy
          </motion.div>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-auto">
          {expanded ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </div>
      
      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-2 px-2">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                pathname === item.href 
                  ? "bg-accent text-accent-foreground" 
                  : "hover:bg-accent/50",
                !expanded && "justify-center px-0"
              )}
            >
              {item.icon}
              {expanded && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      
      <div className="p-4 border-t">
        <div className={cn(
          "flex items-center gap-3", 
          !expanded && "justify-center"
        )}>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            U
          </div>
          {expanded && (
            <div className="flex flex-col text-sm">
              <span className="font-medium">User Name</span>
              <span className="text-muted-foreground text-xs">user@example.com</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Mobile version uses Sheet from shadcn
  if (!isDesktop) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden fixed bottom-4 right-4 z-40 rounded-full shadow-lg">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          {sidebar}
        </SheetContent>
      </Sheet>
    );
  }

  return sidebar;
};

export default ClientSideBar;