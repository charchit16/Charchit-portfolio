"use client"

import { useEffect } from "react"
import { useOS } from "@/lib/os-context"

export function BootScreen() {
  const { setPhase } = useOS()
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("login")
    }, 2500)
    
    return () => clearTimeout(timer)
  }, [setPhase])
  
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
      {/* Windows Logo */}
      <div className="mb-16">
        <svg viewBox="0 0 88 88" className="w-28 h-28">
          <path fill="#0078d4" d="M0 0h42v42H0z" />
          <path fill="#0078d4" d="M46 0h42v42H46z" />
          <path fill="#0078d4" d="M0 46h42v42H0z" />
          <path fill="#0078d4" d="M46 46h42v42H46z" />
        </svg>
      </div>
      
      {/* Windows 11 style loading ring */}
      <div className="relative w-10 h-10">
        <svg className="w-full h-full animate-spin" viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#0078d4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="80 200"
            className="opacity-80"
          />
        </svg>
      </div>
    </div>
  )
}
