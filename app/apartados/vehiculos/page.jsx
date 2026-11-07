import { connection } from "next/server";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";

import Anterior from "@/components/botonFlechaAnterior";
import TarjetaEntidad from "@/components/tarjetaEntidad";
import CarruselTarjetas from "@/components/carruselTargetas";

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

    const vehiculos = await prisma.vehiculo.findMany({
        include: {
            departamento: true,
            empleados: true, // ¡Ya funciona perfectamente!
        },
        orderBy: [{ modelo: "asc" }],
    });

    if (vehiculos.length === 0) {
        return (
            <div className="rounded-xl border-4 border-yellow-300 bg-zinc-900 p-8 text-center">
                <p className="text-lg font-semibold text-yellow-300">
                    No hay vehículos que mostrar.
                </p>
            </div>
        );
    }

    // Limpiamos los datos para evitar problemas de serialización en SSR
    const dataSegura = JSON.parse(JSON.stringify(vehiculos));

    return (
        <CarruselTarjetas porPagina={3}>
            {dataSegura.map((v) => {
                const listaEmpleados =
                    v.empleados && v.empleados.length > 0
                        ? v.empleados
                              .map((e) => `${e.nombre} ${e.apellidos}`)
                              .join(", ")
                        : "Ninguno";

                return (
                    <TarjetaEntidad
                        key={String(v.id)}
                        titulo={`${v.marca ?? ""} ${v.modelo ?? ""}`}
                        subtitulo={v.matricula ?? "Sin matrícula"}
                        etiqueta="Vehículo"
                        detalles={[
                            { etiqueta: "Tipo", valor: String(v.tipo ?? "") },
                            {
                                etiqueta: "Estado",
                                valor: v.operativo
                                    ? "Operativo"
                                    : "No operativo",
                            },
                            {
                                etiqueta: "Departamento",
                                valor:
                                    v.departamento?.nombre ??
                                    "Sin departamento",
                            },
                            {
                                etiqueta: "Empleados",
                                valor: listaEmpleados,
                            },
                        ]}
                    />
                );
            })}
        </CarruselTarjetas>
    );
}
