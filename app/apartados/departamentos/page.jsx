import { connection } from "next/server";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";

import Anterior from "@/components/botonFlechaAnterior";
import TarjetaEntidad from "@/components/tarjetaEntidad";
import CarruselTarjetas from "@/components/carruselTargetas";

export default function Departamentos() {
    return (
        <main className="min-h-screen bg-zinc-950 p-5">
            <div className="relative flex min-h-[90vh] flex-col items-center gap-10 rounded-xl border-4 border-yellow-300 p-8">
                <div className="absolute left-6 top-6">
                    <Anterior />
                </div>

                <h1 className="mt-12 text-5xl font-bold text-yellow-300">
                    Departamentos
                </h1>

                <div className="w-full max-w-6xl">
                    <Suspense
                        fallback={
                            <p className="text-center text-yellow-300">
                                Cargando departamentos...
                            </p>
                        }
                    >
                        <ListaDepartamentos />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}

async function ListaDepartamentos() {
    await connection();

    const departamentos = await prisma.departamento.findMany();

    return (
        <CarruselTarjetas porPagina={3}>
            {departamentos.map((d) => (
                <TarjetaEntidad
                    key={d.id}
                    titulo={d.nombre}
                    etiqueta="Departamento"
                    detalles={[{ etiqueta: "ID", valor: d.id }]}
                />
            ))}
        </CarruselTarjetas>
    );
}
