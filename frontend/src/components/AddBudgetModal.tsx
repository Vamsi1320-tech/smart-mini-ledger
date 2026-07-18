import { useEffect, useState } from "react";

import {
    createBudget,
    updateBudget,
} from "../services/budget";

import type { Budget } from "../types/budget";

type Props = {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    budget?: Budget;
    isEdit?: boolean;
};

export default function AddBudgetModal({
    open,
    onClose,
    onSuccess,
    budget,
    isEdit = false,
}: Props) {
    const [category, setCategory] = useState("");
    const [monthlyLimit, setMonthlyLimit] = useState("");
    const [month, setMonth] = useState(
        new Date().getMonth() + 1
    );
    const [year, setYear] = useState(
        new Date().getFullYear()
    );

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (budget) {
            setCategory(budget.category);
            setMonthlyLimit(
                budget.monthly_limit.toString()
            );
            setMonth(budget.month);
            setYear(budget.year);
        } else {
            setCategory("");
            setMonthlyLimit("");
            setMonth(new Date().getMonth() + 1);
            setYear(new Date().getFullYear());
        }
    }, [budget]);

    if (!open) return null;

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (
            !category ||
            !monthlyLimit ||
            Number(monthlyLimit) <= 0
        ) {
            alert("Enter valid details.");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                category,
                monthly_limit: Number(monthlyLimit),
                month,
                year,
            };

            if (isEdit && budget) {
                await updateBudget(
                    budget.id,
                    payload
                );
            } else {
                await createBudget(payload);
            }

            alert(
                isEdit
                    ? "Budget updated successfully!"
                    : "Budget created successfully!"
            );

            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            alert("Failed to save budget.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

            <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl transition-colors duration-300 dark:bg-slate-800">

                <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
                    {isEdit ? "✏️ Edit Budget" : "💰 Add Budget"}
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* Category */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Category
                        </label>

                        <input
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                            placeholder="Food"
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 transition focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
                        />

                    </div>

                    {/* Monthly Limit */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Monthly Limit
                        </label>

                        <input
                            type="number"
                            value={monthlyLimit}
                            onChange={(e) =>
                                setMonthlyLimit(
                                    e.target.value
                                )
                            }
                            placeholder="10000"
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 transition focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                        />

                    </div>

                    {/* Month & Year */}

                    <div className="grid grid-cols-2 gap-4">

                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                Month
                            </label>

                            <input
                                type="number"
                                min={1}
                                max={12}
                                value={month}
                                onChange={(e) =>
                                    setMonth(
                                        Number(
                                            e.target.value
                                        )
                                    )
                                }
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 transition focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                Year
                            </label>

                            <input
                                type="number"
                                value={year}
                                onChange={(e) =>
                                    setYear(
                                        Number(
                                            e.target.value
                                        )
                                    )
                                }
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 transition focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                            />

                        </div>

                    </div>

                    {/* Buttons */}

                    <div className="flex justify-end gap-4 pt-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg bg-slate-500 px-6 py-3 font-medium text-white transition hover:bg-slate-600"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading
                                ? "Saving..."
                                : isEdit
                                    ? "Update"
                                    : "Create"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}