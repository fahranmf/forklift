import SidebarBasicData from "./SidebarBasicData";
import React, { useState } from "react";

export function BasicData() {
  return (
    <div className="flex h-full">
      {" "}
      {/* ganti dari h-100dvh */}
      <SidebarBasicData />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 min-h-0 overflow-hidden">

        <main className="grow min-h-0 overflow-hidden">
          <div className="h-full flex flex-col min-h-0 px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  Asset
                </h1>
              </div>
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* ... */}
              </div>
            </div>

            {/* Card fill sisa tinggi */}
            <div className="flex-1 min-h-0">

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
