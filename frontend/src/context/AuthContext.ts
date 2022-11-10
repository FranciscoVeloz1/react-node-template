import { IUserView } from '@interfaces/IUser'
import React from 'react'

const AuthContext = React.createContext<{
  user?: IUserView | null
  login: Function
  logout: Function
  updateSession: Function
}>({
  user: null,
  login: () => {},
  logout: () => {},
  updateSession: () => {}
})

export default AuthContext
