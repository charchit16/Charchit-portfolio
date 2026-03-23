"use client"

import { useOS, type AppId } from "@/lib/os-context"
import Image from "next/image"

const appIcons: Record<AppId, string> = {
  "file-explorer": "https://img.icons8.com/fluency/48/folder-invoices--v1.png",
  "about": "https://img.icons8.com/fluency/48/user-male-circle--v1.png",
  "projects": "https://img.icons8.com/fluency/48/code-folder.png",
  "skills": "https://img.icons8.com/fluency/48/light-on--v1.png",
  "resume": "https://img.icons8.com/fluency/48/pdf-2.png",
  "contact": "https://img.icons8.com/fluency/48/new-post.png",
  "settings": "https://img.icons8.com/fluency/48/settings.png"
}

export function Taskbar() {
  const { 
    toggleStartMenu, 
    isStartMenuOpen,
    windows, 
    activeWindowId, 
    focusWindow, 
    restoreWindow,
    openWindow,
    pinnedApps,
    currentTime,
    closeStartMenu
  } = useOS()
  
  const timeString = currentTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  })
  
  const dateString = currentTime.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit"
  })
  
  const runningAppIds = [...new Set(windows.map(w => w.appId))]
  
  const handleAppClick = (appId: AppId) => {
    closeStartMenu()
    const appWindows = windows.filter(w => w.appId === appId)
    
    if (appWindows.length === 0) {
      openWindow(appId)
    } else if (appWindows.length === 1) {
      const win = appWindows[0]
      if (win.isMinimized) {
        restoreWindow(win.id)
      } else {
        focusWindow(win.id)
      }
    } else {
      const visibleWindow = appWindows.find(w => !w.isMinimized)
      if (visibleWindow) {
        focusWindow(visibleWindow.id)
      } else {
        restoreWindow(appWindows[0].id)
      }
    }
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-[#1f1f1f]/90 backdrop-blur-xl border-t border-white/5 flex items-center z-[9999]">
      {/* Left section - optional app icon */}
      <div className="w-12 flex items-center justify-center">
        <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-purple-600" />
      </div>
      
      {/* Center section - Start, Search, and pinned apps */}
      <div className="flex-1 flex items-center justify-center gap-0.5">
        {/* Start Button - Windows Logo */}
        <button
          onClick={toggleStartMenu}
          className={`
            w-11 h-10 flex items-center justify-center rounded transition-colors
            ${isStartMenuOpen ? "bg-white/10" : "hover:bg-white/5"}
          `}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            <path d="M0 0h11v11H0V0z" fill="#0078d4"/>
            <path d="M13 0h11v11H13V0z" fill="#0078d4"/>
            <path d="M0 13h11v11H0V13z" fill="#0078d4"/>
            <path d="M13 13h11v11H13V13z" fill="#0078d4"/>
          </svg>
        </button>
        
        {/* Search */}
        <button className="w-11 h-10 flex items-center justify-center rounded hover:bg-white/5 transition-colors">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
        
        {/* Pinned Apps */}
        {pinnedApps.map((appId) => {
          const isRunning = runningAppIds.includes(appId)
          const isActive = windows.some(w => w.appId === appId && activeWindowId === w.id)
          
          return (
            <button
              key={appId}
              onClick={() => handleAppClick(appId)}
              className={`
                relative w-11 h-10 flex items-center justify-center rounded transition-colors
                ${isActive 
                  ? "bg-white/15" 
                  : isRunning 
                    ? "bg-white/10" 
                    : "hover:bg-white/5"
                }
              `}
            >
              <Image
                src={appIcons[appId]}
                alt={appId}
                width={24}
                height={24}
                unoptimized
              />
              {/* Running indicator */}
              {isRunning && (
                <div 
                  className={`
                    absolute bottom-1 left-1/2 -translate-x-1/2 h-[3px] rounded-full transition-all
                    ${isActive ? "w-4 bg-[#60cdff]" : "w-1 bg-white/50"}
                  `}
                />
              )}
            </button>
          )
        })}
        
        {/* Non-pinned running apps */}
        {runningAppIds
          .filter(appId => !pinnedApps.includes(appId))
          .map((appId) => {
            const isActive = windows.some(w => w.appId === appId && activeWindowId === w.id)
            
            return (
              <button
                key={appId}
                onClick={() => handleAppClick(appId)}
                className={`
                  relative w-11 h-10 flex items-center justify-center rounded transition-colors
                  ${isActive ? "bg-white/15" : "bg-white/10"}
                `}
              >
                <Image
                  src={appIcons[appId]}
                  alt={appId}
                  width={24}
                  height={24}
                  unoptimized
                />
                <div 
                  className={`
                    absolute bottom-1 left-1/2 -translate-x-1/2 h-[3px] rounded-full
                    ${isActive ? "w-4 bg-[#60cdff]" : "w-1 bg-white/50"}
                  `}
                />
              </button>
            )
          })}
      </div>
      
      {/* Right section - System tray */}
      <div className="flex items-center pr-2">
        {/* Hidden icons chevron */}
        <button className="w-8 h-10 flex items-center justify-center hover:bg-white/5 rounded transition-colors">
          <svg viewBox="0 0 24 24" className="w-3 h-3 text-white/60" fill="currentColor">
            <path d="M7 14l5-5 5 5H7z"/>
          </svg>
        </button>
        
        {/* System icons group */}
        <button className="flex items-center gap-2 px-2 h-10 hover:bg-white/5 rounded transition-colors">
          {/* WiFi */}
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/80" fill="currentColor">
            <path d="M12 21l-6-6c3.32-3.32 8.68-3.32 12 0l-6 6z"/>
            <path d="M2.81 9.81l2.12 2.12c3.9-3.9 10.24-3.9 14.14 0l2.12-2.12c-5.08-5.08-13.3-5.08-18.38 0z" opacity="0.3"/>
            <path d="M5.64 12.64l2.12 2.12c2.34-2.34 6.14-2.34 8.48 0l2.12-2.12c-3.51-3.51-9.21-3.51-12.72 0z" opacity="0.6"/>
          </svg>
          {/* Volume */}
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/80" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
          {/* Battery */}
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/80" fill="currentColor">
            <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM11 20v-5.5H9L13 7v5.5h2L11 20z"/>
          </svg>
        </button>
        
        {/* Time and Date */}
        <button className="flex flex-col items-end justify-center px-3 h-10 hover:bg-white/5 rounded transition-colors min-w-[80px]">
          <span className="text-xs text-white/90 leading-tight">{timeString}</span>
          <span className="text-xs text-white/70 leading-tight">{dateString}</span>
        </button>
        
        {/* Show Desktop */}
        <div className="w-[5px] h-10 hover:bg-[#60cdff]/50 cursor-pointer transition-colors" />
      </div>
    </div>
  )
}
