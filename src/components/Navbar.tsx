"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-5">      
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          {/* logo */}
          <Image
            src="/lakeviewlogo.jpg"
            alt="Lakeview Health Logo"
            width={140}
            height={140}
            className="mr-2"
            priority
          />
        </Link>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 border rounded text-2xl text-[#0A1C38] hover:bg-gray-100 relative z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? "✕" : "☰"}
        </button>

        {/* Nav Links */}
        <ul
          className={`md:flex md:space-x-6 absolute md:static bg-white font-semibold left-0 w-full md:w-auto top-26 md:top-auto transition-all duration-300 z-40 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li className="p-2"><Link href="/">Home</Link></li>
          <li className="p-2"><Link href="#about">About Us</Link></li>
          <li className="p-2"><Link href="#team">Meet Our Team</Link></li>
          <li className="p-2"><Link href="#services">Services</Link></li>
          <li className="p-2"><Link href="#pricing">Pricing</Link></li>
          <li className="p-2"><Link href="#faqs">FAQ</Link></li>
          <li className="p-2"><Link href="#contact">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}
