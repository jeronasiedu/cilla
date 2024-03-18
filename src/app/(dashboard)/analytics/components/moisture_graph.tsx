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

const MoistureGraph = () => {
  const { readings } = useReadings();
  const moistureReadings = readings.map((reading) => {
    return {
      moisture: reading.moisture,
      time: `${reading.date.getMinutes()}:${reading.date.getSeconds()}`,
    };
  });
  return (
    <div className={"w-full h-[20rem] md:h-[25rem]"}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={moistureReadings}
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
            dataKey="moisture"
            stroke={fieldColors.moisture}
            strokeWidth={2}
            name="Moisture"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoistureGraph;
