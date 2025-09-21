import React, { useMemo, useState, useEffect } from "react";
import Table from "../../charts/Table";
import Pagination from "../../components/Pagination";
import { NavLink } from "react-router-dom";
import { getForklifts } from "../../services/forklift";
import Loading from "../../components/Loading";

// --- helper kecil buat badge status ---
function StatusBadge({ status }) {
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

export default function ByVehicleCard({ className = "" }) {
  const dtf = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const df = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" });
  const formatDateTime = (iso) => dtf.format(new Date(iso));
  const formatDate = (iso) => df.format(new Date(iso));

  // === KOLOM TABEL ===
  const columns = [
    {
      key: "name",
      header: "Name",
      align: "left",
      render: (r) => (
        <NavLink
          to={`/asset/vehicle/${encodeURIComponent(r.id)}`}
          className="hover:underline hover:text-violet-500"
        >
          {r.name}
        </NavLink>
      ),
    },
    { key: "model", header: "Model", align: "left" },
    {
      key: "status",
      header: "Status",
      align: "center",
      render: (r) => <StatusBadge status={r.status} />,
    },
    {
      key: "serialNumber",
      header: "Serial Number",
      align: "left",
      render: (r) => <code className="text-xs">{r.serialNumber}</code>,
    },
    {
      key: "keyOnHours",
      header: "Key-on Hours",
      align: "right",
      render: (r) => <span>{r.keyOnHours.toLocaleString("id-ID")} h</span>,
    },
    {
      key: "lastOnlineISO",
      header: "Last Online Time",
      align: "center",
      render: (r) => (
        <time dateTime={r.lastOnlineISO}>
          {formatDateTime(r.lastOnlineISO)}
        </time>
      ),
    },
    {
      key: "manufactureDate",
      header: "Manufacture Date",
      align: "center",
      render: (r) => (
        <time dateTime={r.manufactureDate}>
          {formatDate(r.manufactureDate)}
        </time>
      ),
    },
    {
      key: "address",
      header: "Address",
      align: "left",
      render: (r) => (
        <span className="block truncate max-w-[18rem]" title={r.address}>
          {r.address}
        </span>
      ),
    },
  ];

  // === DATA DUMMY  ===

  const [allRows, setAllRows] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getForklifts();
        setAllRows(data);
      } catch (err) {
        console.error("Error fetching forklifts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalItems = allRows.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const pagedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return allRows.slice(start, start + pageSize);
  }, [allRows, page, pageSize]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className={`col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-xs rounded-xl flex flex-col ${className}`}
    >
      {/* Title (tetap) */}
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          By Vehicle
        </h2>
      </header>

      <div className="flex-1 min-h-0 flex flex-col">
        <div className="p-3 flex-1 min-h-0">
          <Table
            columns={columns}
            data={pagedRows}
            containerClassName="h-full overflow-y-auto overscroll-contain"
          />
        </div>

        {/* Pagination */}
        <div className="px-3 pb-3 border-t border-gray-100 dark:border-gray-700/60 bg-white dark:bg-gray-800">
          <Pagination
            page={page}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={(p) => setPage(Math.min(Math.max(1, p), totalPages))}
            onPageSizeChange={(ps) => {
              setPageSize(ps);
              setPage(1);
            }}
          />
        </div>
      </div>
    </div>
  );
}
