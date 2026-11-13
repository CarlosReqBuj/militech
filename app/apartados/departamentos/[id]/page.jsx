import { Suspense } from "react";
import Anterior from "@/components/BotonFlechaAnterior";
import ListaEmpleados from "@/components/ListaEmpleados";
import ListaVehiculos from "@/components/ListaVehiculos";

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
                    Departamento
                </h1>

                <div className="w-full max-w-6xl">
                    <Suspense
                        fallback={
                            <p className="text-center text-yellow-300">
                                Cargando departamento...
                            </p>
                        }
                    >
                        <InfoDepartamento params={params} />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}

async function InfoDepartamento({ params }) {
    const { id } = await params;
    const departamentoId = Number(id);

    const departamento = await prisma.departamento.findUnique({
        where: { id: departamentoId },
    });

    if (!departamento) {
        return (
            <p className="text-center text-yellow-300">
                Departamento no encontrado
            </p>
        );
    }

    const { nombre, descripcion } = departamento;

    return (
        <div className="flex w-full flex-col gap-6 sm:gap-8">
            <div className="text-center sm:text-left">
                <h2 className="text-center text-xl sm:text-3xl font-bold text-yellow-300">
                    {nombre}
                </h2>
                <p className="text-center mt-2 text-sm sm:text-base text-gray-300">
                    {descripcion}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                <section className="min-w-0 overflow-x-auto rounded-xl border-4 border-yellow-300 p-3 sm:p-4">
                    <Suspense
                        fallback={
                            <p className="text-center text-yellow-300">
                                Cargando empleados...
                            </p>
                        }
                    >
                        <ListaEmpleados departamentoId={departamentoId} />
                    </Suspense>
                </section>

                <section className="min-w-0 overflow-x-auto rounded-xl border-4 border-yellow-300 p-3 sm:p-4">
                    <Suspense
                        fallback={
                            <p className="text-center text-yellow-300">
                                Cargando vehículos...
                            </p>
                        }
                    >
                        <ListaVehiculos departamentoId={departamentoId} />
                    </Suspense>
                </section>
            </div>
        </div>
    );
}
