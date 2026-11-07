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

    const empleados = await prisma.empleado.findMany({});

    const dataSegura = JSON.parse(JSON.stringify(empleados));

    return (
        <p className="mt-5 text-yellow-300 whitespace-pre-wrap font-mono text-sm bg-zinc-900 p-4 rounded-lg border border-yellow-300/30">
            {JSON.stringify(dataSegura, null, 2)}
        </p>
    );
}
