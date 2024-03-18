"use client";
import { useParams } from "next/navigation";
import { crops } from "@/shared/crops/data";
import { useEffect, useState } from "react";
import { SoilParamsPerYield } from "@/shared/entities/reading";
import Spinner from "@/shared/components/spinner";
import { toast } from "sonner";
import { useDesiredCropStore } from "@/app/(dashboard)/predictions/store/desired_crop_store";
import useReadings from "@/shared/hooks/use_readings";

const CropPredictionPage = () => {
  const [data, setData] = useState<{
    yields: number;
    seeds: number;
  }>();

  const { readings } = useReadings();

  const [soilParamsPerYield, setSoilParamsPerYield] =
    useState<SoilParamsPerYield>();

  const { id } = useParams<{
    id: string;
  }>();

  const crop = crops.find((c) => c.id === id);
  const openDesiredCropModal = useDesiredCropStore((state) => state.open);

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
        body: JSON.stringify({
          ...latestReading,
          crop: parseInt(id),
        }),
      });
      const results = await response.json();
      setData({
        seeds: results.seeds,
        yields: results.yield,
      });
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
  return (
    <main className={"container max-w-6xl pt-18 p-8"}>
      <h3 className={"text-center mb-8"}>
        Prediction for {crop?.name} from readings
      </h3>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-8">
        <div
          className={
            "w-full h-[15rem] flex flex-col bg-white border rounded-xl p-4"
          }
        >
          <h4 className={"text-green-600"}>Seed Sown</h4>
          <p className={"text-3xl text-center my-auto"}>{data.seeds}</p>
        </div>
        <div
          className={
            "w-full h-[15rem] flex flex-col bg-white border rounded-xl p-4"
          }
        >
          <h4 className={"text-green-600"}>Crop Yield Estimation(kg/ha)</h4>
          <p className={"text-3xl text-center my-auto"}>
            <span>{data.yields}</span>
          </p>
        </div>
      </div>
      <div
        className={"max-w-6xl mx-auto"}
        onClick={() => {
          openDesiredCropModal((data) => {
            setSoilParamsPerYield(data);
          });
        }}
      >
        <button className={"btn btn-primary ml-auto capitalize"}>
          Find desired estimation
        </button>
      </div>

      {soilParamsPerYield && (
        <div>
          <h3 className={"mb-6"}>Soil Forecast</h3>
          <div className={"mx-auto grid-cols-2 grid md:grid-cols-3 gap-6"}>
            <div
              className={
                "w-full h-[9rem] md:h-[15rem] flex flex-col bg-white border rounded-xl p-4"
              }
            >
              <h4 className={"text-green-600 text-base md:text-xl"}>
                Nitrogen (N) (ppm)
              </h4>
              <p className={"text-3xl md:text-5xl text-center my-auto"}>
                {soilParamsPerYield.nitrogen}
              </p>
            </div>
            <div
              className={
                "w-full h-[9rem] md:h-[15rem] flex flex-col bg-white border rounded-xl p-4"
              }
            >
              <h4 className={"text-green-600 text-base md:text-xl"}>
                Phosphorus (P) (ppm)
              </h4>
              <p className={"text-3xl md:text-5xl text-center my-auto"}>
                {soilParamsPerYield.phosphorus}
              </p>
            </div>
            <div
              className={
                "w-full h-[9rem] md:h-[15rem] flex flex-col bg-white border rounded-xl p-4"
              }
            >
              <h4 className={"text-green-600 text-base md:text-xl"}>
                Potassium (K) (ppm)
              </h4>
              <p className={"text-3xl md:text-5xl text-center my-auto"}>
                {soilParamsPerYield.potassium}
              </p>
            </div>
            <div
              className={
                "w-full h-[9rem] md:h-[15rem] flex flex-col bg-white border rounded-xl p-4"
              }
            >
              <h4 className={"text-green-600 text-base md:text-xl"}>
                Moisture (%)
              </h4>
              <p className={"text-3xl md:text-5xl text-center my-auto"}>
                {soilParamsPerYield.moisture}
              </p>
            </div>
            <div
              className={
                "w-full h-[9rem] md:h-[15rem] flex flex-col bg-white border rounded-xl p-4"
              }
            >
              <h4 className={"text-green-600 text-base md:text-xl"}>
                Temperature
              </h4>
              <p className={"text-3xl md:text-5xl text-center my-auto"}>
                {soilParamsPerYield.temp} °C
              </p>
            </div>
            <div
              className={
                "w-full h-[9rem] md:h-[15rem] flex flex-col bg-white border rounded-xl p-4"
              }
            >
              <h4 className={"text-green-600 text-base md:text-xl"}>pH</h4>
              <p className={"text-3xl md:text-5xl text-center my-auto"}>
                {soilParamsPerYield.ph}
              </p>
            </div>
            <div
              className={
                "w-full  h-[9rem] md:h-[15rem] flex flex-col bg-white border rounded-xl p-4"
              }
            >
              <h4 className={"text-green-600 text-base md:text-xl"}>Seeds</h4>
              <p className={"text-3xl md:text-5xl text-center my-auto"}>
                {soilParamsPerYield.seeds}
              </p>
            </div>
            <div
              className={
                "w-full  h-[9rem] md:h-[15rem] flex flex-col bg-white border rounded-xl p-4"
              }
            >
              <h4 className={"text-green-600 text-base md:text-xl"}>
                EC (mS/cm)
              </h4>
              <p className={"text-3xl md:text-5xl text-center my-auto"}>
                {soilParamsPerYield.ec}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CropPredictionPage;
