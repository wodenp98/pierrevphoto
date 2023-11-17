import {
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineInfoCircle,
  AiOutlinePhone,
} from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { ToggleDarkMode } from "@/components/Layout/Navbar/ToggleDarkMode";
import Link from "next/link";
import Image from "next/image";
import { AlignJustify } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import CartIconNavbar from "./CartIconNavbar";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between z-50 p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild aria-label="Ouvrir menu">
          <Button variant="ghost" className="relative cursor-pointer py-0 px-0">
            <AlignJustify
              size={32}
              strokeWidth={1.5}
              className="cursor-pointer"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-2">
          <DropdownMenuLabel className="flex items-center justify-between pr-0">
            <h1 className="uppercase">Menu</h1>
            <ToggleDarkMode />
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/">
              <DropdownMenuItem className="space-x-2 uppercase">
                Accueil
                <DropdownMenuShortcut>
                  <AiOutlineHome className="w-5 h-5" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>

            <Link href="/boutique">
              <DropdownMenuItem className="space-x-2 uppercase">
                Boutique
                <DropdownMenuShortcut>
                  <AiOutlineShoppingCart className="w-5 h-5" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>

            <Link href="/apropos">
              <DropdownMenuItem className="space-x-2 uppercase">
                A propos
                <DropdownMenuShortcut>
                  <AiOutlineInfoCircle className="w-5 h-5" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>{" "}
            </Link>

            <Link href="/contact">
              <DropdownMenuItem className="space-x-2 uppercase">
                Contact
                <DropdownMenuShortcut>
                  <AiOutlinePhone className="w-5 h-5" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <Link href="/compte">
              <DropdownMenuItem className="space-x-2 uppercase">
                Compte
                <DropdownMenuShortcut>
                  <VscAccount className="w-5 h-5" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link
              href="https://www.instagram.com/pierrev.photographie"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-2"
            >
              <Image
                src="/svg/icon-instagram.svg"
                alt="Instagram"
                width={36}
                height={36}
                className="pr-2"
              />
              <p className="text-sm">@pierre.v.photographie</p>
            </Link>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Link href="/">
        <Image
          src="/assets/logo noir.png"
          alt="Logo"
          width={90}
          height={90}
          className="dark:hidden"
        />
        <Image
          src="/assets/logo blanc.png"
          alt="Logo"
          width={90}
          height={90}
          className="hidden dark:block"
        />
      </Link>
      <div className="flex items-center">
        <CartIconNavbar />
      </div>
    </header>
  );
}
