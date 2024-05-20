import React, {
   createContext,
   useState,
   useEffect,
   ReactNode,
   useContext,
} from 'react'
import axios from 'axios'
import { User } from '../core/user.type'

interface AuthContextType {
   user: User | null
   token: string | null
   login: (email: string, password: string) => Promise<boolean>
   logout: () => void
}

interface AuthProviderProps {
   children: ReactNode
}

const defaultAuthContext: AuthContextType = {
   user: null,
   token: null,
   login: async () => false,
   logout: () => {},
}

const AuthContext = createContext<AuthContextType>(defaultAuthContext)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
   const BASE_URL = import.meta.env.VITE_API_PATH
   const [user, setUser] = useState<User | null>(() => {
      const storedUser = localStorage.getItem('user')
      return storedUser ? JSON.parse(storedUser) : null
   })
   const [token, setToken] = useState<string | null>(() =>
      localStorage.getItem('token'),
   )

   // useEffect(() => {
   //    const storedToken = localStorage.getItem('token')
   //    if (storedToken) {
   //       setToken(storedToken)
   //       refresh(storedToken)
   //    }
   // }, [])

   const mapUserResponse = (user: any): User => {
      return {
         id: user.id,
         username: user.username,
         fullName: user.full_name,
         phoneNumber: user.phone_number,
         email: user.email,
         companyName: user.company_name,
         availableFunds: user.available_funds,
         monthlyFee: user.monthly_fee,
         debitAmount: user.debit_amount,
      }
   }

   const login = async (username: string, password: string): Promise<boolean> => {
      try {
         const response = await axios.post(
            BASE_URL + '/login/',
            { username, password }
         )
         const { token, user } = response.data
         const mappedUser = mapUserResponse(user)
         setToken(token)
         setUser(mappedUser)
         localStorage.setItem('token', token)
         localStorage.setItem('user', JSON.stringify(mappedUser))
         return true
      } catch (error) {
         console.error('Login failed', error)
         return false
      }
   }

   const refresh = async (storedToken: string): Promise<boolean> => {
      try {
         const response = await axios.post(
            'http://164.90.181.189/refresh_token/',
            { token: storedToken },
         )
         const { token, user } = response.data
         const mappedUser = mapUserResponse(user)
         setToken(token)
         setUser(mappedUser)
         localStorage.setItem('token', token)
         localStorage.setItem('user', JSON.stringify(mappedUser))
         return true
      } catch (error) {
         console.error('Refresh failed', error)
         return false
      }
   }

   const logout = () => {
      setToken(null)
      setUser(null)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
   }

   return (
      <AuthContext.Provider value={{ user, token, login, logout }}>
         {children}
      </AuthContext.Provider>
   )
}

export const useAuth = (): AuthContextType => {
   const context = useContext(AuthContext)
   if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider')
   }
   return context
}
