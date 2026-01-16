import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MonthlyData } from "../types/dashboard";

interface MonthlyChartProps {
  data: MonthlyData[];
}

const MonthlyChart: React.FC<MonthlyChartProps> = ({ data }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month_name"
          tick={{ fontSize: 12 }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(value: number | undefined) => formatCurrency(value || 0)}
        />
        <Bar dataKey="revenue" fill="#4f46e5" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyChart;
