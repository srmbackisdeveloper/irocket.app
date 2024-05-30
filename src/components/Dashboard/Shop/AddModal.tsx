import { useState, useEffect } from 'react';
import {
   Modal,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalFooter,
   useDisclosure,
   Button,
   Spinner,
} from '@nextui-org/react';
import { useShopStore } from '../../../store/shopStore';
import { EyeFilledIcon } from '../../../pages/icons/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../../../pages/icons/EyeSlashFilledIcon';

export const AddModal = () => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const { createShop, isCreating, createError } = useShopStore();
   const [statusMessage, setStatusMessage] = useState('');
   const [isVisible, setIsVisible] = useState(false);

   const handleAddShop = async () => {
      setStatusMessage('Загрузка...');
      const result = await createShop(email.trim(), password.trim());
      
      if (result.success) {
         setStatusMessage('Магазин успешно добавлен');
         setEmail('');
         setPassword('');
         setTimeout(() => {
            setStatusMessage('');
            onClose(); // Close the modal
         }, 2000);
      } else {
         setStatusMessage(`Ошибка при добавлении магазина: ${result.error}`);
         setEmail('');
         setPassword('');
      }
   };

   useEffect(() => {
      if (isOpen) {
         setStatusMessage('');
      }
   }, [isOpen]);

   useEffect(() => {
      if (!isCreating && statusMessage) {
         setTimeout(() => {
            setStatusMessage('');
            onClose(); // Close the modal
         }, 2000);
      }
   }, [isCreating, statusMessage, onClose]);

   // Handle modal close to clear statusMessage
   const handleClose = () => {
      setStatusMessage('');
      onClose();
   };

   const toggleVisibility = () => setIsVisible(!isVisible); 

   return (
      <div>
         <Button
            onPress={onOpen}
            color="danger"
            variant="ghost"
            className="px-7 font-semibold hover:bg-danger hover:text-white"
         >
            Добавить
         </Button>
         <Modal 
            isOpen={isOpen} 
            onOpenChange={handleClose} // Use handleClose to clear statusMessage on close
            placement='top-center'
         >
            <ModalContent>
               <>
                  <ModalHeader className="flex flex-col gap-1">
                     Добавить магазин
                  </ModalHeader>
                  <ModalBody>
                     <div>
                        <p className="font-semibold text-start text-sm text-gray-500">
                           Эл. почта
                        </p>
                        <input
                           className="grid border rounded-xl p-2 w-full mt-1 custom-input"
                           type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder="email"
                        />
                     </div>
                     <div>
                       <p className="font-semibold text-start text-sm text-gray-500">Пароль</p>
                       <div className="relative">
                         <input
                           className="grid border rounded-xl p-2 min-w-full mt-1 custom-input"
                           type={isVisible ? "text" : "password"}
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           placeholder="пароль"
                         />
                         <button
                           type="button"
                           onClick={toggleVisibility}
                           className="absolute right-3 top-2 focus:outline-none"
                         >
                           {isVisible ? (
                             <EyeSlashFilledIcon className="text-2xl text-default-400" />
                           ) : (
                             <EyeFilledIcon className="text-2xl text-default-400" />
                           )}
                         </button>
                       </div>
                     </div>
                     <div>
                        <p className="font-semibold text-start text-sm text-gray-500">
                           Введите данные для входа в{' '}
                           <span className="text-danger">
                              {' '}
                              личный кабинет продавца{' '}
                           </span>{' '}
                           KASPI
                        </p>
                     </div>
                     {createError && (
                        <div className="text-red-500 text-sm mt-2">
                           Ошибка: {createError}
                        </div>
                     )}
                     <div className="grid justify-end">
                        <Button
                           color="danger"
                           variant="shadow"
                           className="min-w-40 font-semibold"
                           onPress={handleAddShop}
                           isLoading={isCreating}
                           isDisabled={!email && !password}
                        >
                           Добавить
                        </Button>
                     </div>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
               </>
            </ModalContent>
         </Modal>
         {isCreating || !!statusMessage ? (
            <Modal
               isOpen={true}
               placement='center'
            >
               <ModalContent>
                  <ModalBody>
                     {isCreating ? (
                        <div className='flex gap-4 items-center justify-center'>
                           <Spinner size="lg" color="danger" />
                           <span className="ml-3">{statusMessage}</span>
                        </div>
                     ) : (
                        <span>{statusMessage}</span>
                     )}
                  </ModalBody>
               </ModalContent>
            </Modal>
         ) : null}
      </div>
   );
};
