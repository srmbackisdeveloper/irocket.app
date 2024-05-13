import React from 'react'
import {
   Navbar,
   NavbarContent,
   NavbarItem,
   NavbarMenuToggle,
   NavbarMenu,
   NavbarMenuItem,
   Link,
   Button,
} from '@nextui-org/react'
import { Logo } from '../shared/Logo'

export default function Header() {
   const [isMenuOpen, setIsMenuOpen] = React.useState(false)

   const menuItems = [
      'Предложение',
      'Отзывы',
      'Как начать',
      'FAQ',
      'Наша команда',
      'Контакты',
   ]

   return (
      <Navbar onMenuOpenChange={setIsMenuOpen}>
         <NavbarContent>
            <div className="grid lg:ml-[-5em] mt-[1em]">
               <Logo />
            </div>
         </NavbarContent>

         <NavbarContent className="hidden lg:flex gap-4" justify="center">
            <NavbarItem>
               <Link
                  className="font-semibold hover:text-danger"
                  color="foreground"
                  href="#"
               >
                  Предложение
               </Link>
            </NavbarItem>
            <NavbarItem>
               <Link
                  className="font-semibold hover:text-danger"
                  color="foreground"
                  href="#"
               >
                  Отзывы
               </Link>
            </NavbarItem>
            <NavbarItem>
               <Link
                  className="font-semibold hover:text-danger"
                  color="foreground"
                  href="#"
               >
                  Как начать
               </Link>
            </NavbarItem>
            <NavbarItem>
               <Link
                  className="font-semibold hover:text-danger"
                  color="foreground"
                  href="#"
               >
                  FAQ
               </Link>
            </NavbarItem>
            <NavbarItem>
               <Link
                  className="font-semibold hover:text-danger"
                  color="foreground"
                  href="#"
               >
                  Наша команда
               </Link>
            </NavbarItem>
            <NavbarItem>
               <Link
                  className="font-semibold hover:text-danger"
                  color="foreground"
                  href="#"
               >
                  Контакты
               </Link>
            </NavbarItem>
         </NavbarContent>
         <NavbarContent justify="end">
            <NavbarItem className="ml-10">
               <Link
                  className="text-black font-semibold hover:text-danger"
                  href="/login"
               >
                  Вход
               </Link>
            </NavbarItem>
            <NavbarItem>
               <Button
                  as={Link}
                  color="danger"
                  href="/register"
                  variant="bordered"
                  className="font-semibold hover:bg-danger hover:text-white hidden md:flex "
               >
                  Попробовать
               </Button>
            </NavbarItem>
         </NavbarContent>
         <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden"
         />
         <NavbarMenu>
            {menuItems.map((item, index) => (
               <NavbarMenuItem key={`${item}-${index}`}>
                  <Link
                     color="foreground"
                     className="w-full"
                     href="#"
                     size="lg"
                  >
                     {item}
                  </Link>
               </NavbarMenuItem>
            ))}
         </NavbarMenu>
      </Navbar>
   )
}
