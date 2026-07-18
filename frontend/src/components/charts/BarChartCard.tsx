import { useTheme } from "../../context/ThemeContext";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

type MonthlySummary = {
    month: string;
    income: number;
    expense: number;
};

type Props = {
    data: MonthlySummary[];
};

export default function BarChartCard({ data }: Props) {
    const { theme } = useTheme();

    const isDark = theme === "dark";
    return (
        <div className="rounded-xl bg-white p-6 shadow-lg transition-colors duration-300 dark:bg-slate-800 dark:shadow-slate-950/40">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
                Monthly Income vs Expense
            </h2>

            <div className="h-[420px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 20,
                        }}
                        barCategoryGap="40%"
                        barGap={8}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke={isDark ? "#475569" : "#E5E7EB"}
                        />

                        <XAxis
                            dataKey="month"
                            tick={{
                                fontSize: 14,
                                fill: isDark ? "#CBD5E1" : "#4B5563",
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            tickFormatter={(value) =>
                                value.toLocaleString("en-IN")
                            }
                            tick={{
                                fontSize: 14,
                                fill: isDark ? "#CBD5E1" : "#4B5563",
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
                                color: isDark ? "#FFFFFF" : "#000000",
                                border: "none",
                                borderRadius: "12px",
                                boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                            }}
                            labelStyle={{
                                color: isDark ? "#FFFFFF" : "#111827",
                            }}
                            formatter={(value: number, name) => [
                                `₹ ${value.toLocaleString("en-IN")}`,
                                name,
                            ]}
                        />

                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            wrapperStyle={{
                                color: isDark ? "#E2E8F0" : "#374151",
                            }}
                        />

                        <Bar
                            dataKey="income"
                            name="Income"
                            fill="#22C55E"
                            radius={[8, 8, 0, 0]}
                            maxBarSize={70}
                        />

                        <Bar
                            dataKey="expense"
                            name="Expense"
                            fill="#EF4444"
                            radius={[8, 8, 0, 0]}
                            maxBarSize={70}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}