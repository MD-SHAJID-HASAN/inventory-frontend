import type { Shop } from "@/types";
import React from "react";
import { Link } from "react-router-dom";
interface ShopCardProps {
  shop: Shop;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  console.log(shop)
  return (
    <Link to={`/shops/${shop._id}`}>
      <div className="border border-slate-600 rounded-xl shadow-md dark:bg-slate-900/80 dark:text-white max-w-sm hover:bg-slate-800/80 min-w-72 mt-4">
        <img className="w-full h-40 rounded-t-xl mb-2" src={`/images/shop.jpg`} alt="Shop Image" />
        <div className="px-2 pb-2">
          <h2 className="text-xl font-bold mb-2">{shop.name}</h2>
        <p className="hidden">
          <strong>Owner:</strong> {shop.owner}
        </p>
        <p>
          <strong>Location:</strong> {shop.location}
        </p>
        <p className="hidden">
          <strong>Created At:</strong>{" "}
          {new Date(shop.createdAt).toLocaleDateString()}
        </p>
        <div className="mt-3 justify-between text-sm text-gray-600 hidden">
          <span>Categories: {shop.totalCategories}</span>
          <span>Products: {shop.totalProducts}</span>
          <span>Stock: {shop.totalStock}</span>
        </div>
        </div>
      </div>
    </Link>
  );
};

export default ShopCard;
