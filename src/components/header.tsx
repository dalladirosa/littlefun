import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="container flex flex-row items-center bg-white py-6">
      <h1>LittleLives</h1>
      <nav className="ml-auto">
        <ul className="flex flex-row items-center gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
