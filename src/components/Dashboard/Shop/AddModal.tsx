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

export const AddModal = () => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const { createShop, isLoading, error } = useShopStore();
   const [statusMessage, setStatusMessage] = useState('');

   const handleAddShop = async () => {
      setStatusMessage('Загрузка...');
      await createShop(email, password);
      if (!error) {
         setStatusMessage('Магазин успешно добавлен');
         setEmail('');
         setPassword('');
         setTimeout(() => {
            setStatusMessage('');
            onClose(); // Close the modal
         }, 2000);
      } else {
         setStatusMessage('Ошибка при добавлении магазина');
      }
   };

   useEffect(() => {
      if (!isOpen) {
         setStatusMessage('');
      }
   }, [isOpen]);

   return (
      <div>
         <Button
            onPress={onOpen}
            color="danger"
            variant="bordered"
            className="text-black px-7 font-semibold hover:bg-danger hover:text-white"
         >
            Добавить
         </Button>
         <Modal isOpen={isOpen} onOpenChange={onClose}>
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
                           className="grid border rounded-xl p-2 w-full mt-1"
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
                           className="grid border rounded-xl p-2 w-full mt-1"
                           type="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           placeholder="password"
                        />
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
                     {error && (
                        <div className="text-red-500 text-sm mt-2">
                           Ошибка: {error}
                        </div>
                     )}
                     <div className="grid justify-end">
                        <Button
                           color="danger"
                           variant="shadow"
                           className="min-w-40 font-semibold"
                           onPress={handleAddShop}
                           isLoading={isLoading}
                        >
                           Добавить
                        </Button>
                     </div>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
               </>
            </ModalContent>
         </Modal>
         {isOpen && (
            <Modal isOpen={isLoading || !!statusMessage}>
               <ModalContent>
                  <ModalBody className="flex items-center justify-center">
                     {isLoading ? (
                        <>
                           <Spinner size="lg" color="danger" />
                           <span className="ml-3">{statusMessage}</span>
                        </>
                     ) : (
                        <span>{statusMessage}</span>
                     )}
                  </ModalBody>
               </ModalContent>
            </Modal>
         )}
      </div>
   );
};
