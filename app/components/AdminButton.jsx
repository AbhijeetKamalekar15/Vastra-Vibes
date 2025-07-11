"use client";

import { useAuth } from "../../context/AuthContext";
import { useAdmin } from "../../lib/firestore/admins/read";
import Link from "next/link";

export default function AdminButton() {
  const { user } = useAuth();
  const { data } = useAdmin({ email: user?.email });
  if (!data) {
    return <></>;
  }
  return (
    <Link href={"/admin"}>
      <button className="text-[#111827] hover:text-[#2A9D8F] text-xs font-semibold">Admin</button>
    </Link>
  );
}