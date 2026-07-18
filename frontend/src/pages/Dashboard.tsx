import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import TransactionTable from "../components/TransactionTable";
import AddTransactionModal from "../components/AddTransactionModal";

import BarChartCard from "../components/charts/BarChartCard";
import PieChartCard from "../components/charts/PieChartCard";
import ExpenseTrendChart from "../components/charts/ExpenseTrendChart";

import BudgetPlanner from "../components/BudgetPlanner";
import BudgetAnalytics from "../components/BudgetAnalytics";
import FinancialInsights from "../components/FinancialInsights";
import AddBudgetModal from "../components/AddBudgetModal";

import {
    getDashboardSummary,
    getCategorySummary,
    getMonthlySummary,
} from "../services/dashboard";

import {
    getTransactions,
    deleteTransaction,
} from "../services/transaction";

import {
    getBudgets,
    deleteBudget,
} from "../services/budget";

import type { Budget } from "../types/budget";

import toast from "react-hot-toast";
import Swal from "sweetalert2";

type Summary = {
    total_income: number;
    total_expense: number;
    balance: number;
};

type Transaction = {
    id: number;
    title: string;
    amount: number;
    transaction_type: string;
    category: string;
    created_at: string;
};

type CategorySummary = {
    category: string;
    total: number;
};

type MonthlySummary = {
    month: string;
    income: number;
    expense: number;
};

