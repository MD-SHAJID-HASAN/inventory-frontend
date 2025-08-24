import PageWrapper from "@/components/PageWrapper/PageWrapper"
import useFetchData from "@/hooks/useFetchData"

function Transactions() {

    const {data} = useFetchData('/transactions')
    console.log(data);


  return (
    <PageWrapper btnText="New Transaction" href="/transaction-form" pageTitle="Transaction Table" >
        <div>

        </div>
    </PageWrapper>
  )
}

export default Transactions