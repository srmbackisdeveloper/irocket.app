import React, { createContext, useState, ReactNode, useContext } from 'react';
import axios from 'axios';
import { User } from '../core/user.type';

interface AuthContextType {
  user: User | null;
  token: string | null;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>; // Add setError to the context type
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    phoneNumber: string,
    companyName: string,
    firstName: string,
    lastName: string,
    password: string,
    username: string
  ) => Promise<boolean>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  token: null,
  error: null,
  setError: () => {}, // Initialize setError as an empty function
  login: async () => false,
  register: async () => false,
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const BASE_URL = import.meta.env.VITE_API_PATH;
  console.log(BASE_URL);
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('token')
  );
  const [error, setError] = useState<string | null>(null);

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
    };
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(BASE_URL + '/login/', { username, password });
      const { token, user } = response.data;
      const mappedUser = mapUserResponse(user);
      setToken(token);
      setUser(mappedUser);
      setError(null);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(mappedUser));
      return true;
    } catch (error) {
      console.error('Login failed', error);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.error === 'Invalid credentials') {
          setError('Неправильные учетные данные');
        } else {
          setError('Ошибка при входе');
        }
      } else {
        setError('Ошибка при входе');
      }
      return false;
    }
  };

  const register = async (
    email: string,
    phoneNumber: string,
    companyName: string,
    firstName: string,
    lastName: string,
    password: string,
    username: string
  ): Promise<boolean> => {
    try {
      await axios.post(BASE_URL + '/registration/', {
        email: email,
        phone_number: phoneNumber,
        company_name: companyName,
        first_name: firstName,
        last_name: lastName,
        password: password,
        username: username,
      });
      setError(null);
      return true;
    } catch (error) {
      console.error('Register failed', error);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.error === 'Invalid credentials') {
          setError('Неправильные учетные данные');
        } else {
          setError('Ошибка при входе');
        }
      } else {
        setError('Ошибка при входе');
      }
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setError(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, error, setError, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
