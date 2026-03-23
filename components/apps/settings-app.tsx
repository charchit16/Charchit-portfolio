"use client"

import { portfolioData } from "@/lib/os-context"
import { 
  Monitor, 
  Palette, 
  Bell, 
  Lock, 
  Clock, 
  Info,
  ChevronRight,
  User
} from "lucide-react"

const settingsSections = [
  { id: "system", name: "System", icon: <Monitor className="w-5 h-5" />, description: "Display, sound, notifications" },
  { id: "personalization", name: "Personalization", icon: <Palette className="w-5 h-5" />, description: "Background, colors, themes" },
  { id: "notifications", name: "Notifications", icon: <Bell className="w-5 h-5" />, description: "Alerts, sounds, Do Not Disturb" },
  { id: "privacy", name: "Privacy & Security", icon: <Lock className="w-5 h-5" />, description: "Privacy settings" },
  { id: "time", name: "Time & Language", icon: <Clock className="w-5 h-5" />, description: "Date, time, region" },
  { id: "about", name: "About", icon: <Info className="w-5 h-5" />, description: "System information" },
]

export function SettingsApp() {
  return (
    <div className="flex h-full bg-[#1f1f1f]">
      {/* Sidebar */}
      <div className="w-72 border-r border-white/10 p-4 overflow-y-auto win-scrollbar">
        {/* User Profile */}
        <div className="flex items-center gap-3 p-3 mb-4 rounded-lg hover:bg-white/5 cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{portfolioData.name}</p>
            <p className="text-xs text-white/50">Local account</p>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Find a setting"
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/20"
          />
        </div>
        
        {/* Settings Sections */}
        <div className="space-y-1">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              className="w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-white/5 transition-colors group"
            >
              <div className="text-white/60 group-hover:text-white/80">
                {section.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm text-white/90">{section.name}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-white/30" />
            </button>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto win-scrollbar">
        <h1 className="text-2xl font-semibold text-white mb-6">System Information</h1>
        
        {/* System Info */}
        <div className="space-y-6">
          <div className="p-6 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
                  <path d="M0 0h11v11H0V0zm13 0h11v11H13V0zM0 13h11v11H0V13zm13 0h11v11H13V13z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-medium text-white">Portfolio OS</h2>
                <p className="text-sm text-white/60">Version 1.0.0</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-sm text-white/60">Device name</span>
                <span className="text-sm text-white">{portfolioData.name.replace(" ", "-")}-PORTFOLIO</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-sm text-white/60">Processor</span>
                <span className="text-sm text-white">React 19 @ Next.js 16</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-sm text-white/60">System type</span>
                <span className="text-sm text-white">Web-based operating system</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-sm text-white/60">Developer</span>
                <span className="text-sm text-white">{portfolioData.name}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-white/60">Contact</span>
                <span className="text-sm text-blue-400">{portfolioData.email}</span>
              </div>
            </div>
          </div>
          
          {/* Legal */}
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <p className="text-xs text-white/40 leading-relaxed">
              This is a portfolio website designed to look like a Windows operating system. 
              All data displayed is for demonstration purposes. This project was built with 
              Next.js, React, and Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
