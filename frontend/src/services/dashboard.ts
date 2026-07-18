import api from "./api";

export async function getDashboardSummary() {
    const response = await api.get("/api/dashboard/summary");
    return response.data;
}

export async function getCategorySummary() {
    const response = await api.get("/api/dashboard/category-summary");
    return response.data;
}

export async function getMonthlySummary() {
    const response = await api.get("/api/dashboard/monthly-summary");
    return response.data;
}
