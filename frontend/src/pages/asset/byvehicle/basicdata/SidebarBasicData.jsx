import React from "react";
import { NavLink, useParams } from "react-router-dom";

function SidebarBasicData({ variant = "default" }) {
  const { id } = useParams();

  const sidebarLinks = [
    { to: `/asset/vehicle/${id}`, label: "Battery Master Data" },
    { to: `/asset/vehicle/${id}/basic-data/forklift-master-data`, label: "Forklift Master Data" },
    { to: `/asset/vehicle/${id}/basic-data/controller-tr1`, label: "Controller Tr1" },
  ];

  return (
    <div className="min-w-fit h-full">
      <div
        id="sidebar"
        className={`flex flex-col h-full w-40 shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${
          variant === "v2"
            ? "border-r border-gray-200 dark:border-gray-700/60"
            : "rounded-r-2xl shadow-xs"
        }`}
      >
        <ul className="space-y-2">
          {sidebarLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                end
                to={link.to}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-violet-500/10 text-violet-600 dark:text-violet-400"
                      : "text-gray-700 hover:text-violet-500 dark:text-gray-300 dark:hover:text-violet-400"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SidebarBasicData;
