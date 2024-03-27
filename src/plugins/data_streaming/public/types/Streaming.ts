/* eslint-disable @typescript-eslint/consistent-type-definitions */
export type Filter = {
  value: string;
};

export type CardType = {
  _id: string;
  index: number;
  name: string;
  stream_name: string;
  destination: string;
  data: string;
  creation_date: string;
  creation_time: string;
  isActive: any;
  enabled: boolean;
};
