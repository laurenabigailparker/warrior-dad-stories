import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

// PUBLIC PAGES
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Bingo from "./pages/Bingo";
import Contact from "./pages/Contact";
import Forge from "./pages/Forge";
import PreOrder from "./pages/PreOrder";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/Shop";
import ThankYou from "./pages/ThankYou";
import NewsletterSuccess from "./pages/NewsletterSuccess";

// ADMIN AUTH / DASHBOARD
import AdminAccess from "./pages/admin/AdminAccess";
import AdminDash from "./pages/admin/AdminDash";

// ADMIN PAGES
import AboutManagement from "./pages/admin/AboutManagement";
import BingoManagement from "./pages/admin/BingoManagement";
import BlogManagement from "./pages/admin/BlogManagement";
import BooksManagement from "./pages/admin/BooksManagement";
import ForgeEntriesManagement from "./pages/admin/ForgeEntriesManagement";
import ForgeEntryEditor from "./pages/admin/ForgeEntryEditor";
import ForgeManagement from "./pages/admin/ForgeManagement";
import HomeContentManagement from "./pages/admin/HomeContentManagement";
import HomeManagement from "./pages/admin/HomeManagement";
import MediaLibrary from "./pages/admin/MediaLibrary";
import NewBook from "./pages/admin/NewBook";
import NewPost from "./pages/admin/NewPost";
import NewProduct from "./pages/admin/NewProduct";
import NewsletterManagement from "./pages/admin/NewsletterManagement";
import PodcastEdit from "./pages/admin/PodcastEdit";
import PodcastManagement from "./pages/admin/PodcastManagement";
import ProductManagement from "./pages/admin/ProductManagement";
import ReflectionManagement from "./pages/admin/ReflectionManagement";
import SiteSettings from "./pages/admin/SiteSettings";
import SocialLinksManagement from "./pages/admin/SocialLinksManagement";
import TestimonialManagement from "./pages/admin/TestimonialManagement";
import TimeLineManagement from "./pages/admin/TimeLineManagement";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/bingo" element={<Bingo />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forge" element={<Forge />} />
        <Route path="/newsletter-success" element={<NewsletterSuccess />} />
        <Route path="/preorder" element={<PreOrder />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:slug" element={<ProductDetail />} />
        <Route path="/thank-you" element={<ThankYou />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin" element={<AdminAccess />} />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDash />
            </ProtectedRoute>
          }
        />

        {/* ADMIN HOME / ABOUT */}
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute>
              <HomeManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/home-content"
          element={
            <ProtectedRoute>
              <HomeContentManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/about"
          element={
            <ProtectedRoute>
              <AboutManagement />
            </ProtectedRoute>
          }
        />

        {/* ADMIN BLOG */}
        <Route
          path="/admin/blog"
          element={
            <ProtectedRoute>
              <BlogManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blog/new"
          element={
            <ProtectedRoute>
              <NewPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blog/edit/:id"
          element={
            <ProtectedRoute>
              <NewPost />
            </ProtectedRoute>
          }
        />

        {/* ADMIN PODCASTS */}
        <Route
          path="/admin/podcasts"
          element={
            <ProtectedRoute>
              <PodcastManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/podcasts/edit/:id"
          element={
            <ProtectedRoute>
              <PodcastEdit />
            </ProtectedRoute>
          }
        />

        {/* ADMIN BOOKS */}
        <Route
          path="/admin/books"
          element={
            <ProtectedRoute>
              <BooksManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/books/new"
          element={
            <ProtectedRoute>
              <NewBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/books/edit/:id"
          element={
            <ProtectedRoute>
              <NewBook />
            </ProtectedRoute>
          }
        />

        {/* ADMIN PRODUCTS / MEDIA */}
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <ProductManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/new"
          element={
            <ProtectedRoute>
              <NewProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/edit/:id"
          element={
            <ProtectedRoute>
              <NewProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/media"
          element={
            <ProtectedRoute>
              <MediaLibrary />
            </ProtectedRoute>
          }
        />

        {/* ADMIN CREATIVE FORGE */}
        <Route
          path="/admin/forge"
          element={
            <ProtectedRoute>
              <ForgeManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/forge-entries"
          element={
            <ProtectedRoute>
              <ForgeEntriesManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/forge-entries/new"
          element={
            <ProtectedRoute>
              <ForgeEntryEditor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/forge-entries/edit/:id"
          element={
            <ProtectedRoute>
              <ForgeEntryEditor />
            </ProtectedRoute>
          }
        />

        {/* ADMIN BINGO */}
        <Route
          path="/admin/bingo"
          element={
            <ProtectedRoute>
              <BingoManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/bingo/new"
          element={
            <ProtectedRoute>
              <ForgeEntryEditor defaultEntryType="bingo" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/bingo/edit/:id"
          element={
            <ProtectedRoute>
              <ForgeEntryEditor defaultEntryType="bingo" />
            </ProtectedRoute>
          }
        />

        {/* ADMIN OTHER CONTENT */}
        <Route
          path="/admin/reflections"
          element={
            <ProtectedRoute>
              <ReflectionManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/timeline"
          element={
            <ProtectedRoute>
              <TimeLineManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/testimonials"
          element={
            <ProtectedRoute>
              <TestimonialManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/newsletter"
          element={
            <ProtectedRoute>
              <NewsletterManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/socials"
          element={
            <ProtectedRoute>
              <SocialLinksManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <SiteSettings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;