"use client";

import Spinner from "@/shared/components/spinner";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { formatDate } from "@/shared/utils/date";
import { Timestamp } from "@firebase/firestore";
import { useWeather } from "@/shared/hooks/use_weather";
import useReadings from "@/shared/hooks/use_readings";
import { initialReading } from "@/shared/entities/reading";

const ReadingsPage = () => {
  const { loading, weatherData, geoData } = useWeather();
  const { readings: data } = useReadings();

  const latestReading = data.at(-1) || initialReading;

  return (
    <main className={"container pt-18 p-4 pb-10"}>
      <div className="max-w-6xl mx-auto">
        <h3 className={"mb-4"}>Weather Forecast</h3>
        <div className="w-full max-w-[20rem] md:aspect-video rounded-xl bg-white border p-4 mb-8">
          {loading ? (
            <div className={"w-full h-full flex items-center justify-center"}>
              <Spinner />
            </div>
          ) : (
            <div>
              <Image
                src={"/weather_icon.png"}
                alt={"Weather icon"}
                width={100}
                height={100}
              />
              <h1 className={"mt-4 font-medium mb-2"}>{weatherData.temp} °C</h1>
              <div className="flex items-center gap-2 mb-2">
                <Icon
                  icon={weatherData.rainIcon}
                  width={30}
                  className={"text-gray-500"}
                />
                <p className={"font-medium"}>{weatherData.rainDescription}</p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Icon
                  icon={"circum:location-on"}
                  width={30}
                  className={"text-gray-500"}
                />
                <p className={"font-medium"}>{geoData.locationName}</p>
              </div>
              <div className="flex items-center gap-2">
                <Icon
                  icon={"ph:calendar-thin"}
                  width={30}
                  className={"text-gray-500"}
                />
                <p className={"font-medium"}>{formatDate(Timestamp.now())}</p>
              </div>
            </div>
          )}
        </div>
        <h3 className={"mb-6"}>Soil Forecast</h3>
        <div className={"grid grid-cols-2 md:grid-cols-4 gap-6"}>
          <div
            className={
              "w-full h-[9rem] md:h-[15rem] flex flex-col bg-white border rounded-xl p-4"
            }
          >
            <h4 className={"text-green-600 text-base md:text-xl"}>
              Nitrogen (N) (ppm)
            </h4>
            <p className={"text-3xl md:text-5xl text-center my-auto"}>
              {latestReading.nitrogen}
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
              {latestReading.phosphorus}
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
              {latestReading.potassium}
            </p>
          </div>
          <div
            className={
              "w-full h-[9rem] md:h-[15rem] flex flex-col bg-white border rounded-xl p-4"
            }
          >
            <h4 className={"text-green-600 text-base md:text-xl"}>Moisture</h4>
            <p className={"text-3xl md:text-5xl text-center my-auto"}>
              {latestReading.moisture} (%)
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
              {latestReading.temp} °C
            </p>
          </div>
          <div
            className={
              "w-full h-[9rem] md:h-[15rem] flex flex-col bg-white border rounded-xl p-4"
            }
          >
            <h4 className={"text-green-600 text-base md:text-xl"}>pH</h4>
            <p className={"text-3xl md:text-5xl text-center my-auto"}>
              {latestReading.ph}
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
              {latestReading.ec}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReadingsPage;
