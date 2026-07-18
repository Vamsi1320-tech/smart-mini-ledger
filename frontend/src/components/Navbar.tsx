import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {

    const navigate = useNavigate();

    const { theme, toggleTheme } = useTheme();

    const [menuOpen, setMenuOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="sticky top-0 z-50 bg-blue-600 text-white shadow-lg">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

                {/* Logo */}

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-2xl">
                        💰
                    </div>

                    <div>

                        <h1 className="text-lg font-bold sm:text-2xl">
                            Smart Mini Ledger
                        </h1>

                        <p className="hidden text-xs text-blue-100 sm:block">
                            Personal Finance Dashboard
                        </p>

                    </div>

                </div>

                {/* Desktop Menu */}

                <div className="hidden items-center gap-4 md:flex">

                    <button
                        onClick={toggleTheme}
                        className="rounded-lg bg-white/20 px-4 py-2 transition duration-300 hover:bg-white/30"
                        title="Toggle Theme"
                    >
                        {theme === "light"
                            ? "🌙 Dark"
                            : "☀️ Light"}
                    </button>

                    <button
                        onClick={logout}
                        className="rounded-lg bg-red-500 px-5 py-2 font-semibold transition duration-300 hover:bg-red-600"
                    >
                        Logout
                    </button>

                </div>

                {/* Mobile Hamburger */}

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="rounded-lg bg-white/20 p-2 transition hover:bg-white/30 md:hidden"
                >
                    {menuOpen ? "✕" : "☰"}
                </button>

            </div>
            {/* Mobile Menu */}

            {menuOpen && (

                <div className="border-t border-white/20 bg-blue-700 md:hidden">

                    <div className="flex flex-col gap-3 p-4">

                        <button
                            onClick={() => {
                                toggleTheme();
                                setMenuOpen(false);
                            }}
                            className="w-full rounded-lg bg-white/20 px-4 py-3 text-left font-medium transition duration-300 hover:bg-white/30"
                        >
                            {theme === "light"
                                ? "🌙 Switch to Dark Mode"
                                : "☀️ Switch to Light Mode"}
                        </button>

                        <button
                            onClick={() => {
                                logout();
                                setMenuOpen(false);
                            }}
                            className="w-full rounded-lg bg-red-500 px-4 py-3 text-left font-semibold transition duration-300 hover:bg-red-600"
                        >
                            🚪 Logout
                        </button>

                    </div>

                </div>

            )}

        </nav>

    );

}