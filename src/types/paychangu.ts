export type LevelCustomization = {
  title: string | null;
  description: string | null;
  logo?: string | null;
};

export type LevelMeta = {
  uuid: string;
  response: string;
};

export type LevelData = {
  amount: number;
  currency: "MWK" | "USD";
  email: string;
  first_name: string;
  last_name: string;
  callback_url: string;
  return_url: string;
  tx_ref: string;
  customization?: LevelCustomization;
  meta?: LevelMeta;
};

// Types for transmitted in the callback triggered by PayChangu
export type LevelAmountSplit = {
  fee_paid_by_customer: number;
  fee_paid_by_merchant: number;
  total_paid_by_customer: number;
  amount_received_by_merchant: number;
};

export type LevelCallbackPayload = {
  event_type: string;
  first_name: string;
  email: string;
  currency: "MWK" | "USD";
  amount: number;
  charge: number;
  amount_split: LevelAmountSplit;
  total_amount_paid: number;
  mode: string;
  type: string;
  status: string;
  reference: string;
  tx_ref: string;
  customization: LevelCustomization;
  meta: LevelMeta | null;
  created_at: string;
  updated_at: string;
};
