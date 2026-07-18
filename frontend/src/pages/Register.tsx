import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

type RegisterForm = {
    full_name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function Register() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<RegisterForm>();

    const password = watch("password");

    const onSubmit = async (data: RegisterForm) => {
        try {
            await api.post("/api/auth/register", {
                full_name: data.full_name,
                email: data.email,
                password: data.password,
            });

            alert("Registration successful! Please login.");

            navigate("/");
        } catch (error: any) {
            console.error(error);

            alert(
                error?.response?.data?.detail ||
                "Registration failed."
            );
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100">

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

                <h1 className="mb-2 text-center text-4xl font-bold text-blue-600">
                    💰 Smart Mini Ledger
                </h1>

                <p className="mb-8 text-center text-gray-500">
                    Create your account
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    <div>
                        <label className="mb-2 block font-medium">
                            Full Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            {...register("full_name", {
                                required: "Name is required",
                            })}
                            className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
                        />

                        {errors.full_name && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.full_name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                            className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
                        />

                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters",
                                },
                            })}
                            className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
                        />

                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            placeholder="Confirm password"
                            {...register("confirmPassword", {
                                required:
                                    "Please confirm your password",
                                validate: (value) =>
                                    value === password ||
                                    "Passwords do not match",
                            })}
                            className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
                        />

                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        {isSubmitting
                            ? "Creating Account..."
                            : "Register"}
                    </button>

                </form>

                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}