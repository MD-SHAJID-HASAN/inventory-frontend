

function TransactionTables({ data } : any) {

    console.log('data from table sec', data)
  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left p-4 text-sm font-semibold text-slate-300">
              Customer/Supplier
            </th>
            {/* <th className="text-left p-4 text-sm font-semibold text-slate-300">
                Product
              </th> */}
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
          {data?.map((t : any) => (
            <tr
              key={t._id}
              className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <td className="p-4">
                <span className="text-sm font-medium text-blue">{t.party}</span>
              </td>
              {/* <td className="p-4">
                  <span className="text-sm font-medium text-blue">Product</span>
                </td> */}
              <td className="p-4">
                <span
                  className={`text-sm font-medium text-blue ${
                    t.transactionType === "incoming"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {t.total}
                </span>
              </td>
              <td className="p-4">
                <span className="text-sm font-medium text-blue">
                  {t.transactionType}
                </span>
              </td>
              <td className="p-4">
                <span className="text-sm font-medium text-blue">
                  {t.createdAt}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTables;
