import React, {
   createContext,
   useState,
   useEffect,
   ReactNode,
   useContext,
} from 'react'
import axios from 'axios'
import { User } from '../core/user.type'
// import { error } from 'console'

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
   const [user, setUser] = useState<User | null>(null)
   const [token, setToken] = useState<string | null>(() =>
      localStorage.getItem('token'),
   )

   useEffect(() => {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
         setToken(storedToken)
         // Optionally, fetch the user data using the token here
      }
   }, [])

   const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(
        BASE_URL + '/login/',
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json', // Ensures the server treats the request body as JSON
            // Add any other headers your server expects here
          },
        }
      );
      const { token, user } = response.data;
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
      return true;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  };  

  //  const register = async (
  //     email: string,
  //     phoneNumber: string,
  //     password: string,
  //  ): Promise<boolean> => {
  //     try {
  //        const response = await axios.post(BASE_URL + '/registration')

  //        return true
  //     } catch (error) {
  //        console.error(error)
  //        return false
  //     }
  //  }

   const logout = () => {
      setToken(null)
      setUser(null)
      localStorage.removeItem('token')
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
