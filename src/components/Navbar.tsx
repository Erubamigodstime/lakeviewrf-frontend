"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Lakeview Health</h1>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 border rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>

        {/* Nav Links */}
        <ul
          className={`md:flex md:space-x-6 absolute md:static bg-white left-0 w-full md:w-auto top-16 md:top-auto transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li className="p-2"><Link href="#services">Services</Link></li>
          <li className="p-2"><Link href="#pricing">Pricing</Link></li>
          <li className="p-2"><Link href="#faq">FAQ</Link></li>
          <li className="p-2"><Link href="#contact">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}
