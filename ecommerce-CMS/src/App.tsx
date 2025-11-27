import { Routes, Route } from "react-router-dom"

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

// ADMIN
import { SidebarProvider } from "./components/ui/sidebar"
import { AppSidebar } from "./components/layout/app-sidebar"
import { CategoryLayout } from "./auth/cases/categories/components/category-layout"
import { CategoryForm } from "./auth/cases/categories/components/category-form"
import { BrandLayout } from "./auth/cases/brands/components/brand-layout"
import { BrandForm } from "./auth/cases/brands/components/brand-form"
import { ProductLayout } from "./auth/cases/products/components/product-layout"
import { ProductForm } from "./auth/cases/products/components/product-form"
import { Outlet } from "react-router-dom"

export default function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* STORE LAYOUT (sidebar em todas as páginas da loja) */}
        <Route element={<StoreLayout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:id" element={<CategoryProducts />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Route>

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <SidebarProvider>
              <div className="flex">
                <AppSidebar />
                <div className="flex-1 p-6">
                  <Outlet />
                </div>
              </div>
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
