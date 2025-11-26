import { Routes, Route } from "react-router-dom"
import Home from "./store/Home"
import Products from "./store/Products"
import ProductDetail from "./store/ProductDetail"
import CategoryProducts from "./store/CategoryProducts"
import Cart from "./store/Cart"
import { CategoryLayout } from "./cases/categories/components/category-layout"
import { CategoryForm } from "./cases/categories/components/category-form"
import { BrandLayout } from "./cases/brands/components/brand-layout"
import { BrandForm } from "./cases/brands/components/brand-form"
import { ProductLayout } from "./cases/products/components/product-layout"
import { ProductForm } from "./cases/products/components/product-form"
import { AppSidebar } from "./components/layout/app-sidebar"
import { SidebarProvider } from "./components/ui/sidebar"
import { ToastContainer } from "react-toastify"
import Navbar from "./components/layout/Navbar"
import Checkout from "./store/Checkout"
import Login from "./auth/Login"
import Register from "./auth/Register"
import ProtectedRoute from "./components/ProtectedRoute"


export default function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />

      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route index element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:id" element={<CategoryProducts />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

        <Route
          path="/admin/*"
          element={
            <SidebarProvider>
              <div className="flex">
                <AppSidebar />
                <div className="flex-1 p-6">
                  <Routes>
                    <Route path="" element={<CategoryLayout />} />

                    <Route path="categories" element={<CategoryLayout />} />
                    <Route path="categories/new" element={<CategoryForm />} />
                    <Route path="categories/:id" element={<CategoryForm />} />

                    <Route path="brands" element={<BrandLayout />} />
                    <Route path="brands/new" element={<BrandForm />} />
                    <Route path="brands/:id" element={<BrandForm />} />

                    <Route path="products" element={<ProductLayout />} />
                    <Route path="products/new" element={<ProductForm />} />
                    <Route path="products/:id" element={<ProductForm />} />
                  </Routes>
                </div>
              </div>
            </SidebarProvider>
          }
        />

      </Routes>
    </>
  )
}
