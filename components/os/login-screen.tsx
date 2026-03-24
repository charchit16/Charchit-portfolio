"use client"

import { useState } from "react"
import { useOS, portfolioData } from "@/lib/os-context"
import { ParticleNetwork } from "./particle-network"

export function LoginScreen() {
  const { setPhase } = useOS()
  const [showLogin, setShowLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      setPhase("desktop")
    }, 1200)
  }

  const currentTime = new Date()
  const timeString = currentTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  })
  const dateString = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: "#080810" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" style={{ zIndex: 0 }} />

      {/* Neon particle network */}
      <ParticleNetwork />

      {/* Lock screen — time + swipe up hint */}
      {!showLogin && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer z-10"
          onClick={() => setShowLogin(true)}
        >
          <div className="text-center select-none">
            <div className="text-9xl font-light text-white mb-2 drop-shadow-lg tracking-tight">
              {timeString}
            </div>
            <div className="text-xl text-white/90 drop-shadow-md">{dateString}</div>
          </div>

          {/* Swipe up hint */}
          <div className="absolute bottom-12 flex flex-col items-center text-white/70 text-sm gap-1">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 14l5-5 5 5" />
            </svg>
            <span>Click or swipe up to sign in</span>
          </div>
        </div>
      )}

      {/* Login panel */}
      {showLogin && (
        <div className="relative z-10 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Profile photo */}
          <div className="w-44 h-44 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/25 mb-5">
            <img
              src="/api/avatar"
              alt={portfolioData.name}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                // fallback to generic icon
                const el = e.currentTarget
                el.style.display = "none"
                const parent = el.parentElement!
                parent.classList.add(
                  "bg-gradient-to-br", "from-blue-400", "to-blue-600",
                  "flex", "items-center", "justify-center"
                )
                parent.innerHTML = `<svg viewBox="0 0 24 24" class="w-24 h-24 text-white" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`
              }}
            />
          </div>

          {/* Name */}
          <h1 className="text-2xl font-normal text-white mb-8 drop-shadow-lg tracking-wide">
            {portfolioData.name}
          </h1>

          {/* Sign-in button or loading */}
          {!isLoading ? (
            <button
              onClick={handleLogin}
              className="flex items-center gap-2 px-8 py-3 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 rounded text-white font-medium transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Sign in
            </button>
          ) : (
            <div className="flex items-center gap-3 text-white h-12">
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span className="text-lg">Welcome back…</span>
            </div>
          )}
        </div>
      )}

      {/* Bottom-right controls */}
      <div className="absolute bottom-6 right-6 flex items-center gap-2 z-10">
        <button className="p-2.5 hover:bg-white/10 rounded transition-colors" title="Network">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/70" fill="currentColor">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
          </svg>
        </button>
        <button className="p-2.5 hover:bg-white/10 rounded transition-colors" title="Accessibility">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/70" fill="currentColor">
            <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
          </svg>
        </button>
        <button className="p-2.5 hover:bg-white/10 rounded transition-colors" title="Power">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/70" fill="currentColor">
            <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
