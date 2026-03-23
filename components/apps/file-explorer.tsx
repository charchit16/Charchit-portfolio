"use client"

import { useState } from "react"
import { useOS, portfolioData } from "@/lib/os-context"
import Image from "next/image"

interface FolderItem {
  id: string
  name: string
  type: "folder" | "file" | "shortcut"
  dateModified: string
  fileType: string
  size?: string
  iconUrl: string
  appId?: string
  externalLink?: string
  children?: FolderItem[]
}

const sidebarItems = [
  { id: "home", name: "Home", iconUrl: "https://img.icons8.com/fluency/48/home.png", pinned: false },
  { id: "gallery", name: "Gallery", iconUrl: "https://img.icons8.com/fluency/48/image-gallery.png", pinned: false },
  { id: "user", name: `Charchit - Person`, iconUrl: "https://img.icons8.com/fluency/48/folder-invoices--v1.png", pinned: false, isUser: true },
  { id: "desktop", name: "Desktop", iconUrl: "https://img.icons8.com/fluency/48/desktop-mac.png", pinned: true },
  { id: "downloads", name: "Downloads", iconUrl: "https://img.icons8.com/fluency/48/downloading-updates.png", pinned: true },
  { id: "documents", name: "Documents", iconUrl: "https://img.icons8.com/fluency/48/documents-folder.png", pinned: true },
  { id: "pictures", name: "Pictures", iconUrl: "https://img.icons8.com/fluency/48/image-gallery.png", pinned: true },
  { id: "music", name: "Music", iconUrl: "https://img.icons8.com/fluency/48/music-library.png", pinned: true },
  { id: "videos", name: "Videos", iconUrl: "https://img.icons8.com/fluency/48/video-playlist.png", pinned: true },
]

// Project details for each project folder
const projectDetails: Record<string, FolderItem[]> = {
  "voyagers-sih": [
    { id: "voyagers-link", name: "Visit Project", type: "shortcut", dateModified: "25-09-2025 18:45", fileType: "Web Link", iconUrl: "https://img.icons8.com/fluency/48/domain.png", externalLink: "https://voyagers-sih.vercel.app/" },
    { id: "voyagers-readme", name: "README.md", type: "file", dateModified: "25-09-2025 18:30", fileType: "Markdown", size: "4 KB", iconUrl: "https://img.icons8.com/fluency/48/txt.png" },
    { id: "voyagers-desc", name: "Description.txt", type: "file", dateModified: "25-09-2025 18:00", fileType: "Text", size: "2 KB", iconUrl: "https://img.icons8.com/fluency/48/txt.png" },
  ],
  "skill-india-bot": [
    { id: "skill-readme", name: "README.md", type: "file", dateModified: "10-05-2025 14:30", fileType: "Markdown", size: "3 KB", iconUrl: "https://img.icons8.com/fluency/48/txt.png" },
    { id: "skill-desc", name: "Description.txt", type: "file", dateModified: "10-05-2025 14:00", fileType: "Text", size: "2 KB", iconUrl: "https://img.icons8.com/fluency/48/txt.png" },
  ],
  "comic-generator": [
    { id: "comic-readme", name: "README.md", type: "file", dateModified: "15-04-2025 10:30", fileType: "Markdown", size: "3 KB", iconUrl: "https://img.icons8.com/fluency/48/txt.png" },
    { id: "comic-desc", name: "Description.txt", type: "file", dateModified: "15-04-2025 10:00", fileType: "Text", size: "1 KB", iconUrl: "https://img.icons8.com/fluency/48/txt.png" },
  ],
}

