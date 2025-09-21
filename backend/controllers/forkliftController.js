// Dummy sementara
const dummyForklifts = [
  {
    id: "FL-01",
    name: "FL-01",
    model: "Toyota 8FGCU25",
    status: "Working",
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
    status: "Fault",
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
    status: "Working",
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
    status: "Working",
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
    status: "Fault",
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
    status: "Working",
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
    status: "Working",
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
    status: "Fault",
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
    status: "Working",
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
    status: "Working",
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
    status: "Fault",
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
    status: "Working",
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
    status: "Working",
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
    status: "Fault",
    serialNumber: "ERC040-YL-000944",
    keyOnHours: 2411,
    lastOnlineISO: "2025-08-16T09:04:00+07:00",
    manufactureDate: "2021-12-05",
    address: "Kawasan Industri Benua Indah, Samarinda",
  },
];

export const forkliftController = {
  getForklifts: async (req, res) => {
    try {
      /* for (const f of dummyForklifts) {
            await prisma.forklift.upsert({
                where: { id: f.id }, // id unik (FL-24, FL-01, dst)
                update: {
                name: f.name,
                model: f.model,
                status: f.status,
                serialNumber: f.serialNumber,
                keyOnHours: f.keyOnHours,
                lastOnlineISO: new Date(f.lastOnlineISO),
                manufactureDate: new Date(f.manufactureDate),
                address: f.address,
                },
                create: {
                id: f.id,
                name: f.name,
                model: f.model,
                status: f.status,
                serialNumber: f.serialNumber,
                keyOnHours: f.keyOnHours,
                lastOnlineISO: new Date(f.lastOnlineISO),
                manufactureDate: new Date(f.manufactureDate),
                address: f.address,
                },
            });
        }
        */
      res.json(dummyForklifts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getForkliftsDetail: async (req, res) => {
    try {
      const { id } = req.params;

      const forklift = dummyForklifts.find((f) => f.id === id);

      if (!forklift) {
        return res.status(404).json({ message: "Forklift not found" });
      }

      res.json(forklift);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

getForkliftsStatus: async (req, res) => {
  try {
    const { status } = req.query;

    if (status) {
      // kalau ada query status, balikin list forklift yg sesuai
      const forklifts = dummyForklifts.filter((f) => f.status === status);

      return res.json({
        status,
        count: forklifts.length,
        forklifts,
      });
    }

    // kalau ga ada query, balikin summary semua status
    const counts = dummyForklifts.reduce(
      (acc, f) => {
        acc[f.status] = (acc[f.status] || 0) + 1;
        return acc;
      },
      {
        Working: 0,
        Offline: 0,
        Idle: 0,
        Charging: 0,
        Fault: 0,
      }
    );

    const total = Object.values(counts).reduce((a, b) => a + b, 0);

    res.json({
      status: counts,
      total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
  },
};
