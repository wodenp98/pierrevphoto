import Image from "next/image";
import Link from "next/link";
import { LinkInstagram, LinkGmail } from "../../LinkPlatfrom/LinkPlatform";
import { Separator } from "../../ui/separator";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-accent">
      <div className="flex justify-center mt-4">
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
      </div>

      <div className="flex flex-col p-4 gap-4">
        <Link href="/mentions-legales">Mentions légales</Link>
        <Link href="/cgvu">CGVU</Link>
        <LinkInstagram />
        <LinkGmail />
      </div>

      <Separator />

      <div className=" flex justify-center p-2">© 2023 Pierre Vigneron</div>
    </footer>
  );
}
