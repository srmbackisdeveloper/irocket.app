import { Button, Modal, ModalContent, ModalHeader, Spinner } from '@nextui-org/react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';

export const LoginPage = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState('');
   const { user, login } = useAuth();
   const navigate = useNavigate();
   document.title = 'Вход в систему | iRocket';
   console.log(user?.id);

   const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      setIsLoading(true);
      setError('');
      const success = await login(username, password);
      setIsLoading(false);
      if (success) {
         // Redirect to a different page or perform additional actions upon successful login
         console.log('Login successful');
         navigate('/dashboard');
      } else {
         // Show an error message or perform actions upon failed login
         console.error('Login failed');
         setError('Неправильный имя пользователя или пароль');
      }
   };

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
               isDisabled={!username || !password}
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
         <Modal
            isOpen={isLoading}
            onClose={() => setIsLoading(false)}
         >
            <ModalContent>
               <div className="flex justify-center items-center gap-3 p-5">
                  <h3>Загрузка...</h3>
                  <Spinner />
               </div>
            </ModalContent>
         </Modal>
      </div>
   );
};
