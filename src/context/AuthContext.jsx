import { createContext, useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthCtx = createContext(null)

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const login = (payload) => {
    // payload: { email, name }
    setUser({
      name: payload.name || 'Demo Kullanıcı',
      email: payload.email || 'demo@herostar.com',
    })
    navigate('/account')
  }
  const logout = () => {
    setUser(null)
    navigate('/')
  }

  const value = useMemo(()=>({ user, login, logout }), [user])
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export function useAuth(){
  const ctx = useContext(AuthCtx)
  if(!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
