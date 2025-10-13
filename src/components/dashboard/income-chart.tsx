"use client";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", gross: 11200, fee: 336, net: 10864 },
  { month: "Feb", gross: 11500, fee: 345, net: 11155 },
  { month: "Mar", gross: 11800, fee: 354, net: 11446 },
  { month: "Apr", gross: 12000, fee: 360, net: 11640 },
  { month: "May", gross: 12100, fee: 363, net: 11737 },
  { month: "Jun", gross: 12345, fee: 370.35, net: 11974.65 },
];

const chartConfig = {
  net: {
    label: "Net Income",
    color: "hsl(var(--chart-1))",
  },
  gross: {
    label: "Gross Income",
    color: "hsl(var(--chart-2))",
  },
   fee: {
    label: "Service Fee",
    color: "hsl(var(--chart-3))",
  },
};

export function IncomeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Income Overview</CardTitle>
        <CardDescription>Your income for the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart data={chartData} accessibilityLayer>
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                    tickFormatter={(value) => `$${Number(value) / 1000}k`}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="net" fill="var(--color-net)" radius={4} />
            </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
