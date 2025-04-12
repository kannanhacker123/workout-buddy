

import Link from 'next/link';
import { ModeToggle } from './modeToggle';
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { currentUser } from '@clerk/nextjs/server';

const NavBar = async () => {
  const user = await currentUser()
  
  if (user == null) {
    return (
      <header className="fixed top-0 w-full bg-background border-b z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-chakra-petch text-xl font-bold">
              Workout-Buddy
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {/* Desktop Nav Items */}
            <div className="hidden md:flex items-center gap-4">
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">Sign in</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm"  variant={'outline'}>Sign up</Button>
              </SignUpButton>
            </div>
            <ModeToggle />
          </div>
        </div>
      </header>
    );
  } 
  else {
  return (
    <header className="fixed top-0 w-full bg-background border-b z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-chakra-petch text-xl font-bold">
            Workout-Buddy
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/workouts">Workouts</Link>
            </Button>
            <UserButton />
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
};

export default NavBar;