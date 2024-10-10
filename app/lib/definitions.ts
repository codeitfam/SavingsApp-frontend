export type Fund = {
  MinimumInvestment: number;
  PK: string;
  Category: string;
  Name: string;
};

export type Transaction = {
  PK: string;
  Type: "suscripción" | "cancelación";
  FundId: string;
  Amount: number;
  Timestamp: string;
};

export type Subscription = {
  userId: number;
  fundId: string
  amount: number;
};

