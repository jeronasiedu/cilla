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

const TempGraph = () => {
  const { readings } = useReadings();
  const tempReadings = readings.map((reading) => {
    return {
      temp: reading.temp,
      time: `${reading.date.getMinutes()}:${reading.date.getSeconds()}`,
    };
  });
  return (
    <div className={"w-full h-[20rem] md:h-[25rem]"}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={tempReadings}
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
            dataKey="temp"
            stroke={fieldColors.temp}
            strokeWidth={2}
            name="Temperature"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TempGraph;
