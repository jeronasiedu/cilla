"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { crops } from "@/shared/crops/data";

export default function OverviewPage() {
  return (
    <main
      className={"min-h-dvh bg-[url('/farm.jpg')] bg-cover bg-center pt-14 p-4"}
      style={{
        backgroundAttachment: "fixed",
      }}
    >
      <div className="flex flex-col items-center justify-center max-w-6xl gap-4 mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-black leading-[1.2] max-w-4xl">
          Real-Time Plant Growth Tracking and AI-Driven Yield Optimization
        </h1>
        <p className="max-w-xl mx-auto md:block md:text-lg font-medium text-gray-600">
          Harness the Power of Technology to Maximize Crop Potential and Harvest
          Prosperity, Every Season.
        </p>
      </div>
      <h3 className={"text-center mt-20 mb-6 capitalize"}>
        Explore Crops and yield data
      </h3>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {crops.map((item, i) => (
          <div
            key={i}
            className={"border flex flex-col gap-4 p-4 rounded-xl bg-white"}
          >
            <h3>{item.name}</h3>
            <div className={"relative w-full aspect-square"}>
              <Image
                src={item.src}
                alt={item.name}
                blurDataURL={item.blur}
                placeholder="blur"
                fill
                className={"rounded-xl"}
              />
            </div>

            <Link
              href={`/predictions/${item.id}`}
              className={"btn btn-primary w-full group mt-auto"}
            >
              <Icon
                icon="solar:map-arrow-right-bold-duotone"
                className="group-hover:animate-wobble"
              />
              View Predictions
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
