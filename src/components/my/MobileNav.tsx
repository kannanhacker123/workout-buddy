"use client";

import {
  BellIcon,
  HomeIcon,
  MenuIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ModeToggle } from "./modeToggle";

function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  useTheme();
  return (
    <div className="flex md:hidden items-center space-x-2">
      <ModeToggle />
      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-6">
            <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                Home
              </Link>
            </Button>
            <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
              <Link href="/dashboard">
                <HomeIcon className="w-4 h-4" />
                Dashboard
              </Link>
            </Button>
            <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
              <Link href="/workouts">
                <BellIcon className="w-4 h-4" />
                Workouts
              </Link>
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;