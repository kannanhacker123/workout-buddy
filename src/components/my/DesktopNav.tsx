"use client"

import React from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ModeToggle } from './modeToggle'
import { Avatar, AvatarImage } from '../ui/avatar'

const DesktopNav = () => {
    const { isSignedIn, user } = useUser()
    const { signOut } = useAuth()
    
    return (
        <div className='hidden md:flex items-center space-x-4'>
            {isSignedIn ? (
                <>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                            {user?.firstName || 'User'}
                        </span>
                        {user?.imageUrl && (
                            <Avatar>
                                <AvatarImage src={user.imageUrl} alt="Profile" className="h-8 w-8 rounded-full"/>
                            </Avatar>
                        )}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => signOut()}>
                        Log out
                    </Button>
                </>
            ) : (
                <>
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/sign-in">Sign in</Link>
                    </Button>
                    <Button size="sm" asChild>
                        <Link href="/sign-up">Sign up</Link>
                    </Button>
                </>
            )}
            <ModeToggle />
        </div>
    )
}

export default DesktopNav