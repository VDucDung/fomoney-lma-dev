"use client";

import { LuDatabase, LuGamepad2 } from "react-icons/lu";
import TabItem from "./TabItem";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const tabs = [
  {
    value: "game",
    href: "/",
    icon: <LuGamepad2 size={28} />,
    label: "Game",
  },
  {
    value: "staking",
    href: "/staking",
    icon: <LuDatabase size={24} />,
    label: "Deposit",
  },
];
export default function Tabsbar() {
  const currentPath = usePathname();

  return (
    <div className="flex w-full justify-between border-y-[1px] border-purple-600 py-2 text-center text-white">
      {tabs.map((tab, index) => (
        <div key={tab.value} className="flex flex-1 items-center">
          <TabItem
            value={tab.value}
            href={tab.href}
            icon={tab.icon}
            label={tab.label}
            className={clsx(
              "flex-1 font-bold",
              currentPath === tab.href && "text-purple-400",
            )}
          />
          {index < tabs.length - 1 && (
            <div className="h-full w-[2px] bg-purple-600" />
          )}
        </div>
      ))}
    </div>
  );
}
