import HeroCarousel from '../components/HeroCarousel'
import Products from './Products'

export default function Home(){
  return (
    <>
      <HeroCarousel
        slides={[
          {
            badge: 'Yeni Sezon',
            titleBefore: 'Gücünü',
            titleHighlight: 'Yükselt',
            titleAfter: 'Hero Ol',
            offer: 'Seçili ürünlerde %15 indirim',
            text: 'Dayanıklı, ergonomik ve etkileyici ekipmanlarla hedefini yükselt.',
            image: 'https://www.macfit.com/en/wp-content/uploads/2025/02/DSC0492-scaled.jpg',
            cta: { primary: { href: '/products', label: 'Alışverişe Başla' }, secondary: { href: '#featured', label: 'Öne Çıkanlar' } }
          },
          {
            badge: 'Kardiyo',
            titleBefore: 'Ritmini',
            titleHighlight: 'Artır',
            titleAfter: 'Sınırları Aş',
            offer: 'Koşu Bantlarında %20 indirim',
            text: 'Koşu bantları ve egzersiz bisikletlerinde fırsatlar.',
            // Video arka planlı örnek
            image: 'https://www.mapfre.com.tr/blog/media/2022/01/fitness-nedir-1.jpg',
            cta: { primary: { href: '/products?category=cardio', label: 'Kardiyo Ürünleri' } }
          },
          {
            badge: 'Direnç',
            titleBefore: 'Her Tekrarı',
            titleHighlight: 'Hisset',
            titleAfter: 'Gücünü İnşa Et',
            offer: 'Dambıl & Kettlebell setlerinde %10',
            text: 'Dambıl, kettlebell ve power rack koleksiyonları.',
            image: 'https://blog.korayspor.com/wp-content/uploads/2023/06/Kardiyo-ve-Agirlik-Iliskisi-.png',
            cta: { primary: { href: '/products?category=resistance', label: 'Direnç Ekipmanları' } }
          }
        ]}
        interval={5000}
      />
      <section id="featured" className="container-max py-12">
        <h2 className="text-2xl font-bold mb-6">Öne Çıkan Ürünler</h2>
        <Products limit={8} hideTitle />
      </section>
    </>
  )
}
