import {
   Modal,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalFooter,
   useDisclosure,
   Button,
} from '@nextui-org/react'
import { CrossIcon } from '../../shared/icons/Cross.icon'

export const DeleteModal = () => {
   const { isOpen, onOpen, onClose } = useDisclosure()

   const handleDelete = () => {
      // Your delete logic goes here
      onClose() // Close the modal after deletion
   }

   return (
      <div>
         <Button onClick={onOpen} className="bg-transparent">
            <CrossIcon />
         </Button>
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
               <>
                  <ModalHeader>Вы хотите удалить магазин?</ModalHeader>
                  <ModalBody>
                     <p>Подтвердите своё действие:</p>
                  </ModalBody>
                  <ModalFooter>
                     <Button
                        color="danger"
                        variant="shadow"
                        onClick={handleDelete}
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
      </div>
   )
}
