import { Button, Card, CardBody, Divider } from '@nextui-org/react'
import StepImage from './../../assets/home/step.svg'

export const Step = () => {
   return (
      <div className="mt-[6em] p-10 grid lg:grid-cols-2 justify-center items-center">
         <div className="grid justify-center items-center">
            <h2 className="text-4xl font-semibold text-center">
               С чего начать?
            </h2>
            <Card className="grid max-w-[400px] mt-10">
               <CardBody className="gap-4 p-8">
                  <p className="font-semibold text-start">
                     {' '}
                     1. Регистрируйтесь у нас на сайте
                  </p>
                  <Divider />
                  <p className="font-semibold text-start">
                     {' '}
                     2. Добавляйте магазин
                  </p>
                  <Divider />
                  <p className="font-semibold text-start">
                     {' '}
                     3. Настраивайте минимальные цены
                  </p>
                  <Divider />
                  <p className="font-semibold text-start">
                     {' '}
                     4. Будьте на первых позициях!
                  </p>
               </CardBody>
            </Card>
            <Button
               color="danger"
               variant="shadow"
               className="min-w-44 font-semibold mt-10"
            >
               Зарегистрироваться
            </Button>
         </div>
         <div>
            <StepImage className="object-cover rounded-xl max-w-[30em] hidden lg:block" />
         </div>
      </div>
   )
}
