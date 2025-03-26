"use client"
import MusicPlayer from "@/components/musicplayer"
import { useTheme } from "next-themes"
import ChatComponent from "@/components/chat"

export default function Home() {
  // const {resolvedTheme} = useTheme()
  // console.log(resolvedTheme)
  // const [theme, setTheme] = useState<"dark" | "light">("dark")

  // const toggleTheme = () => {
  //   setTheme(theme === "dark" ? "light" : "dark")
  // }

  return (
    <main className={`bg-background`}>
      <div className="mx-auto px-4 py-6 flex flex-col max-w-7xl">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 h-full">
            <MusicPlayer />
          </div>

          {/* <div className="lg:col-span-7 h-full">
            <ChatComponent />
          </div> */}
        </div>
      </div>
    </main>
  )
}

