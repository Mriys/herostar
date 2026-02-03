import { useAuth } from '../context/AuthContext'

export default function Account(){
  const { user, logout } = useAuth()
  return (
    <section className="container-max py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Hesabım</h1>
        {user && <button className="btn btn-outline" onClick={logout}>Çıkış</button>}
      </div>

      {!user ? (
        <div className="card p-6">
          <p className="text-gray-300">Giriş yapmadınız. Lütfen giriş yapmak için <a href="/login" className="text-brand underline">buraya</a> tıklayın.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card p-5">
            <h2 className="font-semibold mb-2">Profil</h2>
            <div className="text-sm text-gray-300">
              <div><span className="text-gray-400">Ad: </span>{user.name}</div>
              <div><span className="text-gray-400">E-posta: </span>{user.email}</div>
            </div>
          </div>

          <div className="card p-5 md:col-span-2">
            <h2 className="font-semibold mb-2">Siparişler</h2>
            <p className="text-sm text-gray-400">Şu anda sipariş bulunmuyor.</p>
          </div>

          <div className="card p-5">
            <h2 className="font-semibold mb-2">Adresler</h2>
            <p className="text-sm text-gray-400">Henüz eklenmiş adres yok.</p>
          </div>

          <div className="card p-5 md:col-span-2">
            <h2 className="font-semibold mb-2">Favoriler</h2>
            <p className="text-sm text-gray-400">Favori ürün bulunmuyor.</p>
          </div>
        </div>
      )}
    </section>
  )
}
