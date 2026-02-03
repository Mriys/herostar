import { createContext, useContext, useMemo, useState } from 'react'

const CartCtx = createContext(null)

export function CartProvider({ children }){
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([])

  const toggle = () => setOpen(v => !v)
  const add = (product) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) return prev.map(i => i.id===product.id? {...i, qty: i.qty+1} : i)
      return [...prev, { ...product, qty: 1 }]
    })
    setOpen(true)
  }
  const remove = (id) => {
    setItems(prev => {
      const it = prev.find(i => i.id === id)
      if (!it) return prev
      if (it.qty <= 1) return prev.filter(i => i.id !== id)
      return prev.map(i => i.id===id? {...i, qty: i.qty-1} : i)
    })
  }

  const value = useMemo(()=>({ open, toggle, items, add, remove }), [open, items])
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export function useCart(){
  const ctx = useContext(CartCtx)
  if(!ctx) throw new Error('CartContext must be used within CartProvider')
  return ctx
}
