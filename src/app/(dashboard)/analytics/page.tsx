"use client";

import NpkGraph from "@/app/(dashboard)/analytics/components/npk_graph";
import MoistureGraph from "@/app/(dashboard)/analytics/components/moisture_graph";
import TempGraph from "@/app/(dashboard)/analytics/components/temp_graph";
import PHGraph from "@/app/(dashboard)/analytics/components/ph_graph";
import ECGraph from "@/app/(dashboard)/analytics/components/ec_graph";

const AnalyticsPage = () => {
  return (
    <main className={"container pt-18 p-4 pb-10 max-w-6xl mx-auto"}>
      <NpkGraph />
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <MoistureGraph />
        <TempGraph />
        <PHGraph />
        <ECGraph />
      </div>
    </main>
  );
};

export default AnalyticsPage;
