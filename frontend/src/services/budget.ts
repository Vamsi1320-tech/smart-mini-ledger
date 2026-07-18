import api from "./api";
import type { Budget, BudgetCreate } from "../types/budget";

export async function getBudgets(): Promise<Budget[]> {
    const res = await api.get("/api/budgets");
    return res.data;
}

export async function createBudget(
    data: BudgetCreate
): Promise<Budget> {
    const res = await api.post("/api/budgets", data);
    return res.data;
}

export async function updateBudget(
    id: number,
    data: BudgetCreate
): Promise<Budget> {
    const res = await api.put(`/api/budgets/${id}`, data);
    return res.data;
}

export async function deleteBudget(id: number) {
    await api.delete(`/api/budgets/${id}`);
}