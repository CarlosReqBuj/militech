import { connection } from "next/server";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import Anterior from "@/components/BotonFlechaAnterior";
import { CardVehiculo } from "@/components/CardVehiculo";
import { List } from "@/components/simpleui";

export default function Vehiculos() {
    return (
        <main className="min-h-screen bg-transparent p-5">
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

    const vehiculos = await prisma.vehiculo.findMany({});

    return (
        <>
            <List
                card={CardVehiculo}
                data={vehiculos}
                columns={[
                    { name: "matricula", label: "Matricula" },
                    { name: "marca", label: "Marca" },
                    { name: "modelo", label: "Modelo" },
                ]}
                sort="matricula"
                direction="asc"
            >
                <div className="text-xl font-bold">Lista empleados</div>
            </List>
        </>
    );
}
