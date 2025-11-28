import { Routes, Route, Outlet } from "react-router-dom"
import Home from "./store/Home"
import Products from "./store/Products"
import ProductDetail from "./store/ProductDetail"
import CategoryProducts from "./store/CategoryProducts"
import Cart from "./store/Cart"
import Checkout from "./store/Checkout"
import Login from "./auth/Login"
import Register from "./auth/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import StoreLayout from "./components/layout/StoreLayout"
import { ToastContainer } from "react-toastify"
import { SidebarProvider, Sidebar, SidebarInset } from "./components/ui/sidebar"
import { AppSidebar } from "./components/layout/app-sidebar"
import { CategoryLayout } from "./auth/cases/categories/components/category-layout"
import { CategoryForm } from "./auth/cases/categories/components/category-form"
import { BrandLayout } from "./auth/cases/brands/components/brand-layout"
import { BrandForm } from "./auth/cases/brands/components/brand-form"
import { ProductLayout } from "./auth/cases/products/components/product-layout"
import { ProductForm } from "./auth/cases/products/components/product-form"
import Categories from "./store/Categories"
import Orders from "./store/Orders"

export default function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<StoreLayout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:id" element={<CategoryProducts />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Route>

        <Route
          path="/admin"
          element={
            <SidebarProvider>
              <Sidebar collapsible="icon">
                <AppSidebar />
              </Sidebar>
              <SidebarInset>
                <Outlet />
              </SidebarInset>
            </SidebarProvider>
          }
        >
          <Route index element={<CategoryLayout />} />

          <Route path="categories" element={<CategoryLayout />} />
          <Route path="categories/new" element={<CategoryForm />} />
          <Route path="categories/:id" element={<CategoryForm />} />

          <Route path="brands" element={<BrandLayout />} />
          <Route path="brands/new" element={<BrandForm />} />
          <Route path="brands/:id" element={<BrandForm />} />

          <Route path="products" element={<ProductLayout />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:id" element={<ProductForm />} />
        </Route>
      </Routes>
    </>
  )
}
