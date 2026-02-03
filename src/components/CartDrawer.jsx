import { useCart } from '../context/CartContext'

export default function CartDrawer(){
  const { open, toggle, items, remove, add } = useCart()
  const total = items.reduce((a,i)=>a + i.price * i.qty, 0)
  return (
    <aside className={`fixed top-0 right-0 h-full w-[90%] sm:w-[420px] bg-background border-l border-border transition-transform duration-300 z-50 ${open? 'translate-x-0':'translate-x-full'}`}>
      <div className="h-16 border-b border-border flex items-center justify-between px-4">
        <h3 className="font-semibold">Sepet</h3>
        <button className="btn btn-outline h-9" onClick={toggle}>Kapat</button>
      </div>
      <div className="p-4 h-[calc(100%-7.5rem)] overflow-auto space-y-3">
        {items.length===0 && <p className="text-sm text-gray-400">Sepetiniz boş.</p>}
        {items.map(item => (
          <div key={item.id} className="flex gap-3 border border-border rounded-lg p-3">
            <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              <div className="text-xs text-gray-400">₺{item.price.toLocaleString('tr-TR')}</div>
              <div className="mt-2 flex items-center gap-2">
                <button className="btn btn-outline h-8 px-2" onClick={()=>remove(item.id)}>-</button>
                <span className="w-8 text-center">{item.qty}</span>
                <button className="btn btn-outline h-8 px-2" onClick={()=>add(item)}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="h-14 border-t border-border flex items-center justify-between px-4">
        <div className="font-semibold">Toplam: <span className="text-brand">₺{total.toLocaleString('tr-TR')}</span></div>
        <button className="btn btn-primary">Ödeme</button>
      </div>
    </aside>
  )
}
