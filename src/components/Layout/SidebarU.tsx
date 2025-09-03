import {
  BadgeDollarSign,
  BarChart3,
  // BarChart3,
  ChevronDown,
  LayoutDashboard,
  List,
  Package,
  Store,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    id: "dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    active: true,
  },
  {
    id: "shops",
    href: "/shops",
    icon: Store,
    label: "Shops",
    count: 2,
    active: false,
  },
  {
    id: "analytics",
    href: "/",
    icon: BarChart3,
    label: "Analytics",
    submenu: [
      { id: "overview", label: "Overview", href: "/#" },
      { id: "reports", label: "Reports", href: "/#" },
      { id: "insights", label: "Insights", href: "/#" },
    ],
    active: false,
    badge: "New",
  },
  // {
  //   id: "products",
  //   href: "/products",
  //   icon: Store,
  //   label: "Products",
  //   count: 100,
  //   active: false,
  // },

  {
    id: "category",
    href: "/categories",
    icon: List,
    label: "Categories",
    active: false,
    count: 13,
  },
  {
    id: "transaction",
    href: "/transactions",
    icon: BadgeDollarSign,
    label: "Transactions",
    active: false,
    badge: "New",
  },
];

function SidebarU({ collapsed, onPageChange, currentPage}: any) {
  const [expandedItems, setExpandedItems] = useState(new Set([""]));

  const location = useLocation()
  console.log("location is:", location);

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          collapsed ? "w-20" : "w-72"
        } transition-[width] duration-300 ease-in-out bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col fixed top-0 left-0 z-20 min-h-screen `}
      >
        {/* logo */}
        <div
          className={`${
            collapsed ? "flex items-center justify-center" : ""
          } p-6 border-b border-slate-200/50 dark:border-slate-700/50 h-23.25 flex`}
        >
          
          <div className="flex items-center space-x-3">
            <div
              className={`${
                collapsed ? "bg-red-500 m-0" : ""
              } w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center`}
            >
              <Package className="w-6 h-6 text-white" />
            </div>

            {/* conditional rendering */}
            <div
              className={`${
                !collapsed ? "block" : "hidden"
              } transition-opacity duration-300 ease-in-out text-xl font-bold text-slate-800 dark:text-white`}
            >
              <h1>Ledgerly</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        {/* navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.id}>
              <Link
                to={`${item.href}`}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                  location.pathname == item.href
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                }`}
                onClick={() => {
                  if (item.submenu) {
                    toggleExpanded(item.id);
                  } else {
                    onPageChange(item.id);
                    collapsed(true)
                  }
                }}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5 text-dark dark:text-white" />
                  <div className={`${!collapsed ? "" : "hidden"}`}>
                    <span className="font-medium ml-2 dark:text-white">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full ml-2">
                        {item.badge}
                      </span>
                    )}
                    {item.count && (
                      <span className="px-2 text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full ml-2">
                        {item.count}
                      </span>
                    )}
                  </div>
                </div>

                {!collapsed && item.submenu && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform dark:text-white ${
                      expandedItems.has(item.id) ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Link>

              {!collapsed && item.submenu && expandedItems.has(item.id) && (
                <div className="ml-8 mt-2 space-y-1 flex flex-col">
                  {item.submenu.map((subitem) => (
                    <button
                      key={subitem.id}
                      onClick={() => onPageChange(subitem.id)}
                      className={`text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                        currentPage === subitem.id
                          ? "bg-blue-500 text-white"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      {subitem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* user profile */}
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="min-w-10 flex items-center justify-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <img
              src=""
              alt=""
              className={`${
                collapsed ? "m-0 min-w-9 min-h-9" : "min-w-10 h-10"
              } rounded-full ring-2 ring-blue-500`}
            />
            <div className={`${!collapsed ? "flex flex-1 min-w-0" : "hidden"}`}>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                  Shajid Hasan
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarU;
