export type Reading = {
  moisture: number;
  temp: number;
  ph: number;
  ec: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
};

export const fieldColors: Record<keyof Reading, string> = {
  moisture: "#4CAF50", // Green
  temp: "#ff5107", // Amber
  ph: "#2196F3", // Blue
  ec: "#04eeee", // Deep Orange
  nitrogen: "#9C27B0", // Purple
  phosphorus: "#ffaf02", // Yellow
  potassium: "#795548", // Brown
};

export type SoilParamsPerYield = Reading & {
  seeds: number;
  crop: number;
};

export type ReadingWithCrop = Reading & {
  crop: number;
};
