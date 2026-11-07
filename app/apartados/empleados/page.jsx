import { Suspense } from "react";
import { prisma } from "@/lib/prisma";

export default function Empleados() {
    return (
        <div>
            <h1>Empleados</h1>
            <Suspense fallback={<p>Cargando empleados...</p>}>
                <ListaEmpleados />
            </Suspense>
        </div>
    );
}

async function ListaEmpleados() {
    const empleados = await prisma.empleado.findMany({
        include: { cargo: true, departamento: true, vehiculos: true },
        orderBy: { cargo: { nivel: "desc" } },
    });

    return (
        <ul>
            {empleados.map((e) => (
                <li key={e.id}>
                    {e.nombre} {e.apellidos} - {e.cargo.nombre} (
                    {e.departamento.nombre}) - Acceso a tantos vehiculos: (
                    {e.vehiculos.length})
                </li>
            ))}
        </ul>
    );
}
