import { HiOutlineShoppingBag } from "react-icons/hi";
import {
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineInfoCircle,
  AiOutlinePhone,
} from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { ToggleDarkMode } from "@/components/Navbar/ToggleDarkMode";
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

{
  /* <span class="relative inline-block">
  <svg class="w-6 h-6 text-gray-700 fill-current" viewBox="0 0 20 20"><path d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
  <span class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">99</span>
</span> */
}

export default function Navbar() {
  return (
    <header className="flex items-center justify-between z-50 p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="w-20">
            <AlignJustify
              size={32}
              strokeWidth={1.5}
              className="cursor-pointer"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-2">
          <DropdownMenuLabel className="uppercase">Menu</DropdownMenuLabel>
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
            <Link href="/panier">
              <DropdownMenuItem className="space-x-2 uppercase">
                Panier
                <DropdownMenuShortcut>
                  <HiOutlineShoppingBag className="w-5 h-5 " />
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
                className="pr-4"
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
        <ToggleDarkMode />
      </div>
    </header>
  );
}
