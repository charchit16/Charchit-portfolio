"use client"

import { Download, ExternalLink } from "lucide-react"
import { portfolioData } from "@/lib/os-context"

export function ResumeApp() {
  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          {/* PDF icon */}
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-red-400" fill="currentColor">
            <path d="M20 2H8C6.9 2 6 2.9 6 4v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/>
          </svg>
          <span className="text-sm text-white/80 font-medium">CV.pdf — Charchit Singh</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/api/cv"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open in Tab
          </a>
          <a
            href="/api/cv"
            download="Charchit_Singh_CV.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </a>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 relative overflow-hidden">
        <iframe
          src="/api/cv"
          className="absolute inset-0 w-full h-full border-none"
          title="Charchit Singh CV"
        />
      </div>
    </div>
  )
}