const desktopFiles: FolderItem[] = [
  { id: "projects-folder", name: "Projects", type: "folder", dateModified: "24-10-2025 23:27", fileType: "File folder", iconUrl: "https://img.icons8.com/fluency/48/code-folder.png" },
  { id: "about", name: "About Me", type: "shortcut", dateModified: "23-03-2026 22:34", fileType: "Shortcut", iconUrl: "https://img.icons8.com/fluency/48/user-male-circle--v1.png", appId: "about" },
  { id: "skills", name: "Skills", type: "shortcut", dateModified: "20-03-2026 12:34", fileType: "Shortcut", iconUrl: "https://img.icons8.com/fluency/48/light-on--v1.png", appId: "skills" },
  { id: "resume", name: "Resume", type: "file", dateModified: "21-06-2025 12:18", fileType: "PDF Document", size: "191 KB", iconUrl: "https://img.icons8.com/fluency/48/pdf-2.png", appId: "resume" },
  { id: "contact", name: "Contact", type: "shortcut", dateModified: "23-03-2026 19:18", fileType: "Shortcut", iconUrl: "https://img.icons8.com/fluency/48/new-post.png", appId: "contact" },
  { id: "github", name: "GitHub", type: "shortcut", dateModified: "12-10-2025 09:22", fileType: "Web Link", iconUrl: "https://img.icons8.com/glyph-neue/48/FFFFFF/github.png", externalLink: "https://github.com/charchit16" },
  { id: "linkedin", name: "LinkedIn", type: "shortcut", dateModified: "13-02-2025 16:26", fileType: "Web Link", iconUrl: "https://img.icons8.com/fluency/48/linkedin.png", externalLink: "https://linkedin.com/in/charchit16" },
  { id: "settings", name: "Settings", type: "shortcut", dateModified: "20-01-2026 19:09", fileType: "Shortcut", iconUrl: "https://img.icons8.com/fluency/48/settings.png", appId: "settings" },
]

const projectsFolderItems: FolderItem[] = [
  { id: "voyagers-sih", name: "voyagers-sih", type: "folder", dateModified: "25-09-2025 18:45", fileType: "File folder", iconUrl: "https://img.icons8.com/fluency/48/folder-invoices--v1.png" },
  { id: "skill-india-bot", name: "Skill India Bot", type: "folder", dateModified: "10-05-2025 14:45", fileType: "File folder", iconUrl: "https://img.icons8.com/fluency/48/folder-invoices--v1.png" },
  { id: "comic-generator", name: "AI Comic Generator", type: "folder", dateModified: "15-04-2025 10:45", fileType: "File folder", iconUrl: "https://img.icons8.com/fluency/48/folder-invoices--v1.png" },
]

const driveItems = [
  { id: "os-c", name: "OS (C:)", iconUrl: "https://img.icons8.com/fluency/48/hdd.png" },
  { id: "new-volume", name: "New Volume (I", iconUrl: "https://img.icons8.com/fluency/48/hdd.png" },
]

