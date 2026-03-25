"use client"

import { portfolioData } from "@/lib/os-context"

const providerColors: Record<string, string> = {
  "NPTEL": "from-orange-500/25 to-red-500/25 border-orange-500/35 text-orange-300",
  "iamneo": "from-blue-500/25 to-indigo-500/25 border-blue-500/35 text-blue-300",
}

const providerLogos: Record<string, string> = {
  "NPTEL": "📚",
  "iamneo": "💻",
}

function getProviderStyle(provider: string) {
  return providerColors[provider] ?? "from-green-500/25 to-teal-500/25 border-green-500/35 text-green-300"
}
function getProviderLogo(provider: string) {
  return providerLogos[provider] ?? "🎓"
}

export function CertificationsApp() {
  return (
    <div className="h-full bg-gradient-to-br from-[#0a1020] to-[#0f1a2a] overflow-y-auto win-scrollbar">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0a1020]/90 backdrop-blur-md border-b border-white/10 px-8 py-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-2xl shadow-lg shadow-blue-500/20">
            🎓
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Certifications</h1>
            <p className="text-sm text-white/50">{portfolioData.certifications.length} verified credentials</p>
          </div>
        </div>
      </div>

      {/* Cert cards */}
      <div className="p-8 space-y-5">
        {portfolioData.certifications.map((cert, i) => {
          const style = getProviderStyle(cert.provider)
          const logo = getProviderLogo(cert.provider)
          return (
            <div
              key={i}
              className={`group relative p-6 rounded-2xl bg-gradient-to-r border ${style} transition-all duration-300 hover:scale-[1.01] hover:shadow-xl`}
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-white/5" />

              <div className="flex items-start gap-5">
                {/* Logo circle */}
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-center text-3xl">
                  {logo}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-white mb-1 leading-snug">{cert.name}</h2>
                  <p className="text-sm text-white/60 mb-3">Issued by {cert.provider}</p>

                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-white/70">
                      🏛️ {cert.provider}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-white/70">
                      📅 {cert.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-xs text-green-400">
                      ✅ Verified
                    </span>
                  </div>
                </div>

                {/* Certificate icon */}
                <div className="shrink-0 flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg">
                    📜
                  </div>
                  <span className="text-[10px] text-white/30">Cert #{i + 1}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="mx-8 mb-8 p-5 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">Summary</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-cyan-400">{portfolioData.certifications.length}</div>
            <div className="text-xs text-white/50 mt-0.5">Certificates</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-400">
              {[...new Set(portfolioData.certifications.map(c => c.provider))].length}
            </div>
            <div className="text-xs text-white/50 mt-0.5">Providers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">100%</div>
            <div className="text-xs text-white/50 mt-0.5">Verified</div>
          </div>
        </div>
      </div>
    </div>
  )
}
