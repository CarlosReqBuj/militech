import { Suspense } from "react";
import AnteriorRojo from "@/components/BotonFlechaAnteriorRojo";
import { CardDepartamento } from "@/components/departamentos/CardDepartamento";
import ListaEmpleados from "@/components/empleados/ListaEmpleados";
import { prisma } from "@/lib/prisma";

export default function Proyectos({ params }) {
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
                border-red-600 
                p-4 
                sm:p-8"
            >
                <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
                    <AnteriorRojo />
                </div>

                <h1
                    className="
                    mt-14 
                    sm:mt-12 
                    text-3xl 
                    sm:text-4xl 
                    lg:text-5xl 
                    font-bold 
                    text-red-600 
                    text-center"
                >
                    Proyecto
                </h1>

                <div className="w-full max-w-6xl">
                    <Suspense
                        fallback={
                            <p className="text-center text-red-500">
                                Cargando proyectos...
                            </p>
                        }
                    >
                        <InfoProyectos params={params} />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}

async function InfoProyectos({ params }) {
    const { id } = await params;
    const proyectoId = Number(id);

    const proyecto = await prisma.proyecto.findUnique({
        where: { id: proyectoId },
        include: { departamento: true },
    });

    if (!proyecto) {
        return (
            <p className="text-center text-red-500">Proyecto no encontrado</p>
        );
    }

    const {
        codigo,
        nombre,
        descripcion,
        estado,
        nivelSecreto,
        presupuesto,
        fechaInicio,
        fechaFin,
        departamento,
    } = proyecto;

    const presupuestoFormateado = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
    }).format(Number(presupuesto));

    return (
        <div className="flex w-full flex-col gap-6 sm:gap-8">
            <div>
                <section className="self-start min-w-0 rounded-xl border-4 border-red-500 p-3 sm:p-4">
                    <h2 className="text-xl font-bold text-red-500 sm:text-3xl">
                        {nombre}
                    </h2>
                    <p className="mt-2 text-sm text-gray-300 sm:text-base">
                        Código: {codigo}
                    </p>
                    <p className="mt-2 text-sm text-gray-300 sm:text-base">
                        Descripción: {descripcion || "Sin descripción"}
                    </p>
                    <p className="mt-2 text-sm text-gray-300 sm:text-base">
                        Estado: {estado.replaceAll("_", " ")}
                    </p>
                    <p className="mt-2 text-sm text-gray-300 sm:text-base">
                        Nivel de confidencialidad: {nivelSecreto}
                    </p>
                    <p className="mt-2 text-sm text-gray-300 sm:text-base">
                        Presupuesto: {presupuestoFormateado}
                    </p>
                    <p className="mt-2 text-sm text-gray-300 sm:text-base">
                        Fecha de inicio: {fechaInicio.toLocaleDateString("es-ES")}
                    </p>
                    <p className="mt-2 text-sm text-gray-300 sm:text-base">
                        Fecha de fin: {fechaFin ? fechaFin.toLocaleDateString("es-ES") : "Sin fecha de fin"}
                    </p>
                </section>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:gap-8">
                <section className="self-start min-w-0 rounded-xl border-4 border-red-500 p-3 sm:p-4">
                    <h2 className="mb-4 text-xl font-bold text-red-500">
                        Departamento
                    </h2>
                    <CardDepartamento data={departamento} />
                </section>

                <section className="min-w-0 overflow-x-auto rounded-xl border-4 border-red-500 p-3 sm:p-4">
                    <Suspense
                        fallback={
                            <p className="text-center text-red-500">
                                Cargando empleados...
                            </p>
                        }
                    >
                        <ListaEmpleados proyectoId={proyectoId} />
                    </Suspense>
                </section>
            </div>
        </div>
    );
}
