/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect, JSX } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  UploadIcon, 
  ImageIcon, 
  FileIcon, 
  FileTextIcon, 
  FileAudioIcon,
  FileVideoIcon,
  MoreHorizontalIcon,
  TrashIcon,
  DownloadIcon,
  LogOutIcon
} from "lucide-react"
import { CldImage, CldUploadWidget } from 'next-cloudinary'
import { SignOutButton, useAuth, useUser } from "@clerk/nextjs"

// File type definitions
const FILE_TYPES = {
  IMAGE: ["jpg", "jpeg", "png", "gif", "webp", "svg"],
  VIDEO: ["mp4", "webm", "mov", "avi", "mkv"],
  DOCUMENT: ["pdf", "doc", "docx", "xls", "xlsx", "txt", "md"],
  AUDIO: ["mp3", "wav", "ogg", "flac"]
}

// File interface
interface File {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: Date;
}

// Sample data structure for files (replace with actual API fetch)
const sampleFiles: File[] = [
  { 
    id: "1", 
    name: "product-image.jpg", 
    type: "image/jpeg", 
    size: 2400000, 
    url: "cld-sample.jpg", 
    uploadedAt: new Date("2025-04-20T10:30:00") 
  },
  { 
    id: "2", 
    name: "presentation.pdf", 
    type: "application/pdf", 
    size: 5600000, 
    url: "sample-pdf", 
    uploadedAt: new Date("2025-04-18T14:15:00") 
  },
  { 
    id: "3", 
    name: "sales-data.xlsx", 
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", 
    size: 1200000, 
    url: "sample-xlsx", 
    uploadedAt: new Date("2025-04-22T09:45:00") 
  },
  { 
    id: "4", 
    name: "project-video.mp4", 
    type: "video/mp4", 
    size: 24000000, 
    url: "sample-video", 
    uploadedAt: new Date("2025-04-21T16:20:00") 
  },
  { 
    id: "5", 
    name: "voice-recording.mp3", 
    type: "audio/mpeg", 
    size: 3200000, 
    url: "sample-audio", 
    uploadedAt: new Date("2025-04-19T11:10:00") 
  }
]

