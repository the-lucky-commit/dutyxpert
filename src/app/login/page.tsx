"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ShieldAlert, KeyRound, User, ChevronRight, Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [errorMsg, setErrorMsg] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Redirect if already logged in
  React.useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("dxs-auth")
    if (isLoggedIn === "granted") {
      router.push("/admin")
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg("")

    // Simulated short delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (username === "admin" && password === "admin1234") {
      sessionStorage.setItem("dxs-auth", "granted")
      router.push("/admin")
    } else {
      setErrorMsg("ชื่อผู้ใช้งาน หรือ รหัสผ่าน ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A1628] text-white flex flex-col justify-between relative overflow-hidden">
      {/* Background Grids & Blur Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Header */}
      <header className="p-6 relative z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="size-4" />
            กลับหน้าแรก
          </Link>
          <div className="text-[10px] text-accent font-extrabold uppercase tracking-widest bg-accent/10 px-3 py-1 rounded-md border border-accent/20">
            Secure Portal
          </div>
        </div>
      </header>

      {/* Login Form Container */}
      <main className="flex-grow flex items-center justify-center p-6 relative z-10 my-8">
        <div className="w-full max-w-md bg-[#0A1628]/80 border border-white/[0.08] backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-2xl flex flex-col gap-8">
          {/* Brand Logo & Info */}
          <div className="flex flex-col items-center text-center gap-4">
            <div className="relative size-14 bg-white rounded-full p-1 shadow-lg shrink-0">
              <Image
                src="https://dutyxpert.com/wp-content/uploads/2025/02/cropped-dxs_main-logo.png"
                alt="ดิวตี้ เอคซ์เพิร์ท"
                width={56}
                height={56}
                className="object-contain rounded-full"
                priority
              />
            </div>
            <div>
              <h1 className="font-extrabold text-xl text-white tracking-wide uppercase leading-none">
                ดิวตี้ เอคซ์เพิร์ท
              </h1>
              <span className="text-[10px] text-accent tracking-[0.2em] font-semibold uppercase mt-1.5 block">
                ADMIN CONSOLE
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed font-normal">
              กรุณาเข้าสู่ระบบด้วยสิทธิ์ผู้ดูแลระบบเพื่อจัดการและอัปเดตข้อมูลภาษาจริงบนเว็บไซต์
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {errorMsg && (
              <div className="bg-red-950/60 border border-red-500/30 rounded-lg p-4 flex gap-2.5 items-start text-xs text-red-300 font-semibold animate-shake">
                <ShieldAlert className="size-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Username */}
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                ชื่อผู้ใช้งาน (Username)
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-[#070F1C]/75 border border-white/[0.08] focus:border-accent rounded-lg p-3 pl-10 text-xs text-white placeholder:text-slate-500 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                รหัสผ่าน (Password)
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#070F1C]/75 border border-white/[0.08] focus:border-accent rounded-lg p-3 pl-10 text-xs text-white placeholder:text-slate-500 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="gold"
              disabled={isSubmitting}
              className="py-6 rounded-lg font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 mt-4"
            >
              {isSubmitting ? "กำลังตรวจสอบสิทธิ์..." : "เข้าสู่ระบบการจัดการ"}
              {!isSubmitting && <ChevronRight className="size-4" />}
            </Button>
          </form>
          
          {/* Simulated Info Box */}
          <div className="bg-white/5 border border-white/[0.04] rounded-lg p-4 text-center">
            <span className="text-[9px] text-[#94A3B8] font-semibold block uppercase">บัญชีทดสอบสำหรับตรวจ Mockup</span>
            <div className="flex justify-center gap-4 text-[10px] text-accent font-bold mt-1.5 font-mono">
              <span>USER: admin</span>
              <span>PASS: admin1234</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-[10px] text-slate-500 relative z-10">
        © 2026 บริษัท รักษาความปลอดภัย ดิวตี้ เอคซ์เพิร์ท จำกัด. ระบบควบคุมความปลอดภัยข้อมูลส่วนกลาง.
      </footer>
    </div>
  )
}
