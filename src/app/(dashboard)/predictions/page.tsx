"use client";

import { SoilParamsPerYield } from "@/shared/entities/reading";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Spinner from "@/shared/components/spinner";
import { crops } from "@/shared/crops/data";
import { useDesiredCropsStore } from "@/app/(dashboard)/predictions/store/desired_crop_store";
import useReadings from "@/shared/hooks/use_readings";

type DataProp = {
  seeds: number;
  yield: number;
  crop: number;
};

type SoilParamsPerYieldsProp = SoilParamsPerYield & {
  cropName: string;
};
const PredictionPage = () => {
  const [data, setData] = useState<DataProp[]>();
  const { readings } = useReadings();

  const [soilParamsPerYield, setSoilParamsPerYield] =
    useState<SoilParamsPerYieldsProp[]>();

  const openDesiredCropsYieldModal = useDesiredCropsStore(
    (state) => state.open,
  );

  useEffect(() => {
    const latestReading = readings.at(-1);
    if (!latestReading) return;
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/get-yield`;
    const fetchData = async () => {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(latestReading),
      });
      const results = await response.json();
      setData(results);
    };
    fetchData()
      .then(() => {})
      .catch((err) => toast.error(err.message));
  }, [readings]);

  if (!data) {
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const modifiedCrops = data.map((c) => {
    const crop = crops.find((crop) => parseInt(crop.id) === c.crop);
    return {
      ...c,
      name: crop?.name,
    };
  });

  return (
    <main className={"container p-8 max-w-7xl mx-auto"}>
      <h4 className={"mb-4"}>Predictions</h4>
      <table className="table-auto w-full text-left border-separate text-sm md:text-base">
        <thead>
          <tr>
            <th className="border px-4 py-2">Crop</th>
            <th className="border px-4 py-2">Seeds</th>
            <th className="border px-4 py-2">Yield</th>
          </tr>
        </thead>
        <tbody>
          {modifiedCrops.map((c) => (
            <tr key={c.crop} className={"font-medium"}>
              <td className="border px-4 py-2 ">{c.name}</td>
              <td className="border px-4 py-2">{c.seeds}</td>
              <td className="border px-4 py-2">{c.yield}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className={"btn btn-primary ml-auto my-8"}
        onClick={() => {
          openDesiredCropsYieldModal((data) => {
            const modifiedData = data.map((d) => {
              const cropName =
                crops.find((c) => parseInt(c.id) === d.crop)?.name || "N/A";
              return {
                ...d,
                cropName,
              } as SoilParamsPerYieldsProp;
            });
            setSoilParamsPerYield(modifiedData);
          });
        }}
      >
        Find Desired Estimations
      </button>

      {soilParamsPerYield && (
        <>
          <h3 className={"mb-4"}>Desired Estimations</h3>
          <div className={"relative overflow-x-auto"}>
            <table className="table-auto w-full text-left text-sm md:text-base">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Crop</th>
                  <th className="border px-4 py-2">Nitrogen (N) (ppm)</th>
                  <th className="border px-4 py-2">Phosphorus (P) (ppm)</th>
                  <th className="border px-4 py-2">Potassium (K) (ppm)</th>
                  <th className="border px-4 py-2">Moisture (%)</th>
                  <th className="border px-4 py-2">Temperature °C</th>
                  <th className="border px-4 py-2">pH</th>
                  <th className="border px-4 py-2">
                    Electrical Conductivity (mS/cm)
                  </th>
                  <th className="border px-4 py-2">Seeds</th>
                </tr>
              </thead>
              <tbody>
                {soilParamsPerYield.map((c) => (
                  <tr key={c.crop} className={"font-medium"}>
                    <td className="border px-4 py-2 ">{c.cropName}</td>
                    <td className="border px-4 py-2 ">{c.nitrogen}</td>
                    <td className="border px-4 py-2 ">{c.phosphorus}</td>
                    <td className="border px-4 py-2 ">{c.potassium}</td>
                    <td className="border px-4 py-2 ">{c.moisture}</td>
                    <td className="border px-4 py-2 ">{c.temp}</td>
                    <td className="border px-4 py-2 ">{c.ph}</td>
                    <td className="border px-4 py-2 ">{c.ec}</td>
                    <td className="border px-4 py-2 ">{c.seeds}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
};

export default PredictionPage;
