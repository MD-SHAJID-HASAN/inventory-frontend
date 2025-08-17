import { PlusCircle } from "lucide-react";
import ShopCard from "../../components/ShopCard";
import useFetchData from "../../hooks/useFetchData";
import type { Shop } from "@/types";
import { Link } from "react-router-dom";
import BrandManager from "@/forms/AddBrandForm";

function ShopList() {
  const { data, error, loading } = useFetchData<Shop[]>("/shops");

  const shops = (data as any)?.data;

  if (!data) return <p>Loading...</p>;

  // return <p>Okay!</p>

  if (loading) return <p>Loading</p>;

  console.log(data, error);

  return (
    <div className="flex flex-wrap gap-3">
      {data &&
        shops.map((item: any) => {
          return <ShopCard key={item.id} shop={item}></ShopCard>;
        })}

      <div className="flex flex-col gap-3">
        <Link
          to={"/add-product-form"}
          className="border p-2 bg-blue-500 rounded flex gap-2 cursor-pointer "
        >
          <PlusCircle></PlusCircle>
          Add Product
        </Link>
        <Link
          to={"/category-form"}
          className="border p-2 bg-blue-500 rounded flex gap-2 cursor-pointer "
        >
          <PlusCircle></PlusCircle>
          Add Category
        </Link>
        {/* <Link
          to={"/add-product-form"}
          className="border p-2 bg-blue-500 rounded flex gap-2 cursor-pointer "
        >
          <PlusCircle></PlusCircle>
          Add Brand
        </Link> */}
        <BrandManager></BrandManager>
      </div>

      <div className="flex flex-col gap-3">
        <Link
          to={"/add-product-form"}
          className="border p-2 bg-blue-500 rounded flex gap-2 cursor-pointer "
        >
          <PlusCircle></PlusCircle>
          Add Product
        </Link>
        <Link
          to={"/transaction-form"}
          className="border p-2 bg-blue-500 rounded flex gap-2 cursor-pointer "
        >
          <PlusCircle></PlusCircle>
          Transaction
        </Link>
        <Link
          to={"/add-product-form"}
          className="border p-2 bg-blue-500 rounded flex gap-2 cursor-pointer "
        >
          <PlusCircle></PlusCircle>
          Sell Stock
        </Link>
      </div>
    </div>
  );
}

export default ShopList;
