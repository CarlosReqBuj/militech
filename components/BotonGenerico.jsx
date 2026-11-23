"use client";
import Link from "next/link";

export default function BotonGenerico({
    href,
    onClick,
    children,
    type = "button",
    disabled = false,
    className = "",
    variante = "amarillo",
    alto = "auto",
    ancho = "100%",
}) {
    const variantes = {
        amarillo: "bg-yellow-300 hover:bg-yellow-200 text-black",
        rojo: "bg-red-500 hover:bg-red-400 text-black",
        secundario: "text-gray-400 underline hover:text-yellow-300",
    };

    const clases = `inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold transition-all duration-200 active:scale-95 ${variantes[variante]} ${className} ${disabled ? "cursor-not-allowed opacity-50" : ""}`;

    const estilo = { height: alto, width: ancho };

    if (href) {
        return (
            <Link href={href} style={estilo} className={clases}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            style={estilo}
            className={clases}
        >
            {children}
        </button>
    );
}
