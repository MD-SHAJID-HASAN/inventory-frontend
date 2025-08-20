import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: "Jan", revenue: 45000, expenses: 32000 },
  { month: "Feb", revenue: 48000, expenses: 34000 },
  { month: "Mar", revenue: 52000, expenses: 36000 },
  { month: "Apr", revenue: 50000, expenses: 35000 },
  { month: "May", revenue: 53000, expenses: 37000 },
  { month: "Jun", revenue: 55000, expenses: 39000 },
  { month: "Jul", revenue: 60000, expenses: 42000 },
  { month: "Aug", revenue: 62000, expenses: 44000 },
  { month: "Sep", revenue: 58000, expenses: 41000 },
  { month: "Oct", revenue: 61000, expenses: 43000 },
  { month: "Nov", revenue: 64000, expenses: 46000 },
  { month: "Dec", revenue: 70000, expenses: 50000 },
];

function RevenueChart() {
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-2xl border border-slate-200/50 dark:border-slate-700/50 mt-6">
      <div className="md:flex items-center justify-between mb-6 p-4 box-border">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Revenue Chart
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monthly revenue and expenses
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            <div className="text-sm text-slate-400 dark:text-slate-400">
              <span>Revenue</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full"></div>
            <div className="text-sm text-slate-600 dark:text-slate-600">
              <span>Expenses</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueChart;
