"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useOS, portfolioData } from "@/lib/os-context"

interface OutputLine {
  type: "input" | "output" | "error" | "loading" | "blank"
  content: string
}

const COMMANDS = [
  "help", "cls", "clear", "whoami", "about", "skills", "projects",
  "resume", "contact", "explorer", "github", "linkedin", "settings",
  "dir", "ls", "cd", "echo", "date", "ver", "systeminfo",
  "experience", "education", "certifications", "achievements", "exit",
  "tree", "hostname", "ipconfig", "ping", "tasklist", "color"
]

export function TerminalApp() {
  const { openWindow } = useOS()
  const [history, setHistory] = useState<OutputLine[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [currentPath, setCurrentPath] = useState("C:\\Users\\CHARCHIT")
  const [isProcessing, setIsProcessing] = useState(false)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [textColor, setTextColor] = useState("#CCCCCC")
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [history, scrollToBottom])

  useEffect(() => {
    if (!isProcessing) {
      inputRef.current?.focus()
    }
  }, [isProcessing])

  const addOutput = useCallback((lines: OutputLine[]) => {
    setHistory(prev => [...prev, ...lines])
  }, [])

  const simulateLoading = async (message: string, duration: number = 500) => {
    setIsProcessing(true)
    addOutput([{ type: "loading", content: message }])
    await new Promise(resolve => setTimeout(resolve, duration))
    setIsProcessing(false)
  }

  // Helper for directory listing with real timestamp
  const fmtDate = () => {
    const n = new Date()
    const mm = String(n.getMonth() + 1).padStart(2, "0")
    const dd = String(n.getDate()).padStart(2, "0")
    const yyyy = n.getFullYear()
    let hh = n.getHours()
    const min = String(n.getMinutes()).padStart(2, "0")
    const ampm = hh >= 12 ? "PM" : "AM"
    hh = hh % 12 || 12
    return `${mm}/${dd}/${yyyy}  ${String(hh).padStart(2, "0")}:${min} ${ampm}`
  }

  const dirListings: Record<string, Array<{ isDir: boolean; name: string; size?: string }>> = {
    "C:\\Users\\CHARCHIT": [
      { isDir: true, name: "." },
      { isDir: true, name: ".." },
      { isDir: true, name: "Desktop" },
      { isDir: true, name: "Documents" },
      { isDir: true, name: "Downloads" },
      { isDir: true, name: "Projects" },
      { isDir: true, name: "Skills" },
      { isDir: false, name: "resume.pdf", size: "        245,760" },
    ],
    "C:\\Users\\CHARCHIT\\Projects": [
      { isDir: true, name: "." },
      { isDir: true, name: ".." },
      { isDir: true, name: "voyagers-sih" },
      { isDir: true, name: "Skill-India-Bot" },
      { isDir: true, name: "AI-Comic-Generator" },
    ],
    "C:\\Users\\CHARCHIT\\Skills": [
      { isDir: true, name: "." },
      { isDir: true, name: ".." },
      { isDir: false, name: "languages.txt", size: "          1,024" },
      { isDir: false, name: "frameworks.txt", size: "          2,048" },
      { isDir: false, name: "tools.txt", size: "          1,536" },
    ],
    "C:\\Users\\CHARCHIT\\Desktop": [
      { isDir: true, name: "." },
      { isDir: true, name: ".." },
      { isDir: false, name: "shortcut.lnk", size: "            512" },
    ],
    "C:\\Users\\CHARCHIT\\Documents": [
      { isDir: true, name: "." },
      { isDir: true, name: ".." },
      { isDir: false, name: "notes.txt", size: "          4,096" },
    ],
    "C:\\Users\\CHARCHIT\\Downloads": [
      { isDir: true, name: "." },
      { isDir: true, name: ".." },
    ],
  }

  const processCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim()
    const lowerCmd = trimmedCmd.toLowerCase()
    const parts = lowerCmd.split(/\s+/)
    const mainCmd = parts[0]
    const rawParts = trimmedCmd.split(/\s+/)
    const args = rawParts.slice(1).join(" ")
    const lowerArgs = args.toLowerCase()

    // Add input to history
    addOutput([{ type: "input", content: `${currentPath}>${trimmedCmd}` }])

    if (trimmedCmd) {
      setCommandHistory(prev => [...prev, trimmedCmd])
      setHistoryIndex(-1)
    }

    switch (mainCmd) {
      case "":
        addOutput([{ type: "blank", content: "" }])
        break

      case "cls":
      case "clear":
        setHistory([])
        break

      case "help":
        await simulateLoading("Compiling help information...", 250)
        addOutput([
          { type: "blank", content: "" },
          { type: "output", content: "For more information on a specific command, type HELP command-name" },
          { type: "blank", content: "" },
          { type: "output", content: "ABOUT          Open About Me window" },
          { type: "output", content: "ACHIEVEMENTS   Display achievements" },
          { type: "output", content: "CD             Displays the name of or changes the current directory." },
          { type: "output", content: "CERTIFICATIONS Display certifications" },
          { type: "output", content: "CLS            Clears the screen." },
          { type: "output", content: "COLOR          Sets the default console foreground color." },
          { type: "output", content: "CONTACT        Open Contact window" },
          { type: "output", content: "DATE           Displays or sets the date." },
          { type: "output", content: "DIR            Displays a list of files and subdirectories." },
          { type: "output", content: "ECHO           Displays messages." },
          { type: "output", content: "EDUCATION      Display education details" },
          { type: "output", content: "EXIT           Quits the CMD.EXE program (command interpreter)." },
          { type: "output", content: "EXPERIENCE     Show work experience" },
          { type: "output", content: "EXPLORER       Open File Explorer" },
          { type: "output", content: "GITHUB         Open GitHub profile" },
          { type: "output", content: "HOSTNAME       Prints the name of the current host." },
          { type: "output", content: "IPCONFIG       Display IP configuration." },
          { type: "output", content: "LINKEDIN       Open LinkedIn profile" },
          { type: "output", content: "PING           Sends ICMP ECHO_REQUEST to network hosts." },
          { type: "output", content: "PROJECTS       Open Projects folder" },
          { type: "output", content: "RESUME         Open Resume" },
          { type: "output", content: "SETTINGS       Open Settings" },
          { type: "output", content: "SKILLS         Open Skills window" },
          { type: "output", content: "SYSTEMINFO     Displays machine specific properties and configuration." },
          { type: "output", content: "TASKLIST       Displays all currently running tasks." },
          { type: "output", content: "TREE           Graphically displays the folder structure." },
          { type: "output", content: "VER            Displays the Windows version." },
          { type: "output", content: "WHOAMI         Displays current user info." },
          { type: "blank", content: "" },
        ])
        break

      case "whoami":
        await simulateLoading("Reading user token...", 350)
        addOutput([
          { type: "blank", content: "" },
          { type: "output", content: `charchit-pc\\charchit` },
          { type: "blank", content: "" },
          { type: "output", content: `Full Name   : ${portfolioData.name}` },
          { type: "output", content: `Email       : ${portfolioData.email}` },
          { type: "output", content: `Phone       : ${portfolioData.phone}` },
          { type: "output", content: `GitHub      : ${portfolioData.github}` },
          { type: "output", content: `LinkedIn    : ${portfolioData.linkedin}` },
          { type: "blank", content: "" },
        ])
        break

      case "about":
        await simulateLoading("Launching About Me...", 500)
        openWindow("about")
        addOutput([{ type: "output", content: "'About Me' window opened." }])
        break

      case "skills":
        if (lowerArgs === "-l" || lowerArgs === "--list") {
          await simulateLoading("Reading skills data...", 500)
          addOutput([
            { type: "blank", content: "" },
            { type: "output", content: "=== TECHNICAL SKILLS ===" },
            { type: "blank", content: "" },
            { type: "output", content: "  Languages:" },
            ...portfolioData.skills.languages.map(s => ({ type: "output" as const, content: `    ${s}` })),
            { type: "blank", content: "" },
            { type: "output", content: "  Frameworks:" },
            ...portfolioData.skills.frameworks.map(s => ({ type: "output" as const, content: `    ${s}` })),
            { type: "blank", content: "" },
            { type: "output", content: "  Tools:" },
            ...portfolioData.skills.tools.map(s => ({ type: "output" as const, content: `    ${s}` })),
            { type: "blank", content: "" },
            { type: "output", content: "  Soft Skills:" },
            ...portfolioData.skills.softSkills.map(s => ({ type: "output" as const, content: `    ${s}` })),
            { type: "blank", content: "" },
          ])
        } else {
          await simulateLoading("Launching Skills...", 600)
          openWindow("skills")
          addOutput([{ type: "output", content: "Skills window opened. Use 'skills -l' to list skills in terminal." }])
        }
        break

      case "projects":
        await simulateLoading("Opening Projects folder...", 600)
        openWindow("file-explorer", "Projects", "/projects")
        addOutput([{ type: "output", content: "File Explorer opened at Projects." }])
        break

      case "resume":
        await simulateLoading("Opening Resume...", 500)
        openWindow("resume")
        addOutput([{ type: "output", content: "'Resume' window opened." }])
        break

      case "contact":
        await simulateLoading("Opening Contact...", 400)
        openWindow("contact")
        addOutput([{ type: "output", content: "'Contact' window opened." }])
        break

      case "explorer":
        await simulateLoading("Starting Windows Explorer...", 600)
        openWindow("file-explorer")
        addOutput([{ type: "output", content: "File Explorer opened." }])
        break

      case "github":
        await simulateLoading("Connecting to GitHub...", 300)
        window.open(portfolioData.github, "_blank")
        addOutput([{ type: "output", content: `Opening ${portfolioData.github} in browser...` }])
        break

      case "linkedin":
        await simulateLoading("Connecting to LinkedIn...", 300)
        window.open(portfolioData.linkedin, "_blank")
        addOutput([{ type: "output", content: `Opening ${portfolioData.linkedin} in browser...` }])
        break

      case "settings":
        await simulateLoading("Opening Settings...", 500)
        openWindow("settings")
        addOutput([{ type: "output", content: "'Settings' window opened." }])
        break

      case "dir":
      case "ls": {
        await simulateLoading("", 10)
        setIsProcessing(false)
        const listing = dirListings[currentPath as keyof typeof dirListings]
        const ts = fmtDate()
        if (listing) {
          const dirs = listing.filter(e => e.isDir && e.name !== "." && e.name !== "..")
          const files = listing.filter(e => !e.isDir)
          const totalBytes = files.reduce((acc, f) => acc + parseInt((f.size || "0").replace(/,/g, "").trim()), 0)
          addOutput([
            { type: "blank", content: "" },
            { type: "output", content: ` Directory of ${currentPath}` },
            { type: "blank", content: "" },
            ...listing.filter(e => e.name === "." || e.name === "..").map(e => ({
              type: "output" as const,
              content: `${ts}    <DIR>          ${e.name}`
            })),
            ...dirs.map(e => ({
              type: "output" as const,
              content: `${ts}    <DIR>          ${e.name}`
            })),
            ...files.map(e => ({
              type: "output" as const,
              content: `${ts}    ${e.size}   ${e.name}`
            })),
            { type: "blank", content: "" },
            { type: "output", content: `               ${files.length} File(s)    ${totalBytes.toLocaleString()} bytes` },
            { type: "output", content: `               ${dirs.length} Dir(s)   256,000,000,000 bytes free` },
            { type: "blank", content: "" },
          ])
        } else {
          addOutput([
            { type: "blank", content: "" },
            { type: "output", content: ` Directory of ${currentPath}` },
            { type: "blank", content: "" },
            { type: "output", content: "               0 File(s)              0 bytes" },
            { type: "output", content: "               0 Dir(s)  256,000,000,000 bytes free" },
            { type: "blank", content: "" },
          ])
        }
        break
      }

      case "cd": {
        if (!args || args === "~") {
          setCurrentPath("C:\\Users\\CHARCHIT")
          addOutput([{ type: "blank", content: "" }])
        } else if (args === "..") {
          const parts2 = currentPath.split("\\")
          if (parts2.length > 1) {
            parts2.pop()
            setCurrentPath(parts2.join("\\") || "C:")
          }
          addOutput([{ type: "blank", content: "" }])
        } else if (lowerArgs === "projects" || lowerArgs === "\\projects") {
          setCurrentPath("C:\\Users\\CHARCHIT\\Projects")
          // Also open file explorer at projects
          await simulateLoading("Navigating to Projects...", 400)
          openWindow("file-explorer", "Projects", "/projects")
          addOutput([{ type: "output", content: "Opened File Explorer at Projects." }])
        } else if (lowerArgs === "skills") {
          setCurrentPath("C:\\Users\\CHARCHIT\\Skills")
          await simulateLoading("Navigating to Skills...", 400)
          openWindow("skills")
          addOutput([{ type: "output", content: "Opened Skills window." }])
        } else if (lowerArgs === "desktop") {
          setCurrentPath("C:\\Users\\CHARCHIT\\Desktop")
          addOutput([{ type: "blank", content: "" }])
        } else if (lowerArgs === "documents") {
          setCurrentPath("C:\\Users\\CHARCHIT\\Documents")
          addOutput([{ type: "blank", content: "" }])
        } else if (lowerArgs === "downloads") {
          setCurrentPath("C:\\Users\\CHARCHIT\\Downloads")
          addOutput([{ type: "blank", content: "" }])
        } else if (lowerArgs === "about") {
          await simulateLoading("Navigating to About...", 400)
          openWindow("about")
          addOutput([{ type: "output", content: "Opened About Me window." }])
        } else if (lowerArgs === "resume") {
          await simulateLoading("Navigating to Resume...", 400)
          openWindow("resume")
          addOutput([{ type: "output", content: "Opened Resume window." }])
        } else if (lowerArgs === "contact") {
          await simulateLoading("Navigating to Contact...", 400)
          openWindow("contact")
          addOutput([{ type: "output", content: "Opened Contact window." }])
        } else if (lowerArgs === "c:\\" || lowerArgs === "c:") {
          setCurrentPath("C:\\")
          addOutput([{ type: "blank", content: "" }])
        } else {
          addOutput([{
            type: "error",
            content: `The system cannot find the path specified: ${args}`
          }])
        }
        break
      }

      case "echo":
        addOutput([{ type: "output", content: args || "" }])
        break

      case "date": {
        const now = new Date()
        addOutput([
          { type: "output", content: `The current date is: ${now.toLocaleDateString("en-US", { weekday: "short", month: "2-digit", day: "2-digit", year: "numeric" })}` },
        ])
        break
      }

      case "ver":
        addOutput([
          { type: "blank", content: "" },
          { type: "output", content: "Microsoft Windows [Version 10.0.26200.8037]" },
          { type: "blank", content: "" },
        ])
        break

      case "hostname":
        addOutput([{ type: "output", content: "CHARCHIT-PC" }])
        break

      case "ipconfig":
        await simulateLoading("Querying network adapters...", 700)
        addOutput([
          { type: "blank", content: "" },
          { type: "output", content: "Windows IP Configuration" },
          { type: "blank", content: "" },
          { type: "output", content: "Ethernet adapter Portfolio:" },
          { type: "blank", content: "" },
          { type: "output", content: "   Connection-specific DNS Suffix  . : portfolio.local" },
          { type: "output", content: "   IPv4 Address. . . . . . . . . . . : 192.168.1.100" },
          { type: "output", content: "   Subnet Mask . . . . . . . . . . . : 255.255.255.0" },
          { type: "output", content: "   Default Gateway . . . . . . . . . : 192.168.1.1" },
          { type: "blank", content: "" },
        ])
        break

      case "ping":
        if (!args) {
          addOutput([{ type: "error", content: "Usage: ping <hostname>" }])
        } else {
          await simulateLoading(`Pinging ${args}...`, 800)
          addOutput([
            { type: "blank", content: "" },
            { type: "output", content: `Pinging ${args} with 32 bytes of data:` },
            { type: "output", content: `Reply from ${args}: bytes=32 time=12ms TTL=128` },
            { type: "output", content: `Reply from ${args}: bytes=32 time=11ms TTL=128` },
            { type: "output", content: `Reply from ${args}: bytes=32 time=10ms TTL=128` },
            { type: "output", content: `Reply from ${args}: bytes=32 time=13ms TTL=128` },
            { type: "blank", content: "" },
            { type: "output", content: `Ping statistics for ${args}:` },
            { type: "output", content: "    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)," },
            { type: "output", content: "Approximate round trip times in milli-seconds:" },
            { type: "output", content: "    Minimum = 10ms, Maximum = 13ms, Average = 11ms" },
            { type: "blank", content: "" },
          ])
        }
        break

      case "tasklist":
        await simulateLoading("Fetching running processes...", 900)
        addOutput([
          { type: "blank", content: "" },
          { type: "output", content: "Image Name                     PID Session Name        Mem Usage" },
          { type: "output", content: "========================= ======== ================ ===========" },
          { type: "output", content: "System Idle Process              0 Services                  8 K" },
          { type: "output", content: "System                           4 Services             12,456 K" },
          { type: "output", content: "portfolio-os.exe               512 Console               89,200 K" },
          { type: "output", content: "chrome.exe                    1024 Console              256,000 K" },
          { type: "output", content: "node.exe                      2048 Console               45,200 K" },
          { type: "output", content: "next-server.exe               4096 Console               78,400 K" },
          { type: "output", content: "cmd.exe                       8192 Console                5,000 K" },
          { type: "blank", content: "" },
        ])
        break

      case "tree":
        await simulateLoading("Building directory tree...", 600)
        addOutput([
          { type: "blank", content: "" },
          { type: "output", content: `Folder PATH listing for ${currentPath}` },
          { type: "output", content: "C:\\USERS\\CHARCHIT" },
          { type: "output", content: "├───Desktop" },
          { type: "output", content: "├───Documents" },
          { type: "output", content: "├───Downloads" },
          { type: "output", content: "├───Projects" },
          { type: "output", content: "│   ├───voyagers-sih" },
          { type: "output", content: "│   ├───Skill-India-Bot" },
          { type: "output", content: "│   └───AI-Comic-Generator" },
          { type: "output", content: "└───Skills" },
          { type: "output", content: "    ├───languages.txt" },
          { type: "output", content: "    ├───frameworks.txt" },
          { type: "output", content: "    └───tools.txt" },
          { type: "blank", content: "" },
        ])
        break

      case "color":
        if (!args) {
          setTextColor("#CCCCCC")
          addOutput([{ type: "output", content: "Color reset to default." }])
        } else if (args === "0a" || args === "a") {
          setTextColor("#00FF00")
          addOutput([{ type: "output", content: "Text color set to green." }])
        } else if (args === "0e" || args === "e") {
          setTextColor("#FFFF00")
          addOutput([{ type: "output", content: "Text color set to yellow." }])
        } else if (args === "0c" || args === "c") {
          setTextColor("#FF6B6B")
          addOutput([{ type: "output", content: "Text color set to red." }])
        } else if (args === "0b" || args === "b") {
          setTextColor("#6BFFFF")
          addOutput([{ type: "output", content: "Text color set to cyan." }])
        } else if (args === "0f" || args === "f") {
          setTextColor("#FFFFFF")
          addOutput([{ type: "output", content: "Text color set to white." }])
        } else {
          addOutput([{ type: "output", content: "Valid colors: 0a (green), 0e (yellow), 0c (red), 0b (cyan), 0f (white), no args = reset" }])
        }
        break

      case "systeminfo":
        await simulateLoading("Loading system information...", 1200)
        addOutput([
          { type: "blank", content: "" },
          { type: "output", content: "Host Name:                 CHARCHIT-PC" },
          { type: "output", content: "OS Name:                   Microsoft Windows 11 Pro" },
          { type: "output", content: "OS Version:                10.0.26200 N/A Build 26200" },
          { type: "output", content: "OS Manufacturer:           Microsoft Corporation" },
          { type: "output", content: "System Manufacturer:       Portfolio OS" },
          { type: "output", content: "System Model:              CharchitOS v1.0" },
          { type: "output", content: "System Type:               x64-based PC" },
          { type: "output", content: "Processor(s):              React 19 Core @ 3.00 GHz" },
          { type: "output", content: "Total Physical Memory:     32,768 MB" },
          { type: "output", content: "Available Physical Memory: 28,000 MB" },
          { type: "output", content: `Registered Owner:          ${portfolioData.name}` },
          { type: "output", content: `Registered Email:          ${portfolioData.email}` },
          { type: "output", content: "Windows Directory:         C:\\Windows" },
          { type: "output", content: "System Directory:          C:\\Windows\\system32" },
          { type: "output", content: "Time Zone:                 (UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi" },
          { type: "blank", content: "" },
        ])
        break

      case "experience":
        await simulateLoading("Reading experience records...", 600)
        addOutput([
          { type: "blank", content: "" },
          { type: "output", content: "=== WORK EXPERIENCE ===" },
          { type: "blank", content: "" },
        ])
        portfolioData.experience.forEach(exp => {
          addOutput([
            { type: "output", content: `  Company  : ${exp.company}` },
            { type: "output", content: `  Role     : ${exp.role}` },
            { type: "output", content: `  Period   : ${exp.period}` },
            { type: "output", content: "  Highlights:" },
            ...exp.highlights.map(h => ({ type: "output" as const, content: `    * ${h}` })),
            { type: "blank", content: "" },
          ])
        })
        break

      case "education":
        await simulateLoading("Loading education records...", 600)
        addOutput([
          { type: "blank", content: "" },
          { type: "output", content: "=== EDUCATION ===" },
          { type: "blank", content: "" },
        ])
        portfolioData.education.forEach(edu => {
          addOutput([
            { type: "output", content: `  Institution : ${edu.institution}` },
            { type: "output", content: `  Location    : ${edu.location}` },
            { type: "output", content: `  Degree      : ${edu.degree}` },
            { type: "output", content: `  Period      : ${edu.period}` },
            { type: "output", content: `  Grade       : ${edu.grade}` },
            { type: "blank", content: "" },
          ])
        })
        break

      case "certifications":
        await simulateLoading("Loading certifications...", 500)
        addOutput([
          { type: "blank", content: "" },
          { type: "output", content: "=== CERTIFICATIONS ===" },
          { type: "blank", content: "" },
          ...portfolioData.certifications.map(cert => ({
            type: "output" as const,
            content: `  [${cert.date}] ${cert.name} — ${cert.provider}`
          })),
          { type: "blank", content: "" },
        ])
        break

      case "achievements":
        await simulateLoading("Loading achievements...", 500)
        addOutput([
          { type: "blank", content: "" },
          { type: "output", content: "=== ACHIEVEMENTS ===" },
          { type: "blank", content: "" },
          ...portfolioData.achievements.map(ach => ({
            type: "output" as const,
            content: `  [${ach.date}] ${ach.title}`
          })),
          { type: "blank", content: "" },
        ])
        break

      case "exit":
        addOutput([{ type: "output", content: "" }])
        break

      default:
        addOutput([
          { type: "error", content: `'${rawParts[0]}' is not recognized as an internal or external command,` },
          { type: "error", content: "operable program or batch file." },
        ])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isProcessing) {
      processCommand(currentInput)
      setCurrentInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setCurrentInput("")
        } else {
          setHistoryIndex(newIndex)
          setCurrentInput(commandHistory[newIndex])
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      if (!currentInput) return
      const match = COMMANDS.find(c => c.startsWith(currentInput.toLowerCase()))
      if (match) setCurrentInput(match)
    } else if (e.key === "c" && e.ctrlKey) {
      e.preventDefault()
      addOutput([{ type: "input", content: `${currentPath}>${currentInput}^C` }])
      setCurrentInput("")
    }
  }

  return (
    <div
      ref={containerRef}
      className="h-full bg-[#0C0C0C] font-mono text-sm overflow-auto cursor-text select-text"
      style={{ fontFamily: "'Cascadia Code', 'Cascadia Mono', 'Consolas', 'Courier New', monospace" }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="p-2 pb-4 min-h-full">
        {/* Boot banner */}
        <div style={{ color: textColor }} className="whitespace-pre leading-relaxed">
          <p>Microsoft Windows [Version 10.0.26200.8037]</p>
          <p>(c) Microsoft Corporation. All rights reserved.</p>
          <p>&nbsp;</p>
        </div>

        {/* History output */}
        {history.map((line, i) => {
          if (line.type === "blank") {
            return <div key={i} className="h-[1.25em]" />
          }
          if (line.type === "loading") {
            return (
              <div key={i} className="flex items-center gap-2 py-px" style={{ color: "#4EC9B0" }}>
                <span
                  className="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full"
                  style={{ animation: "spin 0.6s linear infinite" }}
                />
                <span className="whitespace-pre-wrap break-all">{line.content}</span>
              </div>
            )
          }
          return (
            <div
              key={i}
              className="whitespace-pre-wrap break-all leading-[1.25em]"
              style={{
                color: line.type === "error"
                  ? "#FF6B6B"
                  : line.type === "input"
                    ? textColor
                    : textColor
              }}
            >
              {line.content}
            </div>
          )
        })}

        {/* Active prompt */}
        {!isProcessing && (
          <div className="flex items-center leading-[1.25em]" style={{ color: textColor }}>
            <span className="whitespace-pre shrink-0">{currentPath}&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={e => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none font-mono text-sm"
              style={{
                color: textColor,
                caretColor: textColor,
                fontFamily: "'Cascadia Code', 'Cascadia Mono', 'Consolas', 'Courier New', monospace",
                outline: "none",
                boxShadow: "none",
                WebkitAppearance: "none",
              }}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
            />
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
