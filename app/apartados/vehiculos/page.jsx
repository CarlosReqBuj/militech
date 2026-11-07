import { connection } from "next/server";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";

export default function Vehiculos() {
    return (
        <main className="min-h-screen bg-zinc-950 p-5">
            <h1 className="text-5xl font-bold text-yellow-300">Vehículos</h1>
            <Suspense fallback={<p className="text-yellow-300">Cargando...</p>}>
                <ListaVehiculos />
            </Suspense>
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
        });

        return (
            <p className="mt-5 text-yellow-300 whitespace-pre-wrap">
                {JSON.stringify(vehiculos, null, 2)}
            </p>
        );
    } catch (error) {
        return (
            <div className="mt-5 p-4 border border-red-500 rounded bg-red-950/50 text-red-300">
                <h2 className="font-bold text-lg">
                    Error capturado de Prisma:
                </h2>
                <p>{error.message}</p>
                <pre className="text-xs mt-2 overflow-auto">{error.stack}</pre>
            </div>
        );
    }
}
