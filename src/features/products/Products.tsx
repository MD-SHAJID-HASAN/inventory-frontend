import { useMemo } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

interface Product {
  _id: string;
  shopId: string;
  categoryId: string;
  brandId: string;
  name: string;
  unit: string;
  totalStock: number;
  purchasePrice: number;
  sellingPrice: number;
}

interface Brand {
  _id: string;
  name: string;
}

interface BrandResponse {
  data: Brand[];
}
interface ProductResponse {
  data: Product[];
}

function Products() {
  const { id: categoryId } = useParams<{ id: string }>();

  // Fetch products
  const {
    data: productData,
    loading: productLoading,
    error: productError,
  } = useFetchData<ProductResponse>(`/productModels/${categoryId}`);

  // Fetch brands
  const {
    data: brandData,
    loading: brandLoading,
    error: brandError,
  } = useFetchData<BrandResponse>("/brands");
  console.log(brandData);
  const brandMap = useMemo(() => {
    if (!brandData?.data) return {};
    return brandData.data.reduce<Record<string, string>>((acc, brand) => {
      acc[brand._id] = brand.name;
      return acc;
    }, {});
  }, [brandData]);

  // console.log(brandMap)

  if (productLoading || brandLoading) return <p>Loading...</p>;
  if (productError || brandError) return <p>Error loading data</p>;
  if (!productData?.data || productData.data.length === 0)
    return <p>No products found for this category.</p>;

  const products = productData.data;

  return (
    <PageWrapper btnText="New Product" pageTitle="Products" href="/add-product-form">

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Brand</th>
            <th className="border px-2 py-1 text-center">Stock</th>
            <th className="border px-2 py-1 text-right">Buying Price</th>
            <th className="border px-2 py-1 text-right">Stock Value</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="text-white text-center">
              <td className="border px-2 py-1">{product.name}</td>
              <td className="border px-2 py-1">
                {brandMap[product.brandId] || "Unknown"}
              </td>
              <td className="border px-2 py-1 text-center">
                {product.totalStock}
              </td>
              <td className="border px-2 py-1 text-right">
                {product.purchasePrice}৳
              </td>
              <td className="border px-2 py-1 text-right">
                {product.purchasePrice * product.totalStock}৳
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </PageWrapper>
  );
}

export default Products;
