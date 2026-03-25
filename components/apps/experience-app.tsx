"use client"

import { portfolioData } from "@/lib/os-context"

export function ExperienceApp() {
  return (
    <div className="h-full bg-gradient-to-br from-[#0a180f] to-[#0f1f18] overflow-y-auto win-scrollbar">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0a180f]/90 backdrop-blur-md border-b border-white/10 px-8 py-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-2xl shadow-lg shadow-green-500/20">
            💼
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Work Experience</h1>
            <p className="text-sm text-white/50">{portfolioData.experience.length} professional role{portfolioData.experience.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {portfolioData.experience.map((exp, i) => (
          <div key={i} className="space-y-5">
            {/* Main experience card */}
            <div className="relative group rounded-2xl border border-green-500/25 bg-gradient-to-br from-green-500/10 to-emerald-500/10 overflow-hidden transition-all duration-300 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10">
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400" />

              <div className="p-6">
                {/* Company header */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center text-2xl shrink-0">
                      🏢
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white leading-tight">{exp.company}</h2>
                      <p className="text-green-400 font-medium text-sm mt-0.5">{exp.role}</p>
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-1.5">
                    <span className="px-3 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-xs text-green-300 font-medium">
                      📅 {exp.period}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-xs text-blue-300 font-medium">
                      Internship
                    </span>
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Key Highlights</h3>
                  <ul className="space-y-3">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-3 group/item">
                        <span className="mt-1 w-5 h-5 shrink-0 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-[10px] text-green-400 font-bold">
                          {j + 1}
                        </span>
                        <p className="text-sm text-white/75 leading-relaxed group-hover/item:text-white/90 transition-colors">
                          {h}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Internship Certificate section */}
            <div className="rounded-2xl border border-amber-500/25 bg-gradient-to-br from-amber-500/8 to-yellow-500/8 overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-amber-500/15 flex items-center gap-3">
                <span className="text-xl">📜</span>
                <div>
                  <h3 className="text-sm font-bold text-amber-300">Internship Certificate</h3>
                  <p className="text-xs text-white/40">Issued upon successful completion</p>
                </div>
              </div>

              {/* Certificate mockup */}
              <div className="p-6">
                <div className="relative rounded-xl border border-amber-500/30 bg-gradient-to-br from-[#1a1400]/80 to-[#201800]/80 p-6 text-center overflow-hidden">
                  {/* Decorative corners */}
                  <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-500/50 rounded-tl-sm" />
                  <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-500/50 rounded-tr-sm" />
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-500/50 rounded-bl-sm" />
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-500/50 rounded-br-sm" />

                  {/* Certificate content */}
                  <div className="text-amber-400/60 text-3xl mb-3">⭐</div>
                  <p className="text-xs text-amber-500/70 uppercase tracking-[0.2em] mb-2">Certificate of Completion</p>
                  <p className="text-xs text-white/30 mb-1">This certifies that</p>
                  <p className="text-xl font-bold text-amber-300 mb-1">{portfolioData.name}</p>
                  <p className="text-xs text-white/30 mb-2">has successfully completed the internship as</p>
                  <p className="text-sm font-semibold text-white/80 mb-1">{exp.role}</p>
                  <p className="text-xs text-white/40 mb-3">at {exp.company}</p>
                  <p className="text-xs text-amber-500/60 italic">{exp.period}</p>

                  {/* Seal */}
                  <div className="mt-4 mx-auto w-12 h-12 rounded-full border-2 border-amber-500/40 flex items-center justify-center">
                    <span className="text-xl">🏅</span>
                  </div>
                </div>

                {/* Skills gained tag cloud */}
                <div className="mt-4">
                  <p className="text-xs text-white/30 mb-2">Skills gained during internship:</p>
                  <div className="flex flex-wrap gap-2">
                    {["Machine Learning", "Data Processing", "Model Optimization", "AI Implementation", "Prompt Engineering", "Database Queries"].map((skill) => (
                      <span key={skill} className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300/80">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats bar */}
      <div className="mx-8 mb-8 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-around text-center">
        <div>
          <div className="text-2xl font-bold text-green-400">1</div>
          <div className="text-xs text-white/50 mt-0.5">Internship</div>
        </div>
        <div className="w-px h-10 bg-white/10" />
        <div>
          <div className="text-2xl font-bold text-emerald-400">95%</div>
          <div className="text-xs text-white/50 mt-0.5">ML Accuracy</div>
        </div>
        <div className="w-px h-10 bg-white/10" />
        <div>
          <div className="text-2xl font-bold text-teal-400">200+</div>
          <div className="text-xs text-white/50 mt-0.5">Prompts Optimized</div>
        </div>
      </div>
    </div>
  )
}
