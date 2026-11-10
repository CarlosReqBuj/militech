"use client";
import Link from "next/link";

const estilo =
    "inline-flex items-center justify-center w-full max-w-xs px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg text-center bg-yellow-300 hover:bg-yellow-200 rounded-lg text-black font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-yellow-300/50 active:scale-95";

export default function BotonGenerico({ href, onClick, children }) {
    if (href) {
        return (
            <Link href={href} className={estilo}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={estilo}>
            {children}
        </button>
    );
}
