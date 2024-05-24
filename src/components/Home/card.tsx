import { Button, Link } from '@nextui-org/react'
import { Card, CardBody, CardFooter } from '@nextui-org/react'

export const Cards = () => {
   return (
      <div className="grid p-10 gap-5 lg:grid-cols-2 md:grid-cols-1 md:mt-0">
         <div className="grid lg:mt-[-8rem]">
            <Card shadow="lg" className="min-w-[200px] p-4">
               <CardBody className="gap-2">
                  <h4 className="text-center font-bold text-large">
                     Начальный
                  </h4>
                  <p className="text-center text-md font-semibold">
                     Cредняя скорость до 100 товаров
                  </p>
                  <p className="text-center font-bold">25 000 тг</p>
               </CardBody>
               <CardFooter className="grid justify-center">
                  <Button
                     as={Link}
                     variant="bordered"
                     color="danger"
                     href="/register"
                     className="min-w-44 font-semibold hover:bg-danger hover:text-white"
                  >
                     Начать продавать
                  </Button>
               </CardFooter>
            </Card>
         </div>
         <div className="grid lg:mt-[-8rem]">
            <Card shadow="lg" className="min-w-[200px] p-4">
               <CardBody className="gap-2">
                  <h4 className="text-center font-bold text-large">
                     Продвинутый
                  </h4>
                  <p className="text-center text-md font-semibold">
                     Высокая скорость до 1000 товаров
                  </p>
                  <p className="text-center font-bold">50 000 тг</p>
               </CardBody>
               <CardFooter className="grid justify-center">
                  <Button
                     as={Link}
                     color="danger"
                     variant="shadow"
                     href="/register"
                     className="min-w-44 font-semibold"
                  >
                     Быть первым!
                  </Button>
               </CardFooter>
            </Card>
         </div>
      </div>
   )
}
