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
import { fieldColors } from "@/shared/entities/reading";
import React from "react";
import { generateDummyReadings } from "@/shared/utils/random";

const PHGraph = () => {
  const data = generateDummyReadings(15);
  return (
    <div className={"w-full h-[20rem] md:h-[25rem]"}>
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
            dataKey="ph"
            stroke={fieldColors.ph}
            strokeWidth={2}
            name="pH"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PHGraph;
