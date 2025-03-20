import MusicPlayer from "@/components/musicplayer"
import ChatInterface from "@/components/chat"
import { Card } from "@/components/ui/card"
import { Sparkles, Music, MessageSquare } from "lucide-react"
import ChatComponent from "@/components/chatcomponent"

export default function Home() {

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 px-2 md:px-4 flex items-center justify-center">
      <div className="w-full">
        <Card className="border-slate-800/50 bg-slate-900/30 backdrop-blur-md shadow-2xl overflow-hidden w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 flex items-center justify-center">
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  Music Hub
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-teal-300/10 to-cyan-400/10 blur-xl -z-10"></span>
              </span>
              <Sparkles className="h-6 w-6 text-emerald-400 animate-pulse" />
            </h1>

            <div className="md:grid md:grid-cols-7 flex p-2 md:p-4 gap-4">
              <section className="md:col-span-3">
                <div className="flex items-center gap-2 mb-4">
                  <Music className="h-5 w-5 text-emerald-400" />
                  <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    Music Player
                  </h2>
                </div>

                <Card className="border-slate-800/50 bg-gradient-to-br from-slate-900/80 to-slate-950/80 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-emerald-900/20 hover:scale-[1.01]">
                  <MusicPlayer />
                </Card>
              </section>

              <section className="md:col-span-4">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="h-5 w-5 text-cyan-400" />
                  <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    Live Chat
                  </h2>
                </div>

                <Card className="border-slate-800/50 bg-gradient-to-br from-slate-900/80 to-slate-950/80 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-cyan-900/20 hover:scale-[1.01]">
                  <ChatComponent />
                </Card>
              </section>
            </div>
        
        </Card>
      </div>
    </main>
  )
}

