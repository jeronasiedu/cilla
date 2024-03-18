import { ReadingWithDate } from "@/shared/entities/reading";
import { createContext } from "react";

export type ReadingsContextProp = {
  readings: ReadingWithDate[];
};

export const ReadingsContext = createContext<ReadingsContextProp>({
  readings: [],
});
