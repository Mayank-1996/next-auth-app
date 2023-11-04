import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import React from "react";

export default function Header() {
  const { isLogin, setLogin } = useAppContext();
  return (
    <div className="header">
      <Link href="/">Home</Link>
      <Link href="/products">Products</Link>
      <Link href="/adminpage">Admin</Link>
      {!isLogin && <Link href="/login">login</Link>}
      {isLogin && (
        <button className="logout" onClick={() => setLogin(false)}>
          Logout
        </button>
      )}
      <Link href="/resource">Resource</Link>
    </div>
  );
}
