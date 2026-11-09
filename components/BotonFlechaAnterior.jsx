"use client";
import { useRouter } from "next/navigation";

export default function Anterior() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            aria-label="Volver"
            className="w-12 h-12 flex items-center justify-center bg-yellow-300 hover:bg-yellow-200 rounded-full text-black transition-all duration-200 hover:shadow-lg hover:shadow-yellow-300/50 active:scale-90"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
            >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
            </svg>
        </button>
    );
}
