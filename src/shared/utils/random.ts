import { Reading } from "@/shared/entities/reading";

const getRandomNumber = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};
const generateDummyReading = (): Reading => {
  return {
    moisture: getRandomNumber(0, 100),
    temp: getRandomNumber(0, 50),
    ph: getRandomNumber(0, 14),
    ec: getRandomNumber(0, 5),
    nitrogen: getRandomNumber(0, 100),
    phosphorus: getRandomNumber(0, 100),
    potassium: getRandomNumber(0, 100),
  };
};

export const generateDummyReadings = (count: number): Reading[] => {
  const dummyReadings: Reading[] = [];
  for (let i = 0; i < count; i++) {
    dummyReadings.push(generateDummyReading());
  }
  return dummyReadings;
};
