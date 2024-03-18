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

const ECGraph = () => {
  const { readings } = useReadings();
  const ecReadings = readings.map((reading) => {
    return {
      ec: reading.ec,
      time: `${reading.date.getMinutes()}:${reading.date.getSeconds()}`,
    };
  });
  return (
    <div className={"w-full h-[20rem] md:h-[25rem]"}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={ecReadings}
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
            dataKey="ec"
            stroke={fieldColors.ec}
            strokeWidth={2}
            name="EC"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ECGraph;
