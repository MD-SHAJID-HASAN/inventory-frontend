import PageWrapper from "@/components/PageWrapper/PageWrapper";
import useFetchData from "@/hooks/useFetchData";

interface Transactions {
  _id: string,
  amound: number,
  date: Date,
  total: number,
  createdAt: string,
}

interface TransactionsResponse {
  data: Transactions[];
}

function Transactions() {
  const { data } = useFetchData<TransactionsResponse>("/transactions");

  if (!data) return <p>Loading...</p>;
  console.log(data.data);

  return (
    <PageWrapper
      btnText="New Transaction"
      href="/transaction-form"
      pageTitle="Transaction Table"
    >
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
            {data?.data?.map((t) => (
              <tr
                key={t._id}
                className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="p-4">
                  <span className="text-sm font-medium text-blue">
                    {t._id}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-blue">Product</span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-blue">{t.total}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-blue">
                    Order Status
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-blue">{t.createdAt}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  );
}

export default Transactions;
