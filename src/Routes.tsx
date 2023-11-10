import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";

import WithNavbar from "./layouts/WithNavbar";
import WithOutNavbar from "./layouts/WithOutNavbar";

import Signin from "./pages/auth/signin";
import Home from "./pages/home";

import Products from "./pages/products";
import ProductDetail from "./pages/products/detail";

import Blogs from './pages/blogs'
import BlogCreate from './pages/blogs/create'

const RoutesPage = () => {
  return (
    <Router>
      <Routes>
        <Route element={<WithOutNavbar />}>
          <Route path="/auth/signin" element={<Signin />} />
        </Route>
        <Route
          element={
            <RequireAuth loginPath={"/auth/signin"}>
              <WithNavbar />
            </RequireAuth>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/detail/:id" element={<ProductDetail />} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="/blogs/create" element={<BlogCreate/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RoutesPage;
