import { Plus, PlusCircle } from "lucide-react";
import ShopCard from "../../components/ShopCard";
import useFetchData from "../../hooks/useFetchData";
import type { Shop } from "@/types";
import { Link } from "react-router-dom";
import BrandManager from "@/forms/AddBrandForm";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

function ShopList() {
  const { data, error, loading } = useFetchData<Shop[]>("/shops");

  const shops = (data as any)?.data;

  if (!data) return <p>Loading...</p>;

  // return <p>Okay!</p>

  if (loading) return <p>Loading</p>;

  console.log(data, error);

  return (
    <PageWrapper btnText="Add New" href="#" pageTitle="Your Shops">
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
          <Link to={'/add-product-form'} className=" hidden lg:flex items-center space-x-2 py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-a cursor-pointer">
            <Plus className="w-4 h-4"></Plus>
            <span className="text-sm font-medium">New Product</span>
          </Link >
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
    </PageWrapper>
  );
}

export default ShopList;
