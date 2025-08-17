import { useMemo } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";

interface Product {
  id: string;
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
  id: string;
  name: string;
}

function Products() {
  const { id: categoryId } = useParams<{ id: string }>();

  // Fetch products
  const { data: productData, loading: productLoading, error: productError } =
    useFetchData<Product[]>(`/productModels/${categoryId}`);

  // Fetch brands
  const { data: brandData, loading: brandLoading, error: brandError } =
    useFetchData<Brand[]>("/brands");
console.log(brandData?.data)
  // Build brand map: brandId => brandName
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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Products</h2>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Brand</th>
            <th className="border px-2 py-1 text-center">Stock</th>
            <th className="border px-2 py-1 text-right">Buying Price</th>
            <th className="border px-2 py-1 text-right">Stock Value</th>
            <th className="border px-2 py-1 text-right">Selling Price</th>
            <th className="border px-2 py-1 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border px-2 py-1">{product.name}</td>
              <td className="border px-2 py-1">
                {brandMap[product.brandId] || "Unknown"}
              </td>
              <td className="border px-2 py-1 text-center">{product.totalStock}</td>
              <td className="border px-2 py-1 text-right">{product.purchasePrice}৳</td>
              <td className="border px-2 py-1 text-right">
                {product.purchasePrice * product.totalStock}৳
              </td>
              <td className="border px-2 py-1 text-right">{product.sellingPrice}৳</td>
              <td className="border px-2 py-1 text-center">
                <button className="px-2 py-1 bg-green-500 text-white rounded mr-1">+</button>
                <button className="px-2 py-1 bg-red-500 text-white rounded">−</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
