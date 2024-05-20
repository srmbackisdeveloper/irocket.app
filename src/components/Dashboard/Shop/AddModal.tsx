import { useState } from 'react'
import {
   Modal,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalFooter,
   useDisclosure,
   Button,
} from '@nextui-org/react'

export const AddModal = () => {
   const { isOpen, onOpen, onOpenChange } = useDisclosure()
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

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
         <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
