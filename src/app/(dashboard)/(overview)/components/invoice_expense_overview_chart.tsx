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
import { Invoice } from "@/shared/entities/invoice";
import { Receipt } from "@/shared/entities/receipt";
import { calculateBalanceDue } from "@/shared/utils/balance_due";
import { Timestamp } from "@firebase/firestore";

type Props = {
  invoices: Invoice[];
  receipts: Receipt[];
};

const InvoiceExpenseOverviewChart = ({ invoices, receipts }: Props) => {
  // Function to aggregate data for each month
  const aggregateDataByMonth = (
    data: (Invoice | Receipt)[],
    type: "invoice" | "receipt",
  ) => {
    const aggregatedData = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      amount: 0,
    }));
    data.forEach((item) => {
      let date: Date;
      if (type === "invoice") {
        const invoice = item as Invoice;
        date = (invoice.createdAt as Timestamp).toDate();
      } else {
        const receipt = item as Receipt;
        date = (receipt.uploadedAt as Timestamp).toDate();
      }
      const month = date.getMonth();
      let amount: number;
      if (type === "invoice") {
        amount = calculateBalanceDue(item as Invoice);
      } else {
        // @ts-ignore
        amount = parseFloat(item.total || "");
      }
      aggregatedData[month].amount += amount;
    });
    return aggregatedData;
  };

  // Aggregate invoice and receipt data
  const aggregatedInvoiceData = aggregateDataByMonth(invoices, "invoice");
  const aggregatedReceiptData = aggregateDataByMonth(receipts, "receipt");

  // Merge aggregated data for invoices and receipts
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const data = Array.from({ length: 12 }, (_, i) => ({
    month: months[i],
    invoiceAmount: aggregatedInvoiceData[i].amount,
    receiptAmount: aggregatedReceiptData[i].amount,
  }));

  return (
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
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="invoiceAmount"
          stroke="#8884d8"
          strokeWidth={2}
          name="Invoice Amount"
        />
        <Line
          type="monotone"
          dataKey="receiptAmount"
          stroke="#82ca9d"
          strokeWidth={2}
          name="Receipt Amount"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default InvoiceExpenseOverviewChart;
