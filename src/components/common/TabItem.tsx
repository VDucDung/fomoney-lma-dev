import Link from "next/link";
import cx from "clsx";

interface TabsItemProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  href: string;
  className?: string;
}
export default function TabItem({
  icon,
  label,
  href,
  className,
}: TabsItemProps) {
  return (
    <Link href={href} className={cx(className, "text-center")}>
      <div className="flex w-full items-center justify-center gap-1">
        {icon}
        {label}
      </div>
    </Link>
  );
}
