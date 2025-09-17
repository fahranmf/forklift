import React from "react";

/**
 * Generic Table (layout only)
 * props:
 * - columns: [{ key, header, align?, render? }]
 * - data: array
 * - emptyMessage?: string
 * - containerClassName?: string  // untuk kontrol scroll/tinggi wrapper tabel
 */
export default function Table({
  columns = [],
  data = [],
  className = "",
  emptyMessage = "No data",
  containerClassName = "", // buat tinggi & overflow
}) {
  return (
    <div className={`overflow-x-auto ${containerClassName}`}>
      <table className={`min-w-full table-auto w-full dark:text-gray-300 ${className}`}>
        <thead className="text-xs uppercase text-gray-800 dark:text-gray-200">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={
                  "p-2 sticky top-0 z-10 bg-gray-200 dark:bg-gray-700"
                }
              >
                <div className={`font-semibold ${col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left"}`}>
                  {col.header}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
          {data.length === 0 ? (
            <tr>
              <td className="p-4 text-center text-gray-500 dark:text-gray-400" colSpan={columns.length}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={row.id ?? i}>
                {columns.map((col) => (
                  <td key={col.key} className="p-2">
                    <div className={col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left"}>
                      {col.render ? col.render(row) : row[col.key]}
                    </div>
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

