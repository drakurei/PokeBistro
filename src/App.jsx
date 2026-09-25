import { useState } from 'react'
import { FilterProvider } from './contexts/FilterContext'
import { CartProvider } from './contexts/CartContext'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Cart from './components/Cart/Cart'
import Home from './pages/Home'

function App() {
  // The cart modal is opened from the Header and closed from the Cart itself
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <FilterProvider>
      <CartProvider>
        <div className="d-flex flex-column min-vh-100">
          <Header onOpenCart={() => setIsCartOpen(true)} />
          <main className="flex-grow-1">
            <Home />
          </main>
          <Footer />
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </CartProvider>
    </FilterProvider>
  )
}

export default App
