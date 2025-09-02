import { Community, Proposal, Tx } from "./types";

export const communities: Community[] = [
  {
    id: "southend",
    name: "Southend-on-Sea, Essex",
    members: 15182,
    invested: 1_500_000,
    marginPct: 10,
    note: "£36.31m projected total margin",
    banner:
      "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "camden",
    name: "Camden, London",
    members: 12240,
    invested: 1_220_000,
    marginPct: 9.5,
    note: "High MSME density",
    banner:
      "https://images.unsplash.com/photo-1558980394-0c4b4e7e2c58?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "manchester",
    name: "Manchester",
    members: 18750,
    invested: 1_860_000,
    marginPct: 10.2,
    note: "Growing reconsolidation demand",
    banner:
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "bristol",
    name: "Bristol",
    members: 10210,
    invested: 980_000,
    marginPct: 9.8,
    note: "Green projects pipeline",
    banner:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1600&auto=format&fit=crop",
  },
];

export const communityGrowth: Record<
  string,
  { month: string; members: number }[]
> = {
  southend: [
    { month: "Jan", members: 14000 },
    { month: "Feb", members: 14220 },
    { month: "Mar", members: 14560 },
    { month: "Apr", members: 14820 },
    { month: "May", members: 14990 },
    { month: "Jun", members: 15080 },
    { month: "Jul", members: 15182 },
  ],
  camden: [
    { month: "Jan", members: 11300 },
    { month: "Feb", members: 11560 },
    { month: "Mar", members: 11740 },
    { month: "Apr", members: 11980 },
    { month: "May", members: 12050 },
    { month: "Jun", members: 12130 },
    { month: "Jul", members: 12240 },
  ],
  manchester: [
    { month: "Jan", members: 17000 },
    { month: "Feb", members: 17320 },
    { month: "Mar", members: 17700 },
    { month: "Apr", members: 18120 },
    { month: "May", members: 18400 },
    { month: "Jun", members: 18640 },
    { month: "Jul", members: 18750 },
  ],
  bristol: [
    { month: "Jan", members: 9500 },
    { month: "Feb", members: 9600 },
    { month: "Mar", members: 9700 },
    { month: "Apr", members: 9870 },
    { month: "May", members: 9980 },
    { month: "Jun", members: 10070 },
    { month: "Jul", members: 10210 },
  ],
};

export const allocation: Record<string, { name: string; value: number }[]> = {
  southend: [
    { name: "MSME Loans", value: 55 },
    { name: "Reconsolidation", value: 30 },
    { name: "Reserve & Ops", value: 15 },
  ],
  camden: [
    { name: "MSME Loans", value: 60 },
    { name: "Reconsolidation", value: 25 },
    { name: "Reserve & Ops", value: 15 },
  ],
  manchester: [
    { name: "MSME Loans", value: 52 },
    { name: "Reconsolidation", value: 33 },
    { name: "Reserve & Ops", value: 15 },
  ],
  bristol: [
    { name: "MSME Loans", value: 50 },
    { name: "Reconsolidation", value: 35 },
    { name: "Reserve & Ops", value: 15 },
  ],
};

export const proposals: Record<string, Proposal[]> = {
  southend: [
    {
      id: "P-101",
      title: "Fund Local Bakery Co. (£50k MSME Loan)",
      date: "2025-08-01",
      status: "Open",
    },
    {
      id: "P-099",
      title: "Green Retrofit Grants (Phase 2)",
      date: "2025-07-22",
      status: "Passed",
    },
    {
      id: "P-095",
      title: "Community Arts Microgrants",
      date: "2025-07-05",
      status: "Rejected",
    },
  ],
  camden: [
    {
      id: "P-210",
      title: "Creative Hub Expansion",
      date: "2025-08-05",
      status: "Open",
    },
    {
      id: "P-207",
      title: "Micro-lending to Street Vendors",
      date: "2025-07-15",
      status: "Passed",
    },
    {
      id: "P-199",
      title: "Tech Incubator Seed",
      date: "2025-07-03",
      status: "Passed",
    },
  ],
  manchester: [
    {
      id: "P-300",
      title: "Equipment Lease Pool",
      date: "2025-08-08",
      status: "Open",
    },
    {
      id: "P-298",
      title: "Reconsolidation Outreach",
      date: "2025-07-18",
      status: "Passed",
    },
    {
      id: "P-294",
      title: "Job Training Vouchers",
      date: "2025-07-02",
      status: "Passed",
    },
  ],
  bristol: [
    {
      id: "P-400",
      title: "Solar Co-ops Financing",
      date: "2025-08-03",
      status: "Open",
    },
    {
      id: "P-393",
      title: "SME Green Loans",
      date: "2025-07-21",
      status: "Passed",
    },
    {
      id: "P-389",
      title: "Community Gardens",
      date: "2025-07-01",
      status: "Rejected",
    },
  ],
};

export const growthSeries = [
  { month: "Jan", value: 2.1 },
  { month: "Feb", value: 3.4 },
  { month: "Mar", value: 5.0 },
  { month: "Apr", value: 7.2 },
  { month: "May", value: 9.8 },
  { month: "Jun", value: 12.4 },
  { month: "Jul", value: 15.1 },
];

export const wallet = {
  balance: 12840.77,
  reserved: 2100.0,
  rewards: 382.15,
  addr: "0xBucC...9031",
};

export const txHistory: Tx[] = [
  {
    id: "TX-1",
    date: "2025-08-10",
    type: "Deposit",
    amount: 500,
    token: "BUCC",
    status: "Confirmed",
  },
  {
    id: "TX-2",
    date: "2025-08-09",
    type: "Swap",
    amount: 250,
    token: "USDC→BUCC",
    status: "Confirmed",
  },
  {
    id: "TX-3",
    date: "2025-08-02",
    type: "Withdraw",
    amount: 300,
    token: "BUCC",
    status: "Pending",
  },
];

export const savings = [
  {
    plan: "Community Pool A",
    apy: 6.2,
    balance: 3200,
    since: "2025-02-01",
    lockDays: 90,
    daysLeft: 28,
  },
  {
    plan: "Long-term Saver+",
    apy: 7.5,
    balance: 5200,
    since: "2024-11-14",
    lockDays: 180,
    daysLeft: 52,
  },
];

export const personalSavingsSeries = [
  { month: "Mar", value: 3100 },
  { month: "Apr", value: 3380 },
  { month: "May", value: 3600 },
  { month: "Jun", value: 4000 },
  { month: "Jul", value: 4800 },
  { month: "Aug", value: 5400 },
];

export const loans = [
  {
    id: "LN-1001",
    product: "MSME Growth",
    amount: 12000,
    rate: 0.11,
    status: "Active",
    nextDue: "2025-08-28",
    paidPct: 42,
  },
  {
    id: "LN-1002",
    product: "Reconsolidation",
    amount: 4500,
    rate: 0.095,
    status: "Active",
    nextDue: "2025-08-22",
    paidPct: 64,
  },
  {
    id: "LN-1003",
    product: "Equipment Lease",
    amount: 7800,
    rate: 0.108,
    status: "Completed",
    nextDue: "-",
    paidPct: 100,
  },
];

export const tokenPrice = {
  symbol: "BUCC",
  price: 1.07, // mock GBP
  change24h: +2.4,
  marketCap: 15_200_000,
};
