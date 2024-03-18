export type Reading = {
  moisture: number;
  temp: number;
  ph: number;
  ec: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  [key: string]: number;
};

type ReadingsWithLabels = Record<keyof Reading, string>;

export const initialReading: Reading = {
  moisture: 0,
  temp: 0,
  ph: 0,
  ec: 0,
  nitrogen: 0,
  phosphorus: 0,
  potassium: 0,
};

export const readingLabels: ReadingsWithLabels = {
  nitrogen: "Nitrogen (N) (ppm)",
  phosphorus: "Phosphorus (P) (ppm)",
  potassium: "Potassium (K)",
  temp: "Temperature",
  ph: "pH",
  ec: "EC (mS/cm)",
  moisture: "Moisture",
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

export type ReadingWithDate = Reading & {
  date: Date;
};
