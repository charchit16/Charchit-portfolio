"use client"

import { useState } from "react"
import { useOS, portfolioData, type AppId } from "@/lib/os-context"
import Image from "next/image"

interface AppItem {
  id: AppId
  name: string
  iconUrl: string
}

const allApps: AppItem[] = [
  { id: "file-explorer", name: "File Explorer", iconUrl: "https://img.icons8.com/fluency/48/folder-invoices--v1.png" },
  { id: "about", name: "About Me", iconUrl: "https://img.icons8.com/fluency/48/user-male-circle--v1.png" },
  { id: "projects", name: "Projects", iconUrl: "https://img.icons8.com/fluency/48/code-folder.png" },
  { id: "skills", name: "Skills", iconUrl: "https://img.icons8.com/fluency/48/light-on--v1.png" },
  { id: "resume", name: "Resume", iconUrl: "https://img.icons8.com/fluency/48/pdf-2.png" },
  { id: "contact", name: "Contact", iconUrl: "https://img.icons8.com/fluency/48/new-post.png" },
  { id: "settings", name: "Settings", iconUrl: "https://img.icons8.com/fluency/48/settings.png" },
  { id: "terminal", name: "Command Prompt", iconUrl: "https://img.icons8.com/fluency/48/console.png" },
  { id: "achievements", name: "Achievements", iconUrl: "https://img.icons8.com/fluency/48/trophy.png" },
  { id: "certifications", name: "Certifications", iconUrl: "https://img.icons8.com/fluency/48/certificate.png" },
  { id: "experience", name: "Experience", iconUrl: "https://img.icons8.com/fluency/48/briefcase.png" },
]

const pinnedApps: AppItem[] = [
  { id: "file-explorer", name: "File Explorer", iconUrl: "https://img.icons8.com/fluency/48/folder-invoices--v1.png" },
  { id: "about", name: "About Me", iconUrl: "https://img.icons8.com/fluency/48/user-male-circle--v1.png" },
  { id: "projects", name: "Projects", iconUrl: "https://img.icons8.com/fluency/48/code-folder.png" },
  { id: "settings", name: "Settings", iconUrl: "https://img.icons8.com/fluency/48/settings.png" },
  { id: "skills", name: "Skills", iconUrl: "https://img.icons8.com/fluency/48/light-on--v1.png" },
  { id: "contact", name: "Contact", iconUrl: "https://img.icons8.com/fluency/48/new-post.png" },
  { id: "terminal", name: "Command Prompt", iconUrl: "https://img.icons8.com/fluency/48/console.png" },
]

const recommendedItems = [
  { id: "resume", name: "Resume.pdf", description: "Recently opened", iconUrl: "https://img.icons8.com/fluency/48/pdf-2.png", appId: "resume" as AppId },
  { id: "voyagers", name: "voyagers-sih", description: "Project folder", iconUrl: "https://img.icons8.com/fluency/48/folder-invoices--v1.png", appId: "projects" as AppId },
  { id: "skill-india", name: "Skill India Bot", description: "18m ago", iconUrl: "https://img.icons8.com/fluency/48/folder-invoices--v1.png", appId: "projects" as AppId },
  { id: "comic", name: "Comic Generator", description: "2h ago", iconUrl: "https://img.icons8.com/fluency/48/folder-invoices--v1.png", appId: "projects" as AppId },
]

export function StartMenu() {
  const { openWindow, closeStartMenu, setPhase } = useOS()
  const [searchQuery, setSearchQuery] = useState("")
  
  const filteredApps = searchQuery
    ? allApps.filter(app => 
        app.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null
  
  const handleAppClick = (appId: AppId) => {
    openWindow(appId)
    closeStartMenu()
  }

  const handleSignOut = () => {
    closeStartMenu()
    setPhase("login")
  }
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[9998]"
        onClick={closeStartMenu}
      />
      
      {/* Menu */}
      <div className="fixed bottom-14 left-1/2 -translate-x-1/2 w-[640px] bg-[#242424]/95 backdrop-blur-2xl rounded-lg overflow-hidden z-[9999] border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-150">
        {/* Search Bar */}
        <div className="p-5 pb-3">
          <div className="relative">
            <svg viewBox="0 0 24 24" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search for apps, settings, and documents"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#3a3a3a] border border-white/10 rounded-full text-sm text-white placeholder-white/40 focus:outline-none focus:bg-[#444] focus:border-white/20 transition-all"
              autoFocus
            />
          </div>
        </div>
        
        {/* Content */}
        <div className="px-5 pb-2">
          {filteredApps ? (
            // Search Results
            <div>
              <h3 className="text-xs font-semibold text-white/50 mb-3">Search results</h3>
              {filteredApps.length > 0 ? (
                <div className="space-y-0.5">
                  {filteredApps.map(app => (
                    <button
                      key={app.id}
                      onClick={() => handleAppClick(app.id)}
                      className="w-full flex items-center gap-3 p-2.5 rounded-md hover:bg-white/10 transition-colors text-left"
                    >
                      <Image
                        src={app.iconUrl}
                        alt={app.name}
                        width={28}
                        height={28}
                        unoptimized
                      />
                      <span className="text-sm text-white">{app.name}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/40 py-4 text-center">No results found for &quot;{searchQuery}&quot;</p>
              )}
            </div>
          ) : (
            <>
              {/* Pinned Apps */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-white/90">Pinned</h3>
                  <button className="text-xs text-white/50 hover:text-white/70 transition-colors flex items-center gap-1">
                    All apps
                    <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {pinnedApps.map(app => (
                    <button
                      key={app.id}
                      onClick={() => handleAppClick(app.id)}
                      className="flex flex-col items-center gap-1 p-2.5 rounded-md hover:bg-white/10 transition-colors"
                    >
                      <Image
                        src={app.iconUrl}
                        alt={app.name}
                        width={32}
                        height={32}
                        unoptimized
                      />
                      <span className="text-[11px] text-white/80 text-center truncate w-full">{app.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Recommended */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-white/90">Recommended</h3>
                  <button className="text-xs text-white/50 hover:text-white/70 transition-colors flex items-center gap-1">
                    More
                    <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {recommendedItems.map(item => (
                    <button 
                      key={item.id}
                      onClick={() => handleAppClick(item.appId)}
                      className="flex items-center gap-3 p-2.5 rounded-md hover:bg-white/10 transition-colors text-left"
                    >
                      <Image
                        src={item.iconUrl}
                        alt={item.name}
                        width={32}
                        height={32}
                        unoptimized
                      />
                      <div className="overflow-hidden">
                        <p className="text-sm text-white truncate">{item.name}</p>
                        <p className="text-xs text-white/40 truncate">{item.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between p-3 mt-2 border-t border-white/10 bg-[#1f1f1f]/50">
          {/* User with Sign out */}
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-white/10 transition-colors"
            title="Sign out"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <span className="text-sm text-white">{portfolioData.name}</span>
          </button>
          
          {/* Power Button */}
          <button 
            onClick={handleSignOut}
            className="p-2.5 rounded-md hover:bg-white/10 transition-colors"
            title="Sign out"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/70" fill="currentColor">
              <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
