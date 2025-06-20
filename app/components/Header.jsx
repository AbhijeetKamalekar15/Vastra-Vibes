import Link from "next/link";

export default function Header() {
  const menulist = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about-us" },
    { name: "Contact Us", link: "/contact-us" },
  ];

  return (
    <nav className="py-4 px-6 md:px-14 border-b flex items-center justify-between bg-white shadow-sm">
      <Link href="/">
        <img className="h-10 w-auto cursor-pointer" src="/logo.svg" alt="Logo" />
      </Link>

      <div className="hidden md:flex gap-6 items-center font-medium text-gray-700">
        {menulist.map((item) => (
          <Link href={item.link} key={item.link}>
            <span className="hover:text-blue-600 transition-colors duration-200 cursor-pointer">
              {item.name}
            </span>
          </Link>
        ))}
      </div>

      <Link href={"/login"}>
        <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 font-semibold rounded-full text-white shadow transition-colors duration-200">
          Login
        </button>
      </Link>
    </nav>
  );
}
