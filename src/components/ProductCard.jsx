import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }){
  const { add } = useCart()
  return (
    <div className="card overflow-hidden">
      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/products/${product.id}`} className="font-semibold hover:text-brand">{product.name}</Link>
        <p className="text-sm text-gray-300 mt-1 line-clamp-2">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-brand font-bold">₺{product.price.toLocaleString('tr-TR')}</div>
          <button className="btn btn-primary" onClick={()=>add(product)}>Sepete Ekle</button>
        </div>
      </div>
    </div>
  )
}
