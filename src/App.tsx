
import { useState } from "react"
import AppRoutes from "./routes/AppRoutes"


function App() {



  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 transition-all duration-500 overflow-hidden">
      <AppRoutes></AppRoutes>
    </div>
    </>
  )
}

export default App
