import { Button } from '@nextui-org/react'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router'

export const LoginPage = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const { login } = useAuth()
   const navigate = useNavigate()
   document.title = 'Вход в систему | iRocket'

   const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault()
      const success = await login(username, password)
      if (success) {
         // Redirect to a different page or perform additional actions upon successful login
         console.log('Login successful')
         navigate('/dashboard')
      } else {
         // Show an error message or perform actions upon failed login
         console.error('Login failed')
      }
   }

   return (
      <div className="grid justify-center items-center gap-5 mt-[5em]">
         <div>
            <h2 className="text-3xl font-semibold text-center">
               Добро пожаловать
            </h2>
            <p className="font-semibold text-center text-sm text-gray-500 mt-1">
               Укажите данные для входа
            </p>
         </div>
         <div>
            <p className="font-semibold text-start text-sm text-gray-500">
               Имя пользователя
            </p>
            <input
               className="grid border rounded-xl p-2 min-w-72 mt-1"
               type="name"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               placeholder="Имя пользователя"
            />
         </div>
         <div>
            <p className="font-semibold text-start text-sm text-gray-500">
               Пароль
            </p>
            <input
               className="grid border rounded-xl p-2 min-w-72 mt-1"
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               placeholder="пароль"
            />
         </div>
         <div>
            <Button
               color="danger"
               variant="shadow"
               className="min-w-72 font-semibold"
               onClick={handleSubmit}
            >
               Войти
            </Button>
         </div>
         <div className="flex gap-4 justify-center">
            <p className="font-semibold text-sm text-gray-500">
               У Вас нет аккаунта?
            </p>
            <a className="font-semibold text-sm text-blue-700" href="/register">
               Создать аккаунт
            </a>
         </div>
      </div>
   )
}
