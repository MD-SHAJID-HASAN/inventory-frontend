import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import ProductCategoryCard from "../../components/ProductCategoryCard";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

type ProductCategory = {
  id: string;
  shopId: string;
  category: string;
};

interface ProductCategoryResponse {
  data: ProductCategory[];
}

function ProductCategory() {
  const params = useParams<{ id: string }>();
  console.log(params.id)
  const { data, loading, error } = useFetchData<ProductCategoryResponse>(
    `/categories/shop/${params.id}`
  );

  console.log(data?.data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const filteredData = data?.data?.filter((d) => d.shopId === params.id) ?? [];

  return (
    <PageWrapper btnText="New Category" pageTitle="Categories" href="/category-form">
      {filteredData.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filteredData.map((cat : any) => (
            <ProductCategoryCard key={cat._id} cat={cat}></ProductCategoryCard>
          ))}
        </div>
      ) : (
        <p>No categories found.</p>
      )}
    </PageWrapper>
  );
}

export default ProductCategory;
