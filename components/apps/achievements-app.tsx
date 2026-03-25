"use client"

import { portfolioData } from "@/lib/os-context"

const icons: Record<number, string> = {
  0: "🏆",
  1: "🌟",
  2: "🥇",
  3: "🎯",
  4: "🚀",
}

const gradients = [
  "from-yellow-500/20 to-orange-500/20 border-yellow-500/30",
  "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
  "from-purple-500/20 to-pink-500/20 border-purple-500/30",
  "from-green-500/20 to-emerald-500/20 border-green-500/30",
  "from-red-500/20 to-orange-500/20 border-red-500/30",
]

const badgeColors = [
  "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
  "bg-blue-500/20 text-blue-300 border-blue-500/40",
  "bg-purple-500/20 text-purple-300 border-purple-500/40",
  "bg-green-500/20 text-green-300 border-green-500/40",
  "bg-red-500/20 text-red-300 border-red-500/40",
]

export function AchievementsApp() {
  return (
    <div className="h-full bg-gradient-to-br from-[#0f0f1a] to-[#1a1025] overflow-y-auto win-scrollbar">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0f0f1a]/90 backdrop-blur-md border-b border-white/10 px-8 py-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl shadow-lg shadow-yellow-500/20">
            🏆
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Achievements</h1>
            <p className="text-sm text-white/50">{portfolioData.achievements.length} milestones unlocked</p>
          </div>
        </div>
      </div>

      {/* Achievement cards */}
      <div className="p-8 space-y-4">
        {portfolioData.achievements.map((achievement, i) => (
          <div
            key={i}
            className={`relative group p-5 rounded-2xl bg-gradient-to-r border ${gradients[i % gradients.length]} transition-all duration-300 hover:scale-[1.01] hover:shadow-lg`}
          >
            {/* Glow accent */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/5" />

            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="text-3xl mt-0.5 shrink-0">
                {icons[i % Object.keys(icons).length]}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-semibold text-white leading-snug mb-2">
                  {achievement.title}
                </h2>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeColors[i % badgeColors.length]}`}>
                  📅 {achievement.date}
                </span>
              </div>

              {/* Trophy number */}
              <div className="shrink-0 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30 text-sm font-bold">
                #{i + 1}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer stat bar */}
      <div className="mx-8 mb-8 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-around text-center">
        <div>
          <div className="text-2xl font-bold text-yellow-400">{portfolioData.achievements.length}</div>
          <div className="text-xs text-white/50 mt-1">Total Achievements</div>
        </div>
        <div className="w-px h-10 bg-white/10" />
        <div>
          <div className="text-2xl font-bold text-blue-400">2025–26</div>
          <div className="text-xs text-white/50 mt-1">Active Since</div>
        </div>
        <div className="w-px h-10 bg-white/10" />
        <div>
          <div className="text-2xl font-bold text-purple-400">🌟</div>
          <div className="text-xs text-white/50 mt-1">Keep Winning</div>
        </div>
      </div>
    </div>
  )
}
