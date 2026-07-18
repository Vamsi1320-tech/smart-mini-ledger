import api from "./api";

export type TransactionPayload = {
    title: string;
    amount: number;
    transaction_type: string;
    category: string;
    created_at: string;
};

export async function addTransaction(
    data: TransactionPayload
) {
    const response = await api.post(
        "/api/transactions",
        data
    );

    return response.data;
}

export async function getTransactions() {
    const response = await api.get(
        "/api/transactions"
    );

    return response.data;
}

export async function updateTransaction(
    id: number,
    data: TransactionPayload
) {
    const response = await api.put(
        `/api/transactions/${id}`,
        data
    );

    return response.data;
}

export async function deleteTransaction(id: number) {
    const response = await api.delete(
        `/api/transactions/${id}`
    );

    return response.data;
}