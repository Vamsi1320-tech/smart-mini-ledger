import { useEffect, useMemo, useState } from "react";
import {
    exportToPDF,
    exportToExcel,
    exportToCSV,
} from "../utils/export";

type Transaction = {
    id: number;
    title: string;
    category: string;
    transaction_type: string;
    amount: number;
    created_at: string;
};

type Props = {
    transactions: Transaction[];
    onAdd: () => void;
    onEdit: (transaction: Transaction) => void;
    onDelete: (id: number) => void;
};

const ITEMS_PER_PAGE = 10;

export default function TransactionTable({
    transactions,
    onAdd,
    onEdit,
    onDelete,
}: Props) {
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const categories = [
        "all",
        ...new Set(transactions.map((transaction) => transaction.category)),
    ];

    const filteredTransactions = useMemo(() => {
        return transactions.filter((transaction) => {
            const matchesSearch =
                transaction.title
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                transaction.category
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesType =
                typeFilter === "all" ||
                transaction.transaction_type === typeFilter;

            const matchesCategory =
                categoryFilter === "all" ||
                transaction.category === categoryFilter;

            return (
                matchesSearch &&
                matchesType &&
                matchesCategory
            );
        });
    }, [
        transactions,
        search,
        typeFilter,
        categoryFilter,
    ]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, typeFilter, categoryFilter]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE)
    );

    const paginatedTransactions = filteredTransactions.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="mt-10 rounded-xl bg-white p-6 shadow-lg transition-colors duration-300 dark:bg-slate-800 dark:shadow-slate-950/40">

            {/* Header */}

            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Recent Transactions
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-slate-400">
                        Showing {filteredTransactions.length} of{" "}
                        {transactions.length} transaction(s)
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">

                    <button
                        onClick={() => exportToPDF(filteredTransactions)}
                        className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
                    >
                        📄 PDF
                    </button>

                    <button
                        onClick={() => exportToExcel(filteredTransactions)}
                        className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white transition hover:bg-green-700"
                    >
                        📊 Excel
                    </button>

                    <button
                        onClick={() => exportToCSV(filteredTransactions)}
                        className="rounded-lg bg-slate-700 px-4 py-2 font-semibold text-white transition hover:bg-slate-800"
                    >
                        📑 CSV
                    </button>

                    <button
                        onClick={onAdd}
                        className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
                    >
                        + Add Transaction
                    </button>

                </div>

            </div>

            {/* Filters */}

            <div className="mb-6 grid gap-4 md:grid-cols-3">

                <input
                    type="text"
                    placeholder="🔍 Search title or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-slate-900 transition-colors focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
                />

                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-slate-900 transition-colors focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                >
                    <option value="all">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>

                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-slate-900 transition-colors focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                >
                    {categories.map((category) => (
                        <option
                            key={category}
                            value={category}
                        >
                            {category === "all"
                                ? "All Categories"
                                : category}
                        </option>
                    ))}
                </select>

            </div>

            {/* Table */}

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">

                        <tr className="text-left text-slate-700 dark:text-slate-300">

                            <th className="px-3 py-3">Title</th>
                            <th className="px-3 py-3">Category</th>
                            <th className="px-3 py-3">Type</th>
                            <th className="px-3 py-3">Amount</th>
                            <th className="px-3 py-3">Date</th>
                            <th className="px-3 py-3">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {paginatedTransactions.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="py-8 text-center text-gray-500 dark:text-slate-400"
                                >
                                    No matching transactions found.
                                </td>
                            </tr>
                        ) : (
                            paginatedTransactions.map((transaction) => (
                                <tr
                                    key={transaction.id}
                                    className="border-b border-slate-200 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700/40"
                                >
                                    <td className="px-3 py-4 font-medium text-slate-900 dark:text-white">
                                        {transaction.title}
                                    </td>

                                    <td className="px-3 text-slate-700 dark:text-slate-300">
                                        {transaction.category}
                                    </td>

                                    <td className="px-3">
                                        <span
                                            className={
                                                transaction.transaction_type ===
                                                    "income"
                                                    ? "rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                                    : "rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                            }
                                        >
                                            {transaction.transaction_type}
                                        </span>
                                    </td>

                                    <td className="px-3 font-semibold text-slate-900 dark:text-white">
                                        ₹{" "}
                                        {transaction.amount.toLocaleString(
                                            "en-IN"
                                        )}
                                    </td>

                                    <td className="px-3 text-slate-700 dark:text-slate-300">
                                        {new Date(
                                            transaction.created_at
                                        ).toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>

                                    <td className="px-3">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() =>
                                                    onEdit(transaction)
                                                }
                                                className="rounded bg-yellow-500 px-3 py-1 text-sm font-medium text-white transition hover:bg-yellow-600"
                                            >
                                                ✏️ Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    onDelete(transaction.id)
                                                }
                                                className="rounded bg-red-600 px-3 py-1 text-sm font-medium text-white transition hover:bg-red-700"
                                            >
                                                🗑 Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}

            <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className="text-sm text-gray-600 dark:text-slate-400">
                    Showing{" "}
                    {filteredTransactions.length === 0
                        ? 0
                        : (currentPage - 1) * ITEMS_PER_PAGE + 1}
                    {" - "}
                    {Math.min(
                        currentPage * ITEMS_PER_PAGE,
                        filteredTransactions.length
                    )}
                    {" "}of{" "}
                    {filteredTransactions.length} transactions
                </p>

                <div className="flex flex-wrap gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() =>
                            setCurrentPage((page) => page - 1)
                        }
                        className="rounded-lg border border-slate-300 bg-white px-4 py-2 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                    >
                        Previous
                    </button>

                    {Array.from(
                        { length: totalPages },
                        (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() =>
                                    setCurrentPage(index + 1)
                                }
                                className={`rounded-lg px-4 py-2 transition ${currentPage === index + 1
                                        ? "bg-blue-600 text-white"
                                        : "border border-slate-300 bg-white hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                                    }`}
                            >
                                {index + 1}
                            </button>
                        )
                    )}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() =>
                            setCurrentPage((page) => page + 1)
                        }
                        className="rounded-lg border border-slate-300 bg-white px-4 py-2 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}