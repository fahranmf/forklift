import React, { useMemo, useState, useEffect } from "react";
import Table from "../../charts/Table";
import Pagination from "../../components/Pagination";

function SourceCell({ icon, label }) {
  return (
    <div className="flex items-center">
      {icon}
      <div className="text-gray-800 dark:text-gray-100">{label}</div>
    </div>
  );
}

// --- helper kecil buat badge status ---
function StatusBadge({ status }) {
  const colors = {
    Online: {
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
    Maintenance: {
      dot: "bg-sky-500",
      pill: "bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800",
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

export default function DashboardCard07({ className = "" }) {
  const dtf = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const df = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" });
  const formatDateTime = (iso) => dtf.format(new Date(iso));
  const formatDate = (iso) => df.format(new Date(iso));

  // === KOLOM TABEL ===
  const columns = [
    { key: "name", header: "Name", align: "left" },
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
  const baseRows = [
    {
      id: "FL-01",
      name: "FL-01",
      model: "Toyota 8FGCU25",
      status: "Online",
      serialNumber: "8FGCU25-7A3JX-001245",
      keyOnHours: 1523,
      lastOnlineISO: "2025-08-17T09:24:00+07:00",
      manufactureDate: "2021-05-12",
      address: "Jl. Jend. Sudirman No. 12, Jakarta",
    },
    {
      id: "FL-02",
      name: "FL-02",
      model: "Komatsu FB18-12",
      status: "Offline",
      serialNumber: "FB18-12-KM-008812",
      keyOnHours: 2840,
      lastOnlineISO: "2025-08-16T21:05:00+07:00",
      manufactureDate: "2019-11-03",
      address: "Kawasan Industri Jababeka, Cikarang",
    },
    {
      id: "FL-03",
      name: "FL-03",
      model: "Hyster H50FT",
      status: "Maintenance",
      serialNumber: "H50FT-HY-003421",
      keyOnHours: 3975,
      lastOnlineISO: "2025-08-17T07:10:00+07:00",
      manufactureDate: "2018-03-25",
      address: "Pelabuhan Tanjung Priok, Jakarta Utara",
    },
    {
      id: "FL-04",
      name: "FL-04",
      model: "Linde E20",
      status: "Idle",
      serialNumber: "E20-LI-000991",
      keyOnHours: 1207,
      lastOnlineISO: "2025-08-17T08:52:00+07:00",
      manufactureDate: "2022-07-18",
      address: "Gudang A-3, Rungkut Industri, Surabaya",
    },
    {
      id: "FL-05",
      name: "FL-05",
      model: "CAT GP25N",
      status: "Online",
      serialNumber: "GP25N-CAT-015732",
      keyOnHours: 4512,
      lastOnlineISO: "2025-08-17T09:30:00+07:00",
      manufactureDate: "2020-02-09",
      address: "Bandara Soekarno-Hatta, Tangerang",
    },
    {
      id: "FL-06",
      name: "FL-06",
      model: "Nissan 1F2A25",
      status: "Online",
      serialNumber: "1F2A25-NS-004578",
      keyOnHours: 223,
      lastOnlineISO: "2025-08-17T09:28:00+07:00",
      manufactureDate: "2024-01-15",
      address: "Jln. Raya Bekasi KM 21, Jakarta Timur",
    },
    {
      id: "FL-07",
      name: "FL-07",
      model: "Doosan B20T-7",
      status: "Idle",
      serialNumber: "B20T7-DS-009312",
      keyOnHours: 1779,
      lastOnlineISO: "2025-08-17T06:40:00+07:00",
      manufactureDate: "2021-09-30",
      address: "Kawasan Industri MM2100, Bekasi",
    },
    {
      id: "FL-08",
      name: "FL-08",
      model: "Yale GLP25VX",
      status: "Offline",
      serialNumber: "GLP25VX-YL-006611",
      keyOnHours: 5102,
      lastOnlineISO: "2025-08-15T18:12:00+07:00",
      manufactureDate: "2019-06-22",
      address: "Depot Logistik, Balikpapan",
    },
    {
      id: "FL-09",
      name: "FL-09",
      model: "Mitsubishi FB20N",
      status: "Maintenance",
      serialNumber: "FB20N-MT-001889",
      keyOnHours: 3429,
      lastOnlineISO: "2025-08-17T05:55:00+07:00",
      manufactureDate: "2018-12-11",
      address: "Kawasan Berikat Nusantara, Cakung",
    },
    {
      id: "FL-10",
      name: "FL-10",
      model: "Crown SC 4500",
      status: "Online",
      serialNumber: "SC4500-CR-002237",
      keyOnHours: 987,
      lastOnlineISO: "2025-08-17T09:26:00+07:00",
      manufactureDate: "2023-03-04",
      address: "Jl. Raya Gresik No. 8, Gresik",
    },
    {
      id: "FL-11",
      name: "FL-11",
      model: "Still RX 20-16",
      status: "Online",
      serialNumber: "RX20-16-ST-000732",
      keyOnHours: 1610,
      lastOnlineISO: "2025-08-17T09:18:00+07:00",
      manufactureDate: "2022-10-12",
      address: "PT Delta Silicon, Lippo Cikarang",
    },
    {
      id: "FL-12",
      name: "FL-12",
      model: "TCM FD25T3",
      status: "Idle",
      serialNumber: "FD25T3-TCM-004022",
      keyOnHours: 2799,
      lastOnlineISO: "2025-08-17T07:35:00+07:00",
      manufactureDate: "2020-08-19",
      address: "Jl. Kima 1, Makassar",
    },
    {
      id: "FL-13",
      name: "FL-13",
      model: "Toyota 7FBEU18",
      status: "Offline",
      serialNumber: "7FBEU18-TY-002019",
      keyOnHours: 4305,
      lastOnlineISO: "2025-08-14T22:44:00+07:00",
      manufactureDate: "2018-05-07",
      address: "Pelabuhan Tanjung Perak, Surabaya",
    },
    {
      id: "FL-14",
      name: "FL-14",
      model: "Jungheinrich EFG216k",
      status: "Maintenance",
      serialNumber: "EFG216K-JU-000611",
      keyOnHours: 3180,
      lastOnlineISO: "2025-08-16T10:15:00+07:00",
      manufactureDate: "2019-01-23",
      address: "Kawasan Industri Karawang",
    },
    {
      id: "FL-15",
      name: "FL-15",
      model: "Hangcha CPD20",
      status: "Online",
      serialNumber: "CPD20-HC-001144",
      keyOnHours: 745,
      lastOnlineISO: "2025-08-17T09:29:00+07:00",
      manufactureDate: "2023-11-10",
      address: "Gudang Pendingin, Medan",
    },
    {
      id: "FL-16",
      name: "FL-16",
      model: "BYD ECB18",
      status: "Online",
      serialNumber: "ECB18-BYD-000833",
      keyOnHours: 156,
      lastOnlineISO: "2025-08-17T09:31:00+07:00",
      manufactureDate: "2024-04-02",
      address: "Jl. Raya Serpong, Tangerang Selatan",
    },
    {
      id: "FL-17",
      name: "FL-17",
      model: "Clark C25L",
      status: "Idle",
      serialNumber: "C25L-CK-004500",
      keyOnHours: 2033,
      lastOnlineISO: "2025-08-17T08:05:00+07:00",
      manufactureDate: "2021-02-14",
      address: "Kawasan Industri Candi, Semarang",
    },
    {
      id: "FL-18",
      name: "FL-18",
      model: "Hyundai 25B-9",
      status: "Offline",
      serialNumber: "25B9-HY-003377",
      keyOnHours: 3899,
      lastOnlineISO: "2025-08-13T17:20:00+07:00",
      manufactureDate: "2019-09-02",
      address: "Jl. Kalianak No. 15, Surabaya",
    },
    {
      id: "FL-19",
      name: "FL-19",
      model: "JAC CPD25",
      status: "Maintenance",
      serialNumber: "CPD25-JAC-001902",
      keyOnHours: 2675,
      lastOnlineISO: "2025-08-16T14:48:00+07:00",
      manufactureDate: "2020-06-28",
      address: "Kawasan Industri Batamindo, Batam",
    },
    {
      id: "FL-20",
      name: "FL-20",
      model: "Heli CPD18",
      status: "Online",
      serialNumber: "CPD18-HE-000522",
      keyOnHours: 612,
      lastOnlineISO: "2025-08-17T09:27:00+07:00",
      manufactureDate: "2023-07-07",
      address: "Jl. P. Jayakarta No. 45, Jakarta",
    },
    {
      id: "FL-21",
      name: "FL-21",
      model: "Toyota 8FBEK20",
      status: "Online",
      serialNumber: "8FBEK20-TY-004221",
      keyOnHours: 1340,
      lastOnlineISO: "2025-08-17T09:25:00+07:00",
      manufactureDate: "2022-03-03",
      address: "Kawasan Industri Cikande, Serang",
    },
    {
      id: "FL-22",
      name: "FL-22",
      model: "Komatsu FG25T-16",
      status: "Idle",
      serialNumber: "FG25T16-KM-006712",
      keyOnHours: 2988,
      lastOnlineISO: "2025-08-17T07:58:00+07:00",
      manufactureDate: "2020-10-20",
      address: "Jl. Raya Waru, Sidoarjo",
    },
    {
      id: "FL-23",
      name: "FL-23",
      model: "Mitsubishi FD30N",
      status: "Offline",
      serialNumber: "FD30N-MT-003301",
      keyOnHours: 5222,
      lastOnlineISO: "2025-08-12T19:33:00+07:00",
      manufactureDate: "2018-09-29",
      address: "Kawasan Industri KIMA, Makassar",
    },
    {
      id: "FL-24",
      name: "FL-24",
      model: "Yale ERC 040",
      status: "Maintenance",
      serialNumber: "ERC040-YL-000944",
      keyOnHours: 2411,
      lastOnlineISO: "2025-08-16T09:04:00+07:00",
      manufactureDate: "2021-12-05",
      address: "Kawasan Industri Benua Indah, Samarinda",
    },
  ];


  const allRows = baseRows;

  // State paginasi (default auto height, scroll halaman)
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Guard kalau total berubah & page jadi out-of-range
  const totalItems = allRows.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const pagedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return allRows.slice(start, start + pageSize);
  }, [allRows, page, pageSize]);

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
