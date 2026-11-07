import { Suspense } from "react";
import { prisma } from "@/lib/prisma";

export default function Vehiculos() {
    return (
        <div>
            <h1>Vehículos</h1>
            <Suspense fallback={<p>Cargando vehículos...</p>}>
                <ListaVehiculos />
            </Suspense>
        </div>
    );
}

async function ListaVehiculos() {
    await connection();

    const vehiculos = await prisma.vehiculo.findMany({
        include: { departamento: true, empleados: true },
        orderBy: [{ tipo: "asc" }, { modelo: "asc" }],
    });

    return (
        <ul>
            {vehiculos.map((v) => (
                <li key={v.id}>
                    {v.marca} {v.modelo} ({v.matricula}) - {v.tipo} -{" "}
                    {v.operativo ? "Operativo" : "No operativo"} (
                    {v.departamento.nombre}) - Empleados con acceso: (
                    {v.empleados.length})
                </li>
            ))}
        </ul>
    );
}
