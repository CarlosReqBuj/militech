"use client";

import { useState } from "react";

export function List({
    prefix,
    data = [],
    columns = [],
    sort,
    direction = "asc",
    actions,
    card,
    children,
}) {
    const Card = card ?? CardEmpty;

    const [orden, setOrden] = useState({
        columna: sort,
        direccion: direction,
    });

    const [busqueda, setBusqueda] = useState("");

    // Protección si la data aún no llega
    const originalData = data ?? [];

    // Ordenamiento seguro (React Compiler se encarga de memorizarlo)
    const orderedData = [...originalData].sort((a, b) => {
        const valorA = a[orden.columna] ?? "";
        const valorB = b[orden.columna] ?? "";

        let resultado = 0;
        if (typeof valorA === "string" && typeof valorB === "string") {
            resultado = valorA.localeCompare(valorB, undefined, {
                sensitivity: "base",
            });
        } else {
            resultado = valorA > valorB ? 1 : valorA < valorB ? -1 : 0;
        }

        return orden.direccion === "asc" ? resultado : -resultado;
    });

    function ordenar(columna) {
        setOrden((actual) => ({
            columna,
            direccion:
                actual.columna === columna && actual.direccion === "asc"
                    ? "desc"
                    : "asc",
        }));
    }

    if (!data)
        return <p className="text-center text-yellow-300">Cargando datos...</p>;

    return (
        <div className="container mx-auto my-4">
            <div>
                <div className="w-full text-yellow-300">{children}</div>

                {/* Buscador y Ordenación */}
                <div className="@container">
                    <div className="my-4 flex w-full flex-col-reverse items-end gap-3 rounded-xl border-2 border-yellow-300 bg-zinc-900 px-4 py-3 @3xl:flex-row @3xl:items-center @3xl:justify-between">
                        <div className="flex w-fit gap-2 rounded-lg border border-yellow-300/30 bg-zinc-950 p-1">
                            {columns.map(({ name, label }) => {
                                const activa = orden.columna === name;
                                return (
                                    <div
                                        key={name}
                                        onClick={() => ordenar(name)}
                                        className={`cursor-pointer select-none rounded-md px-3 py-1 transition duration-200 ${
                                            activa
                                                ? "bg-yellow-300 font-bold text-zinc-950"
                                                : "text-zinc-300 hover:bg-zinc-800 hover:text-yellow-300"
                                        }`}
                                    >
                                        {label}
                                        {activa &&
                                            (orden.direccion === "asc"
                                                ? " ▲"
                                                : " ▼")}
                                    </div>
                                );
                            })}
                        </div>

                        <input
                            type="search"
                            placeholder=" Buscar..."
                            onChange={(e) => {
                                setBusqueda(e.target.value);
                            }}
                            className="rounded-lg border border-yellow-300/30 bg-zinc-950 px-4 py-2 text-zinc-200 placeholder:text-zinc-500 outline-none transition duration-200 focus:border-yellow-300 focus:shadow-md focus:shadow-yellow-300/20"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] items-stretch gap-6">
                    {orderedData
                        .filter((item) => {
                            if (!busqueda.trim()) return true;
                            const texto = busqueda.toLowerCase();
                            return columns.some(({ name }) =>
                                String(item[name] ?? "")
                                    .toLowerCase()
                                    .includes(texto),
                            );
                        })
                        .map((data) => (
                            <Card
                                key={data.id}
                                prefix={prefix}
                                data={data}
                                actions={actions}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

const CardEmpty = () => (
    <div className="flex h-full flex-col rounded-xl border-2 border-yellow-300 bg-zinc-900 p-5 text-zinc-300 shadow-lg shadow-yellow-300/10">
        Coloca aquí el contenido del Card
    </div>
);
