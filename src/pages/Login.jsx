import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login(){
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const name = email ? email.split('@')[0] : 'Demo Kullanıcı'
    login({ email, name })
  }

  return (
    <section className="container-max py-12">
      <h1 className="text-3xl font-bold mb-6">Giriş Yap</h1>
      <form className="max-w-sm space-y-3" onSubmit={onSubmit}>
        <input
          className="w-full rounded-md bg-muted border border-border px-3 py-2"
          placeholder="E-posta"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
          type="email"
        />
        <input
          className="w-full rounded-md bg-muted border border-border px-3 py-2"
          placeholder="Şifre"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary w-full" type="submit">Giriş</button>
      </form>
      
    </section>
  )
}
