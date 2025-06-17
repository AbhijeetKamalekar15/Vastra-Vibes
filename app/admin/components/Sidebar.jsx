"use client"

import Link from "next/link"

export default function Sidebar(){
    const menuList = [
        {
            name: "Dashboard",
            link: "/admin",
        },
        {
            name: "Products",
            link: "/admin/products",
        },
        {
            name: "Categories",
            link: "/admin/categories",
        },
        {
            name: "Brands",
            link: "/admin/brands",
        },
        {
            name: "Orders",
            link: "/admin/orders",
        },
        {
            name: "Customers",
            link: "/admin/customers",
        },
        {
            name: "Reviews",
            link: "/admin/reviews",
        },
        {
            name: "Collections",
            link: "/admin/collections",
        },
    ]
    return (
        <section className="flex flex-col gap-3 items-center bg-white border-r px-5 py-3 h-screen overflow-hidden md:w-[260px]">
            <img className="h-10" src="logo.svg" alt="logo" />
            <ul className="flex-1 flex flex-col gap-3">
                {menuList?.map((item)=>{
                    return (
                        <Link href={item?.link} key={item?.link}>
                            <li>{item?.name}</li>
                        </Link>
                    )
                })}
            </ul>
        </section>
    )
}