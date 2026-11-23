import { Suspense } from "react";
import Anterior from "@/components/BotonFlechaAnterior";
import ListaVehiculos from "@/components/vehiculos/ListaVehiculos";
import BotonAñadirVehiculo from "@/components/vehiculos/BotonAñadirVehiculo";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/permissions";

async function FormularioAñadir() {
    const departamentos = await prisma.departamento.findMany();

    return <BotonAñadirVehiculo departamentos={departamentos} />;
}

export default async function Vehiculos() {
    const usuario = await getCurrentUser();
    const esAdmin = usuario?.role === "ADMIN";

    return (
        <main className="min-h-dvh bg-transparent p-3 sm:p-5">
            <div
                className="
                    relative flex min-h-[calc(100dvh-1.5rem)]
                    sm:min-h-[calc(100dvh-2.5rem)]
                    flex-col items-center gap-6 sm:gap-10
                    rounded-xl border-4 border-yellow-300
                    p-4 sm:p-8
                "
            >
                <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
                    <Anterior />
                </div>

                <h1
                    className="
                    mt-14 sm:mt-12 text-3xl sm:text-4xl
                    lg:text-5xl font-bold text-yellow-300 text-center
                "
                >
                    Vehículos
                </h1>

                {esAdmin && (
                    <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
                        <Suspense
                            fallback={
                                <p className="text-yellow-300 text-sm">
                                    Cargando...
                                </p>
                            }
                        >
                            <FormularioAñadir />
                        </Suspense>
                    </div>
                )}

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
