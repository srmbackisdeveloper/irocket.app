import logo from '../../assets/logo.png'

export const Logo = () => {
   return (
      <div className="flex items-center pb-4">
         {' '}
         {/* Flex container */}
         <img src={logo} alt="Logo" className="h-12 mr-2" />{' '}
         {/* Adjust height */}
         <div className="flex flex-col">
            {' '}
            {/* Flex container for text */}
            <h1 className="font-bold text-4xl tracking-wider">iRocket</h1>
            <p className="uppercase text-[10px] text-gray-400">
               система роста продаж
            </p>
         </div>
      </div>
   )
}
