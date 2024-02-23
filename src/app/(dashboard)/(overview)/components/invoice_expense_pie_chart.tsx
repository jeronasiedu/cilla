import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type Props = {
  receiptsExpenses: number;
  invoicesExpenses: number;
};

const InvoiceExpensePieChart = ({
  receiptsExpenses,
  invoicesExpenses,
}: Props) => {
  const data = [
    { name: "Receipts", value: receiptsExpenses, color: "#8884d8" },
    { name: "Invoices", value: invoicesExpenses, color: "#82ca9d" },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default InvoiceExpensePieChart;
