import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import BatteryMonitorCard from "../partials/dashboard/BatteryMonitorCard";
import DataDashboard from "../partials/dashboard/DataDashboard";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex max-h-dvh ">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 min-h-0">
        {/* Site header  */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen} 
        />
        <main className="flex-1 min-h-0">
          {/* <- sisa tinggi layar */}
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto h-full">
            {/* Actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  Home
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/*
                  <FilterButton align="right" />
                  <Datepicker align="right" />
                  <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
                    <svg className="fill-current shrink-0 xs:hidden" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="max-xs:sr-only">Add View</span>
                  </button>
                  */}
              </div>
            </div>

            {/* Grid isi layar */}
            <div className="grid h-[calc(100%-70px)] grid-cols-1 grid-rows-[auto,1fr] sm:grid-cols-2 sm:grid-rows-[auto,1fr] gap-4 min-h-0">
              <div className="sm:col-span-2 min-h-0">
                <DataDashboard />
              </div>

              {/* 2) Card 01 */}
              <div className="min-h-0 sm:row-start-2">
                <BatteryMonitorCard />
              </div>

              {/* 3) Card 03 */}
              <div className="min-h-0 sm:row-start-2">
                <BatteryMonitorCard />
              </div>
            </div>
            {/* Grid */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
