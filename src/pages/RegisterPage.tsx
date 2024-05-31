import { Button, Modal, ModalContent, Spinner } from '@nextui-org/react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';
import { EyeSlashFilledIcon } from './icons/EyeSlashFilledIcon';
import { EyeFilledIcon } from './icons/EyeFilledIcon';
import validCodes from '../../public/validCodes.json'; // Update the path to your JSON file

export const RegisterPage = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [number, setNumber] = useState('+7(___)___-__-__');
   const [isChecked, setIsChecked] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [isVisible, setIsVisible] = useState(false);
   const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
   const [usernameError, setUsernameError] = useState('');
   const [passwordError, setPasswordError] = useState('');
   const [phoneError, setPhoneError] = useState('');

   const navigate = useNavigate();

   const toggleVisibility = () => setIsVisible(!isVisible);
   const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

   const { register, error, setError } = useAuth();

   const validateUsername = (username: string) => {
      const usernameRegex = /^[a-zA-Z0-9]{8,16}$/;
      const numbersInUsername = username.replace(/[^0-9]/g, '').length;
      if (!usernameRegex.test(username)) {
         return 'Имя пользователя должно содержать от 8 до 16 символов и быть на латинице, без специальных символов.';
      }
      if (numbersInUsername > 7) {
         return 'Имя пользователя не должно содержать более 7 цифр.';
      }
      return '';
   };

   const validatePassword = (password: string) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;
      if (!passwordRegex.test(password)) {
         return 'Пароль должен содержать от 8 до 16 символов, по крайней мере одну заглавную букву, одну строчную букву и одну цифру, без специальных символов.';
      }
      return '';
   };

   const validatePhoneNumber = (number: string) => {
      const digits = number.replace(/\D/g, '');
      const areaCode = digits.slice(1, 4);
      if (!validCodes.codes.includes(areaCode)) {
         return 'Введите корректный номер!';
      }
      return '';
   };

   const isButtonDisabled = !username || !number || password !== confirmPassword || !isChecked || usernameError || passwordError || phoneError;

   const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
   };

   const handleRegister = async (event: React.FormEvent) => {
      event.preventDefault();
      setIsLoading(true);
      const success = await register(handlePhoneNumber(number).trim(), password.trim(), username.trim());
      setIsLoading(false);
      if (success) {
         console.log('Register successful');
         navigate('/login');
      } else {
         console.error('Register failed');
      }
   };

   const formatPhoneNumber = (value: string) => {
      const digits = value.replace(/\D/g, '');
      const part2 = digits.slice(1, 4);
      const part3 = digits.slice(4, 7);
      const part4 = digits.slice(7, 9);
      const part5 = digits.slice(9, 11);

      let formattedNumber = '+7';
      if (part2) formattedNumber += `(${part2})`;
      if (part3) formattedNumber += `${part3}`;
      if (part4) formattedNumber += `-${part4}`;
      if (part5) formattedNumber += `-${part5}`;

      return formattedNumber;
   };

   const handlePhoneNumber = (number: string): string => {
      let cleanedNumber = number.replace(/[\s_\(\)-]/g, '');
      if (cleanedNumber.startsWith('+7')) {
         cleanedNumber = '8' + cleanedNumber.slice(2);
      }
      return cleanedNumber;
   };

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const digits = inputValue.replace(/\D/g, '');
      let formattedValue = '+7';

      if (digits.length > 1) {
         formattedValue += `(${digits.slice(1, 4)})`;
      } else {
         formattedValue += '(___)';
      }
      if (digits.length >= 5) {
         formattedValue += digits.slice(4, 7);
      }
      if (digits.length >= 8) {
         formattedValue += `-${digits.slice(7, 9)}`;
      }
      if (digits.length >= 10) {
         formattedValue += `-${digits.slice(9, 11)}`;
      }

      setNumber(formattedValue);
      setPhoneError(validatePhoneNumber(formattedValue));
   };

   const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      setUsername(inputValue);
      setUsernameError(validateUsername(inputValue));
   };

   const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      setPassword(inputValue);
      setPasswordError(validatePassword(inputValue));
   };

   const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      setConfirmPassword(inputValue);
   };

   return (
      <div className="flex flex-col justify-center items-center gap-4 h-screen pb-20">
         <div className="grid justify-center items-center">
            <h2 className="text-3xl font-semibold text-center">Регистрация</h2>
            <p className="font-semibold text-center text-sm text-gray-500 mt-1">
               Пришло время быть первым!
            </p>
         </div>
         <div className="grid justify-center items-center">
            <p className="font-semibold text-start text-sm text-gray-500">
               Имя пользователя
            </p>
            <input
               className={`grid border rounded-xl p-2 min-w-72 mt-1 lg:min-w-[26rem] custom-input ${usernameError ? 'border-danger' : ''}`}
               type="text"
               value={username}
               onChange={handleUsernameChange}
               placeholder="Имя пользователя"
            />
            {usernameError && <p className="text-danger text-sm mt-1 max-w-[26rem]">{usernameError}</p>}
         </div>
         <div className="grid justify-center items-center">
            <p className="font-semibold text-start text-sm text-gray-500">
               Номер телефона
            </p>
            <input
               className={`grid border rounded-xl p-2 min-w-72 mt-1 lg:min-w-[26rem] custom-input ${phoneError ? 'border-danger' : ''}`}
               type="text"
               inputMode="numeric"
               value={number}
               onChange={handleInputChange}
               placeholder="+7(___)___-__-__"
            />
            {phoneError && <p className="text-danger text-sm mt-1 max-w-[26rem]">{phoneError}</p>}
         </div>
         <div className="grid justify-center items-center">
            <p className="font-semibold text-start text-sm text-gray-500">
               Пароль
            </p>
            <div className="relative">
               <input
                  className={`grid border rounded-xl p-2 min-w-72 mt-1 lg:min-w-[26rem] custom-input ${passwordError ? 'border-danger' : ''}`}
                  type={isVisible ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
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
               {passwordError && <p className="text-danger text-sm mt-1 max-w-[26rem]">{passwordError}</p>}
            </div>
         </div>
         <div className="grid justify-center items-center pb-2">
            <p className={`font-semibold text-start text-sm ${password === confirmPassword ? 'text-gray-500' : 'text-danger'}`}>
               {(password === confirmPassword) ? 'Подтверждение пароля' : 'Пароли не совпадают'}
            </p>
            <div className="relative">
               <input
                  className="grid border rounded-xl p-2 min-w-72 mt-1 lg:min-w-[26rem] custom-input"
                  type={isVisibleConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
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
               isDisabled={!!isButtonDisabled}  // Ensure the value is boolean
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
               isOpen={isLoading || !!error}
               onClose={() => {
                  setIsLoading(false);
                  setError('');
               }}
               hideCloseButton={isLoading}
               placement='center'
            >
               <ModalContent>
                  <div className="flex justify-center items-center gap-3 p-5">
                     {isLoading ? (
                        <>
                           <Spinner color='danger'/>
                           <h3>Загрузка...</h3>
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
