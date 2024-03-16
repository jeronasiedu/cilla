export type Reading = {
  moisture: number;
  temp: number;
  ph: number;
  ec: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
};

export type SoilParamsPerYield = Reading & {
  seeds: number;
};

export type ReadingWithCrop = Reading & {
  crop: number;
};
