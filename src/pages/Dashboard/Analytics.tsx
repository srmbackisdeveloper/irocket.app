import { Search } from '../../components/shared/icons/Search.icon';
import { Input } from '@nextui-org/react';

export const Analytics = () => {
   return (
      <div className="grid p-5 gap-5">
         <div className="grid border rounded-lg p-3">
            <Input 
                startContent={<Search />}
                className='w-fit'
                placeholder='Артикул / Название'
                size='md'
            />
         </div>
         <div className="grid border rounded-lg p-5">
            <p className="grid justify-center items-center text-danger">
               Совсем скоро объявим о запуске!
            </p>
         </div>
      </div>
   )
}
