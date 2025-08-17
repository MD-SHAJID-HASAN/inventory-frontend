import { Link, useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import ProductCategoryCard from "../../components/ProductCategoryCard";

type ProductCategory = {
  id: string;
  shopId: string;
  category: string;
};

function ProductCategory() {
  const params = useParams<{ id: string }>();
  console.log(params.id)
  const { data, loading, error } = useFetchData<ProductCategory[]>(
    `/categories/shop/${params.id}`
  );

  console.log(data?.data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const filteredData = data?.data?.filter((d) => d.shopId === params.id) ?? [];

  return (
    <div>
      <h2>Product Categories for Shop: {params.id}</h2>
      {filteredData.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filteredData.map((cat) => (
            <ProductCategoryCard key={cat._id} cat={cat}></ProductCategoryCard>
          ))}
        </div>
      ) : (
        <p>No categories found.</p>
      )}
      <Link
        to={`/category-form`}
        className="border mt-2 block bg-blue-300 p-2"
      >
        Add Category +
      </Link>
    </div>
  );
}

export default ProductCategory;
