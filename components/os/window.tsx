"use client"

import { useCallback, useRef, useState, type ReactNode, useEffect } from "react"
import { useOS, type WindowState } from "@/lib/os-context"
import Image from "next/image"

interface WindowProps {
  window: WindowState
  children: ReactNode
  icon?: string
}

export function Window({ window: win, children, icon }: WindowProps) {
  const {
    activeWindowId,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize
  } = useOS()
  
  const windowRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState("")
  const dragStart = useRef({ x: 0, y: 0, winX: 0, winY: 0 })
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0, winX: 0, winY: 0 })
  
  const isActive = activeWindowId === win.id
  
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (win.isMaximized) return
    e.preventDefault()
    setIsDragging(true)
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      winX: win.x,
      winY: win.y
    }
    focusWindow(win.id)
  }, [win.isMaximized, win.x, win.y, win.id, focusWindow])
  
  const handleResizeStart = useCallback((e: React.MouseEvent, direction: string) => {
    if (win.isMaximized) return
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    setResizeDirection(direction)
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      width: win.width,
      height: win.height,
      winX: win.x,
      winY: win.y
    }
    focusWindow(win.id)
  }, [win.isMaximized, win.width, win.height, win.x, win.y, win.id, focusWindow])
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - dragStart.current.x
        const dy = e.clientY - dragStart.current.y
        const newX = Math.max(0, Math.min(window.innerWidth - 100, dragStart.current.winX + dx))
        const newY = Math.max(0, Math.min(window.innerHeight - 100, dragStart.current.winY + dy))
        updateWindowPosition(win.id, newX, newY)
      }
      
      if (isResizing) {
        const dx = e.clientX - resizeStart.current.x
        const dy = e.clientY - resizeStart.current.y
        
        let newWidth = resizeStart.current.width
        let newHeight = resizeStart.current.height
        let newX = resizeStart.current.winX
        let newY = resizeStart.current.winY
        
        if (resizeDirection.includes("e")) {
          newWidth = Math.max(400, resizeStart.current.width + dx)
        }
        if (resizeDirection.includes("w")) {
          const proposedWidth = resizeStart.current.width - dx
          if (proposedWidth >= 400) {
            newWidth = proposedWidth
            newX = resizeStart.current.winX + dx
          }
        }
        if (resizeDirection.includes("s")) {
          newHeight = Math.max(300, resizeStart.current.height + dy)
        }
        if (resizeDirection.includes("n")) {
          const proposedHeight = resizeStart.current.height - dy
          if (proposedHeight >= 300) {
            newHeight = proposedHeight
            newY = resizeStart.current.winY + dy
          }
        }
        
        updateWindowSize(win.id, newWidth, newHeight)
        updateWindowPosition(win.id, newX, newY)
      }
    }
    
    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
      setResizeDirection("")
    }
    
    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, isResizing, resizeDirection, win.id, updateWindowPosition, updateWindowSize])
  
  if (win.isMinimized) return null
  
  const windowStyle = win.isMaximized
    ? { left: 0, top: 0, width: "100%", height: "calc(100% - 48px)", zIndex: win.zIndex }
    : { left: win.x, top: win.y, width: win.width, height: win.height, zIndex: win.zIndex }
  
  return (
    <div
      ref={windowRef}
      className={`
        fixed flex flex-col overflow-hidden
        bg-[#202020] border border-[#454545]
        ${win.isMaximized ? "" : "rounded-lg"}
        ${isActive ? "shadow-2xl" : "shadow-lg opacity-95"}
        animate-window-open
      `}
      style={windowStyle}
      onClick={() => focusWindow(win.id)}
    >
      {/* Title Bar */}
      <div
        className={`
          flex items-center h-8 px-2 select-none shrink-0
          ${isActive ? "bg-[#2d2d2d]" : "bg-[#2d2d2d]"}
        `}
        onMouseDown={handleMouseDown}
        onDoubleClick={() => maximizeWindow(win.id)}
      >
        {/* Window Icon */}
        {icon && (
          <div className="w-4 h-4 mr-2 flex items-center justify-center">
            <Image src={icon} alt="" width={16} height={16} unoptimized />
          </div>
        )}
        
        {/* Title */}
        <span className={`text-xs truncate flex-1 ${isActive ? "text-white/90" : "text-white/50"}`}>
          {win.title}
        </span>
        
        {/* Window Controls */}
        <div className="flex items-center -mr-2">
          {/* Minimize */}
          <button
            onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id) }}
            className="w-11 h-8 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/80" fill="currentColor">
              <path d="M19 13H5v-2h14v2z"/>
            </svg>
          </button>
          
          {/* Maximize/Restore */}
          <button
            onClick={(e) => { e.stopPropagation(); maximizeWindow(win.id) }}
            className="w-11 h-8 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            {win.isMaximized ? (
              <svg viewBox="0 0 24 24" className="w-[10px] h-[10px] text-white/80" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="8" width="11" height="11" rx="1"/>
                <path d="M8 8V6a1 1 0 011-1h10a1 1 0 011 1v10a1 1 0 01-1 1h-2"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-[10px] h-[10px] text-white/80" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="4" width="16" height="16" rx="1"/>
              </svg>
            )}
          </button>
          
          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); closeWindow(win.id) }}
            className="w-11 h-8 flex items-center justify-center hover:bg-[#c42b1c] transition-colors group rounded-tr-lg"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/80 group-hover:text-white" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-hidden bg-[#191919]">
        {children}
      </div>
      
      {/* Resize Handles */}
      {!win.isMaximized && (
        <>
          <div className="absolute top-0 left-0 right-0 h-1 cursor-n-resize" onMouseDown={(e) => handleResizeStart(e, "n")} />
          <div className="absolute bottom-0 left-0 right-0 h-1 cursor-s-resize" onMouseDown={(e) => handleResizeStart(e, "s")} />
          <div className="absolute left-0 top-0 bottom-0 w-1 cursor-w-resize" onMouseDown={(e) => handleResizeStart(e, "w")} />
          <div className="absolute right-0 top-0 bottom-0 w-1 cursor-e-resize" onMouseDown={(e) => handleResizeStart(e, "e")} />
          <div className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize" onMouseDown={(e) => handleResizeStart(e, "nw")} />
          <div className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize" onMouseDown={(e) => handleResizeStart(e, "ne")} />
          <div className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize" onMouseDown={(e) => handleResizeStart(e, "sw")} />
          <div className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize" onMouseDown={(e) => handleResizeStart(e, "se")} />
        </>
      )}
    </div>
  )
}
