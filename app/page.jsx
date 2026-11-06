import { prisma } from "@/lib/prisma";
import { Suspense } from "react";

export default function Home() {
    return (
        <div>
            <h1 className="text-4xl p-6 text-yellow-300">Militech</h1>
            <Suspense fallback={<p className="p-6">Cargando empleados...</p>}>
                <EmpleadosPage />
            </Suspense>
        </div>
    );
}

async function EmpleadosPage() {
    const empleados = await prisma.empleado.findMany({
        include: { cargo: true, departamento: true },
        orderBy: { cargo: { nivel: "desc" } },
    });

    const vehiculos = await prisma.vehiculo.findMany({
        include: { departamento: true },
    });

    return (
        <>
            <h1>Empleados</h1>
            <ul>
                {empleados.map((e) => (
                    <li key={e.id}>
                        {e.nombre} {e.apellidos} - {e.cargo.nombre} (
                        {e.departamento.nombre})
                    </li>
                ))}
            </ul>
            <br />
            <h1>Vehiculos</h1>
            <ul>
                {vehiculos.map((e) => (
                    <li key={e.id}>
                        {e.matricula} {e.marca} {e.modelo} {e.tipo}
                        {e.operativo} ({e.departamento.nombre})
                    </li>
                ))}
            </ul>
        </>
    );
}
