import PageWrapper from "@/components/PageWrapper/PageWrapper";
import useFetchData from "@/hooks/useFetchData";
import TransactionTables from "@/tables/TransactionTables";

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

  const tdata = data?.data;

  return (
    <PageWrapper
      btnText="New Transaction"
      href="/transaction-form"
      pageTitle="Transaction Table"
    >
      <div className="overflow-x-auto">
        <TransactionTables data={tdata}></TransactionTables>
      </div>
    </PageWrapper>
  );
}

export default Transactions;
