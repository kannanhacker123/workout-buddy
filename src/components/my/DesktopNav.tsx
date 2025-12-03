"use client"

import React from 'react'
import { ModeToggle } from './modeToggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const DesktopNav = () => {
    
    return (
        <div className='hidden md:flex items-center space-x-4'>
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                    User
                </span>
                <Avatar>
                    <AvatarImage src="" alt="Profile" className="h-8 w-8 rounded-full"/>
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            </div>
            <ModeToggle />
        </div>
    )
}

export default DesktopNav