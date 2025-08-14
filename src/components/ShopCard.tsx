import type { Shop } from "@/types";
import React from "react";
import { Link } from "react-router-dom";
interface ShopCardProps {
  shop: Shop;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  return (
    <Link to={`/shops/${shop.id}`}>
      <div className="border rounded-md p-4 shadow-md bg-white max-w-sm hover:bg-blue-200">
        <h2 className="text-xl font-bold mb-2">{shop.name}</h2>
        <p>
          <strong>Owner:</strong> {shop.owner}
        </p>
        <p>
          <strong>Location:</strong> {shop.location}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(shop.createdAt).toLocaleDateString()}
        </p>
        <div className="mt-3 flex justify-between text-sm text-gray-600">
          <span>Categories: {shop.totalCategories}</span>
          <span>Products: {shop.totalProducts}</span>
          <span>Stock: {shop.totalStock}</span>
        </div>
      </div>
    </Link>
  );
};

export default ShopCard;
