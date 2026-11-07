import { connection } from "next/server";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";

export default function Departamentos() {
    return (
        <main className="min-h-screen bg-zinc-950 p-5">
            <h1 className="text-5xl font-bold text-yellow-300">
                Departamentos
            </h1>
            <Suspense fallback={<p className="text-yellow-300">Cargando...</p>}>
                <ListaDepartamentos />
            </Suspense>
        </main>
    );
}

async function ListaDepartamentos() {
    await connection();

    const departamentos = await prisma.departamento.findMany({
        include: {
            empleados: true,
            vehiculos: true,
        },
    });

    return (
        <p className="mt-5 text-yellow-300">{JSON.stringify(departamentos)}</p>
    );
}
