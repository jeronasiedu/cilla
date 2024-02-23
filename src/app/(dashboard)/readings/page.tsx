"use client";

import useWeather from "@/shared/hooks/use_weather";
import Spinner from "@/shared/components/spinner";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { formatDate } from "@/shared/utils/date";
import { Timestamp } from "@firebase/firestore";

const ReadingsPage = () => {
  const { loading, weatherData, geoData } = useWeather();

  const readings = [
    {
      name: "Nitrogen (N)",
      value: "60",
    },
    {
      name: "Phosphorus (P)",
      value: "92",
    },
    {
      name: "Potassium (K)",
      value: "15",
    },
    {
      name: "Temperature",
      value: "29 °C",
    },
    {
      name: "Moisture",
      value: "76",
    },
    {
      name: "pH",
      value: "4",
    },
    {
      name: "Electrical Conductivity",
      value: "12",
      unit: "(mS/cm)",
    },
  ];

  return (
    <main className={"container pt-18 p-4 pb-10"}>
      <div className="max-w-6xl mx-auto">
        <h3 className={"mb-4"}>Weather Forecast</h3>
        <div className="w-full max-w-[20rem] aspect-video rounded-xl bg-white border p-4 mb-8">
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
        <h3 className={"mb-3"}>Soil Forecast</h3>
        <div className={"grid md:grid-cols-4 gap-6"}>
          {readings.map((reading, index) => (
            <div
              key={index}
              className={
                "w-full h-[15rem] flex flex-col bg-white border rounded-xl p-4"
              }
            >
              <h4 className={"text-green-600"}>{reading.name}</h4>
              <p className={"text-5xl text-center my-auto"}>
                <span>{reading.value}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ReadingsPage;
