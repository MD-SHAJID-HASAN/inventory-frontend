function TableSection() {
  return (
    <div className="my-6">
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-2xl border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                Recent Transactions
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Latest Customer Orders
              </p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-slate-300">
                  Order ID
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-300">
                  Product
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-300">
                  Amount
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-300">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-semibold text-slate-300">
                  Date
                </th>
              </tr>
            </thead>

            <tbody className="text-white">
              <tr className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="p-4">
                  <span className="text-sm font-medium text-blue">
                    Order ID
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-blue">Product</span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-blue">Amount</span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-blue">
                    Order Status
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-blue">Date</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TableSection;
