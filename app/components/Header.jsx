import { Heart, Search, ShoppingCart, UserCircle2 } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import AuthContextProvider from "../../context/AuthContext";
import HeaderClientButtons from "./HeaderClientButtons";
import AdminButton from "./AdminButton";

export default function Header() {
  const menuList = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about-us",
    },
    {
      name: "Contact",
      link: "/contact-us",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#FFFFFF] bg-opacity-65 backdrop-blur-2xl py-2 px-4 md:py-3 md:px-16 border-b flex items-center justify-between">
      <Link href={"/"}>
  <div className="flex items-center text-2xl md:text-3xl font-extrabold tracking-wide text-[#2A9D8F] hover:text-[#21867A] transition-colors duration-300">
    <span className="mr-1">वस्त्र</span>
    <span className="text-[#111827]">Vibes</span>
  </div>
</Link>

      <div className="hidden md:flex gap-1 md:gap-6 items-center font-semibold">
        {menuList?.map((item, index) => {
          return (
            <Link href={item?.link} key={index}>
              <button className="text-sm text-[#111827] hover:text-[#2A9D8F] px-3 py-1 rounded-lg hover:font-bold">
                {item?.name}
              </button>
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-1 md:gap-2">
        <AuthContextProvider>
          <AdminButton />
        </AuthContextProvider>
        <Link href={`/search`}>
          <button
            title="Search Products"
            className="text-[#111827] hover:text-[#2A9D8F] h-7 w-7 md:h-8 md:w-8 flex justify-center items-center rounded-full"
          >
            <Search size={14} />
          </button>
        </Link>
        <AuthContextProvider>
          <HeaderClientButtons />
        </AuthContextProvider>
        <Link href={`/account`}>
          <button
            title="My Account"
            className="h-7 w-7 md:h-8 md:w-8 flex justify-center items-center rounded-full text-[#111827] hover:text-[#2A9D8F]"
          >
            <UserCircle2 size={14} />
          </button>
        </Link>
        <AuthContextProvider>
          <LogoutButton />
        </AuthContextProvider>
      </div>
    </nav>
  );
}
