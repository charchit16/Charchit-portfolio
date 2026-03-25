"use client"

import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react"

// Portfolio data
export const portfolioData = {
  name: "Charchit Singh",
  email: "charchitas8188@gmail.com",
  phone: "+91 87555026400",
  linkedin: "https://linkedin.com/in/charchit16",
  github: "https://github.com/charchit16",
  
  skills: {
    languages: ["C", "C++", "Java", "Python"],
    frameworks: ["HTML and CSS", "Tailwind", "Node.js", "React.js", "Express.js"],
    tools: ["MongoDB", "MySQL", "AWS", "Git", "GitHub", "VS Code", "Canva"],
    softSkills: ["Leadership", "Problem-Solving", "Communication", "Adaptability", "Teamwork", "Event Management", "Critical Thinking"]
  },
  
  experience: [
    {
      company: "Refo Tech Systems PVT. LTD.",
      role: "Software Development Intern",
      period: "June 2025 – August 2025",
      highlights: [
        "Developed and trained machine learning models with the accuracy of 95% for real-world applications.",
        "Designed 200+ prompts and optimized database queries, reducing response time.",
        "Gained skills in data processing, model optimization, and AI implementation."
      ]
    }
  ],
  
  projects: [
    {
      name: "Gamified Environmental Education Platform",
      period: "Since Oct 2025",
      link: "https://voyagers-sih.vercel.app/",
      description: [
        "Applied React, Next.js, and Tailwind to build a fast, responsive gamified platform with interactive games, flashcards, and dual dashboards.",
        "Designed engaging eco-themed and Swadeshi-based games—like Recycle Rush and EcoStrike—with badges, leaderboards, and challenges to promote sustainability and cultural learning.",
        "Delivered an accessible, scalable solution with offline printable kits, progress tracking, and institutional analytics for seamless integration into schools and colleges."
      ]
    },
    {
      name: "Skill India Bot",
      period: "April 2025 – May 2025",
      description: [
        "Built Skill India Bot, an AI-driven upskilling platform using React and Python (Flask/FastAPI) for personalised course and job recommendations.",
        "Integrated Router API to fetch 50+ relevant results and applied K-Means clustering for the top 3 personalised suggestions with the accuracy of 98%.",
        "Developed a hybrid recommendation engine using scikit-learn, Pandas, and NLP, with features like resume analysis, trend insights, and a custom user dashboard."
      ]
    },
    {
      name: "AI-Powered Comic Strip Generator",
      period: "March 2025 – April 2025",
      description: [
        "Developed an AI-powered comic strip creator that transforms user prompts into six-panel illustrated narratives.",
        "Used Gemini API for structured story generation and Janus via Fal.ai to generate custom visuals.",
        "Built an interactive interface combining AI-driven storytelling with generative image synthesis."
      ]
    }
  ],
  
  certifications: [
    { name: "Cloud Computing", provider: "NPTEL", date: "May 2025" },
    { name: "Java Programming", provider: "iamneo", date: "April 2025" },
    { name: "Data Structures and Algorithm", provider: "iamneo", date: "Nov 2024" }
  ],
  
  achievements: [
    { title: "Google Student Ambassador", date: "Since Aug 2025" },
    { title: "Lead Optimus Student Organization as CEO", date: "Since Jan 2025" },
    { title: "Winner | Internal SIH 2025", date: "Oct 2025" },
    { title: "Winner | CodeXtreme2.0-Neo codeathon by imneo", date: "April 2025" },
    { title: "Winner | IIT Ropar Tech Fest Catalyzing Concepts", date: "Feb 2025" }
  ],
  
  education: [
    {
      institution: "Lovely Professional University",
      location: "Punjab, India",
      degree: "Bachelor of Technology - Computer Science and Engineering",
      period: "Since Aug 2023",
      grade: "CGPA: 8.70"
    },
    {
      institution: "DLP Public School",
      location: "Hathras, Uttar Pradesh",
      degree: "Intermediate - PCM",
      period: "Apr 2021 – Mar 2022",
      grade: "Percentage: 86%"
    }
  ]
}

// Window types
export type WindowId = string
export type AppId = "file-explorer" | "about" | "projects" | "skills" | "resume" | "contact" | "settings" | "terminal" | "achievements" | "certifications" | "experience"

export interface WindowState {
  id: WindowId
  appId: AppId
  title: string
  x: number
  y: number
  width: number
  height: number
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  path?: string // For file explorer navigation
}

export interface DesktopIcon {
  id: string
  name: string
  appId: AppId
  icon: string
  path?: string
}

// OS State types
export type OSPhase = "boot" | "login" | "desktop"

interface OSContextType {
  // OS Phase
  phase: OSPhase
  setPhase: (phase: OSPhase) => void
  
  // Windows
  windows: WindowState[]
  activeWindowId: WindowId | null
  openWindow: (appId: AppId, title?: string, path?: string) => void
  closeWindow: (id: WindowId) => void
  minimizeWindow: (id: WindowId) => void
  maximizeWindow: (id: WindowId) => void
  restoreWindow: (id: WindowId) => void
  focusWindow: (id: WindowId) => void
  updateWindowPosition: (id: WindowId, x: number, y: number) => void
  updateWindowSize: (id: WindowId, width: number, height: number) => void
  
