import {
    FaArrowDown,
    FaArrowUp,
    FaWallet,
} from "react-icons/fa";

type Props = {
    title: string;
    value: number;
};

export default function SummaryCard({
    title,
    value,
}: Props) {

    const icon =
        title === "Total Income"
            ? <FaArrowUp className="text-2xl text-green-600" />
            : title === "Total Expense"
                ? <FaArrowDown className="text-2xl text-red-600" />
                : <FaWallet className="text-2xl text-blue-600" />;

    return (
        <div className="rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-800">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {title}
                    </p>

                    <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">
                        ₹ {value.toLocaleString("en-IN")}
                    </h2>

                </div>

                {icon}

            </div>

        </div>
    );
}