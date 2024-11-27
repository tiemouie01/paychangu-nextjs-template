export type LevelCustomization = {
  title: string;
  description: string;
};

export type LevelMeta = {
  uuid: string;
  response: string;
};

export type LevelData = {
  amount: number;
  currency: string;
  email: string;
  first_name: string;
  last_name: string;
  callback_url: string;
  return_url: string;
  tx_ref: string;
  customization?: LevelCustomization;
  meta?: LevelMeta;
};
