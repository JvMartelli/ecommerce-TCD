import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Products from "./Products";
import ProductDetail from "./ProductDetail";
import CategoryProducts from "./CategoryProducts";
import Cart from "./Cart";

export default function StoreRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/store" element={<Home />} />
        <Route path="/store/products" element={<Products />} />
        <Route path="/store/product/:id" element={<ProductDetail />} />
        <Route path="/store/category/:id" element={<CategoryProducts />} />
        <Route path="/store/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}
