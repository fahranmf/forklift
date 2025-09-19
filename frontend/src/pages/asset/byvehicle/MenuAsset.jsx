import { useState } from "react"
import { NavLink, useParams } from "react-router-dom"

export default function NavbarAsset() {
  const [isOpen, setIsOpen] = useState(false)
  const { id } = useParams()

  const navigationLinks = [
    { href: `/asset/vehicle/${id}`, label: "Basic Data" },
    { href: `/asset/vehicle/${id}/fault`, label: "Fault" },
  ]

  return (
    <header className="lg:border-b border-gray-200 dark:border-gray-700/60 px-2">
      <div className="flex h-16 justify-between gap-4">
        <div className="flex items-center gap-2">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex md:items-center md:gap-6">
            {navigationLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.href}
                end
                className={({ isActive }) =>
                  `border-b-2 py-1.5 font-medium transition-colors ${
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
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <nav className="mt-2 flex flex-col gap-2 border-t pt-2 md:hidden">
          {navigationLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.href}
              end
              className={({ isActive }) =>
                `block rounded px-2 py-2 ${
                  isActive
                    ? "bg-violet-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
