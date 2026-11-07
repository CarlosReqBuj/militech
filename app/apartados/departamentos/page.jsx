import { connection } from "next/server";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";

export default function Departamentos() {
    return (
        <div>
            <h1>Departamentos</h1>
            <Suspense fallback={<p>Cargando departamentos...</p>}>
                <ListaDepartamentos />
            </Suspense>
        </div>
    );
}

async function ListaDepartamentos() {
    await connection();

    const departamentos = await prisma.departamento.findMany();

    return (
        <ul>
            {departamentos.map((d) => (
                <li key={d.id}>{d.nombre}</li>
            ))}
        </ul>
    );
}