export default function FilePage() {
    const router = useRouter();
    const { isLoaded: authLoaded, userId} = useAuth();
    const { user } = useUser();
    
    const [activeFilter, setActiveFilter] = useState("Recent");
    const [showModal, setShowModal] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showFileMenu, setShowFileMenu] = useState<string | null>(null);
    
    // Authentication check
    useEffect(() => {
        if (authLoaded && !userId) {
            router.push("/");
        }
    }, [authLoaded, userId, router]);
    
    // Fetch files on component mount (only if authenticated)
    useEffect(() => {
        if (!userId) return;
        
        // Simulate API fetch
        const fetchFiles = async () => {
            try {
                // In a real app, include the user ID to fetch only their files
                // const response = await fetch(`/api/files?userId=${userId}`)
                // const data = await response.json()
                
                // Using sample data for now
                setTimeout(() => {
                    setFiles(sampleFiles);
                    setIsLoading(false);
                }, 800); // Simulate network delay
            } catch (error) {
                console.error("Error fetching files:", error);
                setIsLoading(false);
            }
        };
        
        fetchFiles();
    }, [userId]);
    
    
    
    // If auth is still loading or user is not authenticated, show loading state
    if (!authLoaded || !userId) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }
    
    // Filter files based on selected filter
    const filteredFiles = files.filter(file => {
        if (!file.name) return false; // Skip files without a name
        const extension = (file.name.split('.').pop()?.toLowerCase() ?? "");
        
        switch(activeFilter) {
            case "Recent":
                return true; // Show all files
            case "Images":
                return FILE_TYPES.IMAGE.includes(extension);
            case "Videos":
                return FILE_TYPES.VIDEO.includes(extension);
            case "Documents":
                return FILE_TYPES.DOCUMENT.includes(extension);
            case "Audio":
                return FILE_TYPES.AUDIO.includes(extension);
            case "Other":
                return !FILE_TYPES.IMAGE.includes(extension) && 
                       !FILE_TYPES.VIDEO.includes(extension) && 
                       !FILE_TYPES.DOCUMENT.includes(extension) && 
                       !FILE_TYPES.AUDIO.includes(extension);
            default:
                return true;
        }
    });
    
    // Sort files by most recent
    const sortedFiles = [...filteredFiles].sort((a, b) => 
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
    
    // Handle file upload completion
    const handleUploadSuccess = (results: any) => {
        console.log("Upload results:", results);

        // Extract the first uploaded file's details
        const uploadedFile = results.info;

        // Create new file object
        const newFile: File = {
            id: uploadedFile.public_id,
            name: uploadedFile.original_filename,
            type: uploadedFile.resource_type + "/" + uploadedFile.format,
            size: uploadedFile.bytes,
            url: uploadedFile.secure_url,
            uploadedAt: new Date()
        };

        // Add to files list
        setFiles((prevFiles: File[]) => [newFile, ...prevFiles]);
        
        // In a real app, save this file to the database associated with the user
        // Example:
        // fetch('/api/files', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ ...newFile, userId })
        // })
        
        setShowModal(false);
    };
    
    // Format file size for display
    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + " B";
        else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
        else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + " MB";
        else return (bytes / 1073741824).toFixed(1) + " GB";
    };
    
    // Format date for display
    const formatDate = (date: Date): string => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        
        // Less than 24 hours
        if (diff < 86400000) {
            if (diff < 3600000) {
                const mins = Math.floor(diff / 60000);
                return `${mins} minute${mins !== 1 ? 's' : ''} ago`;
            } else {
                const hours = Math.floor(diff / 3600000);
                return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
            }
        } 
        // Less than 7 days
        else if (diff < 604800000) {
            const days = Math.floor(diff / 86400000);
            return `${days} day${days !== 1 ? 's' : ''} ago`;
        }
        // More than 7 days
        else {
            return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
            });
        }
    };
    
    // Get appropriate icon for file type
    const getFileIcon = ({ fileName }: { fileName: string }): JSX.Element => {
        const extension: string = fileName.split('.').pop()?.toLowerCase() ?? "";
        
        if (FILE_TYPES.IMAGE.includes(extension)) {
            return <ImageIcon className="h-6 w-6 text-blue-500" />;
        } else if (FILE_TYPES.VIDEO.includes(extension)) {
            return <FileVideoIcon className="h-6 w-6 text-purple-500" />;
        } else if (FILE_TYPES.DOCUMENT.includes(extension)) {
            return <FileTextIcon className="h-6 w-6 text-green-500" />;
        } else if (FILE_TYPES.AUDIO.includes(extension)) {
            return <FileAudioIcon className="h-6 w-6 text-orange-500" />;
        } else {
            return <FileIcon className="h-6 w-6 text-gray-500" />;
        }
    };
    
    // Delete file handler
    const handleDeleteFile = (fileId: string): void => {
        // In real app: Call API to delete file
        // fetch(`/api/files/${fileId}?userId=${userId}`, {
        //     method: 'DELETE'
        // })
        
        setFiles((prevFiles: File[]) => prevFiles.filter((file: File) => file.id !== fileId));
        setShowFileMenu(null);
    };
    
    // Download file handler
    const handleDownloadFile = (file: File): void => {
        // In real app: Initiate download from Cloudinary URL
        console.log(`Downloading file: ${file.name}`);
        
        // Example of real download implementation:
        // const link = document.createElement('a');
        // link.href = file.url;
        // link.download = file.name;
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
        
        setShowFileMenu(null);
    };

    return (
        <div className="space-y-4 px-4 md:px-8 py-6">
            {/* Top Bar with Title, Upload Button, and User Info */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                {/* Title & Tabs */}
                <div className="flex flex-row items-center space-x-4">
                    <Link href="/files">
                        <span className="text-2xl sm:text-3xl font-bold">Files</span>
                    </Link>
                    <div className="w-0.5 h-6 bg-gray-400" />
                    <Link href="/files/folders">
                        <span className="text-2xl sm:text-3xl font-bold text-gray-500 hover:text-gray-700">Folders</span>
                    </Link>
                </div>

                {/* User Profile and Actions */}
                <div className="flex items-center space-x-4">
                    {/* Upload Button */}
                    <Button
                        variant="outline"
                        className="flex items-center space-x-2"
                        onClick={() => setShowModal(true)}
                    >
                        <UploadIcon className="h-5 w-5 text-gray-600" />
                        <span className="text-base font-medium">Upload</span>
                    </Button>
                    
                    {/* User Profile */}
                    <div className="flex items-center space-x-3">
                        <div className="text-right hidden md:block">
                            <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                            <p className="text-sm text-gray-500">{user?.emailAddresses[0]?.emailAddress}</p>
                        </div>
                        
                        {user?.imageUrl ? (
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                    src={user.imageUrl} 
                                    alt="Profile" 
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="font-medium text-blue-600">
                                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                                </span>
                            </div>
                        )}
                        
                        {/* Sign Out Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            title="Sign Out"
                        >
                            <SignOutButton><LogOutIcon className="h-5 w-5" /></SignOutButton>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Horizontal Scrollable File Filter Bar */}
            <div className="flex overflow-x-auto space-x-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-2">
                {["Recent", "Images", "Videos", "Documents", "Audio", "Other"].map((filter) => (
                    <Button
                        key={filter}
                        variant={filter === activeFilter ? "default" : "ghost"}
                        className="flex-shrink-0"
                        onClick={() => setActiveFilter(filter)}
                    >
                        {filter}
                    </Button>
                ))}
            </div>

            {/* Dynamic File List */}
            <div className="border rounded-lg p-4">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : sortedFiles.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <FileIcon className="h-12 w-12 mb-4 text-gray-400" />
                        <p className="text-lg font-medium">No files found</p>
                        <p className="text-sm">Upload some files or try a different filter</p>
                    </div>
                ) : (
                    <div className="space-y-1">
                        <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-blue-600 text-white rounded-t-lg text-sm font-medium">
                            <div className="col-span-6">Name</div>
                            <div className="col-span-2 hidden md:block">Size</div>
                            <div className="col-span-3 hidden md:block">Date</div>
                            <div className="col-span-1"></div>
                        </div>
                        
                        {sortedFiles.map((file) => (
                            <div key={file.id} className="grid grid-cols-12 gap-4 px-4 py-3 border-b hover:bg-blue-50 items-center relative">
                                <div className="col-span-6 flex items-center space-x-3 overflow-hidden">
                                    {file.type.startsWith('image/') ? (
                                        <div className="h-10 w-10 rounded flex-shrink-0 overflow-hidden">
                                            <CldImage 
                                                width="40" 
                                                height="40" 
                                                src={file.url} 
                                                alt={file.name || "noname"} 
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-10 w-10 rounded flex-shrink-0 flex items-center justify-center bg-blue-100">
                                            {getFileIcon({ fileName: file.name })}
                                        </div>
                                    )}
                                    <span className="truncate font-medium">{file.name}</span>
                                </div>
                                <div className="col-span-2 hidden md:block text-gray-600 text-sm">
                                    {formatFileSize(file.size)}
                                </div>
                                <div className="col-span-3 hidden md:block text-gray-600 text-sm">
                                    {formatDate(new Date(file.uploadedAt))}
                                </div>
                                <div className="col-span-1 flex justify-end">
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="h-8 w-8 rounded-full"
                                        onClick={() => setShowFileMenu(showFileMenu === file.id ? null : file.id)}
                                    >
                                        <MoreHorizontalIcon className="h-5 w-5" />
                                    </Button>
                                    
                                    {showFileMenu === file.id && (
                                        <div className="absolute right-4 top-12 z-10 bg-white shadow-lg rounded-lg py-2 min-w-32">
                                            <button 
                                                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center text-sm"
                                                onClick={() => handleDownloadFile(file)}
                                            >
                                                <DownloadIcon className="h-4 w-4 mr-2" />
                                                Download
                                            </button>
                                            <button 
                                                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center text-sm text-red-600"
                                                onClick={() => handleDeleteFile(file.id)}
                                            >
                                                <TrashIcon className="h-4 w-4 mr-2" />
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Upload Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Upload a File</h2>
                        
                        <CldUploadWidget 
                            uploadPreset="qwerty" // Replace with your actual preset
                            onSuccess={handleUploadSuccess}
                            options={{
                                maxFiles: 1,
                                sources: ['local', 'url', 'camera', 'dropbox', 'google_drive'],
                                resourceType: 'auto'
                            }}
                        >
                            {({ open }: { open: () => void }) => (
                                <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50"
                                    onClick={() => open()}
                                >
                                    <UploadIcon className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                                    <p className="text-sm text-gray-600">Click or drag files to upload</p>
                                    <p className="text-xs text-gray-500 mt-1">Support for images, videos, documents, and audio</p>
                                </div>
                            )}
                        </CldUploadWidget>
                        
                        <div className="flex justify-end space-x-2 mt-4">
                            <Button
                                variant="secondary"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Background overlay for file menu */}
            {showFileMenu && (
                <div 
                    className="fixed inset-0 z-0" 
                    onClick={() => setShowFileMenu(null)}
                />
            )}
        </div>
    );
}