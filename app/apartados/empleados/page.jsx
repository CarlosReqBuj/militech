import { connection } from "next/server";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";

export default function Empleados() {
    return (
        <main className="min-h-screen bg-zinc-950 p-5">
            <h1 className="text-5xl font-bold text-yellow-300">Empleados</h1>
            <Suspense fallback={<p className="text-yellow-300">Cargando...</p>}>
                <ListaEmpleados />
            </Suspense>
        </main>
    );
}

async function ListaEmpleados() {
    await connection();

    const empleados = await prisma.empleado.findMany({
        include: {
            departamento: true,
        },
    });

    return <p className="mt-5 text-yellow-300">{JSON.stringify(empleados)}</p>;
}
