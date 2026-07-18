import { useEffect } from "react";
import { useForm } from "react-hook-form";

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
    } = useForm<TransactionForm>();

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
                created_at: new Date().toISOString().split("T")[0],
            });
        }
    }, [transaction, reset]);

    if (!open) return null;

    const onSubmit = async (data: TransactionForm) => {
        try {
            const payload = {
                ...data,
                amount: Number(data.amount),
                created_at: new Date(data.created_at).toISOString(),
            };

            if (isEdit && transaction) {
                await updateTransaction(transaction.id, payload);
                alert("Transaction Updated Successfully!");
            } else {
                await addTransaction(payload);
                alert("Transaction Added Successfully!");
            }

            reset();
            onClose();
            onSuccess();
        } catch (err) {
            console.error(err);
            alert("Operation Failed");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

            <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl transition-colors duration-300 dark:bg-slate-800">

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
                            {...register("title", {
                                required: true,
                            })}
                            placeholder="Enter title"
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 transition focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
                        />
                    </div>

                    {/* Amount */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Amount
                        </label>

                        <input
                            type="number"
                            {...register("amount", {
                                required: true,
                                valueAsNumber: true,
                            })}
                            placeholder="Enter amount"
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 transition focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                        />
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
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>

                    {/* Category */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Category
                        </label>

                        <input
                            {...register("category", {
                                required: true,
                            })}
                            placeholder="Enter category"
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 transition focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
                        />
                    </div>

                    {/* Date */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Date
                        </label>

                        <input
                            type="date"
                            {...register("created_at", {
                                required: true,
                            })}
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 transition focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                        />
                    </div>

                    {/* Buttons */}

                    <div className="flex justify-end gap-4 pt-2">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg bg-slate-500 px-6 py-3 font-medium text-white transition hover:bg-slate-600"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                        >
                            {isEdit ? "Update" : "Save"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}