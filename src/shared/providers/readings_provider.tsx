"use client";
import { ReadingsContext } from "@/shared/context/readings_context";
import { useEffect, useState } from "react";
import { ReadingWithDate } from "@/shared/entities/reading";
import { collection } from "@firebase/firestore";
import { db } from "@/shared/config/firebase";
import { onSnapshot } from "firebase/firestore";

const ReadingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [readings, setReadings] = useState<ReadingWithDate[]>([]);
  const deviceDataCollection = collection(db, "device_data");

  useEffect(() => {
    const unsubscribe = onSnapshot(deviceDataCollection, (snapshot) => {
      const docs = snapshot.docs.map((d) => {
        const data = d.data();
        const date = new Date(data.documentId);
        return {
          ...data,
          date,
        } as ReadingWithDate;
      });

      docs.sort((a, b) => a.date.getTime() - b.date.getTime());
      setReadings(docs);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ReadingsContext.Provider
      value={{
        readings,
      }}
    >
      {children}
    </ReadingsContext.Provider>
  );
};

export default ReadingsProvider;
