export default function Admin(){
  return (
    <section className="container-max py-12">
      <h1 className="text-3xl font-bold mb-4">Yönetim Paneli</h1>
      <div className="card p-6">
        <p className="text-gray-300">Bu alan bir placeholder'dır. Ürün ekleme/düzenleme, siparişler ve kullanıcılar gibi modüller buraya eklenecek.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <a href="#" className="card p-4 hover:bg-muted">
            <div className="font-semibold">Ürünler</div>
            <div className="text-sm text-gray-400">Yeni ürün ekle, stok/ fiyat güncelle</div>
          </a>
          <a href="#" className="card p-4 hover:bg-muted">
            <div className="font-semibold">Siparişler</div>
            <div className="text-sm text-gray-400">Siparişleri görüntüle ve durum yönet</div>
          </a>
          <a href="#" className="card p-4 hover:bg-muted">
            <div className="font-semibold">Kullanıcılar</div>
            <div className="text-sm text-gray-400">Roller ve yetkiler</div>
          </a>
        </div>
        <p className="text-xs text-gray-500 mt-4">Not: Gerçek admin için kimlik doğrulama ve backend gerekir.</p>
      </div>
    </section>
  )
}
