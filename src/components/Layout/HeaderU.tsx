import useDarkMode from "@/hooks/useDarkMode";
import {
  Bell,
  ChevronDown,
  Filter,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
} from "lucide-react";
import { useState } from "react";
import {Link,} from "react-router-dom";

function HeaderU({ onToggle }: any) {
  const [open, setOpen] = useState(false);

  const actions = [
    { id: "transaction", href: "/transaction-form", label: "Transaction" },
    { id: "product", href: "/add-product-form", label: "Product" },
    { id: "category", href: "/category-form", label: "Category" },
    { id: "brand" , href: "/brand-form", label: "Brand" },
  ];

  const [darkMode, setDarkMode] = useDarkMode();
  return (
    <div
      className={`
   bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-6 py-4 h-23.25 flex flex-col justify-center `}
    >
      <div className="flex items-center justify-between">
        {/* left section */}
        <div className="flex items-center space-x-4">
          <button
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={onToggle}
          >
            <Menu className="w-5 h-5"></Menu>
          </button>

          <div className="hidden md:block">
            <h1 className="text-2xl font-black text-slate-800 dark:text-white">
              {"Dashboard"}
            </h1>
            <p className="hidden">
              Welcome back, Shajid! here's what's happening today!
            </p>
          </div>
        </div>

        {/* center */}
        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></Search>
            <input
              type="text"
              placeholder="Search Anything"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <Filter></Filter>
            </button>
          </div>
        </div>

        {/* right */}
        <div className="flex items-center space-x-3">
          {/* quick actions */}
          <div className="relative">
            {/* Main button */}
           <button
              onClick={() => setOpen(!open)}
              className="flex lg:flex items-center space-x-2 py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all z-50"
            >
              <ChevronDown className={`${open ? "rotate-180":""} transition-all duration-150 max-w-4 max-h-4`} />
              <span className="text-sm font-medium">New</span>
            </button>

            {/* Dropdown menu */}
            {open && (
              <div className="absolute top-full mt-2 w-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden flex flex-col">
                {actions.map((action) => (
                  <Link to={`${action.href}`}
                    key={action.id}
                    onClick={() => {
                      console.log(`Create new ${action.label}`);
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* dark-light toggle */}
          <button
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <Moon className="w-5 h-5 text-white" />
            ) : (
              <Sun className="w-5 h-5 text-black" />
            )}
          </button>
          {/* notification */}
          <button className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Bell className="w-5 h-5"></Bell>
            <span className="absolute -top-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          {/* settings */}
          <button className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Settings className="w-5 h-5"></Settings>
          </button>
          {/* user profile */}
          <div className="flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-700">
            <img
              src=""
              alt=""
              className="w-8 h-8 rounded-full ring-2 ring-blue-500"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Shajid Hasan
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderU;
