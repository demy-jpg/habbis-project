import { UserCircleIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const navLinks = [
    "Home",
    "Courses",
    "About",
    "Contact",
    "Plans & Pricing",
  ];

  return (
    <header className="bg-white">
      <nav className="mx-auto flex h-10 items-center justify-between px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl text-green-500">✶</span>
          <span className="text-xl font-medium text-gray-700">
            Learnify
          </span>
        </div>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-12 text-gray-800">
          {navLinks.map((item) => (
            <li
              key={item}
              className="cursor-pointer hover:text-gray-500 transition"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Login */}
        <button className="flex items-center gap-2 text-green-900 font-medium">
          <UserCircleIcon className="h-6 w-6" />
          Log In
        </button>
      </nav>
    </header>
  );
};

export default Navbar;