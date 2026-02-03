const API_URL = import.meta.env.VITE_API_URL || ''

export async function fetchProducts({ category, search } = {}){
  if (!API_URL) throw new Error('API_URL not configured')
  const params = new URLSearchParams()
  // populate media
  params.set('populate', 'image')
  // filters
  if (category) params.set('filters[category][$eq]', category)
  if (search) params.set('filters[$or][0][name][$containsi]', search)
  if (search) params.set('filters[$or][1][description][$containsi]', search)
  const res = await fetch(`${API_URL}/api/products?${params.toString()}`)
  if (!res.ok) throw new Error('Failed to fetch products')
  const json = await res.json()
  // Normalize to current frontend shape
  return (json.data || []).map(item => {
    const attrs = item.attributes || {}
    let imageUrl = ''
    const img = attrs.image?.data?.attributes
    if (img?.url) imageUrl = img.url.startsWith('http') ? img.url : `${API_URL}${img.url}`
    return {
      id: item.id?.toString() || attrs.slug || attrs.name,
      name: attrs.name,
      price: Number(attrs.price || 0),
      description: attrs.description || '',
      category: attrs.category || '',
      image: imageUrl,
    }
  })
}