export default function Dashboard() {
    const navigate = useNavigate();

    const [summary, setSummary] = useState<Summary | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [categoryData, setCategoryData] = useState<CategorySummary[]>([]);
    const [monthlyData, setMonthlyData] = useState<MonthlySummary[]>([]);
    const [budgets, setBudgets] = useState<Budget[]>([]);

    const [openModal, setOpenModal] = useState(false);

    const [selectedTransaction, setSelectedTransaction] =
        useState<Transaction | undefined>(undefined);

    const [isEdit, setIsEdit] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [budgetModalOpen, setBudgetModalOpen] = useState(false);

    const [selectedBudget, setSelectedBudget] =
        useState<Budget | undefined>(undefined);

    const [isBudgetEdit, setIsBudgetEdit] = useState(false);

    const loadData = async () => {

        setLoading(true);
        setError("");

        try {

            const [
                summaryData,
                transactionData,
                categorySummary,
                monthlySummary,
                budgetData,
            ] = await Promise.all([
                getDashboardSummary(),
                getTransactions(),
                getCategorySummary(),
                getMonthlySummary(),
                getBudgets(),
            ]);

            setSummary(summaryData);
            console.log("Dashboard Summary:", summaryData);
            setTransactions(transactionData);
            setCategoryData(categorySummary);
            setMonthlyData(monthlySummary);
            setBudgets(budgetData);

        } catch (err: any) {

            console.error(err);

            if (err.response?.status === 401) {

                localStorage.removeItem("token");

                toast.error("Session expired. Please login again.");

                navigate("/");

                return;
            }

            setError("Failed to load dashboard.");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {

            navigate("/");

            return;

        }

        loadData();

    }, [navigate]);

    const handleAdd = () => {

        setSelectedTransaction(undefined);

        setIsEdit(false);

        setOpenModal(true);

    };

    const handleEdit = (transaction: Transaction) => {

        setSelectedTransaction(transaction);

        setIsEdit(true);

        setOpenModal(true);

    };

    const handleDelete = async (id: number) => {

        const result = await Swal.fire({
            title: "Delete Transaction?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            reverseButtons: true,
            background: "#1e293b",
            color: "#ffffff",
        });

        if (!result.isConfirmed) return;

        try {

            await deleteTransaction(id);

            toast.success("Transaction deleted successfully!");

            loadData();

        } catch (err: any) {

            console.error(err);

            if (err.response?.status === 401) {

                localStorage.removeItem("token");

                toast.error("Session expired.");

                navigate("/");

                return;

            }

            toast.error("Failed to delete transaction.");

        }

    };

    const handleClose = () => {

        setOpenModal(false);

        setSelectedTransaction(undefined);

        setIsEdit(false);

    };

    const handleAddBudget = () => {

        setSelectedBudget(undefined);

        setIsBudgetEdit(false);

        setBudgetModalOpen(true);

    };

    const handleEditBudget = (budget: Budget) => {

        setSelectedBudget(budget);

        setIsBudgetEdit(true);

        setBudgetModalOpen(true);

    };

    const handleDeleteBudget = async (id: number) => {

        const result = await Swal.fire({
            title: "Delete Budget?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            reverseButtons: true,
            background: "#1e293b",
            color: "#ffffff",
        });

        if (!result.isConfirmed) return;

        try {

            await deleteBudget(id);

            toast.success("Budget deleted successfully!");

            loadData();

        } catch (err) {

            console.error(err);

            toast.error("Failed to delete budget.");

        }

    };

    const handleBudgetClose = () => {

        setBudgetModalOpen(false);

        setSelectedBudget(undefined);

        setIsBudgetEdit(false);

    };

    if (loading) {

        return (

            <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">

                <div className="text-center">

                    <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

                    <h2 className="mt-6 text-2xl font-bold text-slate-700 dark:text-white">
                        Loading Dashboard...
                    </h2>

                </div>

            </div>

        );

    }

    if (error || !summary) {

        return (

            <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">

                <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl dark:bg-slate-800">

                    <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {error || "Unable to load dashboard"}
                    </h2>

                    <button
                        onClick={loadData}
                        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Retry
                    </button>

                </div>

            </div>

        );

    }

    return (

        <>

            <Navbar />

            <div className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900 transition-colors duration-300 sm:px-6 lg:px-8 dark:bg-slate-900 dark:text-slate-100">

                {/* Header */}

                <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                    <div>

                        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
                            Dashboard
                        </h1>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Welcome back 👋 Here's your financial overview.
                        </p>

                    </div>

                    <div className="text-sm text-slate-500 dark:text-slate-400">

                        {new Date().toLocaleDateString("en-IN", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}

                    </div>

                </div>

                {/* Summary Cards */}

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">

                    <SummaryCard
                        title="Total Income"
                        value={summary.total_income}
                    />

                    <SummaryCard
                        title="Total Expense"
                        value={summary.total_expense}
                    />

                    <SummaryCard
                        title="Balance"
                        value={summary.balance}
                    />

                </div>

                {/* Budget Analytics */}

                <div className="mt-10">

                    <BudgetAnalytics
                        budgets={budgets}
                        transactions={transactions}
                    />

                </div>

                {/* Financial Insights */}

                <div className="mt-10">

                    <FinancialInsights
                        budgets={budgets}
                        transactions={transactions}
                        totalIncome={summary.total_income}
                        totalExpense={summary.total_expense}
                    />

                </div>

                {/* Charts */}

                <div className="mt-10 space-y-8">

                    <BarChartCard
                        data={monthlyData}
                    />

                    <ExpenseTrendChart
                        data={monthlyData}
                    />

                </div>

                {/* Pie Chart */}

                <div className="mt-8">

                    <PieChartCard
                        data={categoryData}
                    />

                </div>

                {/* Budget Planner */}

                <div className="mt-10 overflow-hidden rounded-2xl">

                    <BudgetPlanner
                        budgets={budgets}
                        transactions={transactions}
                        onAdd={handleAddBudget}
                        onEdit={handleEditBudget}
                        onDelete={handleDeleteBudget}
                    />

                </div>

                {/* Transactions */}

                <div className="mt-10 overflow-hidden rounded-2xl">

                    <TransactionTable
                        transactions={transactions}
                        onAdd={handleAdd}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                </div>

                {/* Transaction Modal */}

                <AddTransactionModal
                    open={openModal}
                    onClose={handleClose}
                    onSuccess={loadData}
                    transaction={selectedTransaction}
                    isEdit={isEdit}
                />

                {/* Budget Modal */}

                <AddBudgetModal
                    open={budgetModalOpen}
                    onClose={handleBudgetClose}
                    onSuccess={loadData}
                    budget={selectedBudget}
                    isEdit={isBudgetEdit}
                />

            </div>

        </>

    );

}