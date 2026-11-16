"use client";
import Link from "next/link";

const estilo =
    "inline-flex items-center justify-center w-full max-w-xs px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg text-center rounded-lg font-semibold transition-all duration-200 active:scale-95";

export default function BotonGenerico({
    href,
    onClick,
    children,
    type = "button",
    disabled = false,
    className = "",
    variante = "amarillo",
}) {
    const variantes = {
        amarillo:
            "bg-yellow-300 hover:bg-yellow-200 text-black hover:shadow-lg hover:shadow-yellow-300/50",
        rojo: "bg-red-500 hover:bg-red-400 text-black hover:shadow-lg hover:shadow-red-500/50",
        secundario: "text-gray-400 underline hover:text-yellow-300",
    };

    const clases = `${estilo} ${variantes[variante]} ${className} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
    }`;

    if (href) {
        return (
            <Link href={href} className={clases}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clases}
        >
            {children}
        </button>
    );
}
