import { createContext, ReactNode, useContext, useState } from "react";

export type CriticalityLevel = "kritik" | "yuksek" | "orta" | "dusuk";
export type ReportStatus = "beklemede" | "inceleniyor" | "cozuldu";

export interface Report {
  id: string;
  image: string;
  description: string;
  category: string;
  categoryLabel: string;
  latitude: number;
  longitude: number;
  address: string;
  timestamp: number;
  status: ReportStatus;
  criticality: CriticalityLevel;
}

interface ReportContextType {
  reports: Report[];
  addReport: (
    report: Omit<Report, "id" | "timestamp" | "status" | "criticality">,
  ) => void;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

function analyzeCriticality(
  description: string,
  category: string,
): CriticalityLevel {
  const text = description.toLowerCase();
  const criticalWords = [
    "patlak",
    "çökme",
    "yangın",
    "tehlike",
    "acil",
    "kopma",
    "göçük",
    "elektrik çarpması",
  ];
  const highWords = [
    "kırık",
    "delik",
    "su baskını",
    "tıkanık",
    "karanlık",
    "tehlikeli",
    "hasar",
  ];
  const mediumWords = [
    "çatlak",
    "bozuk",
    "sızıntı",
    "arızalı",
    "kötü",
    "yıpranmış",
  ];

  if (criticalWords.some((w) => text.includes(w))) return "kritik";
  if (highWords.some((w) => text.includes(w))) return "yuksek";
  if (mediumWords.some((w) => text.includes(w))) return "orta";
  if (category === "elektrik" || category === "gaz") return "yuksek";
  if (category === "su") return "orta";
  return "dusuk";
}

const SAMPLE_REPORTS: Report[] = [
  {
    id: "1",
    image:
      "https://www.manisadenge.com/images/haber/kirik-ve-dokuk-kaldirimlar-165833-20230609.jpg",
    description:
      "Kaldırımda ciddi kırılmalar var, yayalar tehlikeli şekilde yoldan yürümek zorunda kalıyor.",
    category: "yol",
    categoryLabel: "Yol / Kaldırım",
    latitude: 39.9255,
    longitude: 32.8662,
    address: "Kızılay, Atatürk Bulvarı, Ankara",
    timestamp: Date.now() - 3600000,
    status: "beklemede",
    criticality: "dusuk",
  },
  {
    id: "2",
    image:
      "https://static.birgun.net/resim/haber-detay-resim/2022/01/06/kanalizasyon-sorunu-halki-birlestirdi-964533-5.jpg",
    description:
      "Su borusu sızıntısı yapıyor, sokaklarda su birikintisi oluşmuş.",
    category: "su",
    categoryLabel: "Su / Kanalizasyon",
    latitude: 39.9412,
    longitude: 32.8543,
    address: "Çankaya, Tunalı Hilmi Cad., Ankara",
    timestamp: Date.now() - 7200000,
    status: "inceleniyor",
    criticality: "kritik",
  },
  {
    id: "3",
    image:
      "https://images.caxton.co.za/wp-content/uploads/sites/44/2022/09/2129108973_650474f5db_b-780x470.jpg",
    description: "Sokak lambası arızalı, gece karanlık ve tehlikeli oluyor.",
    category: "elektrik",
    categoryLabel: "Elektrik",
    latitude: 39.9334,
    longitude: 32.8597,
    address: "Bahçelievler, 7. Cadde, Ankara",
    timestamp: Date.now() - 86400000,
    status: "beklemede",
    criticality: "orta",
  },
  {
    id: "4",
    image:
      "https://cdnuploads.aa.com.tr/uploads/Contents/2024/11/16/thumbs_b_c_aa6bf9a04c32e21492e70d2350a49950.jpg?v=210156",
    description: "Çöp konteyneri taşmış, etrafta çöpler dağılmış durumda.",
    category: "cop",
    categoryLabel: "Çöp / Temizlik",
    latitude: 39.9198,
    longitude: 32.8543,
    address: "Ayrancı, Hoşdere Cad., Ankara",
    timestamp: Date.now() - 172800000,
    status: "cozuldu",
    criticality: "yuksek",
  },
  {
    id: "5",
    image:
      "https://gundemartvincom.teimg.com/crop/1280x720/gundemartvin-com/uploads/2024/11/medya/kasim-2024/park-3.jpeg",
    description: "Çocukları için çok tehlikeli.",
    category: "park",
    categoryLabel: "Park / Yeşil Alan",
    latitude: 39.945,
    longitude: 32.848,
    address: "Keçiören, Yeşim Parkı, Ankara",
    timestamp: Date.now() - 259200000,
    status: "inceleniyor",
    criticality: "orta",
  },
];

export function ReportProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<Report[]>(SAMPLE_REPORTS);

  const addReport = (
    report: Omit<Report, "id" | "timestamp" | "status" | "criticality">,
  ) => {
    const criticality = analyzeCriticality(report.description, report.category);
    const newReport: Report = {
      ...report,
      id: Date.now().toString(),
      timestamp: Date.now(),
      status: "beklemede",
      criticality,
    };
    setReports((prev) => [newReport, ...prev]);
  };

  return (
    <ReportContext.Provider value={{ reports, addReport }}>
      {children}
    </ReportContext.Provider>
  );
}

export function useReports() {
  const context = useContext(ReportContext);
  if (!context)
    throw new Error("useReports must be used within ReportProvider");
  return context;
}
