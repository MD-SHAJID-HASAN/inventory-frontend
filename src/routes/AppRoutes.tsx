import AddProductForm from "@/forms/AddProductForm";
import ProductCategory from "../features/products/ProductCategory";
import Products from "../features/products/Products";
import ShopList from "../features/shops/ShopList";
import Main from "../layout/Main";
import Home from "../pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TransactionForm from "@/forms/TransactionForm";

import AddCategoryForm from "@/forms/AddCategoryForm";
import DashboardPage from "@/features/dashboard/DashboardPage";

function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        { path: "/", element: <Home></Home> },
        { path: "/dashboard", element: <DashboardPage></DashboardPage> },
        {
          path: "/shops",
          element: <ShopList></ShopList>,
        },
        {
          path: "/category-form",
          element: <AddCategoryForm></AddCategoryForm>,
        },
        {
          path: "/shops/:id",
          element: <ProductCategory />,
        },
        {
          path: "/shops/cat/:id",
          element: <Products />,
        },
        {
          path: "/add-product-form",
          element: <AddProductForm />,
        },
        {
          path: "/transaction-form",
          element: <TransactionForm />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRoutes;
