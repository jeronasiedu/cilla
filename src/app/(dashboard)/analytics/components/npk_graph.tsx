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
import React from "react";
import { fieldColors } from "@/shared/entities/reading";
import useReadings from "@/shared/hooks/use_readings";

const NpkGraph = () => {
  const { readings } = useReadings();
  const npkReadings = readings.map((reading) => {
    return {
      nitrogen: reading.nitrogen,
      potassium: reading.potassium,
      phosphorus: reading.phosphorus,
      time: `${reading.date.getMinutes()}:${reading.date.getSeconds()}`,
    };
  });
  return (
    <div className={"w-full h-[20rem] md:h-[40rem]"}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={npkReadings}
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
  );
};

export default NpkGraph;
