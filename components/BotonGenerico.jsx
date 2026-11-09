"use client";
import Link from "next/link";

const estilo =
    "inline-flex items-center justify-center px-8 py-5 text-2xl bg-yellow-300 hover:bg-yellow-200 rounded-lg text-black font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-yellow-300/50 active:scale-90";

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
