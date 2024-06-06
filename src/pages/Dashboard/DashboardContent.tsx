import { Avatar, Button, Divider, Modal, ModalContent, Spinner, Textarea } from '@nextui-org/react'
import AvatarImage from '../../assets/dashboard/img/avatar.png'
import { useState } from 'react'
import Rating from '@mui/material/Rating'
import { useAuth } from '../../contexts/AuthContext'

const DashboardContent = () => {
   const [rating, setValue] = useState<number | null>(5);
  const [comment, setComment] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { user, addComment, error, setError } = useAuth();

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    newValue: number | null
  ) => {
    if (newValue !== null) {
      setValue(newValue);
    }
  };

  const handleSubmitComment = async (event: React.FormEvent) => {
    event.preventDefault();
    if (rating !== null && comment.trim() !== '') {
      setIsLoading(true);
      const success = await addComment({ rating, text: comment });
      
      setModalVisible(true);

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      if (success) {
        setComment('');
        setValue(5);
        setSuccessMessage('Отзыв успешно отправлен!');
        setError(null);
      } else {
        setSuccessMessage(null);
      }
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setError(null);
    setSuccessMessage(null);
  };

   return (
      <>
         <div className="grid p-5 gap-2">
            <div className="grid p-3 border rounded-lg bg-green-100 dark:bg-[#1f1f1f]">
              <p className="text-tiny text-start font-semibold text-green-800 dark:text-green-300">
                Подписывайтесь на наш телеграм канал чтобы знать о всех
                обновлениях iRocket и новостях KASPI <a target="_blank" href='https://t.me/irocketkz' className="hover:text-danger">@iRocket.systems</a> 
              </p>
            </div>
            <div className="grid p-3 border rounded-lg bg-white dark:bg-[#1f1f1f]">
              <p className="text-tiny text-start font-semibold text-gray-500 dark:text-gray-300">
                В случае неполадки обратитесь по номеру <a href='tel:+7 7477174422' className='hover:text-danger'>+7 747 717 44 22</a>
              </p>
            </div>
         </div>
         <div className="grid p-5 gap-5 lg:grid-cols-2">
            <div className="grid p-3 border rounded-lg">
               <h2 className="text-lg font-semibold text-start">
                  Добро пожаловать!
               </h2>

               <div className="grid gap-3 my-[1em]">
                  <div className="flex flex-wrap justify-between items-center">
                     <p className="flex gap-2 text-sm items-center font-semibold">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="w-6 h-6"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                           />
                        </svg>
                        Компания
                     </p>
                     <p className="font-bold text-sm">{user?.companyName}</p>
                  </div>
                  <Divider />
                  <div className="flex flex-wrap justify-between items-center opacity-50 cursor-not-allowed">
                     <p className="flex gap-2 text-sm items-center font-semibold">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="w-6 h-6"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                           />
                        </svg>
                        Баланс
                     </p>
                     <p className="font-bold text-sm">{user?.availableFunds}</p>
                  </div>
                  <Divider />
                  <div className="flex flex-wrap justify-between items-center opacity-50 cursor-not-allowed">
                     <p className="flex gap-2 text-sm items-center font-semibold">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="w-6 h-6"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                           />
                        </svg>
                        Месячная стоимость
                     </p>
                     <p className="font-bold text-sm">{user?.monthlyFee}</p>
                  </div>
                  <Divider />
                  <div className="flex flex-wrap justify-between items-center opacity-50 cursor-not-allowed">
                     <p className="flex gap-2 text-sm items-center font-semibold">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="w-6 h-6"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                           />
                        </svg>
                        Сумма списания
                     </p>
                     <p className="font-bold text-sm">{user?.debitAmount}</p>
                  </div>
                  <Divider />
                  <p className="text-sm text-gray">
                     Вы не используете платные услуги
                  </p>
               </div>
            </div>

            <div className="grid p-3 border rounded-lg">
               <h2 className="text-lg font-semibold text-start">
                  Ваш персональный менеджер
               </h2>
               <div className="flex flex-wrap gap-5 my-[1em]">
                  <div>
                     <Avatar
                        src={AvatarImage}
                        className="w-20 h-20 text-large border-1 border-gray-300"
                     />
                  </div>
                  <div>
                     <h4 className="font-bold text-large text-danger">
                        Ерболат Ергазиев
                     </h4>
                     <p className="text-sm font-semibold">
                        С радостью помогу по всем вопросам ;) <br />
                        Мой номер:{' '}
                        <a href="tel:+77774794422" className="text-danger">
                           {' '}
                           +7 747 717 44 22
                        </a>
                     </p>
                  </div>
               </div>
               <Divider />
               <p className="text-sm font-semibold text-gray mt-2">
                  Будьте вкурсе событий iRocket <br />
                  Подписывайтесь на наш телеграм канал
                  <a href="https://t.me/irocketkz" className="text-danger">
                     {' '}
                     telegram
                  </a>
               </p>
            </div>

            <div className="grid p-3 border gap-2 rounded-lg">
               <h2 className="text-md font-semibold text-start">
                 Оцените <span className="text-danger">iRocket</span>, нам
                 очень важно Ваше мнение.
               </h2>
               <p className="text-sm font-semibold">Ваша оценка:</p>
               <Rating
                 name="simple-controlled"
                 value={rating}
                 onChange={handleChange}
               />
               <Textarea
                 label="Ваш отзыв"
                 variant="bordered"
                 placeholder="Оставьте свой отзыв"
                 disableAnimation
                 disableAutosize
                 value={comment}
                 onChange={(e) => setComment(e.target.value)}
                 classNames={{
                   base: 'max-w-xs',
                   input: 'resize-y min-h-[40px]',
                 }}
               />
               <Button
                 color="danger"
                 variant="shadow"
                 className="font-semibold mt-1 max-w-xs"
                 onClick={handleSubmitComment}
                 isDisabled={!rating || comment.trim() === ''}
               >
                 Оставить
               </Button>
            </div>
         </div>
         <Modal
        isOpen={modalVisible || isLoading}
        onClose={closeModal}
        hideCloseButton={isLoading}
        placement='center'
      >
        <ModalContent>
          <div className="flex justify-center items-center gap-3 p-5">
            {isLoading ? (
              <>
                <Spinner color='danger' />
                <h3>Загрузка...</h3>
              </>
            ) : successMessage ? (
              <div className="flex items-center gap-2">
                <h3>{successMessage}</h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check2 text-success-600" viewBox="0 0 16 16">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
                </svg>
              </div>
            ) : (
              <h3>{error}</h3>
            )}
          </div>
        </ModalContent>
      </Modal>
      </>
   )
}

export default DashboardContent
