import { useCart } from '../context/CartContext'

export default function ProductCard({ product }){
  const { add } = useCart()
  return (
    <div className="card overflow-hidden">
      <div className="aspect-square overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-300 mt-1 line-clamp-2">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-brand font-bold">₺{product.price.toLocaleString('tr-TR')}</div>
          <button className="btn btn-primary" onClick={()=>add(product)}>Sepete Ekle</button>
        </div>
      </div>
    </div>
  )
}
