"use client";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { generateDummyReadings } from "@/shared/utils/random";
import { fieldColors } from "@/shared/entities/reading";

const AnalyticsPage = () => {
  const data = generateDummyReadings(10);
  return (
    <main className={"container pt-18 p-4 pb-10"}>
      <div className={"w-full max-w-6xl mx-auto h-[70vh]"}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={""} />
            <YAxis dataKey={""} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="nitrogen"
              stroke={fieldColors.nitrogen}
              strokeWidth={2}
              name="Nitrogen"
            />
            <Line
              type="monotone"
              dataKey="phosphorus"
              stroke={fieldColors.phosphorus}
              strokeWidth={2}
              name="Phosphorus"
            />
            <Line
              type="monotone"
              dataKey="potassium"
              stroke={fieldColors.potassium}
              strokeWidth={2}
              name="Potassium"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
};

export default AnalyticsPage;