export function FileExplorer({ initialPath }: { initialPath?: string } = {}) {
  const { openWindow } = useOS()
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [selectedSidebar, setSelectedSidebar] = useState("desktop")
  const [expandedSections, setExpandedSections] = useState({ thisPc: true, network: false })
  const [currentPath, setCurrentPath] = useState<string[]>(
    initialPath === "/projects" ? ["Desktop", "Projects"] : ["Desktop"]
  )
  
  // Get current folder items based on path
  const getCurrentItems = (): FolderItem[] => {
    if (currentPath.length === 1 && currentPath[0] === "Desktop") {
      return desktopFiles
    }
    if (currentPath.length === 2 && currentPath[1] === "Projects") {
      return projectsFolderItems
    }
    if (currentPath.length === 3 && currentPath[1] === "Projects") {
      const projectId = currentPath[2].toLowerCase().replace(/ /g, "-")
      return projectDetails[projectId] || []
    }
    return desktopFiles
  }
  
  const handleItemDoubleClick = (item: FolderItem) => {
    if (item.type === "folder") {
      if (item.id === "projects-folder") {
        setCurrentPath(["Desktop", "Projects"])
      } else if (projectsFolderItems.some(p => p.id === item.id)) {
        setCurrentPath(["Desktop", "Projects", item.name])
      }
      setSelectedItem(null)
    } else if (item.externalLink) {
      window.open(item.externalLink, "_blank")
    } else if (item.appId) {
      openWindow(item.appId as any)
    }
  }
  
  const handleGoBack = () => {
    if (currentPath.length > 1) {
      setCurrentPath(prev => prev.slice(0, -1))
      setSelectedItem(null)
    }
  }
  
  const handlePathClick = (index: number) => {
    setCurrentPath(prev => prev.slice(0, index + 1))
    setSelectedItem(null)
  }
  
  const currentItems = getCurrentItems()
  
  return (
    <div className="flex flex-col h-full bg-[#191919] text-white/90">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-2 py-1.5 bg-[#2d2d2d] border-b border-[#1f1f1f]">
        {/* Navigation buttons */}
        <button 
          onClick={handleGoBack}
          disabled={currentPath.length <= 1}
          className={`p-1.5 rounded transition-colors ${currentPath.length > 1 ? 'hover:bg-white/5' : 'opacity-30 cursor-not-allowed'}`}
          title="Back"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/60" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>
        <button className="p-1.5 rounded opacity-30 cursor-not-allowed" title="Forward">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/60" fill="currentColor">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
          </svg>
        </button>
        
        {/* Breadcrumb / Address bar */}
        <div className="flex items-center gap-1 flex-1 mx-2 px-3 py-1 bg-[#1f1f1f] rounded border border-white/10">
          {currentPath.map((segment, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && (
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/30 mx-0.5" fill="currentColor">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              )}
              <button
                onClick={() => handlePathClick(index)}
                className="text-sm text-white/80 hover:text-white hover:underline transition-colors"
              >
                {segment}
              </button>
            </div>
          ))}
        </div>
        
        <div className="w-px h-5 bg-white/10 mx-1" />
        
        {/* New dropdown */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-white/5 transition-colors">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v8M8 12h8"/>
          </svg>
          <span className="text-xs">New</span>
          <svg viewBox="0 0 24 24" className="w-3 h-3 text-white/40" fill="currentColor">
            <path d="M7 10l5 5 5-5H7z"/>
          </svg>
        </button>
        
        <div className="w-px h-5 bg-white/10 mx-1" />
        
        {/* Action buttons */}
        <button className="p-1.5 rounded hover:bg-white/5 transition-colors" title="Cut">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/50" fill="currentColor">
            <path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3h-3z"/>
          </svg>
        </button>
        <button className="p-1.5 rounded hover:bg-white/5 transition-colors" title="Copy">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/50" fill="currentColor">
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
          </svg>
        </button>
        <button className="p-1.5 rounded hover:bg-white/5 transition-colors" title="Paste">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/50" fill="currentColor">
            <path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/>
          </svg>
        </button>
        <button className="p-1.5 rounded hover:bg-white/5 transition-colors" title="Rename">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/50" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </button>
        <button className="p-1.5 rounded hover:bg-white/5 transition-colors" title="Share">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/50" fill="currentColor">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
          </svg>
        </button>
        <button className="p-1.5 rounded hover:bg-white/5 transition-colors" title="Delete">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/50" fill="currentColor">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        </button>
        
        <div className="w-px h-5 bg-white/10 mx-1" />
        
        {/* Sort dropdown */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-white/5 transition-colors">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/60" fill="currentColor">
            <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
          </svg>
          <span className="text-xs">Sort</span>
          <svg viewBox="0 0 24 24" className="w-3 h-3 text-white/40" fill="currentColor">
            <path d="M7 10l5 5 5-5H7z"/>
          </svg>
        </button>
        
        {/* View dropdown */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-white/5 transition-colors">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/60" fill="currentColor">
            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
          </svg>
          <span className="text-xs">View</span>
          <svg viewBox="0 0 24 24" className="w-3 h-3 text-white/40" fill="currentColor">
            <path d="M7 10l5 5 5-5H7z"/>
          </svg>
        </button>
        
        {/* More */}
        <button className="p-1.5 rounded hover:bg-white/5 transition-colors">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/50" fill="currentColor">
            <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
        
        <div className="flex-1" />
        
        {/* Details button */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-white/5 transition-colors">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/60" fill="currentColor">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
          </svg>
          <span className="text-xs">Details</span>
        </button>
      </div>
      
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-52 bg-[#191919] border-r border-[#2d2d2d] overflow-y-auto win-scrollbar py-1">
          {sidebarItems.map((item, index) => (
            <div key={item.id}>
              {item.isUser && <div className="mx-2 my-1 border-t border-white/10" />}
              <button
                onClick={() => {
                  setSelectedSidebar(item.id)
                  if (item.id === "desktop") {
                    setCurrentPath(["Desktop"])
                  }
                }}
                className={`
                  flex items-center gap-2 w-full px-3 py-1.5 text-left transition-colors
                  ${selectedSidebar === item.id 
                    ? "bg-[#0078d4]/30" 
                    : "hover:bg-white/5"
                  }
                `}
              >
                <Image
                  src={item.iconUrl}
                  alt={item.name}
                  width={18}
                  height={18}
                  unoptimized
                />
                <span className="text-sm text-white/90 truncate">{item.name}</span>
                {item.pinned && (
                  <svg viewBox="0 0 24 24" className="w-3 h-3 text-white/30 ml-auto" fill="currentColor">
                    <path d="M16 4v12l-4-4-4 4V4h8zm0-2H8C6.9 2 6 2.9 6 4v18l6-6 6 6V4c0-1.1-.9-2-2-2z"/>
                  </svg>
                )}
              </button>
              {index === 2 && <div className="mx-2 my-1 border-t border-white/10" />}
            </div>
          ))}
          
          {/* This PC section */}
          <div className="mx-2 my-1 border-t border-white/10" />
          <button
            onClick={() => setExpandedSections(prev => ({ ...prev, thisPc: !prev.thisPc }))}
            className="flex items-center gap-1 w-full px-2 py-1.5 text-left hover:bg-white/5 transition-colors"
          >
            <svg viewBox="0 0 24 24" className={`w-3 h-3 text-white/50 transition-transform ${expandedSections.thisPc ? '' : '-rotate-90'}`} fill="currentColor">
              <path d="M7 10l5 5 5-5H7z"/>
            </svg>
            <Image
              src="https://img.icons8.com/fluency/48/monitor--v1.png"
              alt="This PC"
              width={18}
              height={18}
              unoptimized
            />
            <span className="text-sm text-white/90">This PC</span>
          </button>
          
          {expandedSections.thisPc && (
            <div className="ml-4">
              {driveItems.map(drive => (
                <button
                  key={drive.id}
                  className="flex items-center gap-2 w-full px-3 py-1.5 text-left hover:bg-white/5 transition-colors"
                >
                  <Image
                    src={drive.iconUrl}
                    alt={drive.name}
                    width={16}
                    height={16}
                    unoptimized
                  />
                  <span className="text-sm text-white/80">{drive.name}</span>
                </button>
              ))}
            </div>
          )}
          
          {/* Network */}
          <button
            onClick={() => setExpandedSections(prev => ({ ...prev, network: !prev.network }))}
            className="flex items-center gap-1 w-full px-2 py-1.5 text-left hover:bg-white/5 transition-colors"
          >
            <svg viewBox="0 0 24 24" className={`w-3 h-3 text-white/50 transition-transform ${expandedSections.network ? '' : '-rotate-90'}`} fill="currentColor">
              <path d="M7 10l5 5 5-5H7z"/>
            </svg>
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-yellow-400" fill="currentColor">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
            </svg>
            <span className="text-sm text-white/90">Network</span>
          </button>
        </div>
        
        {/* File list */}
        <div className="flex-1 flex flex-col bg-[#191919]">
          {/* Column headers */}
          <div className="flex items-center px-4 py-2 border-b border-[#2d2d2d] text-xs text-white/60 bg-[#191919]">
            <div className="flex-1 min-w-[200px]">
              <span className="flex items-center gap-1">
                Name
                <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                  <path d="M7 14l5-5 5 5H7z"/>
                </svg>
              </span>
            </div>
            <div className="w-36">Date modified</div>
            <div className="w-32">Type</div>
            <div className="w-20 text-right">Size</div>
          </div>
          
          {/* File rows */}
          <div className="flex-1 overflow-y-auto win-scrollbar">
            {currentItems.length === 0 ? (
              <div className="flex items-center justify-center h-full text-white/40 text-sm">
                This folder is empty
              </div>
            ) : (
              currentItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item.id)}
                  onDoubleClick={() => handleItemDoubleClick(item)}
                  className={`
                    flex items-center w-full px-4 py-1 text-left transition-colors
                    ${selectedItem === item.id 
                      ? "bg-[#0078d4]/30" 
                      : "hover:bg-white/5"
                    }
                  `}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                    <Image
                      src={item.iconUrl}
                      alt={item.name}
                      width={18}
                      height={18}
                      unoptimized
                    />
                    <span className="text-sm text-white/90">{item.name}</span>
                  </div>
                  <div className="w-36 text-sm text-white/60">{item.dateModified}</div>
                  <div className="w-32 text-sm text-white/60">{item.fileType}</div>
                  <div className="w-20 text-sm text-white/60 text-right">{item.size || ''}</div>
                </button>
              ))
            )}
          </div>
          
          {/* Status bar */}
          <div className="flex items-center justify-between px-3 py-1 border-t border-[#2d2d2d] text-xs text-white/50">
            <span>{currentItems.length} items</span>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-white/10 rounded">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                </svg>
              </button>
              <button className="p-1 hover:bg-white/10 rounded">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
