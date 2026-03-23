"use client"

import { useOS, type ContextMenuItem } from "@/lib/os-context"
import type { AppId } from "@/lib/os-context"
import { Taskbar } from "./taskbar"
import { StartMenu } from "./start-menu"
import { ContextMenu } from "./context-menu"
import { WindowManager } from "./window-manager"
import Image from "next/image"

interface DesktopIcon {
  id: string
  name: string
  appId?: AppId
  iconUrl: string
  externalLink?: string
}

const desktopIcons: DesktopIcon[] = [
  { 
    id: "this-pc", 
    name: "This PC", 
    appId: "file-explorer", 
    iconUrl: "https://img.icons8.com/fluency/96/monitor--v1.png"
  },
  { 
    id: "recycle-bin", 
    name: "Recycle Bin", 
    appId: "settings", 
    iconUrl: "https://img.icons8.com/fluency/96/waste.png"
  },
  { 
    id: "file-explorer", 
    name: "File Explorer", 
    appId: "file-explorer", 
    iconUrl: "https://img.icons8.com/fluency/96/folder-invoices--v1.png"
  },
  { 
    id: "projects", 
    name: "Projects", 
    appId: "projects", 
    iconUrl: "https://img.icons8.com/fluency/96/code-folder.png"
  },
  { 
    id: "about", 
    name: "About Me", 
    appId: "about", 
    iconUrl: "https://img.icons8.com/fluency/96/user-male-circle--v1.png"
  },
  { 
    id: "skills", 
    name: "Skills", 
    appId: "skills", 
    iconUrl: "https://img.icons8.com/fluency/96/light-on--v1.png"
  },
  { 
    id: "resume", 
    name: "Resume.pdf", 
    appId: "resume", 
    iconUrl: "https://img.icons8.com/fluency/96/pdf-2.png"
  },
  { 
    id: "contact", 
    name: "Contact", 
    appId: "contact", 
    iconUrl: "https://img.icons8.com/fluency/96/new-post.png"
  },
  { 
    id: "github", 
    name: "GitHub", 
    externalLink: "https://github.com/charchit16",
    iconUrl: "https://img.icons8.com/glyph-neue/96/FFFFFF/github.png"
  },
  { 
    id: "linkedin", 
    name: "LinkedIn", 
    externalLink: "https://linkedin.com/in/charchit16",
    iconUrl: "https://img.icons8.com/fluency/96/linkedin.png"
  },
  { 
    id: "terminal", 
    name: "Terminal", 
    appId: "terminal", 
    iconUrl: "https://img.icons8.com/fluency/96/console.png"
  },
]

export function Desktop() {
  const { 
    openWindow, 
    selectedIcon, 
    setSelectedIcon, 
    showContextMenu, 
    closeContextMenu,
    closeStartMenu,
    isStartMenuOpen,
    contextMenu 
  } = useOS()
  
  const handleIconClick = (id: string) => {
    setSelectedIcon(id)
  }
  
  const handleIconDoubleClick = (icon: DesktopIcon) => {
    if (icon.externalLink) {
      window.open(icon.externalLink, "_blank")
    } else if (icon.appId) {
      openWindow(icon.appId)
    }
    setSelectedIcon(null)
  }
  
  const handleDesktopClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedIcon(null)
      closeStartMenu()
      closeContextMenu()
    }
  }
  
  const handleDesktopContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    
    const items: ContextMenuItem[] = [
      {
        label: "View",
        onClick: () => {}
      },
      {
        label: "Sort by",
        onClick: () => {}
      },
      {
        label: "Refresh",
        onClick: () => window.location.reload(),
        separator: true
      },
      {
        label: "Display settings",
        onClick: () => openWindow("settings")
      },
      {
        label: "Personalize",
        onClick: () => openWindow("settings")
      }
    ]
    
    showContextMenu(e.clientX, e.clientY, items)
  }
  
  const handleIconContextMenu = (e: React.MouseEvent, icon: DesktopIcon) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedIcon(icon.id)
    
    const items: ContextMenuItem[] = [
      {
        label: "Open",
        onClick: () => {
          if (icon.externalLink) {
            window.open(icon.externalLink, "_blank")
          } else if (icon.appId) {
            openWindow(icon.appId)
          }
        }
      },
      {
        label: "Properties",
        onClick: () => {},
        separator: true
      }
    ]
    
    showContextMenu(e.clientX, e.clientY, items)
  }
  
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Windows 11 Dark Wallpaper */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3o78wwXvvWGySd01MSS5OzgRVFo0Yq.png')`,
          backgroundSize: 'cover'
        }}
      />
      
      {/* Desktop Area */}
      <div 
        className="absolute inset-0 pb-12 p-2"
        onClick={handleDesktopClick}
        onContextMenu={handleDesktopContextMenu}
      >
        {/* Desktop Icons - Vertical grid on left side */}
        <div className="flex flex-col flex-wrap content-start gap-1 h-full">
          {desktopIcons.map((icon) => (
            <button
              key={icon.id}
              className={`
                flex flex-col items-center justify-center p-2 w-[76px] rounded
                transition-all duration-75 select-none
                ${selectedIcon === icon.id 
                  ? "bg-white/20 ring-1 ring-white/40" 
                  : "hover:bg-white/10"
                }
              `}
              onClick={(e) => { e.stopPropagation(); handleIconClick(icon.id) }}
              onDoubleClick={() => handleIconDoubleClick(icon)}
              onContextMenu={(e) => handleIconContextMenu(e, icon)}
            >
              <Image
                src={icon.iconUrl}
                alt={icon.name}
                width={48}
                height={48}
                className="mb-1 drop-shadow-lg"
                unoptimized
              />
              <span className="text-[11px] text-white text-center leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] line-clamp-2 w-full">
                {icon.name}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Windows */}
      <WindowManager />
      
      {/* Start Menu */}
      {isStartMenuOpen && <StartMenu />}
      
      {/* Context Menu */}
      {contextMenu && <ContextMenu />}
      
      {/* Taskbar */}
      <Taskbar />
    </div>
  )
}
