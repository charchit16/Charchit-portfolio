"use client"

import { portfolioData } from "@/lib/os-context"
import { 
  MapPin, 
  GraduationCap, 
  Briefcase,
  Award,
  ExternalLink,
  Mail,
  Phone,
  Github,
  Linkedin
} from "lucide-react"

export function AboutApp() {
  return (
    <div className="h-full overflow-y-auto win-scrollbar bg-gradient-to-br from-[#1f1f1f] to-[#161616]">
      {/* Hero Section */}
      <div className="relative p-8 border-b border-white/10">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-white/10 shrink-0">
            <img
              src="/api/avatar"
              alt={portfolioData.name}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                const t = e.currentTarget
                t.style.display = "none"
                t.parentElement!.classList.add("bg-gradient-to-br", "from-blue-400", "to-blue-600", "flex", "items-center", "justify-center", "text-4xl", "font-bold", "text-white")
                t.parentElement!.textContent = portfolioData.name.split(" ").map((n: string) => n[0]).join("")
              }}
            />
          </div>
          
          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">{portfolioData.name}</h1>
            <p className="text-lg text-blue-400 mb-3">Computer Science Engineer</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Punjab, India
              </span>
              <span className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4" />
                LPU
              </span>
            </div>
            
            {/* Quick Links */}
            <div className="flex gap-2 mt-4">
              <a
                href={portfolioData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href={portfolioData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white/80 rounded-lg text-sm hover:bg-white/20 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 space-y-8">
        {/* About */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <div className="w-1 h-5 bg-blue-400 rounded-full" />
            About Me
          </h2>
          <p className="text-white/70 leading-relaxed">
            I&apos;m a passionate Computer Science Engineering student at Lovely Professional University with a strong foundation in software development and machine learning. 
            As a Google Student Ambassador and CEO of Optimus Student Organization, I combine technical expertise with leadership skills to drive innovation and team success.
          </p>
        </section>
        
        {/* Experience */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <div className="w-1 h-5 bg-green-400 rounded-full" />
            Experience
          </h2>
          <div className="space-y-4">
            {portfolioData.experience.map((exp, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-white">{exp.role}</h3>
                    <p className="text-sm text-blue-400">{exp.company}</p>
                  </div>
                  <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">{exp.period}</span>
                </div>
                <ul className="space-y-1 text-sm text-white/70">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1.5">•</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        
        {/* Education */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <div className="w-1 h-5 bg-purple-400 rounded-full" />
            Education
          </h2>
          <div className="space-y-3">
            {portfolioData.education.map((edu, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-white">{edu.institution}</h3>
                    <p className="text-sm text-white/60">{edu.degree}</p>
                    <p className="text-xs text-white/40">{edu.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-white/50">{edu.period}</span>
                    <p className="text-sm text-green-400 font-medium">{edu.grade}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Achievements */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <div className="w-1 h-5 bg-yellow-400 rounded-full" />
            Achievements
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {portfolioData.achievements.map((achievement, i) => (
              <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/10 flex items-center gap-3">
                <Award className="w-5 h-5 text-yellow-400 shrink-0" />
                <div>
                  <p className="text-sm text-white/90">{achievement.title}</p>
                  <p className="text-xs text-white/50">{achievement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
