import {
    FaChartLine,
    FaHeart,
    FaMoneyBillWave,
    FaWallet,
} from "react-icons/fa";

import type { Budget } from "../types/budget";

type Transaction = {
    title: string;
    category: string;
    amount: number;
    transaction_type: string;
};

type Props = {
    budgets: Budget[];
    transactions: Transaction[];
    totalIncome: number;
    totalExpense: number;
};

export default function FinancialInsights({
    budgets,
    transactions,
    totalIncome,
    totalExpense,
}: Props) {

    const savings = totalIncome - totalExpense;

    const savingsRate =
        totalIncome > 0
            ? (savings / totalIncome) * 100
            : 0;

    const highestExpenseCategory = budgets.length
        ? budgets
            .map((budget) => {

                const spent = transactions
                    .filter(
                        (transaction) =>
                            transaction.transaction_type ===
                            "expense" &&
                            transaction.category === budget.category
                    )
                    .reduce(
                        (sum, transaction) =>
                            sum + transaction.amount,
                        0
                    );

                return {
                    category: budget.category,
                    spent,
                };

            })
            .sort((a, b) => b.spent - a.spent)[0]
        : null;

    const largestExpense = transactions
        .filter(
            (transaction) =>
                transaction.transaction_type === "expense"
        )
        .sort((a, b) => b.amount - a.amount)[0];

    let healthScore = 100;

    if (savingsRate < 50) healthScore -= 20;

    if (budgets.length === 0) healthScore -= 10;

    const exceeded = budgets.filter((budget) => {

        const spent = transactions
            .filter(
                (transaction) =>
                    transaction.transaction_type ===
                    "expense" &&
                    transaction.category === budget.category
            )
            .reduce(
                (sum, transaction) =>
                    sum + transaction.amount,
                0
            );

        return spent > budget.monthly_limit;

    }).length;

    healthScore -= exceeded * 10;

    healthScore = Math.max(0, healthScore);

    const cards = [
        {
            title: "Savings Rate",
            value: `${savingsRate.toFixed(1)}%`,
            subtitle: "Income Saved",
            icon: <FaWallet />,
            color: "text-green-600",
            bg: "bg-green-100 dark:bg-green-900/30",
        },
        {
            title: "Health Score",
            value: `${healthScore}/100`,
            subtitle:
                healthScore >= 80
                    ? "Excellent"
                    : healthScore >= 60
                        ? "Good"
                        : "Needs Improvement",
            icon: <FaHeart />,
            color:
                healthScore >= 80
                    ? "text-green-600"
                    : healthScore >= 60
                        ? "text-yellow-500"
                        : "text-red-600",
            bg:
                healthScore >= 80
                    ? "bg-green-100 dark:bg-green-900/30"
                    : healthScore >= 60
                        ? "bg-yellow-100 dark:bg-yellow-900/30"
                        : "bg-red-100 dark:bg-red-900/30",
        },
        {
            title: "Highest Spending",
            value:
                highestExpenseCategory?.category ?? "-",
            subtitle: highestExpenseCategory
                ? `₹ ${highestExpenseCategory.spent.toLocaleString("en-IN")}`
                : "No Data",
            icon: <FaChartLine />,
            color: "text-orange-600",
            bg: "bg-orange-100 dark:bg-orange-900/30",
        },
        {
            title: "Largest Expense",
            value: largestExpense?.title ?? "-",
            subtitle: largestExpense
                ? `₹ ${largestExpense.amount.toLocaleString("en-IN")}`
                : "No Expense",
            icon: <FaMoneyBillWave />,
            color: "text-red-600",
            bg: "bg-red-100 dark:bg-red-900/30",
        },
    ];

    return (

        <div className="mt-10">

            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                <div>

                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Financial Insights
                    </h2>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        AI-powered overview of your financial health.
                    </p>

                </div>

                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    Smart Analysis
                </span>

            </div>

            {/* Health Progress */}

            <div className="mb-8">

                <div className="mb-2 flex justify-between text-sm font-medium">

                    <span className="text-slate-600 dark:text-slate-300">
                        Financial Health Score
                    </span>

                    <span
                        className={
                            healthScore >= 80
                                ? "text-green-600"
                                : healthScore >= 60
                                    ? "text-yellow-500"
                                    : "text-red-600"
                        }
                    >
                        {healthScore}/100
                    </span>

                </div>

                <div className="h-4 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

                    <div
                        className={`h-full rounded-full transition-all duration-700 ${healthScore >= 80
                                ? "bg-green-500"
                                : healthScore >= 60
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                            }`}
                        style={{
                            width: `${healthScore}%`,
                        }}
                    />

                </div>

            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

                {cards.map((card) => (

                    <div
                        key={card.title}
                        className="rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-800"
                    >

                        <div
                            className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl text-2xl ${card.bg} ${card.color}`}
                        >
                            {card.icon}
                        </div>

                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            {card.title}
                        </h3>

                        <p className="mt-3 truncate text-3xl font-bold text-slate-900 dark:text-white">
                            {card.value}
                        </p>

                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            {card.subtitle}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}