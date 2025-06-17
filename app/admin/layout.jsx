"use client";

import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function Layout({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }
  return (
    <main className="relative flex">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className={`fixed md:hidden
            ${isOpen ? "translate-x-0" : "-translate-x-[260px]"}
        `}>
        <Sidebar />
      </div>
      <section className="flex-1 flex flex-col min-h-screen">
        <Header toggleSidebar={toggleSidebar}/>
        <section className="flex-1 bg-[#eff3f4]">{children}</section>
      </section>
    </main>
  );
}
