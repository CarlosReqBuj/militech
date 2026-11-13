import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import Anterior from "@/components/BotonFlechaAnterior";
import ListaVehiculos from "@/components/ListaVehiculos";
import { CardDepartamento } from "@/components/CardDepartamento";
import { prisma } from "@/lib/prisma";

export default function Page({ params }) {
    return (
        <main className="min-h-dvh bg-transparent p-3 sm:p-5">
            <div
                className="
                relative 
                flex 
                min-h-[calc(100dvh-1.5rem)] 
                sm:min-h-[calc(100dvh-2.5rem)] 
                flex-col 
                items-center 
                gap-6 
                sm:gap-10 
                rounded-xl 
                border-4 
                border-yellow-300 
                p-4 
                sm:p-8"
            >
                <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
                    <Anterior />
                </div>

                <h1
                    className="
                    mt-14 
                    sm:mt-12 
                    text-3xl 
                    sm:text-4xl 
                    lg:text-5xl 
                    font-bold 
                    text-yellow-300 
                    text-center"
                >
                    Empleado
                </h1>

                <div className="w-full max-w-6xl">
                    <Suspense
                        fallback={
                            <p className="text-center text-yellow-300">
                                Cargando empleado...
                            </p>
                        }
                    >
                        <InfoEmpleado params={params} />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}

async function InfoEmpleado({ params }) {
    const { id } = await params;
    const empleadoId = Number(id);

    const empleado = await prisma.empleado.findUnique({
        where: { id: empleadoId },
        include: { departamento: true, cargo: true },
    });

    if (!empleado) {
        return (
            <p className="text-center text-yellow-300">
                Empleado no encontrado
            </p>
        );
    }

    const {
        nombre,
        apellidos,
        alias,
        email,
        departamento,
        salario,
        fechaAlta,
        activo,
        cargo,
    } = empleado;

    return (
        <div className="flex w-full flex-col gap-6 sm:gap-8">
            <div>
                <section className="self-start min-w-0 rounded-xl border-4 border-yellow-300 p-3 sm:p-4">
                    <h2 className=" text-xl sm:text-3xl font-bold text-yellow-300">
                        {nombre} {apellidos}
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-gray-300">
                        Alias: {alias}
                    </p>
                    <p className="mt-2 text-sm sm:text-base text-gray-300">
                        Cargo: {cargo.nombre}
                    </p>
                    <p className="mt-2 text-sm sm:text-base text-gray-300">
                        email: {email}
                    </p>
                    <p className="mt-2 text-sm sm:text-base text-gray-300">
                        Salario anual: {salario.toString()} edis
                    </p>
                    <p className="mt-2 text-sm sm:text-base text-gray-300">
                        Fecha de alta: {fechaAlta.toLocaleDateString("es-ES")}
                    </p>
                    <p className="mt-2 text-sm sm:text-base text-gray-300">
                        Estado: {activo ? "activo" : "inactivo"}
                    </p>
                </section>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:gap-8">
                <section className="self-start min-w-0 rounded-xl border-4 border-yellow-300 p-3 sm:p-4">
                    <div className="mb-4 text-xl font-bold text-yellow-300">
                        Departamento
                    </div>
                    <CardDepartamento data={departamento} />
                </section>

                <section className="min-w-0 overflow-x-auto rounded-xl border-4 border-yellow-300 p-3 sm:p-4">
                    <Suspense
                        fallback={
                            <p className="text-center text-yellow-300">
                                Cargando vehículos...
                            </p>
                        }
                    >
                        <ListaVehiculos empleadoId={empleadoId} />
                    </Suspense>
                </section>
            </div>
        </div>
    );
}
