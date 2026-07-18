import type { Budget } from "../types/budget";

type Transaction = {
    id: number;
    category: string;
    amount: number;
    transaction_type: string;
};

type Props = {
    budgets: Budget[];
    transactions: Transaction[];
    onAdd: () => void;
    onEdit: (budget: Budget) => void;
    onDelete: (id: number) => void;
};

export default function BudgetPlanner({
    budgets,
    transactions,
    onAdd,
    onEdit,
    onDelete,
}: Props) {
    const calculateSpent = (category: string) => {
        return transactions
            .filter(
                (transaction) =>
                    transaction.transaction_type === "expense" &&
                    transaction.category === category
            )
            .reduce((sum, transaction) => sum + transaction.amount, 0);
    };

    const getProgressColor = (percent: number) => {
        if (percent < 60) return "bg-green-500";
        if (percent < 90) return "bg-yellow-400";
        if (percent <= 100) return "bg-orange-500";
        return "bg-red-600";
    };

    return (
        <div className="mt-10 rounded-xl bg-white p-6 shadow-lg transition-colors duration-300 dark:bg-slate-800 dark:shadow-slate-950/40">

            {/* Header */}

            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Budget Planner
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-slate-400">
                        Track your monthly spending against budgets.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        {budgets.length} Budget{budgets.length !== 1 ? "s" : ""}
                    </span>

                    <button
                        onClick={onAdd}
                        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
                    >
                        + Add Budget
                    </button>

                </div>

            </div>

            {/* Empty State */}

            {budgets.length === 0 ? (

                <div className="rounded-lg border-2 border-dashed border-gray-300 p-10 text-center dark:border-slate-600">

                    <p className="text-lg text-gray-500 dark:text-slate-400">
                        No budgets created yet.
                    </p>

                    <button
                        onClick={onAdd}
                        className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
                    >
                        Create Your First Budget
                    </button>

                </div>

            ) : (

                <div className="space-y-6">

                    {budgets.map((budget) => {

                        const spent = calculateSpent(budget.category);

                        const limit = budget.monthly_limit;

                        const remaining = limit - spent;

                        const percent =
                            limit > 0
                                ? Math.min((spent / limit) * 100, 100)
                                : 0;

                        return (

                            <div
                                key={budget.id}
                                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:shadow-slate-950/40"
                            >

                                {/* Top */}

                                <div className="mb-4 flex items-center justify-between">

                                    <div>

                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                            {budget.category}
                                        </h3>

                                        <p className="text-sm text-gray-500 dark:text-slate-400">
                                            {new Date(
                                                budget.year,
                                                budget.month - 1
                                            ).toLocaleString("default", {
                                                month: "long",
                                            })}{" "}
                                            {budget.year}
                                        </p>

                                    </div>

                                    <div className="text-right">

                                        <p className="text-xl font-bold text-slate-900 dark:text-white">
                                            ₹{spent.toLocaleString("en-IN")}
                                        </p>

                                        <p className="text-sm text-gray-500 dark:text-slate-400">
                                            of ₹{limit.toLocaleString("en-IN")}
                                        </p>

                                    </div>

                                </div>

                                {/* Progress */}

                                <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-slate-700">

                                    <div
                                        className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(percent)}`}
                                        style={{
                                            width: `${percent}%`,
                                        }}
                                    />

                                </div>

                                {/* Footer */}

                                <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                                    <div>

                                        <p className="font-semibold text-slate-900 dark:text-white">
                                            {percent.toFixed(1)}%
                                        </p>

                                        {remaining >= 0 ? (

                                            <p className="text-green-600 dark:text-green-400">
                                                Remaining ₹
                                                {remaining.toLocaleString("en-IN")}
                                            </p>

                                        ) : (

                                            <p className="font-semibold text-red-600 dark:text-red-400">
                                                Exceeded by ₹
                                                {Math.abs(
                                                    remaining
                                                ).toLocaleString("en-IN")}
                                            </p>

                                        )}

                                    </div>

                                    <div>

                                        {percent < 75 ? (
                                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                                ✅ On Track
                                            </span>
                                        ) : percent < 100 ? (
                                            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
                                                ⚠ Near Limit
                                            </span>
                                        ) : (
                                            <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-300">
                                                🚨 Over Budget
                                            </span>
                                        )}

                                    </div>

                                    <div className="flex gap-3">

                                        <button
                                            onClick={() => onEdit(budget)}
                                            className="rounded-lg bg-yellow-500 px-4 py-2 font-medium text-white transition hover:bg-yellow-600"
                                        >
                                            ✏ Edit
                                        </button>

                                        <button
                                            onClick={() => onDelete(budget.id)}
                                            className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
                                        >
                                            🗑 Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        );

                    })}

                </div>

            )}

        </div>
    );
}