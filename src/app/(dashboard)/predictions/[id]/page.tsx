"use client";
import { useParams } from "next/navigation";
import { crops } from "@/shared/crops/data";

const CropPredictionPage = () => {
  const { id } = useParams<{
    id: string;
  }>();
  const crop = crops.find((c) => c.id === id);
  return (
    <main className={"container pt-18 p-4"}>
      <h3 className={"text-center"}>
        You selected {crop?.name} for prediction
      </h3>
    </main>
  );
};

export default CropPredictionPage;
