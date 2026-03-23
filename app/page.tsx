"use client"

import { OSProvider, useOS } from "@/lib/os-context"
import { BootScreen } from "@/components/os/boot-screen"
import { LoginScreen } from "@/components/os/login-screen"
import { Desktop } from "@/components/os/desktop"

function OSContent() {
  const { phase } = useOS()
  
  return (
    <main className="min-h-screen overflow-hidden select-none">
      {phase === "boot" && <BootScreen />}
      {phase === "login" && <LoginScreen />}
      {phase === "desktop" && <Desktop />}
    </main>
  )
}

export default function Home() {
  return (
    <OSProvider>
      <OSContent />
    </OSProvider>
  )
}
