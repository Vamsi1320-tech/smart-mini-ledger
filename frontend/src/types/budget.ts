export interface Budget {
    id: number;
    category: string;
    monthly_limit: number;
    month: number;
    year: number;
    user_id: number;
}

export interface BudgetCreate {
    category: string;
    monthly_limit: number;
    month: number;
    year: number;
}