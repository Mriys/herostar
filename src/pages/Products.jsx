import { useLocation, useNavigate } from 'react-router-dom'
import products from '../data/products'
import ProductCard from '../components/ProductCard'
import { useEffect, useState } from 'react'
import { fetchProducts } from '../lib/api'

export default function Products({ limit, hideTitle }){
  const { search } = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(search)
  const q = (params.get('search') || '').toLowerCase().trim()
  const category = params.get('category') || ''
  const subcategory = params.get('subcategory') || ''
  const minParam = Number(params.get('min') || '')
  const maxParam = Number(params.get('max') || '')
  const sort = params.get('sort') || '' // price_asc|price_desc|name_asc|name_desc

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
        if (!Number.isNaN(minParam)) filtered = filtered.filter(p => Number(p.price) >= minParam)
        if (!Number.isNaN(maxParam) && maxParam > 0) filtered = filtered.filter(p => Number(p.price) <= maxParam)
        if (sort) {
          filtered = [...filtered].sort(sorter(sort))
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
        if (!Number.isNaN(minParam)) local = local.filter(p => Number(p.price) >= minParam)
        if (!Number.isNaN(maxParam) && maxParam > 0) local = local.filter(p => Number(p.price) <= maxParam)
        if (sort) local = [...local].sort(sorter(sort))
        if (limit) local = local.slice(0, limit)
        if (!cancelled) setList(local)
        if (!cancelled) setError('Yerel veriler gösteriliyor (API bağlantısı yok).')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => { cancelled = true }
  }, [q, category, subcategory, minParam, maxParam, sort, limit])

  function sorter(key){
    if (key === 'price_asc') return (a,b)=>Number(a.price)-Number(b.price)
    if (key === 'price_desc') return (a,b)=>Number(b.price)-Number(a.price)
    if (key === 'name_desc') return (a,b)=>a.name.localeCompare(b.name,'tr-TR')*-1
    return (a,b)=>a.name.localeCompare(b.name,'tr-TR')
  }

  function updateParams(next){
    const p = new URLSearchParams(search)
    Object.entries(next).forEach(([k,v])=>{
      if (v === '' || v === null || typeof v === 'undefined') p.delete(k)
      else p.set(k, String(v))
    })
    navigate(`/products?${p.toString()}`)
  }

  return (
    <section className="container-max py-12">
      {!hideTitle && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
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
          <div className="card p-3 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              {['', 'cardio','resistance','training'].map(c => (
                <button
                  key={c || 'all'}
                  className={`px-3 py-1 rounded-full border ${category===c? 'bg-brand text-black border-brand':'border-border hover:bg-muted'}`}
                  onClick={()=>updateParams({ category: c||null })}
                >{c? c.charAt(0).toUpperCase()+c.slice(1): 'Tümü'}</button>
              ))}
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <label className="text-sm text-gray-400">Min</label>
              <input type="number" className="w-24 bg-muted border border-border rounded px-2 py-1" value={Number.isNaN(minParam)?'':minParam}
                     onChange={(e)=>updateParams({ min: e.target.value })} />
              <label className="text-sm text-gray-400">Max</label>
              <input type="number" className="w-24 bg-muted border border-border rounded px-2 py-1" value={Number.isNaN(maxParam)?'':maxParam}
                     onChange={(e)=>updateParams({ max: e.target.value })} />
              <select
                className="bg-muted border border-border rounded px-2 py-1"
                value={sort}
                onChange={(e)=>updateParams({ sort: e.target.value })}
              >
                <option value="">Sırala</option>
                <option value="price_asc">Fiyat Artan</option>
                <option value="price_desc">Fiyat Azalan</option>
                <option value="name_asc">Ada Göre (A-Z)</option>
                <option value="name_desc">Ada Göre (Z-A)</option>
              </select>
            </div>
          </div>
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
