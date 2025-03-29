// components/Navbar.js
import Link from "next/link";

const links = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/log", label: "Log", icon: "📅" },
  { href: "/food_tracking", label: "Food", icon: "🍽️" },
  { href: "/exercise_tracking", label: "Exercise", icon: "🏃" },
  { href: "/groceries", label: "Groceries", icon: "🛒" },
];

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-inner border-t px-4 py-2 flex justify-around z-50">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="flex flex-col items-center text-sm hover:text-blue-500 transition">
          <span className="text-lg">{link.icon}</span>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}