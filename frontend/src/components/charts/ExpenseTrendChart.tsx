import { useTheme } from "../../context/ThemeContext";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
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

export default function ExpenseTrendChart({
    data,
}: Props) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="mt-10 rounded-xl bg-white p-6 shadow-lg transition-colors duration-300 dark:bg-slate-800 dark:shadow-slate-950/40">

            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
                Monthly Expense Trend
            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <LineChart data={data}>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={isDark ? "#475569" : "#E5E7EB"}
                    />

                    <XAxis
                        dataKey="month"
                        tick={{
                            fill: isDark ? "#CBD5E1" : "#4B5563",
                        }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        tick={{
                            fill: isDark ? "#CBD5E1" : "#4B5563",
                        }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) =>
                            value.toLocaleString("en-IN")
                        }
                    />

                    <Tooltip
                        formatter={(value, name) => [
                            `₹ ${Number(value ?? 0).toLocaleString("en-IN")}`,
                            name,
                        ]}
                        contentStyle={{
                            backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
                            color: isDark ? "#FFFFFF" : "#111827",
                            border: "none",
                            borderRadius: "12px",
                            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                        }}
                        labelStyle={{
                            color: isDark ? "#FFFFFF" : "#111827",
                        }}
                    />

                    <Legend
                        wrapperStyle={{
                            color: isDark ? "#E2E8F0" : "#374151",
                        }}
                    />

                    <Line
                        type="monotone"
                        dataKey="income"
                        stroke="#22C55E"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                        activeDot={{ r: 7 }}
                        name="Income"
                    />

                    <Line
                        type="monotone"
                        dataKey="expense"
                        stroke="#EF4444"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                        activeDot={{ r: 7 }}
                        name="Expense"
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    );
}