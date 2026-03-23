"use client"

import { portfolioData } from "@/lib/os-context"
import { 
  Code2, 
  Layers, 
  Wrench, 
  Heart,
  Award
} from "lucide-react"

const skillCategories = [
  {
    title: "Programming Languages",
    icon: <Code2 className="w-5 h-5" />,
    color: "blue",
    skills: portfolioData.skills.languages
  },
  {
    title: "Frameworks & Libraries",
    icon: <Layers className="w-5 h-5" />,
    color: "green",
    skills: portfolioData.skills.frameworks
  },
  {
    title: "Tools & Platforms",
    icon: <Wrench className="w-5 h-5" />,
    color: "purple",
    skills: portfolioData.skills.tools
  },
  {
    title: "Soft Skills",
    icon: <Heart className="w-5 h-5" />,
    color: "pink",
    skills: portfolioData.skills.softSkills
  }
]

const colorClasses: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  blue: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", icon: "text-blue-400" },
  green: { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-400", icon: "text-green-400" },
  purple: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400", icon: "text-purple-400" },
  pink: { bg: "bg-pink-500/10", border: "border-pink-500/30", text: "text-pink-400", icon: "text-pink-400" }
}

export function SkillsApp() {
  return (
    <div className="h-full overflow-y-auto win-scrollbar bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold text-white mb-2">Skills & Expertise</h1>
        <p className="text-white/60">A comprehensive overview of my technical and soft skills</p>
      </div>
      
      {/* Skills Grid */}
      <div className="p-6 grid grid-cols-2 gap-6">
        {skillCategories.map((category, index) => {
          const colors = colorClasses[category.color]
          return (
            <div 
              key={index}
              className={`p-5 rounded-xl ${colors.bg} border ${colors.border}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={colors.icon}>
                  {category.icon}
                </div>
                <h2 className={`font-semibold ${colors.text}`}>{category.title}</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-white/10 text-white/90 rounded-lg text-sm hover:bg-white/15 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Certifications */}
      <div className="p-6 border-t border-white/10">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-400" />
          Certifications
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {portfolioData.certifications.map((cert, i) => (
            <div 
              key={i}
              className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <Award className="w-4 h-4 text-yellow-400" />
                </div>
                <span className="text-xs text-white/50">{cert.provider}</span>
              </div>
              <h3 className="font-medium text-white text-sm mb-1">{cert.name}</h3>
              <p className="text-xs text-white/40">{cert.date}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Skill Summary */}
      <div className="p-6 border-t border-white/10">
        <h2 className="text-lg font-semibold text-white mb-4">At a Glance</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-3xl font-bold text-blue-400 mb-1">
              {portfolioData.skills.languages.length}
            </div>
            <div className="text-xs text-white/60">Languages</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-3xl font-bold text-green-400 mb-1">
              {portfolioData.skills.frameworks.length}
            </div>
            <div className="text-xs text-white/60">Frameworks</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-3xl font-bold text-purple-400 mb-1">
              {portfolioData.skills.tools.length}
            </div>
            <div className="text-xs text-white/60">Tools</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-3xl font-bold text-pink-400 mb-1">
              {portfolioData.certifications.length}
            </div>
            <div className="text-xs text-white/60">Certifications</div>
          </div>
        </div>
      </div>
    </div>
  )
}
