import Link from "next/link";
import { inter } from "../fonts";

export default function Header() {
  const links = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/about",
      label: "About",
    },
    {
      href: "/projects",
      label: "Projects",
    },
  ];

  return (
    <div className={inter.className}>
      <ul className="text-sm text-slate-700 bg-slate-50 flex items-center h-[56px] pl-[20px] pr-[20px] gap-5 shadow-sm">
        {links.map(({ href, label }) => (
          <li key={`${href}${label}`}>
            <Link className="hover:text-sky-700" href={href}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
