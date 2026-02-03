import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.jpg'

export default function Navbar() {
  const { toggle, items } = useCart()
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const { user } = useAuth()
  const closeTimer = useRef(null)
  const openMenu = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setMenuOpen(true)
  }
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMenuOpen(false), 150)
  }
  const count = items.reduce((a, i) => a + i.qty, 0)
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="container-max h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="HeroStar Logo"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          <span className="font-extrabold text-2xl tracking-tight">HeroStar</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={({isActive})=>`hover:text-brand ${isActive? 'text-brand': ''}`}>Ana Sayfa</NavLink>
          <div
            className="relative"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            <NavLink to="/products" className={({isActive})=>`hover:text-brand ${isActive? 'text-brand': ''}`}>Ürünler</NavLink>
            {menuOpen && (
              <div className="absolute left-0 top-full z-50" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
                <div className="card p-4 min-w-[720px]">
                  <div className="flex gap-8">
                    <div className="min-w-[220px]">
                      <Link to="/products?category=cardio" className="block font-semibold px-2 py-1 rounded hover:bg-muted">Kardiyo</Link>
                      <div className="mt-2 text-sm text-gray-300 space-y-1">
                        <Link to="/products?category=cardio&subcategory=kosu-bantlari" className="block px-2 py-1 rounded hover:bg-muted">Koşu Bantları</Link>
                        <Link to="/products?category=cardio&subcategory=egzersiz-bisikletleri" className="block px-2 py-1 rounded hover:bg-muted">Egzersiz Bisikletleri</Link>
                        <Link to="/products?category=cardio&subcategory=fonksiyonel-kardiyo" className="block px-2 py-1 rounded hover:bg-muted">Fonksiyonel Kardiyo</Link>
                      </div>
                    </div>
                    <div className="min-w-[220px]">
                      <Link to="/products?category=resistance" className="block font-semibold px-2 py-1 rounded hover:bg-muted">Direnç Ekipmanları</Link>
                      <div className="mt-2 text-sm text-gray-300 grid grid-cols-2 gap-x-4 gap-y-1">
                        <Link to="/products?category=resistance&subcategory=t1000" className="px-2 py-1 rounded hover:bg-muted">T-1000 Serisi</Link>
                        <Link to="/products?category=resistance&subcategory=u2000" className="px-2 py-1 rounded hover:bg-muted">U-2000 Serisi</Link>
                        <Link to="/products?category=resistance&subcategory=x80" className="px-2 py-1 rounded hover:bg-muted">X-80 Serisi</Link>
                        <Link to="/products?category=resistance&subcategory=e3000" className="px-2 py-1 rounded hover:bg-muted">E-3000 Serisi</Link>
                        <Link to="/products?category=resistance&subcategory=e5000" className="px-2 py-1 rounded hover:bg-muted">E-5000 Serisi</Link>
                        <Link to="/products?category=resistance&subcategory=a600" className="px-2 py-1 rounded hover:bg-muted">A-600 Serisi</Link>
                        <Link to="/products?category=resistance&subcategory=power" className="px-2 py-1 rounded hover:bg-muted">Power Serisi</Link>
                        <Link to="/products?category=resistance&subcategory=titan" className="px-2 py-1 rounded hover:bg-muted">Titan Serisi</Link>
                      </div>
                    </div>
                    <div className="min-w-[220px]">
                      <Link to="/products?category=training" className="block font-semibold px-2 py-1 rounded hover:bg-muted">Antrenman Ekipmanları</Link>
                      <div className="mt-2 text-sm text-gray-300 space-y-1">
                        <Link to="/products?category=training&subcategory=hs8000" className="block px-2 py-1 rounded hover:bg-muted">HS-8000 Serisi</Link>
                        <Link to="/products?category=training&subcategory=multi-stations" className="block px-2 py-1 rounded hover:bg-muted">Multi Stations</Link>
                        <Link to="/products?category=training&subcategory=bench" className="block px-2 py-1 rounded hover:bg-muted">Bench Serisi</Link>
                        <Link to="/products?category=training&subcategory=fonksiyonel" className="block px-2 py-1 rounded hover:bg-muted">Fonksiyonel Antrenman Ekipmanları</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <NavLink to="/about" className={({isActive})=>`hover:text-brand ${isActive? 'text-brand': ''}`}>Hakkımızda</NavLink>
          <NavLink to="/contact" className={({isActive})=>`hover:text-brand ${isActive? 'text-brand': ''}`}>İletişim</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Link to={user ? "/account" : "/login"} className="btn btn-outline h-10 px-3" title={user ? "Hesabım" : "Giriş Yap"}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
              <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 0114 0v1H5v-1z" />
            </svg>
            <span className="sr-only">{user ? 'Hesabım' : 'Giriş Yap'}</span>
          </Link>
          <form
            onSubmit={(e)=>{e.preventDefault(); navigate(`/products?search=${encodeURIComponent(q.trim())}`)}}
            className="hidden sm:flex items-center"
          >
            <input
              value={q}
              onChange={(e)=>setQ(e.target.value)}
              placeholder="Ara..."
              className="h-10 w-44 md:w-56 rounded-md bg-muted border border-border px-3 text-sm mr-2"
            />
          </form>
          <button onClick={toggle} className="btn btn-primary h-10 relative px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 mr-2"
              aria-hidden="true"
            >
              <path d="M3 3a1 1 0 000 2h1.22l.401 1.607 1.518 6.07A2.5 2.5 0 008.57 15H17a1 1 0 100-2H8.57l-.248-.99L19 11a2 2 0 001.937-1.5l1-4A1 1 0 0021 4H6.28l-.223-.894A2 2 0 004.12 2H3zM8 18a2 2 0 110 4 2 2 0 010-4zm9-2a1 1 0 00-1 1 1 1 0 102 0 1 1 0 00-1-1zm-1 2a2 2 0 114 0 2 2 0 01-4 0z" />
            </svg>
            <span className="hidden sm:inline">Sepet</span>
            <span className="badge absolute -top-2 -right-2">{count}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
