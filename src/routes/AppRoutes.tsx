import AddProductForm from "@/forms/AddProductForm";
import ProductCategory from "../features/category/ProductCategory";
import Products from "../features/products/Products";
import ShopList from "../features/shops/ShopList";
import Main from "../components/layout/Main.tsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TransactionForm from "@/forms/TransactionForm";
import AddCategoryForm from "@/forms/AddCategoryForm";
import DashboardPage from "@/features/dashboard/DashboardPage";
import Transactions from "@/features/transactions/Transactions";
import Categories from "@/features/category/Categories";

function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        { path: "/", element: <DashboardPage></DashboardPage> },
        { path: "/dashboard", element: <DashboardPage></DashboardPage> },
        {
          path: "/shops",
          element: <ShopList></ShopList>,
        },
        {
          path: "/categories",
          element: <Categories></Categories>,
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
          path: "/transactions",
          element: <Transactions></Transactions>,
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
