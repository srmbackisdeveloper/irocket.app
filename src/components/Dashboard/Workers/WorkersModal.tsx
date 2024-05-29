import { Button } from '@nextui-org/react'
import { useState } from 'react'
import {
   Modal,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalFooter,
   useDisclosure,
} from '@nextui-org/react'

export const WorkersModal = () => {
   const { isOpen, onOpen, onOpenChange } = useDisclosure()
   const [email, setEmail] = useState('')

   return (
      <div>
         <Button
            onPress={onOpen}
            color="danger"
            variant="ghost"
            className="px-7 font-semibold hover:bg-danger hover:text-white"
            isDisabled
         >
            Добавить
         </Button>
         <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
               <>
                  <ModalHeader className="flex flex-col gap-1">
                     Добавить сотрудника
                  </ModalHeader>
                  <ModalBody>
                     <div>
                        <p className="font-semibold text-start text-sm text-gray-500">
                           Почта сотрудника
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
                        <p className="font-semibold text-start text-sm text-gray-500">
                           Если в системе не будет обнаружен акканут привязанный
                           к этой почте, то аккаунт будет создан, а пароль
                           выслан на почту
                        </p>
                     </div>
                     <div className="grid justify-end">
                        <Button
                           color="danger"
                           variant="shadow"
                           className="min-w-40 font-semibold"
                        >
                           Добавить
                        </Button>
                     </div>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
               </>
            </ModalContent>
         </Modal>
      </div>
   )
}
