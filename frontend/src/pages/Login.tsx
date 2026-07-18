import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

type LoginForm = {
    email: string;
    password: string;
};

export default function Login() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<LoginForm>();

    const onSubmit = async (data: LoginForm) => {
        try {
            // FastAPI OAuth2PasswordRequestForm expects form-urlencoded data
            const formData = new URLSearchParams();
            formData.append("username", data.email);
            formData.append("password", data.password);

            const response = await api.post(
                "/api/auth/login",
                formData,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            window.location.replace("/dashboard");
        } catch (err) {
            console.error(err);
            alert("Invalid email or password");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100">

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

                <h1 className="mb-2 text-center text-4xl font-bold text-blue-600">
                    💰 Smart Mini Ledger
                </h1>

                <p className="mb-8 text-center text-gray-500">
                    Login to continue
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    <div>
                        <label className="mb-2 block font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            {...register("email", { required: true })}
                            placeholder="Enter email"
                            className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            {...register("password", { required: true })}
                            placeholder="Enter password"
                            className="w-full rounded-lg border p-3 focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="mt-6 text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
}