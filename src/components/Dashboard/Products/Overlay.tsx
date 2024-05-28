import { Spinner } from '@nextui-org/react';
import React from 'react';

type OverlayProps = {
  isVisible: boolean;
};

export const Overlay: React.FC<OverlayProps> = ({ isVisible }) => {
  return isVisible ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 text-white text-xl flex justify-center items-center" >
      <Spinner size='lg' className='pr-4'/>
      Загрузка...
    </div>
  ) : null;
};
