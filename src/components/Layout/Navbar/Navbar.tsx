import { HiOutlineShoppingBag } from "react-icons/hi";
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
import { AlignJustify, ShoppingCart } from "lucide-react";
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
import { headers } from "next/headers";
import Script from "next/script";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between z-50 p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <AlignJustify
            size={32}
            strokeWidth={1.5}
            className="cursor-pointer"
          />
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
                  <AiOutlinePhone className="w-6 h-6" />
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
                src="/icon-instagram.svg"
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
          src="/logo noir.png"
          alt="Logo"
          width={90}
          height={90}
          className=" dark:hidden"
        />
        <Image
          src="/logo blanc.png"
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
