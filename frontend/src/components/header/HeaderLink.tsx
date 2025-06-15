import { Button } from "@/components/ui/button";
import Link from "next/link";

const nonActiveStyle = "px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 text-slate-700 dark:text-slate-300 hover:bg-sky-100/70 hover:text-sky-700 hover:shadow-md";
const activeStyle = "px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg";

export const HeaderLink = ({ href, children, isActive }: { href: string; children: React.ReactNode; isActive: boolean }) => {
  const style = isActive ? activeStyle : nonActiveStyle;

  return (
    <Button asChild className={style}>
      <Link href={href}>{children}</Link>
    </Button>
  );
};