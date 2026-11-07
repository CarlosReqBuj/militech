"use client";

import { Children, useState, useEffect } from "react";

const claseFlecha =
    "w-12 h-12 shrink-0 flex items-center justify-center bg-yellow-300 hover:bg-yellow-200 rounded-full text-black transition-all duration-200 hover:shadow-lg hover:shadow-yellow-300/50 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:bg-yellow-300 disabled:active:scale-100";

export default function CarruselTarjetas({
    children,
    porPagina = 3,
    vacio = "No hay datos que mostrar.",
}) {
    const [mounted, setMounted] = useState(false);
    const [pagina, setPagina] = useState(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    const tarjetas = Children.toArray(children);

    // Evita el desajuste de hidratación renderizando un contenedor vacío o esqueleto mientras monta en el cliente
    if (!mounted) {
        return (
            <section className="flex w-full flex-col gap-6 rounded-xl border-4 border-yellow-300 bg-zinc-900 p-6 min-h-[300px]">
                <div className="flex w-full items-center justify-center">
                    <p className="text-yellow-300">Cargando carrusel...</p>
                </div>
            </section>
        );
    }

    const totalPaginas = Math.max(1, Math.ceil(tarjetas.length / porPagina));

    const inicio = pagina * porPagina;
    const visibles = tarjetas.slice(inicio, inicio + porPagina);

    const anterior = () => setPagina((p) => Math.max(0, p - 1));

    const siguiente = () => setPagina((p) => Math.min(totalPaginas - 1, p + 1));

    if (tarjetas.length === 0) {
        return (
            <div className="rounded-xl border-4 border-yellow-300 bg-zinc-900 p-8 text-center">
                <p className="text-lg font-semibold text-yellow-300">{vacio}</p>
            </div>
        );
    }

    return (
        <section className="flex w-full flex-col gap-6 rounded-xl border-4 border-yellow-300 bg-zinc-900 p-6">
            <div className="flex w-full items-center gap-4">
                {/* Flecha anterior */}
                <button
                    type="button"
                    onClick={anterior}
                    disabled={pagina === 0}
                    aria-label="Tarjetas anteriores"
                    className={claseFlecha}
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

                {/* Tarjetas horizontales */}
                <div
                    className="grid min-w-0 flex-1 gap-5"
                    style={{
                        gridTemplateColumns: `repeat(${Math.min(porPagina, visibles.length)}, minmax(0, 1fr))`,
                    }}
                >
                    {visibles}
                </div>

                {/* Flecha siguiente */}
                <button
                    type="button"
                    onClick={siguiente}
                    disabled={pagina >= totalPaginas - 1}
                    aria-label="Tarjetas siguientes"
                    className={claseFlecha}
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
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Paginación */}
            <div className="flex flex-col items-center gap-3">
                <p className="text-sm font-semibold text-yellow-300">
                    Página {pagina + 1} de {totalPaginas}
                </p>

                <div className="flex gap-2">
                    {Array.from({ length: totalPaginas }, (_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setPagina(i)}
                            aria-label={`Ir a la página ${i + 1}`}
                            aria-current={pagina === i ? "page" : undefined}
                            className={`h-2.5 rounded-full transition-all ${
                                pagina === i
                                    ? "w-8 bg-yellow-300"
                                    : "w-2.5 bg-zinc-600 hover:bg-yellow-200"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
