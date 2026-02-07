import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/variables.css";
import "./styles/fonts.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ImagesProvider } from "./context/ImagesContext.jsx";
import { ProductsProvider } from "./context/ProductsContext.jsx";
import { CategoriesProvider } from "./context/CategoriesContext.jsx";
import { FilamentsProvider } from "./context/FilamentsContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { OrdersProvider } from "./context/OrdersContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ImagesProvider>
        <ProductsProvider>
          <CategoriesProvider>
            <FilamentsProvider>
              <OrdersProvider>
                <CartProvider>
                  <RouterProvider router={router} />
                </CartProvider>
              </OrdersProvider>
            </FilamentsProvider>
          </CategoriesProvider>
        </ProductsProvider>
      </ImagesProvider>
    </AuthProvider>
  </StrictMode>,
);
