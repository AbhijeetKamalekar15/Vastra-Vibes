import Link from "next/link";

export default function Header() {
  const menulist = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About Us",
      link: "/about-us",
    },
    {
      name: "Contact Us",
      link: "/contact-us",
    },
  ];
  return (
    <nav className="py-3 px-14 border-b flex items-center justify-between">
      <img className="h-9" src="/logo.svg" alt="Logo" />
      <div className="flex gap-4 items-center font-semibold">
        {menulist?.map((item) => {
          return (
            <Link href={item?.link} key={item?.link}>
              <button>{item?.name}</button>
            </Link>
          );
        })}
      </div>
      <Link href={"/login"}>
        <button className="bg-blue-600 px-5 py-2 font-bold rounded-full text-white">
          Login
        </button>
      </Link>
    </nav>
  );
}
