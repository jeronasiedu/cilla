import { useContext } from "react";
import { ReadingsContext } from "@/shared/context/readings_context";

const useReadings = () => {
  const readingsContext = useContext(ReadingsContext);
  if (!readingsContext) {
    throw new Error("readingsContext must be initialised in readingsProvider");
  }
  return readingsContext;
};

export default useReadings;
