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
import { CrossIcon } from '../../shared/icons/Cross.icon';
import { useState, useEffect } from 'react';

interface DeleteModalProps {
   shopId: number;
}

export const DeleteModal = ({ shopId }: DeleteModalProps) => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [statusMessage, setStatusMessage] = useState('');
   const { deleteShop, isDeleting, deleteError } = useShopStore();

   const handleDelete = async () => {
      setStatusMessage('Загрузка...');
      const result = await deleteShop(shopId); // Pass the shop ID here
      
      if (result.success) {
         setStatusMessage('Магазин успешно удалён');
         setTimeout(() => {
            setStatusMessage('');
            onClose(); // Close the modal
         }, 2000);
      } else {
         setStatusMessage(`Ошибка при удалении магазина: ${result.error}`);
      }
   };

   useEffect(() => {
      if (isOpen) {
         setStatusMessage('');
      }
   }, [isOpen]);

   useEffect(() => {
      if (!isDeleting && statusMessage) {
         setTimeout(() => {
            setStatusMessage('');
            onClose(); // Close the modal
         }, 2000);
      }
   }, [isDeleting, statusMessage, onClose]);

   // Handle modal close to clear statusMessage
   const handleClose = () => {
      setStatusMessage('');
      onClose();
   };

   return (
      <div>
         <Button onClick={onOpen} className="bg-transparent">
            <CrossIcon />
         </Button>
         <Modal 
            isOpen={isOpen} 
            onOpenChange={handleClose} // Use handleClose to clear statusMessage on close
            placement='center'
         >
            <ModalContent>
               <>
                  <ModalHeader>Вы хотите удалить магазин?</ModalHeader>
                  <ModalBody>
                     <p>Подтвердите своё действие:</p>
                     {deleteError && (
                        <div className="text-red-500 text-sm mt-2">
                           Ошибка: {deleteError}
                        </div>
                     )}
                  </ModalBody>
                  <ModalFooter>
                     <Button
                        color="danger"
                        variant="shadow"
                        onClick={handleDelete}
                        isLoading={isDeleting}
                     >
                        Да
                     </Button>
                     <Button
                        color="danger"
                        variant="bordered"
                        onClick={onClose}
                     >
                        Нет
                     </Button>
                  </ModalFooter>
               </>
            </ModalContent>
         </Modal>
         {isDeleting || !!statusMessage ? (
            <Modal
               isOpen={true}
               placement='center'
            >
               <ModalContent>
                  <ModalBody>
                     {isDeleting ? (
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
