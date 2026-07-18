import {
    FaBullseye,
    FaChartPie,
    FaMoneyBillWave,
    FaWallet,
    FaCheckCircle,
    FaExclamationTriangle,
} from "react-icons/fa";

import type { Budget } from "../types/budget";

type Transaction = {
    amount: number;
    category: string;
    transaction_type: string;
};

type Props = {
    budgets: Budget[];
    transactions: Transaction[];
};

export default function BudgetAnalytics({
    budgets,
    transactions,
}: Props) {

    const budgetCategories = budgets.map(
        (budget) => budget.category
    );

    const totalBudget = budgets.reduce(
        (sum, budget) => sum + budget.monthly_limit,
        0
    );

    const totalSpent = transactions
        .filter(
            (transaction) =>
                transaction.transaction_type === "expense" &&
                budgetCategories.includes(transaction.category)
        )
        .reduce(
            (sum, transaction) =>
                sum + transaction.amount,
            0
        );

    const remaining = totalBudget - totalSpent;

    const usage =
        totalBudget > 0
            ? (totalSpent / totalBudget) * 100
            : 0;

    const onTrack = budgets.filter((budget) => {

        const spent = transactions
            .filter(
                (transaction) =>
                    transaction.transaction_type === "expense" &&
                    transaction.category === budget.category
            )
            .reduce(
                (sum, transaction) =>
                    sum + transaction.amount,
                0
            );

        return spent <= budget.monthly_limit;

    }).length;

    const exceeded = budgets.length - onTrack;

    const cards = [
        {
            title: "Total Budget",
            value: totalBudget,
            icon: <FaWallet />,
            color: "text-blue-600",
            bg: "bg-blue-100 dark:bg-blue-900/30",
        },
        {
            title: "Budget Spent",
            value: totalSpent,
            icon: <FaMoneyBillWave />,
            color: "text-red-600",
            bg: "bg-red-100 dark:bg-red-900/30",
        },
        {
            title: "Remaining",
            value: remaining,
            icon: <FaBullseye />,
            color:
                remaining >= 0
                    ? "text-green-600"
                    : "text-red-600",
            bg:
                remaining >= 0
                    ? "bg-green-100 dark:bg-green-900/30"
                    : "bg-red-100 dark:bg-red-900/30",
        },
        {
            title: "Usage",
            value: `${usage.toFixed(1)}%`,
            icon: <FaChartPie />,
            color:
                usage <= 100
                    ? "text-purple-600"
                    : "text-red-600",
            bg:
                usage <= 100
                    ? "bg-purple-100 dark:bg-purple-900/30"
                    : "bg-red-100 dark:bg-red-900/30",
        },
        {
            title: "On Track",
            value: onTrack,
            icon: <FaCheckCircle />,
            color: "text-green-600",
            bg: "bg-green-100 dark:bg-green-900/30",
        },
        {
            title: "Exceeded",
            value: exceeded,
            icon: <FaExclamationTriangle />,
            color: "text-orange-600",
            bg: "bg-orange-100 dark:bg-orange-900/30",
        },
    ];

    return (
        <div className="mt-10">

            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                <div>

                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Budget Analytics
                    </h2>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Monitor your monthly budget performance.
                    </p>

                </div>

                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                    {budgets.length} Active Budget
                    {budgets.length !== 1 ? "s" : ""}
                </span>

            </div>

            <div className="mb-8">

                <div className="mb-2 flex justify-between text-sm font-medium">

                    <span className="text-slate-600 dark:text-slate-300">
                        Overall Budget Usage
                    </span>

                    <span
                        className={
                            usage <= 100
                                ? "text-green-600"
                                : "text-red-600"
                        }
                    >
                        {usage.toFixed(1)}%
                    </span>

                </div>

                <div className="h-4 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

                    <div
                        className={`h-full rounded-full transition-all duration-700 ${usage <= 70
                            ? "bg-green-500"
                            : usage <= 100
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                        style={{
                            width: `${Math.min(usage, 100)}%`,
                        }}
                    />

                </div>

            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">

                {cards.map((card) => (

                    <div
                        key={card.title}
                        className="rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-800"
                    >

                        <div className="mb-5 flex items-center justify-between">

                            <div
                                className={`rounded-xl p-3 text-2xl ${card.bg} ${card.color}`}
                            >
                                {card.icon}
                            </div>

                        </div>

                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            {card.title}
                        </p>

                        <h3 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">

                            {card.title === "On Track" ||
                                card.title === "Exceeded"
                                ? card.value
                                : typeof card.value === "number"
                                    ? `₹ ${card.value.toLocaleString("en-IN")}`
                                    : card.value}

                        </h3>

                    </div>

                ))}

            </div>

        </div>
    );
}