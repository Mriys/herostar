export default function Footer(){
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-max py-12 grid gap-10 md:grid-cols-4">
        <div>
          <h3 className="text-lg font-semibold">HeroStar</h3>
          <p className="text-sm text-gray-300 mt-2">Sınırlarını zorla. Performansını parlat.</p>
          <div className="mt-4 flex items-center gap-3 text-gray-300">
            <a aria-label="Instagram" href="#" className="hover:text-brand" title="Instagram">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7 2C4.239 2 2 4.239 2 7v10c0 2.761 2.239 5 5 5h10c2.761 0 5-2.239 5-5V7c0-2.761-2.239-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm11 1a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/></svg>
            </a>
            <a aria-label="Facebook" href="#" className="hover:text-brand" title="Facebook">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.01 3.676 9.163 8.5 9.878v-6.987H8.357V12H10.5V9.797C10.5 7.69 11.79 6.5 13.708 6.5c.92 0 1.88.164 1.88.164v2.07h-1.06c-1.045 0-1.37.65-1.37 1.316V12h2.333l-.373 2.89h-1.96v6.988C18.324 21.163 22 17.01 22 12z"/></svg>
            </a>
            <a aria-label="YouTube" href="#" className="hover:text-brand" title="YouTube">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.002 3.002 0 00-2.115-2.125C19.59 3.5 12 3.5 12 3.5s-7.59 0-9.383.561A3.002 3.002 0 00.502 6.186 31.38 31.38 0 000 12a31.38 31.38 0 00.502 5.814 3.002 3.002 0 002.115 2.125C4.41 20.5 12 20.5 12 20.5s7.59 0 9.383-.561a3.002 3.002 0 002.115-2.125A31.38 31.38 0 0024 12a31.38 31.38 0 00-.502-5.814zM9.75 15.5v-7l6 3.5-6 3.5z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Hızlı Bağlantılar</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/products" className="hover:text-brand">Ürünler</a></li>
            <li><a href="/about" className="hover:text-brand">Hakkımızda</a></li>
            <li><a href="/contact" className="hover:text-brand">İletişim</a></li>
            <li><a href="#featured" className="hover:text-brand">Öne Çıkanlar</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Kategoriler</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/products?category=cardio" className="hover:text-brand">Kardiyo</a></li>
            <li><a href="/products?category=resistance" className="hover:text-brand">Direnç Ekipmanları</a></li>
            <li><a href="/products?category=training" className="hover:text-brand">Antrenman Ekipmanları</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Bülten</h4>
          <form className="flex gap-2">
            <input className="flex-1 rounded-md bg-muted border border-border px-3 py-2" placeholder="E-posta adresiniz" />
            <button className="btn btn-primary">Kaydol</button>
          </form>
          <div className="mt-4 text-sm text-gray-300 space-y-2">
            <div><span className="text-gray-400">Telefon: </span><a href="tel:+908501234567" className="hover:text-brand">+90 850 123 45 67</a></div>
            <div><span className="text-gray-400">E-posta: </span><a href="mailto:destek@herostar.com" className="hover:text-brand">destek@herostar.com</a></div>
            <div><span className="text-gray-400">Adres: </span>Yıldız Cad. No:10, Şişli / İstanbul</div>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-4">
        <div className="container-max flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <div>© {new Date().getFullYear()} HeroStar. Tüm hakları saklıdır.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-brand">KVKK</a>
            <a href="#" className="hover:text-brand">Gizlilik</a>
            <a href="#" className="hover:text-brand">Kullanım Şartları</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
