export type Community = {
  id: string;
  name: string;
  members: number;
  invested: number;
  marginPct: number;
  note: string;
  banner?: string;
};

export type Proposal = {
  id: string;
  title: string;
  date: string;
  status: "Open" | "Passed" | "Rejected";
};

export type Tx = {
  id: string;
  date: string;
  type: "Deposit" | "Withdraw" | "Swap";
  amount: number;
  token: string;
  status: "Pending" | "Confirmed" | "Failed";
};
