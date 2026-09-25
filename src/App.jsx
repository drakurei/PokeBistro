import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { CartProvider } from './contexts/CartContext'
import { FavoritesProvider } from './contexts/FavoritesContext'
import { ToastProvider } from './contexts/ToastContext'
import SmoothScroll from './lib/SmoothScroll'
import SkipLink from './components/layout/SkipLink'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import RouteEffects from './components/layout/RouteEffects'
import LoadingScreen from './components/loading/LoadingScreen'
import CartDrawer from './components/cart/CartDrawer'
import ProductDialog from './components/menu/ProductDialog'
import HomePage from './routes/HomePage'
import MenuPage from './routes/MenuPage'

// Home and menu are the core of the site and ship in the main bundle; the other pages load on demand.
const ProductPage = lazy(() => import('./routes/ProductPage'))
const StoryPage = lazy(() => import('./routes/StoryPage'))
const ContactPage = lazy(() => import('./routes/ContactPage'))
const ReservationPage = lazy(() => import('./routes/ReservationPage'))
const NotFoundPage = lazy(() => import('./routes/NotFoundPage'))

// Keeps the layout stable while a lazy page loads (a few kilobytes, usually invisible)
const PageFallback = () => <div className="min-h-dvh" aria-hidden="true" />

function App() {
  const location = useLocation()
  // When a product is opened from the menu grid, the grid stays rendered "behind" and the product
  // is shown in a dialog. A direct visit to /menu/:slug renders the full page instead.
  const background = location.state?.background

  return (
    <ToastProvider>
      <CartProvider>
        <FavoritesProvider>
          <SmoothScroll>
            <SkipLink />
            <LoadingScreen />
            <Header />
            <main id="main" tabIndex={-1} className="min-h-dvh outline-none">
              <Suspense fallback={<PageFallback />}>
                <Routes location={background || location}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/menu/:slug" element={<ProductPage />} />
                  <Route path="/histoire" element={<StoryPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/reservation" element={<ReservationPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
              {background && (
                <Routes>
                  <Route path="/menu/:slug" element={<ProductDialog />} />
                </Routes>
              )}
            </main>
            <Footer />
            <CartDrawer />
            <RouteEffects />
          </SmoothScroll>
        </FavoritesProvider>
      </CartProvider>
    </ToastProvider>
  )
}

export default App
