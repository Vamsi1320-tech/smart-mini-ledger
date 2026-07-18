import { useTheme } from "../../context/ThemeContext";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Tooltip,
    Legend,
    Cell,
} from "recharts";

type CategorySummary = {
    category: string;
    total: number;
};

type Props = {
    data: CategorySummary[];
};

const COLORS = [
    "#3B82F6",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
];

export default function PieChartCard({ data }: Props) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    console.log("Category Data:", data);

    if (!data || data.length === 0) {
        return (
            <div className="rounded-xl bg-white p-6 shadow-lg transition-colors duration-300 dark:bg-slate-800 dark:shadow-slate-950/40">
                <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
                    Expenses by Category
                </h2>

                <div className="flex h-[350px] items-center justify-center text-gray-500 dark:text-slate-400">
                    No expense data available
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-xl bg-white p-6 shadow-lg transition-colors duration-300 dark:bg-slate-800 dark:shadow-slate-950/40">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
                Expenses by Category
            </h2>

            <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="total"
                            nameKey="category"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            label={({ percent }) =>
                                `${((percent ?? 0) * 100).toFixed(0)}%`
                            }
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            formatter={(value: number) => [
                                `₹ ${value.toLocaleString("en-IN")}`,
                                "Amount",
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
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}