export type TMeta = {
  page: number;
  limit: number;
  total: number;
};

export type TJsonData<T> = {
  statusCode: number;
  message: string;
  meta?: TMeta;
  data: T;
};
