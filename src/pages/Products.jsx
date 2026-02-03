import { useLocation } from 'react-router-dom'
import products from '../data/products'
import ProductCard from '../components/ProductCard'
import { useEffect, useState } from 'react'
import { fetchProducts } from '../lib/api'

export default function Products({ limit, hideTitle }){
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const q = (params.get('search') || '').toLowerCase().trim()
  const category = params.get('category') || ''
  const subcategory = params.get('subcategory') || ''

  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    async function run(){
      setLoading(true)
      setError('')
      try {
        const fromApi = await fetchProducts({ category, search: q })
        let filtered = fromApi
        if (subcategory) {
          const s = subcategory.toLowerCase()
          filtered = filtered.filter(p => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s))
        }
        if (limit) filtered = filtered.slice(0, limit)
        if (!cancelled) setList(filtered)
      } catch (e) {
        // fallback to local static data
        let local = products
        if (q) local = local.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
        if (category) local = local.filter(p => p.category === category)
        if (subcategory) {
          const s = subcategory.toLowerCase()
          local = local.filter(p => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s))
        }
        if (limit) local = local.slice(0, limit)
        if (!cancelled) setList(local)
        if (!cancelled) setError('Yerel veriler gösteriliyor (API bağlantısı yok).')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => { cancelled = true }
  }, [q, category, subcategory, limit])

  return (
    <section className="container-max py-12">
      {!hideTitle && (
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Ürünler</h2>
          {(q || category || subcategory || error) && (
            <div className="text-sm text-gray-400">
              {q && <span className="mr-3">Arama: "{q}"</span>}
              {category && <span className="mr-3">Kategori: {category}</span>}
              {subcategory && <span>Alt: {subcategory}</span>}
              {error && <span className="ml-3 text-yellow-400">{error}</span>}
            </div>
          )}
        </div>
      )}
      {loading && <p className="text-gray-400">Yükleniyor...</p>}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {list.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
      {list.length === 0 && !loading && (
        <p className="mt-8 text-center text-gray-400">Eşleşen ürün bulunamadı.</p>
      )}
    </section>
  )
}
