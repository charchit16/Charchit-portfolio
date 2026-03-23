"use client"

import { useOS } from "@/lib/os-context"
import { useEffect, useRef } from "react"

export function ContextMenu() {
  const { contextMenu, closeContextMenu } = useOS()
  const menuRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeContextMenu()
      }
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeContextMenu()
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [closeContextMenu])
  
  if (!contextMenu) return null
  
  const adjustedX = Math.min(contextMenu.x, window.innerWidth - 220)
  const adjustedY = Math.min(contextMenu.y, window.innerHeight - (contextMenu.items.length * 36 + 20))
  
  return (
    <div
      ref={menuRef}
      className="fixed z-[10000] min-w-[200px] bg-[#2d2d2d]/95 backdrop-blur-xl border border-white/10 rounded-lg py-1 shadow-2xl animate-in fade-in zoom-in-95 duration-100"
      style={{ left: adjustedX, top: adjustedY }}
    >
      {contextMenu.items.map((item, index) => (
        <div key={index}>
          {item.separator && index > 0 && (
            <div className="h-px bg-white/10 my-1 mx-3" />
          )}
          <button
            className={`
              w-full flex items-center gap-3 px-3 py-2 text-left transition-colors
              ${item.disabled 
                ? "opacity-50 cursor-not-allowed" 
                : "hover:bg-white/10"
              }
            `}
            onClick={() => {
              if (!item.disabled) {
                item.onClick()
                closeContextMenu()
              }
            }}
            disabled={item.disabled}
          >
            {item.icon && (
              <span className="w-4 h-4 flex items-center justify-center text-white/60">{item.icon}</span>
            )}
            <span className="text-sm text-white/90">{item.label}</span>
          </button>
        </div>
      ))}
    </div>
  )
}
