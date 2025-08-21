import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  ShoppingCart,
  Users,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "$123,456",
    change: "32.5%",
    trend: "up",
    icon: DollarSign,
    color: "from-emerald-500 to teal-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Total Expenses",
    value: "$45,678",
    change: "25.2%",
    trend: "down",
    icon: CreditCard,
    color: "from-red-500 to-red-300",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
  },
  {
    title: "Active Users",
    value: "8,245",
    change: "43.8%",
    trend: "up",
    icon: Users,
    color: "from-indigo-500 to-blue-300",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    textColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    title: "New Orders",
    value: "1,234",
    change: "59.1%",
    trend: "up",
    icon: ShoppingCart,
    color: "from-amber-500 to-orange-300",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    textColor: "text-amber-600 dark:text-amber-400",
  },
];

function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 ">
      {stats.map((stat, index) => {
        return (
          <div
            key={index}
            className="bg-white/80 dark:bg-slate-900/80  rounded-2xl p-6 border border-slate-200/20 dark:hover:shadow-slate-900/20 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
                  {stat.value}
                </p>
                <div className="flex items-center space-x-2">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500"></ArrowUpRight>
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500"></ArrowDownRight>
                  )}
                  <span
                    className={`${
                      stat.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Vs Last
                  </span>
                </div>
              </div>
              <div
                className={`p-3 rounded-xl group-hover:scale-110 transition-all duration-300`}
              >
                {
                  <stat.icon
                    className={`w-6 h-6 ${stat.textColor}`}
                  ></stat.icon>
                }
              </div>
            </div>

            {/* progress bar */}
            <div className="mt-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-100`}
                style={{ width: stat.change }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatsGrid;
