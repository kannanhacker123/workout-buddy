"use client"

import React from "react"
import { FileIcon } from "lucide-react"

export default function FilePage() {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh] space-y-4 text-center px-4">
            <div className="bg-muted/30 p-6 rounded-full">
                <FileIcon className="h-16 w-16 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold">Local File Storage Coming Soon</h1>
            <p className="text-muted-foreground max-w-md">
                We are transitioning to a local-first architecture. File storage functionality will be available in a future update using local browser storage.
            </p>
        </div>
    );
}