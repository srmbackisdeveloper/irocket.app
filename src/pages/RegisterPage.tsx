import { Button, Modal, ModalContent, Spinner } from '@nextui-org/react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import { EyeSlashFilledIcon } from './icons/EyeSlashFilledIcon';
import { EyeFilledIcon } from './icons/EyeFilledIcon';

export const RegisterPage = () => {
   const [username, setUsername] = useState('');
   // const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [number, setNumber] = useState('+7');
   const [isChecked, setIsChecked] = useState(false);
   // const [firstName, setFirstName] = useState('');
   // const [lastName, setLastName] = useState('');
   // const [company, setCompany] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState('');
   const [isVisible, setIsVisible] = useState(false);
   const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
   // const {isOpen, onOpen, onOpenChange} = useDisclosure();

   const navigate = useNavigate();

   const toggleVisibility = () => setIsVisible(!isVisible);
   const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

   const { register } = useAuth();

   const isButtonDisabled = !number || password !== confirmPassword || !isChecked;

   const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
   };

   const handleRegister = async (event: React.FormEvent) => {
      event.preventDefault();
      setIsLoading(true);
      setError('');
      const success = await register(handlePhoneNumber(number), password, username);
      setIsLoading(false);
      if (success) {
         // Redirect to a different page or perform additional actions upon successful login
         console.log('Register successful');
         navigate('/login');
      } else {
         // Show an error message or perform actions upon failed login
         console.error('Register failed');
         setError('Ошибка регистрации');
      }
   };

   const formatPhoneNumber = (value: string) => {
      // Remove all non-digit characters
      const digits = value.replace(/\D/g, '');

      const part2 = digits.slice(1, 4); // First 3 digits
      const part3 = digits.slice(4, 7); // Next 3 digits
      const part4 = digits.slice(7, 9); // Next 2 digits
      const part5 = digits.slice(9, 11); // Last 2 digits

      // Combine the parts into the desired format
      let formattedNumber = '+7';
      if (part2) formattedNumber += `(${part2})`;
      if (part3) formattedNumber += `${part3}`;
      if (part4) formattedNumber += `-${part4}`;
      if (part5) formattedNumber += `-${part5}`;

      return formattedNumber;
   };

   const handlePhoneNumber = (number: string): string => {
      // Remove whitespaces, underscores, parentheses, and dashes
      let cleanedNumber = number.replace(/[\s_\(\)-]/g, '');

      // Replace +7 with 8 if present
      if (cleanedNumber.startsWith('+7')) {
         cleanedNumber = '8' + cleanedNumber.slice(2);
      }

      return cleanedNumber;
   };

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const formattedValue = formatPhoneNumber(inputValue);
      setNumber(formattedValue);
   };
   return (
      <div className="flex flex-col justify-center items-center gap-4 h-screen pb-20">
         <div className="grid justify-center items-center">
            <h2 className="text-3xl font-semibold text-center">Регистрация</h2>
            <p className="font-semibold text-center text-sm text-gray-500 mt-1">
               Пришло время быть первым!
            </p>
         </div>
         {/* <div className="grid lg:flex lg:justify-center lg:gap-5">
            <div className="grid justify-center items-center">
               <p className="font-semibold text-start text-sm text-gray-500">
                  Имя
               </p>
               <input
                  className="grid border rounded-xl p-2 min-w-72 mt-1 lg:min-w-[10rem]"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Имя"
               />
            </div>
            <div className="grid justify-center items-center">
               <p className="font-semibold text-start text-sm text-gray-500">
                  Фамилия
               </p>
               <input
                  className="grid border rounded-xl p-2 min-w-72 mt-1 lg:min-w-[10rem]"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Фамилия"
               />
            </div>
         </div> */}
         {/* <div className="grid justify-center items-center">
            <p className="font-semibold text-start text-sm text-gray-500">
               Компания
            </p>
            <input
               className="grid border rounded-xl p-2 min-w-72 mt-1 lg:min-w-[26rem]"
               type="text"
               value={company}
               onChange={(e) => setCompany(e.target.value)}
               placeholder="Компания"
            />
         </div> */}
         {/* <div className="grid justify-center items-center">
            <p className="font-semibold text-start text-sm text-gray-500">
               Эл. почта
            </p>
            <input
               className="grid border rounded-xl p-2 min-w-72 mt-1 lg:min-w-[26rem]"
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder="эл. почта"
            />
         </div> */}
         <div className="grid justify-center items-center">
            <p className="font-semibold text-start text-sm text-gray-500">
               Имя пользователя
            </p>
            <input
               className="grid border rounded-xl p-2 min-w-72 mt-1 lg:min-w-[26rem] custom-input"
               type="p"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               placeholder="Имя пользователя"
            />
         </div>
         <div className="grid justify-center items-center">
            <p className="font-semibold text-start text-sm text-gray-500">
               Номер телефона
            </p>
            <input
               className="grid border rounded-xl p-2 min-w-72 mt-1 lg:min-w-[26rem] custom-input"
               type="text"
               inputMode="numeric"
               value={number}
               onChange={handleInputChange}
               placeholder="+7(___)___-__-__"
            />
         </div>
         <div className="grid justify-center items-center">
            <p className="font-semibold text-start text-sm text-gray-500">
               Пароль
            </p>
            <div className="relative">
               <input
                  className="grid border rounded-xl p-2 min-w-72 mt-1 lg:min-w-[26rem] custom-input"
                  type={isVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="пароль"
               />
               <button
                  type="button"
                  onClick={toggleVisibility}
                  className="absolute right-3 top-3 focus:outline-none"
               >
                  {isVisible ? (
                     <EyeSlashFilledIcon className="text-2xl text-default-400" />
                  ) : (
                     <EyeFilledIcon className="text-2xl text-default-400" />
                  )}
               </button>
            </div>
         </div>
         <div className="grid justify-center items-center pb-2">
            <p className={`font-semibold text-start text-sm ${password.match(confirmPassword) ? 'text-gray-500' : 'text-danger'}`}>
               {password.match(confirmPassword) ? 'Подтверждение пароля' : 'Пароли не совпадают'}
            </p>
            <div className="relative">
               <input
                  className="grid border rounded-xl p-2 min-w-72 mt-1 lg:min-w-[26rem] custom-input"
                  type={isVisibleConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Подтверждение пароля"
               />
               <button
                  type="button"
                  onClick={toggleVisibilityConfirm}
                  className="absolute right-3 top-3 focus:outline-none"
               >
                  {isVisibleConfirm ? (
                     <EyeSlashFilledIcon className="text-2xl text-default-400" />
                  ) : (
                     <EyeFilledIcon className="text-2xl text-default-400" />
                  )}
               </button>
            </div>
         </div>
         <div className="grid justify-center items-center">
            <Button
               color="danger"
               variant="shadow"
               className="min-w-72 font-semibold"
               isDisabled={isButtonDisabled}
               onClick={handleRegister}
            >
               Регистрация
            </Button>
         </div>
         <div className="flex gap-4 justify-center">
            <p className="font-semibold text-sm text-gray-500">
               У Вас уже есть аккаунт?
            </p>
            <a className="font-semibold text-sm text-blue-700" href="/login">
               Войти
            </a>
         </div>
         <div className="flex flex-wrap justify-center items-center gap-2">
            <input
               type="checkbox"
               checked={isChecked}
               onChange={handleCheckboxChange}
            />
            <p className="font-semibold text-sm text-gray-500">Я согласен с</p>
            <a
               className="font-semibold text-sm text-blue-700"
               href="https://irocket.kz/policy"
            >
               пользовательским соглашением
            </a>
         </div>
         <Modal
            isOpen={isLoading || error !== ''}
            onClose={() => {
               setIsLoading(false);
               setError('');
            }}
            hideCloseButton={isLoading}
         >
            <ModalContent>
               <div className="flex justify-center items-center gap-3 p-5">
                  {isLoading ? (
                     <>
                        <h3>Загрузка...</h3>
                        <Spinner />
                     </>
                  ) : (
                     <h3>{error}</h3>
                  )}
               </div>
            </ModalContent>
         </Modal>
      </div>
   );
};

// function capitalizeFirstLetter(string: string) {
//    return string.charAt(0).toUpperCase() + string.slice(1);
// }