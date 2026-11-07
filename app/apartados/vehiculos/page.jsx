import { connection } from "next/server";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import Anterior from "@/components/botonFlechaAnterior";

export default function Vehiculos() {
    return (
        <main className="min-h-screen bg-zinc-950 p-5">
            <div className="relative flex min-h-[90vh] flex-col items-center gap-10 rounded-xl border-4 border-yellow-300 p-8">
                <div className="absolute left-6 top-6">
                    <Anterior />
                </div>

                <h1 className="mt-12 text-5xl font-bold text-yellow-300">
                    Vehículos
                </h1>

                <div className="w-full max-w-6xl">
                    <Suspense
                        fallback={
                            <p className="text-center text-yellow-300">
                                Cargando vehículos...
                            </p>
                        }
                    >
                        <ListaVehiculos />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}

async function ListaVehiculos() {
    await connection();

    try {
        const vehiculos = await prisma.vehiculo.findMany({
            include: {
                departamento: true,
                empleados: true,
            },
            orderBy: [{ modelo: "asc" }],
        });

        // Convertimos explícitamente a JSON plano para evitar problemas con Decimal u objetos complejos de Prisma
        const dataSegura = JSON.parse(JSON.stringify(vehiculos));

        return (
            <p className="mt-5 text-yellow-300 whitespace-pre-wrap font-mono text-sm bg-zinc-900 p-4 rounded-lg border border-yellow-300/30">
                {JSON.stringify(dataSegura, null, 2)}
            </p>
        );
    } catch (error) {
        return (
            <div className="mt-5 p-4 border border-red-500 rounded bg-red-950/50 text-red-300">
                <h2 className="font-bold text-lg">
                    Error interno en el servidor:
                </h2>
                <p>{error.message}</p>
                <pre className="text-xs mt-2 overflow-auto">{error.stack}</pre>
            </div>
        );
    }
}
