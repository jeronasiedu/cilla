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
import useReadings from "@/shared/hooks/use_readings";

const PHGraph = () => {
  const { readings } = useReadings();
  const pHReadings = readings.map((reading) => {
    return {
      ph: reading.ph,
      time: `${reading.date.getMinutes()}:${reading.date.getSeconds()}`,
    };
  });

  return (
    <div className={"w-full h-[20rem] md:h-[25rem]"}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={pHReadings}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={"time"} />
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
