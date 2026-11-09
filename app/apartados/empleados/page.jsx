import { connection } from "next/server";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import Anterior from "@/components/botonFlechaAnterior";

export default function Empleados() {
    return (
        <main className="min-h-screen bg-zinc-950 p-5">
            <div className="relative flex min-h-[90vh] flex-col items-center gap-10 rounded-xl border-4 border-yellow-300 p-8">
                <div className="absolute left-6 top-6">
                    <Anterior />
                </div>

                <h1 className="mt-12 text-5xl font-bold text-yellow-300">
                    Empleados
                </h1>

                <div className="w-full max-w-6xl">
                    <Suspense
                        fallback={
                            <p className="text-center text-yellow-300">
                                Cargando empleados...
                            </p>
                        }
                    >
                        <ListaEmpleados />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}

async function ListaEmpleados() {
    await connection();

    let empleados;
    try {
        empleados = await prisma.empleado.findMany({
            include: {
                cargo: true,
                vehiculos: true,
            },
            orderBy: { apellidos: "asc" },
        });
    } catch (error) {
        return (
            <div className="rounded-lg border border-red-500/50 bg-red-950/40 p-4 font-mono text-sm text-red-300">
                <p className="mb-2 font-bold">
                    Error al consultar la base de datos
                </p>
                <p className="whitespace-pre-wrap">
                    {error.code} {error.message}
                </p>
            </div>
        );
    }

    if (empleados.length === 0) {
        return (
            <p className="text-center text-yellow-300/70">
                No hay empleados todavía.
            </p>
        );
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {empleados.map((e) => (
                <div
                    key={e.id}
                    className="rounded-lg border border-yellow-300/30 bg-zinc-900 p-4 text-yellow-100"
                >
                    <p className="text-lg font-bold text-yellow-300">
                        {e.nombre} {e.apellidos}
                    </p>
                    <p className="text-sm text-yellow-100/60">
                        {e.cargo.nombre}
                    </p>

                    <p className="mt-3 text-xs uppercase tracking-wide text-yellow-300/70">
                        Vehículos ({e.vehiculos.length})
                    </p>
                    {e.vehiculos.length === 0 ? (
                        <p className="text-sm text-yellow-100/50">Ninguno</p>
                    ) : (
                        <ul className="text-sm">
                            {e.vehiculos.map((v) => (
                                <li key={v.id}>
                                    {v.modelo}{" "}
                                    <span className="text-yellow-100/50">
                                        ({v.matricula})
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
}
