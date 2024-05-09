import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Предложение",
    "Отзывы",
    "Как начать",
    "FAQ",
    "Наша команда",
    "Контакты",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">IRocket</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        <NavbarItem>
          <Link className="font-semibold hover:text-danger" color="foreground" href="#">
          Предложение
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link className="font-semibold hover:text-danger" color="foreground" href="#">
          Отзывы
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="font-semibold hover:text-danger" color="foreground" href="#">
          Как начать
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="font-semibold hover:text-danger" color="foreground" href="#">
          FAQ
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="font-semibold hover:text-danger" color="foreground" href="#">
          Наша команда
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="font-semibold hover:text-danger" color="foreground" href="#">
          Контакты
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex ml-10">
          <Link className="text-black font-semibold hover:text-danger" href="#">Вход</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="danger" href="#" variant="bordered" className="font-semibold hover:bg-danger hover:text-white">
          Попробовать
          </Button>
        </NavbarItem>
      </NavbarContent>
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
  );
}
