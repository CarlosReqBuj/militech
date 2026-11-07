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

    const vehiculos = await prisma.vehiculo.findMany({
        include: {
            departamento: true,
            empleados: true,
        },
    });

    return <p className="mt-5 text-yellow-300">{JSON.stringify(vehiculos)}</p>;
}
