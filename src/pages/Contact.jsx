export default function Contact(){
  return (
    <section className="container-max py-12">
      <h1 className="text-3xl font-bold mb-4">İletişim</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <form className="space-y-3">
          <input className="w-full rounded-md bg-muted border border-border px-3 py-2" placeholder="Ad Soyad" />
          <input className="w-full rounded-md bg-muted border border-border px-3 py-2" placeholder="E-posta" />
          <textarea className="w-full rounded-md bg-muted border border-border px-3 py-2" rows="4" placeholder="Mesajınız" />
          <button className="btn btn-primary">Gönder</button>
        </form>

        <aside className="card p-5">
          <h2 className="text-xl font-semibold">Şirket İletişim Bilgileri</h2>
          <div className="mt-4 space-y-3 text-sm text-gray-300">
            <div>
              <div className="text-gray-400">Adres</div>
              <div>HeroStar Spor A.Ş.<br/>Yıldız Cad. No:10, Şişli / İstanbul</div>
            </div>
            <div>
              <div className="text-gray-400">Telefon</div>
              <a href="tel:+908501234567" className="hover:text-brand">+90 850 123 45 67</a>
            </div>
            <div>
              <div className="text-gray-400">E-posta</div>
              <a href="mailto:destek@herostar.com" className="hover:text-brand">destek@herostar.com</a>
            </div>
            <div>
              <div className="text-gray-400">Çalışma Saatleri</div>
              <div>Pazartesi - Cuma: 09:00 - 18:00<br/>Cumartesi: 10:00 - 16:00</div>
            </div>
          </div>
        </aside>
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Konum</h2>
        <div className="card overflow-hidden">
          <div className="aspect-[16/9] w-full">
            <iframe
              title="Fit Station Kayaşehir Konum"
              src="https://www.google.com/maps?q=41.1185231,28.7672796&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
