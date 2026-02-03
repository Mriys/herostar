import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import productsData from '../data/products'
import { useCart } from '../context/CartContext'
import { fetchProducts } from '../lib/api'

export default function ProductDetail(){
  const { id } = useParams()
  const { add } = useCart()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function run(){
      setLoading(true)
      try {
        // Try Strapi first
        let item = null
        try {
          const list = await fetchProducts()
          item = list.find(p => String(p.id) === String(id))
        } catch(e) {
          // ignore, fallback to static below
        }
        if (!item) {
          item = productsData.find(p => String(p.id) === String(id)) || null
        }
        if (!item) {
          if (!cancelled) setProduct(null)
        } else {
          if (!cancelled) setProduct(item)
          // Related by category
          const pool = (item.category ? (productsData.filter(p => p.category === item.category && String(p.id) !== String(id))) : productsData).slice(0, 8)
          if (!cancelled) setRelated(pool)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => { cancelled = true }
  }, [id])

  if (loading) return <section className="container-max py-12"><p className="text-gray-400">Yükleniyor...</p></section>
  if (!product) return <section className="container-max py-12"><p className="text-gray-400">Ürün bulunamadı.</p></section>

  return (
    <section className="container-max py-12">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="card overflow-hidden md:max-w-lg">
          <div className="aspect-[4/3]">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>
        <div>
          <nav className="text-sm text-gray-400 mb-2">
            <Link to="/">Ana Sayfa</Link> <span className="mx-1">›</span> <Link to="/products">Ürünler</Link> <span className="mx-1">›</span> <span className="text-foreground">
              {product.category ? categoryLabel(product.category) : '-'}
            </span>
          </nav>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="mt-2 text-gray-400 text-sm">Kategori: {product.category || '-'}</div>
          <div className="mt-4 text-brand text-2xl font-extrabold">₺{Number(product.price || 0).toLocaleString('tr-TR')}</div>
          <p className="mt-4 text-gray-300 leading-relaxed">{product.description}</p>
          <div className="mt-6 flex gap-3">
            <button className="btn btn-primary" onClick={()=>add(product)}>Sepete Ekle</button>
            <Link to="/products" className="btn btn-outline">Alışverişe Dön</Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Benzer Ürünler</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {related.map(r => (
              <Link key={r.id} to={`/products/${r.id}`} className="card overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <div className="font-semibold line-clamp-1">{r.name}</div>
                  <div className="text-brand font-bold text-sm mt-1">₺{Number(r.price||0).toLocaleString('tr-TR')}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

function categoryLabel(key){
  if (key === 'cardio') return 'Kardiyo'
  if (key === 'resistance') return 'Direnç Ekipmanları'
  if (key === 'training') return 'Antrenman Ekipmanları'
  return key
}
