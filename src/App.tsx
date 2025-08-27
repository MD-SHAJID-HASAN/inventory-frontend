import AppRoutes from "./routes/AppRoutes";
import { Analytics } from "@vercel/analytics/next"

function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-00 to-purple-300 dark:from-slate-800 dark:to-slate-900 transition-all duration-500 overflow-hidden">
        <AppRoutes></AppRoutes>
        <Analytics></Analytics>
      </div>
    </>
  );
}

export default App;
