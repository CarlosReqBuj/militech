import Link from "next/link";
import { WifiOff, RefreshCw, ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Sin conexión | Militech",
    description: "Militech no puede conectarse a Internet.",
};

export default function OfflinePage() {
    return (
        <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
            <div className="w-full max-w-lg text-center space-y-8">
                {/* Identidad corporativa */}
                <div className="flex justify-center">
                    <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-yellow-500/10 border border-yellow-500/20">
                        <WifiOff className="w-10 h-10 text-yellow-500" />
                    </div>
                </div>

                {/* Información */}
                <div className="space-y-3">
                    <p className="text-yellow-500 text-xs font-bold tracking-[0.3em] uppercase">
                        Militech Corporation
                    </p>

                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                        Conexión interrumpida
                    </h1>

                    <p className="text-zinc-400 leading-relaxed">
                        No podemos establecer conexión con los servidores de
                        Militech. Comprueba tu conexión a Internet e inténtalo
                        de nuevo.
                    </p>
                </div>

                {/* Estado */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-left">
                    <div className="flex items-center gap-3">
                        <span className="relative flex h-3 w-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-50" />
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
                        </span>

                        <div>
                            <p className="text-sm font-medium text-white">
                                Servidor no disponible
                            </p>
                            <p className="text-xs text-zinc-500">
                                Esperando conexión...
                            </p>
                        </div>
                    </div>
                </div>

                {/* Acciones */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => window.location.reload()}
                        className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-5 py-3 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Reintentar conexión
                    </button>

                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 rounded-lg border border-zinc-700 hover:bg-zinc-900 px-5 py-3 text-zinc-300 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Inicio
                    </Link>
                </div>

                {/* Footer */}
                <p className="text-xs text-zinc-600 tracking-wider">
                    MILITECH CORPORATION · SYSTEM STATUS
                </p>
            </div>
        </main>
    );
}
