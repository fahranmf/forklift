import React from "react";

export default function StatusBadge({ status }) {
  const colors = {
    Working: {
      dot: "bg-green-500",
      pill: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
    },
    Offline: {
      dot: "bg-rose-500",
      pill: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800",
    },
    Idle: {
      dot: "bg-amber-500",
      pill: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
    },
    Fault: {
      dot: "bg-sky-500",
      pill: "bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800",
    },
    Charging: {
      dot: "bg-orange-500",
      pill: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800",
    },
  };

  const c = colors[status] || {
    dot: "bg-gray-400",
    pill: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-2 py-0.5 rounded-full text-xs font-medium border ${c.pill}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {status}
    </span>
  );
}
