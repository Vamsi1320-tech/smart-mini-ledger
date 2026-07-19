import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
    addTransaction,
    updateTransaction,
} from "../services/transaction";

type TransactionForm = {
    title: string;
    amount: number;
    transaction_type: string;
    category: string;
    created_at: string;
};

type Transaction = {
    id: number;
    title: string;
    amount: number;
    transaction_type: string;
    category: string;
    created_at: string;
};

type Props = {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    transaction?: Transaction;
    isEdit?: boolean;
};

export default function AddTransactionModal({
    open,
    onClose,
    onSuccess,
    transaction,
    isEdit = false,
}: Props) {

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<TransactionForm>();

    /* ------------------------- Populate Form ------------------------- */

    useEffect(() => {

        if (transaction) {

            reset({
                title: transaction.title,
                amount: transaction.amount,
                transaction_type: transaction.transaction_type,
                category: transaction.category,
                created_at: transaction.created_at.substring(0, 10),
            });

        } else {

            reset({
                title: "",
                amount: 0,
                transaction_type: "income",
                category: "",
                created_at: new Date()
                    .toISOString()
                    .split("T")[0],
            });

        }

    }, [transaction, reset]);

    /* ------------------------- ESC Key ------------------------- */

    useEffect(() => {

        const handleEsc = (event: KeyboardEvent) => {

            if (event.key === "Escape") {
                onClose();
            }

        };

        window.addEventListener("keydown", handleEsc);

        return () =>
            window.removeEventListener("keydown", handleEsc);

    }, [onClose]);

    if (!open) return null;

    /* ------------------------- Submit ------------------------- */

    const onSubmit = async (data: TransactionForm) => {

        try {

            const payload = {

                title: data.title.trim(),

                amount: Number(data.amount),

                transaction_type: data.transaction_type,

                category: data.category.trim(),

                created_at: new Date(
                    data.created_at
                ).toISOString(),

            };

            if (isEdit && transaction) {

                await updateTransaction(
                    transaction.id,
                    payload
                );

                toast.success("Transaction updated successfully!");

            } else {

                await addTransaction(payload);

                toast.success("Transaction added successfully!");

            }

            reset();

            onClose();

            onSuccess();

        } catch (err: any) {

            console.error(err);

            toast.error(
                err?.response?.data?.detail ??
                err?.message ??
                "Operation failed."
            );

        }

    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl transition-all duration-300 dark:bg-slate-800"
            >
                <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
                    {isEdit ? "✏️ Edit Transaction" : "➕ Add Transaction"}
                </h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    {/* Title */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Title
                        </label>

                        <input
                            autoFocus
                            {...register("title", {
                                required: "Title is required",
                                minLength: {
                                    value: 3,
                                    message: "Title should be at least 3 characters",
                                },
                            })}
                            placeholder="Enter title"
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 transition focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
                        />

                        {errors.title && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Amount */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Amount
                        </label>

                        <input
                            type="number"
                            {...register("amount", {
                                required: "Amount is required",
                                valueAsNumber: true,
                                min: {
                                    value: 1,
                                    message:
                                        "Amount must be greater than zero",
                                },
                            })}
                            placeholder="Enter amount"
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 transition focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                        />

                        {errors.amount && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.amount.message}
                            </p>
                        )}
                    </div>

                    {/* Transaction Type */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Transaction Type
                        </label>

                        <select
                            {...register("transaction_type")}
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 transition focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                        >
                            <option value="income">💰 Income</option>
                            <option value="expense">💸 Expense</option>
                        </select>
                    </div>

                    {/* Category */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Category
                        </label>

                        <input
                            {...register("category", {
                                required: "Category is required",
                                minLength: {
                                    value: 2,
                                    message:
                                        "Category should be at least 2 characters",
                                },
                            })}
                            placeholder="Food, Salary, Shopping..."
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 transition focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
                        />

                        {errors.category && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.category.message}
                            </p>
                        )}
                    </div>

                    {/* Date */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Date
                        </label>

                        <input
                            type="date"
                            {...register("created_at", {
                                required: "Date is required",
                            })}
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 transition focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                        />

                        {errors.created_at && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.created_at.message}
                            </p>
                        )}
                    </div>

                    {/* Buttons */}

                    <div className="flex justify-end gap-4 border-t border-slate-200 pt-6 dark:border-slate-700">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg bg-slate-500 px-6 py-3 font-medium text-white transition hover:bg-slate-600"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSubmitting
                                ? "Saving..."
                                : isEdit
                                    ? "Update Transaction"
                                    : "Save Transaction"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}