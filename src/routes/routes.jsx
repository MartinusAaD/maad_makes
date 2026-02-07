import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Portfolio from "../pages/Portfolio/Portfolio";
import Store from "../pages/Store/Store";
import Cart from "../pages/Cart/Cart";
import Contact from "../pages/Contact/Contact";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Admin from "../pages/Admin/Admin";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProductsForm from "../components/ProductsForm/ProductsForm";
import ImageLibrary from "../pages/ImageLibrary/ImageLibrary";
import Product from "../pages/Product/Product";
import ProductsList from "../pages/ProductsList/ProductsList";
import CategoriesManager from "../pages/CategoriesManager/CategoriesManager";
import FilamentsManager from "../pages/FilamentsManager/FilamentsManager";
import Orders from "../pages/Orders/Orders";
import OrderDetail from "../pages/OrderDetail/OrderDetail";
import OrderConfirmation from "../pages/OrderConfirmation/OrderConfirmation";
import Login from "../pages/Login/Login";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Profile from "../pages/Profile/Profile";
import EmailVerification from "../pages/EmailVerification/EmailVerification";
import CharacterDesigns from "../pages/CharacterDesigns/CharacterDesigns";
import Waitlist from "../pages/Waitlist/Waitlist";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/store" element={<Store />} />
        <Route path="/character-designs" element={<CharacterDesigns />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />

        {/* Admin Routes - Protected */}
        <Route
          path="/admin/"
          element={
            <ProtectedRoute adminOnly={true}>
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/add-product" element={<ProductsForm />} />
          <Route
            path="/admin/edit-product/:id"
            element={<ProductsForm isEdit />}
          />
          <Route path="/admin/image-library" element={<ImageLibrary />} />
          <Route path="/admin/products-list" element={<ProductsList />} />
          <Route path="/admin/categories" element={<CategoriesManager />} />
          <Route path="/admin/filaments" element={<FilamentsManager />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/orders/:orderId" element={<OrderDetail />} />
          <Route path="/admin/waitlist" element={<Waitlist />} />
        </Route>
      </Route>
    </>,
  ),
);
