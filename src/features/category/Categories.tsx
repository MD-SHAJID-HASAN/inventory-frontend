import PageWrapper from "@/components/PageWrapper/PageWrapper"
import useFetchData from "@/hooks/useFetchData"
import LoadingSpinner from "@/loadingSpinner/LoadingSpinner";

interface Category{
  _id: string,
  name: string,
}

interface CategoryResponse{
  data: Category[];
}

function Categories() {


  const {data, loading} = useFetchData<CategoryResponse>('/categories')
 
  // if(!data) return <p>Loading...</p>

  if(loading) return <LoadingSpinner></LoadingSpinner>

  console.log(data?.data);
  const categories = data?.data;



  return (
    <PageWrapper btnText="New Category" href="/add-category-form" pageTitle="Categories">
      <div className="flex gap-6 text-white items-center justify-center">
        {categories &&
        categories.map((cat : any) => <div key={cat._id}  className="">
          <div className="bg-slate-800/80 flex items-center  rounded-xl">
            <h1 className="h-20 w-30 text-center">{cat.name}</h1>
          </div>
        </div>)
      }
      </div>
    </PageWrapper>
  )
}

export default Categories