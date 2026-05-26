// App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import PreOrder from "./pages/PreOrder";
import Forge from "./pages/Forge";
import Shop from "./pages/Shop";

// ADMIN
import AdminAccess from "./pages/admin/AdminAccess";
import AdminDash from "./pages/admin/AdminDash";
import BlogManagement from "./pages/admin/BlogManagement";
import MediaLibrary from "./pages/admin/MediaLibrary";
import NewPost from "./pages/admin/NewPost";
import NewProduct from "./pages/admin/NewProduct";
import ProductManagement from "./pages/admin/ProductManagement";
import SiteSettings from "./pages/admin/SiteSettings";
import TimeLineManagement from "./pages/admin/TimeLineManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>

     {/* PUBLIC ROUTES */}
<Route path="/" element={<Home />} />
<Route path="/shop" element={<Shop />} />
<Route path="/about" element={<About />} />
<Route path="/blog" element={<Blog />} />
<Route path="/contact" element={<Contact />} />
<Route path="/preorder" element={<PreOrder />} />
<Route path="/forge" element={<Forge />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminAccess />} />
        <Route path="/admin/dashboard" element={<AdminDash />} />
        <Route path="/admin/blog" element={<BlogManagement />} />
        <Route path="/admin/blog/new" element={<NewPost />} />
        <Route path="/admin/products" element={<ProductManagement />} />
        <Route path="/admin/products/new" element={<NewProduct />} />
        <Route path="/admin/media" element={<MediaLibrary />} />
        <Route path="/admin/settings" element={<SiteSettings />} />
        <Route path="/admin/timeline" element={<TimeLineManagement />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;