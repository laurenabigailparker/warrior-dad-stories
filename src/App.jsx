import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import PreOrder from "./pages/PreOrder";
import Forge from "./pages/Forge";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import TestimonialManagement from "./pages/admin/TestimonialManagement";
import ThankYou from "./pages/ThankYou";
import NewsletterSuccess from "./pages/NewsletterSuccess";

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
      <ScrollToTop />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:slug" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/preorder" element={<PreOrder />} />
        <Route path="/forge" element={<Forge />} />
        <Route path="/thank-you" element={<ThankYou />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin" element={<AdminAccess />} />

        {/* PROTECTED ADMIN ROUTES */}
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDash /></ProtectedRoute>} />
        <Route path="/admin/blog" element={<ProtectedRoute><BlogManagement /></ProtectedRoute>} />
        <Route path="/admin/blog/new" element={<ProtectedRoute><NewPost /></ProtectedRoute>} />
        <Route path="/admin/blog/edit/:id" element={<ProtectedRoute><NewPost /></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute><ProductManagement /></ProtectedRoute>} />
        <Route path="/admin/products/new" element={<ProtectedRoute><NewProduct /></ProtectedRoute>} />
        <Route path="/admin/products/edit/:id" element={<ProtectedRoute><NewProduct /></ProtectedRoute>} />
        <Route path="/admin/media" element={<ProtectedRoute><MediaLibrary /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><SiteSettings /></ProtectedRoute>} />
        <Route path="/admin/timeline" element={<ProtectedRoute><TimeLineManagement /></ProtectedRoute>} />
        <Route path="/admin/testimonials" element={<ProtectedRoute><TestimonialManagement /></ProtectedRoute>} />
        <Route
  path="/newsletter-success"
  element={<NewsletterSuccess />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;