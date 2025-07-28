import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayouy";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import Products from "./pages/products";
import { Suspense } from "react";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/Products" replace />} />
        <Route path="/all" element={<HomePage />} />
        <Route
          path="/products"
          element={
            <Suspense fallback={<div className="p-4">Loading products...</div>}>
              <Products />
            </Suspense>
          }
        />
        <Route path="/:categoryId" element={<CategoryPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
