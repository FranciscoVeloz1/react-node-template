import { useState } from 'react'
import { IUserView } from '@interfaces/IUser'

type Auth = {
  status: boolean
  token?: string
  user?: IUserView
  message?: string
}

const useAuth = () => {
  const getUser = () => {
    const session = window.localStorage.getItem('@template')
    if (session === undefined || session === null) return null

    const { user }: Auth = JSON.parse(session)
    return user
  }

  const [user, setUser] = useState(getUser())

  const login = async (payload: Auth) => {
    try {
      const { status, ...data } = payload
      window.localStorage.setItem('@template', JSON.stringify(data))
    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    window.localStorage.clear()
    setUser(null)
  }

  const updateSession = async (user: IUserView) => {
    const session = window.localStorage.getItem('@template')
    const { token }: Auth = JSON.parse(session!)
    const newSession = { token, user }

    window.localStorage.clear()
    setUser(null)

    window.localStorage.setItem('@template', JSON.stringify(newSession))
    setUser(user)
  }

  return {
    user,
    login,
    logout,
    updateSession
  }
}

export default useAuth
