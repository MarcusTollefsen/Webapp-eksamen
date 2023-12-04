"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    label: " utøvere fra ekstern Api",
    href: "/oldathletes",
  },
  {
    label: "Nye Utøvere",
    href: "/users",
  },
  {
    label: "Nytt Mål",
    href: "/competitions",
  }
 
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="mb-6 bg-white shadow-md rounded-lg overflow-hidden">
  <div className="flex justify-between items-center p-4 mx-auto" style={{ maxWidth: '800px' }}> 
    {navigation.map((item) => (
      <Link key={item.href} href={item.href} passHref>
        <span className={`px-3 py-2 rounded-md cursor-pointer transition-all ${
          pathname === item.href 
            ? "bg-blue-500 text-white font-semibold" 
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`}>
          {item.label}
        </span>
      </Link>
    ))}
  </div>
</nav>

  );
}
