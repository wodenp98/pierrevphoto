"use client";

import { useState, useEffect } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import {
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineInfoCircle,
  AiOutlinePhone,
  AiOutlineHeart,
} from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { ToggleDarkMode } from "@/components/Navbar/ToggleDarkMode";

import Link from "next/link";
import { Divide as Hamburger } from "hamburger-react";
import Image from "next/image";
import { LinkInstagram } from "@/components/LinkPlatfrom/LinkPlatform";
import { useTheme } from "next-themes";
import { Separator } from "@/components/ui/separator";

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header
      className={`flex items-center justify-between  w-full z-50 ${
        isOpen ? "overflow-hidden" : ""
      }`}
    >
      <div className="p-4">
        <Hamburger
          toggled={isOpen}
          toggle={toggleMenu}
          duration={0.8}
          size={26}
          label="Voir menu"
        />
      </div>
      <Link href="/" onClick={closeMenu}>
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
      <div className="p-4">
        <ToggleDarkMode />
      </div>
      {isOpen && (
        <div
          className={`fixed flex items-center justify-center z-50 bg-background top-[80px]  left-0 right-0 bottom-0  ${
            isOpen ? "w-full" : "w-1/5 md:w-2/5 lg:w-1/5"
          }`}
        >
          <div className="absolute top-0 w-4/5">
            <Separator className="my-4" />
            <Link
              href="/"
              className="uppercase flex items-center justify-between"
              onClick={closeMenu}
            >
              Accueil
              <AiOutlineHome className="w-[20px] h-[20px]" />
            </Link>
            <Separator className="my-4 " />
            <Link
              href="/boutique"
              className="uppercase flex items-center justify-between"
              onClick={closeMenu}
            >
              Boutique
              <AiOutlineShoppingCart className="w-[20px] h-[20px]" />
            </Link>
            <Separator className="my-4" />
            <Link
              href="/panier"
              className="uppercase flex items-center justify-between"
              onClick={closeMenu}
            >
              Panier
              <HiOutlineShoppingBag className="w-[20px] h-[20px]" />
            </Link>
            <Separator className="my-4" />
            <Link
              href="/apropos"
              className="uppercase flex items-center justify-between"
              onClick={closeMenu}
            >
              A propos
              <AiOutlineInfoCircle className="w-[20px] h-[20px]" />
            </Link>
            <Separator className="my-4" />
            <Link
              href="/contact"
              className="uppercase flex items-center justify-between"
              onClick={closeMenu}
            >
              Contact
              <AiOutlinePhone className="w-[20px] h-[20px]" />
            </Link>
            <Separator className="my-4" />
            <Link
              href="/compte"
              className="uppercase flex items-center justify-between"
              onClick={closeMenu}
            >
              Compte
              <VscAccount className="w-[20px] h-[20px]" />
            </Link>
          </div>
          <div className="absolute bottom-10 w-4/5" onClick={closeMenu}>
            <LinkInstagram />
          </div>
        </div>
      )}
    </header>
  );
}
