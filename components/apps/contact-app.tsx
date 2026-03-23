"use client"

import { useState } from "react"
import { portfolioData } from "@/lib/os-context"
import { 
  Mail, 
  Phone, 
  MapPin,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  ExternalLink
} from "lucide-react"

export function ContactApp() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormState({ name: "", email: "", message: "" })
    }, 3000)
  }
  
  return (
    <div className="h-full overflow-y-auto win-scrollbar bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]">
      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Get In Touch</h1>
          <p className="text-white/60">Feel free to reach out for collaborations or just a friendly hello</p>
        </div>
        
        {/* Contact Info Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <a
            href={`mailto:${portfolioData.email}`}
            className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wider">Email</p>
              <p className="text-sm text-white group-hover:text-blue-400 transition-colors">{portfolioData.email}</p>
            </div>
          </a>
          
          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Phone className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wider">Phone</p>
              <p className="text-sm text-white">{portfolioData.phone}</p>
            </div>
          </div>
          
          <a
            href={portfolioData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
              <Linkedin className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-white/50 uppercase tracking-wider">LinkedIn</p>
              <p className="text-sm text-white group-hover:text-blue-400 transition-colors">Connect with me</p>
            </div>
            <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/60" />
          </a>
          
          <a
            href={portfolioData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-gray-500/20 flex items-center justify-center">
              <Github className="w-6 h-6 text-gray-400" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-white/50 uppercase tracking-wider">GitHub</p>
              <p className="text-sm text-white group-hover:text-blue-400 transition-colors">Check my code</p>
            </div>
            <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/60" />
          </a>
        </div>
        
        {/* Contact Form */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Send a Message</h2>
          
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Message Sent!</h3>
              <p className="text-white/60">Thank you for reaching out. I&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-1">Name</label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-white/70 mb-1">Email</label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-white/70 mb-1">Message</label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                  placeholder="Your message..."
                  rows={4}
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
