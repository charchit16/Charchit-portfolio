"use client"

import { useState } from "react"
import { portfolioData } from "@/lib/os-context"
import { 
  ExternalLink, 
  Calendar,
  FolderGit2,
  ChevronRight,
  Sparkles
} from "lucide-react"

export function ProjectsApp() {
  const [selectedProject, setSelectedProject] = useState(0)
  
  const project = portfolioData.projects[selectedProject]
  
  return (
    <div className="flex h-full bg-[#1a1a1a]">
      {/* Sidebar - Project List */}
      <div className="w-64 border-r border-white/10 overflow-y-auto win-scrollbar">
        <div className="p-4 border-b border-white/10">
          <h2 className="text-sm font-medium text-white/60 uppercase tracking-wider">Projects</h2>
        </div>
        <div className="p-2">
          {portfolioData.projects.map((proj, index) => (
            <button
              key={index}
              onClick={() => setSelectedProject(index)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                selectedProject === index 
                  ? "bg-blue-500/20 text-white" 
                  : "text-white/70 hover:bg-white/5"
              }`}
            >
              <FolderGit2 className={`w-5 h-5 shrink-0 ${selectedProject === index ? "text-blue-400" : ""}`} />
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{proj.name}</p>
                <p className="text-xs text-white/40">{proj.period}</p>
              </div>
              <ChevronRight className={`w-4 h-4 ml-auto shrink-0 ${selectedProject === index ? "text-blue-400" : "text-white/30"}`} />
            </button>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto win-scrollbar">
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">{project.name}</h1>
              <div className="flex items-center gap-4 text-sm text-white/60">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {project.period}
                </span>
              </div>
            </div>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Live
              </a>
            )}
          </div>
        </div>
        
        {/* Details */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <section>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Project Highlights
            </h2>
            <div className="space-y-3">
              {project.description.map((desc, i) => (
                <div 
                  key={i} 
                  className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-medium shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-white/80 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Tech Stack (inferred from description) */}
          <section>
            <h2 className="text-lg font-semibold text-white mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {extractTechnologies(project.description.join(" ")).map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-white/10 text-white/80 rounded-full text-sm border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

// Helper to extract technologies from description
function extractTechnologies(text: string): string[] {
  const techKeywords = [
    "React", "Next.js", "Tailwind", "Python", "Flask", "FastAPI",
    "Node.js", "Express", "MongoDB", "MySQL", "AWS", "Git",
    "scikit-learn", "Pandas", "NLP", "K-Means", "Gemini API", "AI"
  ]
  
  return techKeywords.filter(tech => 
    text.toLowerCase().includes(tech.toLowerCase())
  )
}
