import { Button } from '@nextui-org/react'
import { useState } from 'react'

export const LoginPage = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   document.title = "Вход в систему | iRocket";

   return (
      <div className="grid justify-center items-center gap-5 p-40">
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
               Эл. почта
            </p>
            <input
               className="grid border rounded-xl p-2 min-w-72 mt-1"
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder="email"
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
               placeholder="password"
            />
         </div>
         <div>
            <Button
               color="danger"
               variant="shadow"
               className="min-w-72 font-semibold"
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
