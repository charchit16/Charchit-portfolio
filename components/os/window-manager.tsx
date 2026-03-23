"use client"

import { useOS } from "@/lib/os-context"
import { Window } from "./window"
import { FileExplorer } from "../apps/file-explorer"
import { AboutApp } from "../apps/about-app"
import { ProjectsApp } from "../apps/projects-app"
import { SkillsApp } from "../apps/skills-app"
import { ResumeApp } from "../apps/resume-app"
import { ContactApp } from "../apps/contact-app"
import { SettingsApp } from "../apps/settings-app"
import { TerminalApp } from "../apps/terminal-app"

const appIcons: Record<string, string> = {
  "file-explorer": "https://img.icons8.com/fluency/48/folder-invoices--v1.png",
  "about": "https://img.icons8.com/fluency/48/user-male-circle--v1.png",
  "projects": "https://img.icons8.com/fluency/48/code-folder.png",
  "skills": "https://img.icons8.com/fluency/48/light-on--v1.png",
  "resume": "https://img.icons8.com/fluency/48/pdf-2.png",
  "contact": "https://img.icons8.com/fluency/48/new-post.png",
  "settings": "https://img.icons8.com/fluency/48/settings.png",
  "terminal": "https://img.icons8.com/fluency/48/console.png"
}

export function WindowManager() {
  const { windows } = useOS()
  
  const renderAppContent = (appId: string, path?: string) => {
    switch (appId) {
      case "file-explorer":
        return <FileExplorer initialPath={path} />
      case "about":
        return <AboutApp />
      case "projects":
        return <ProjectsApp />
      case "skills":
        return <SkillsApp />
      case "resume":
        return <ResumeApp />
      case "contact":
        return <ContactApp />
      case "settings":
        return <SettingsApp />
      case "terminal":
        return <TerminalApp />
      default:
        return <div className="p-4 text-white/60">Unknown application</div>
    }
  }
  
  return (
    <>
      {windows.map(win => (
        <Window 
          key={win.id} 
          window={win}
          icon={appIcons[win.appId]}
        >
          {renderAppContent(win.appId, win.path)}
        </Window>
      ))}
    </>
  )
}