  // Start Menu
  isStartMenuOpen: boolean
  toggleStartMenu: () => void
  closeStartMenu: () => void
  
  // Context Menu
  contextMenu: { x: number; y: number; items: ContextMenuItem[] } | null
  showContextMenu: (x: number, y: number, items: ContextMenuItem[]) => void
  closeContextMenu: () => void
  
  // Desktop
  selectedIcon: string | null
  setSelectedIcon: (id: string | null) => void
  
  // Taskbar
  pinnedApps: AppId[]
  
  // Time
  currentTime: Date
}

export interface ContextMenuItem {
  label: string
  icon?: ReactNode
  onClick: () => void
  separator?: boolean
  disabled?: boolean
}

const OSContext = createContext<OSContextType | null>(null)

let windowIdCounter = 0
let maxZIndex = 1

const defaultWindowSizes: Record<AppId, { width: number; height: number }> = {
  "file-explorer": { width: 900, height: 600 },
  "about": { width: 700, height: 500 },
  "projects": { width: 850, height: 600 },
  "skills": { width: 750, height: 550 },
  "resume": { width: 800, height: 650 },
  "contact": { width: 500, height: 400 },
  "settings": { width: 700, height: 500 },
  "terminal": { width: 800, height: 500 },
  "achievements": { width: 820, height: 580 },
  "certifications": { width: 780, height: 540 },
  "experience": { width: 860, height: 600 }
}

const appTitles: Record<AppId, string> = {
  "file-explorer": "File Explorer",
  "about": "About Me",
  "projects": "Projects",
  "skills": "Skills",
  "resume": "Resume",
  "contact": "Contact",
  "settings": "Settings",
  "terminal": "Command Prompt",
  "achievements": "Achievements",
  "certifications": "Certifications",
  "experience": "Experience"
}

export function OSProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<OSPhase>("boot")
  const [windows, setWindows] = useState<WindowState[]>([])
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>(null)
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; items: ContextMenuItem[] } | null>(null)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  
  const pinnedApps: AppId[] = ["file-explorer", "about", "projects", "skills"]
  
  // Update time every minute
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  
  const openWindow = useCallback((appId: AppId, title?: string, path?: string) => {
    const id = `window-${++windowIdCounter}`
    const size = defaultWindowSizes[appId]
    const centerX = Math.max(50, (window.innerWidth - size.width) / 2 + Math.random() * 50)
    const centerY = Math.max(50, (window.innerHeight - size.height) / 2 + Math.random() * 50)
    
    maxZIndex++
    
    const newWindow: WindowState = {
      id,
      appId,
      title: title || appTitles[appId],
      x: centerX,
      y: centerY,
      width: size.width,
      height: size.height,
      isMinimized: false,
      isMaximized: false,
      zIndex: maxZIndex,
      path
    }
    
    setWindows(prev => [...prev, newWindow])
    setActiveWindowId(id)
    setIsStartMenuOpen(false)
  }, [])
  
  const closeWindow = useCallback((id: WindowId) => {
    setWindows(prev => prev.filter(w => w.id !== id))
    setActiveWindowId(prev => prev === id ? null : prev)
  }, [])
  
  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ))
    setActiveWindowId(prev => prev === id ? null : prev)
  }, [])
  
  const maximizeWindow = useCallback((id: WindowId) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ))
  }, [])
  
  const restoreWindow = useCallback((id: WindowId) => {
    maxZIndex++
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: false, zIndex: maxZIndex } : w
    ))
    setActiveWindowId(id)
  }, [])
  
  const focusWindow = useCallback((id: WindowId) => {
    maxZIndex++
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: maxZIndex, isMinimized: false } : w
    ))
    setActiveWindowId(id)
  }, [])
  
  const updateWindowPosition = useCallback((id: WindowId, x: number, y: number) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, x, y } : w
    ))
  }, [])
  
  const updateWindowSize = useCallback((id: WindowId, width: number, height: number) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, width, height } : w
    ))
  }, [])
  
  const toggleStartMenu = useCallback(() => {
    setIsStartMenuOpen(prev => !prev)
    setContextMenu(null)
  }, [])
  
  const closeStartMenu = useCallback(() => {
    setIsStartMenuOpen(false)
  }, [])
  
  const showContextMenu = useCallback((x: number, y: number, items: ContextMenuItem[]) => {
    setContextMenu({ x, y, items })
    setIsStartMenuOpen(false)
  }, [])
  
  const closeContextMenu = useCallback(() => {
    setContextMenu(null)
  }, [])
  
  return (
    <OSContext.Provider value={{
      phase,
      setPhase,
      windows,
      activeWindowId,
      openWindow,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      restoreWindow,
      focusWindow,
      updateWindowPosition,
      updateWindowSize,
      isStartMenuOpen,
      toggleStartMenu,
      closeStartMenu,
      contextMenu,
      showContextMenu,
      closeContextMenu,
      selectedIcon,
      setSelectedIcon,
      pinnedApps,
      currentTime
    }}>
      {children}
    </OSContext.Provider>
  )
}

export function useOS() {
  const context = useContext(OSContext)
  if (!context) {
    throw new Error("useOS must be used within an OSProvider")
  }
  return context
}
