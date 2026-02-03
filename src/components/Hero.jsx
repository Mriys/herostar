import { Link } from 'react-router-dom'

export default function Hero(){
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand/10 to-transparent pointer-events-none" />
      <div className="container-max py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="badge mb-4">Yeni Sezon</span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Gücünü Yükselt, <span className="text-brand">Hero</span> Ol</h1>
          <p className="mt-4 text-gray-300">HeroStar ile antrenman ekipmanlarında kalite ve tasarımı bir araya getir. Dayanıklı, ergonomik ve etkileyici.</p>
          <div className="mt-6 flex gap-3">
            <Link to="/products" className="btn btn-primary">Alışverişe Başla</Link>
            <a href="#featured" className="btn btn-outline">Öne Çıkanlar</a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-tr from-brand to-yellow-300 p-1">
            <div className="h-full w-full rounded-2xl bg-background grid place-items-center">
              <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop" alt="fitness" className="rounded-xl object-cover max-h-96" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
