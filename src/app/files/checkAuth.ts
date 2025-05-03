// check auth using current user
"use server"
import { currentUser } from "@clerk/nextjs/server"

export const checkAuth = async() => {
    const user = await currentUser()
    if (!user) {
        console.log("User not found")
        // User not found, return unauthenticated state;
        
        return {
            isAuthenticated: false,
            user: null,
        }
    }
    console.log("User found")
    return {
        // User found, return authenticated state;        
        isAuthenticated: true,
        user: user,
    }
}