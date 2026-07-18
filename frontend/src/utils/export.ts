import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export type ExportTransaction = {
    title: string;
    category: string;
    transaction_type: string;
    amount: number;
    created_at: string;
};

// ===================== PDF ======================

export const exportToPDF = (
    transactions: ExportTransaction[]
) => {

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Smart Mini Ledger", 14, 20);

    doc.setFontSize(12);
    doc.text("Transaction Report", 14, 30);

    autoTable(doc, {
        startY: 40,
        head: [[
            "Title",
            "Category",
            "Type",
            "Amount",
            "Date"
        ]],

        body: transactions.map((t) => [
            t.title,
            t.category,
            t.transaction_type,
            `₹ ${t.amount.toLocaleString("en-IN")}`,
            new Date(t.created_at).toLocaleDateString(),
        ]),
    });

    doc.save("Transactions.pdf");
};

// ===================== Excel ======================

export const exportToExcel = (
    transactions: ExportTransaction[]
) => {

    const worksheet = XLSX.utils.json_to_sheet(
        transactions.map((t) => ({
            Title: t.title,
            Category: t.category,
            Type: t.transaction_type,
            Amount: t.amount,
            Date: new Date(
                t.created_at
            ).toLocaleDateString(),
        }))
    );

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Transactions"
    );

    const excelBuffer = XLSX.write(
        workbook,
        {
            bookType: "xlsx",
            type: "array",
        }
    );

    const blob = new Blob(
        [excelBuffer],
        {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
        }
    );

    saveAs(blob, "Transactions.xlsx");
};

// ===================== CSV ======================

export const exportToCSV = (
    transactions: ExportTransaction[]
) => {

    const worksheet = XLSX.utils.json_to_sheet(
        transactions.map((t) => ({
            Title: t.title,
            Category: t.category,
            Type: t.transaction_type,
            Amount: t.amount,
            Date: new Date(
                t.created_at
            ).toLocaleDateString(),
        }))
    );

    const csv = XLSX.utils.sheet_to_csv(worksheet);

    const blob = new Blob(
        [csv],
        {
            type: "text/csv;charset=utf-8;",
        }
    );

    saveAs(blob, "Transactions.csv");
};