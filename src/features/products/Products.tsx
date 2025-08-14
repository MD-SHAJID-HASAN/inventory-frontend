import useFetchData from '../../hooks/useFetchData';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Product {
  id: string;
  shopId: string;
  categoryId: string;
  name: string;
  brand: string;
  unit: string;
  stock: number;
  buyingPrice: number;
  price: number;
}

function Products() {
  const params = useParams<{ id: string }>();
  const { data, loading, error } = useFetchData<Product[]>('/data/productData.json');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((d) => d.categoryId === params.id);
      setProducts(filtered);
    }
  }, [data, params.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const handleStockChange = (id: string, delta: number) => {
    setProducts((prev) =>
      prev.map((prod) =>
        prod.id === id ? { ...prod, stock: Math.max(0, prod.stock + delta) } : prod
      )
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      {products.length === 0 ? (
        <p>No products found for this category.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Brand</th>
              <th className="border px-2 py-1">Stock</th>
              <th className="border px-2 py-1">Buying Price</th>
              <th className="border px-2 py-1">Stock Value</th>
              <th className="border px-2 py-1">Selling Price</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border px-2 py-1">{product.name}</td>
                <td className="border px-2 py-1">{product.brand}</td>
                <td className="border px-2 py-1 text-center">{product.stock}</td>
                <td className="border px-2 py-1 text-right">{product.buyingPrice}৳</td>
                <td className="border px-2 py-1 text-right">{product.buyingPrice * product.stock}৳</td>
                <td className="border px-2 py-1 text-right">{product.price}৳</td>
                <td className="border px-2 py-1 text-center">
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded mr-1"
                    onClick={() => handleStockChange(product.id, 1)}
                  >
                    +
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleStockChange(product.id, -1)}
                  >
                    −
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Products;
