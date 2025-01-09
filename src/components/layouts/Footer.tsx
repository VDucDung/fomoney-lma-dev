"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const socials = [
  {
    icon: "/images/x.png",
    href: "https://x.com/Fomoney2048",
    name: "X",
  },
  {
    icon: "/images/gitbook.png",
    href: "https://fomoney.gitbook.io/fomoney-litepaper",
    name: "GitBook",
  },
  {
    icon: "/images/telegram.png",
    href: "https://x.com/Fomoney2048",
    name: "Telegram FoMoney",
  },
  {
    icon: "/images/discord.png",
    href: "https://discord.com/invite/HP6cBgaP9w",
    name: "Discord",
  },
  {
    icon: "/images/medium.png",
    href: "https://medium.com/@Fomoney2048",
    name: "Medium FoMoney",
  },
];

export default function Footer() {
  const path = usePathname();
  if (path.includes("game")) return null;

  return (
    <footer className="mt-20">
      <div>
        <ul className="flex flex-wrap justify-center gap-4">
          {socials.map((social) => (
            <li key={social.name}>
              <Link href={social.href} target="_blank">
                <Image
                  src={social.icon}
                  alt={social.name}
                  width={24}
                  height={24}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-2 text-center">© 2024 FoMoney</p>
    </footer>
  );
}
