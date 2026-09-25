import { Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { CartProvider } from './contexts/CartContext'
import { FavoritesProvider } from './contexts/FavoritesContext'
import { ToastProvider } from './contexts/ToastContext'
import SmoothScroll from './lib/SmoothScroll'
import SkipLink from './components/layout/SkipLink'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import RouteEffects from './components/layout/RouteEffects'
import Seo from './components/layout/Seo'
import LoadingScreen from './components/loading/LoadingScreen'
import ErrorBoundary from './components/layout/ErrorBoundary'
import lazyPage from './utils/lazyPage'
import CartDrawer from './components/cart/CartDrawer'
import ProductDialog from './components/menu/ProductDialog'
import ComboDialog from './components/menu/ComboDialog'
import HomePage from './routes/HomePage'
import MenuPage from './routes/MenuPage'

// Home and menu are the core of the site and ship in the main bundle; the other pages load on demand.
const ProductPage = lazyPage(() => import('./routes/ProductPage'))
const ComboPage = lazyPage(() => import('./routes/ComboPage'))
const StoryPage = lazyPage(() => import('./routes/StoryPage'))
const ContactPage = lazyPage(() => import('./routes/ContactPage'))
const ReservationPage = lazyPage(() => import('./routes/ReservationPage'))
const OrderPage = lazyPage(() => import('./routes/OrderPage'))
const FavoritesPage = lazyPage(() => import('./routes/FavoritesPage'))
const NotFoundPage = lazyPage(() => import('./routes/NotFoundPage'))

// oxlint-disable-next-line react/only-export-components -- used by the pre-render script only
export const preloadPages = () =>
  Promise.all(
    [
      ProductPage,
      ComboPage,
      StoryPage,
      ContactPage,
      ReservationPage,
      OrderPage,
      FavoritesPage,
      NotFoundPage,
    ].map((page) => page.preload()),
  )

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
            {/* Head tags follow the real URL (a dish opened over the carte gets its own title) and hydrate
                in the first pass, so the pre-rendered tags are adopted, never duplicated */}
            <Seo path={location.pathname} />
            <SkipLink />
            <LoadingScreen />
            <Header />
            <main id="main" tabIndex={-1} className="min-h-dvh outline-none">
              <ErrorBoundary key={location.pathname}>
                <Suspense fallback={<PageFallback />}>
                  <Routes location={background || location}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/menu/formule/:slug" element={<ComboPage />} />
                    <Route path="/menu/:slug" element={<ProductPage />} />
                    <Route path="/histoire" element={<StoryPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/reservation" element={<ReservationPage />} />
                    <Route path="/commande" element={<OrderPage />} />
                    <Route path="/favoris" element={<FavoritesPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
              {background && (
                <Routes>
                  <Route path="/menu/formule/:slug" element={<ComboDialog />} />
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
