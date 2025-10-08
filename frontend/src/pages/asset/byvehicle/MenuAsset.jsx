import { NavLink, useParams } from "react-router-dom"

export default function NavbarAsset() {
  const { id } = useParams()

  const navigationLinks = [
    { href: `/asset/vehicle/${id}`, label: "Basic Data" },
    { href: `/asset/vehicle/${id}/fault`, label: "Fault" },
  ]

  return (
  <header className="lg:border-b border-gray-200 dark:border-gray-700/60 px-2">
    <div className="flex h-16 items-center">
      <nav className="flex flex-1 items-center gap-6 overflow-x-auto no-scrollbar">
        {navigationLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.href}
            end
            className={({ isActive }) =>
              `whitespace-nowrap border-b-2 py-1.5 font-medium transition-colors ${
                isActive
                  ? "border-violet-500 text-violet-500"
                  : "border-transparent text-gray-600 hover:text-violet-500 hover:border-violet-500"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
    
  </header>
);

}
