import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import Anterior from "@/components/BotonFlechaAnterior";
import DetalleDato from "@/components/DetalleDato";
import ListaVehiculos from "@/components/vehiculos/ListaVehiculos";
import { CardDepartamento } from "@/components/departamentos/CardDepartamento";
import BotonEliminarEmpleado from "@/components/empleados/BotonEliminarEmpleado";
import BotonModificarEmpleado from "@/components/empleados/BotonModificarEmpleado";

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

    const [empleado, departamentos, cargos, vehiculos] = await Promise.all([
        prisma.empleado.findUnique({
            where: { id: empleadoId },
            include: {
                departamento: true,
                cargo: true,
                vehiculos: true,
            },
        }),
        prisma.departamento.findMany({ orderBy: { nombre: "asc" } }),
        prisma.cargo.findMany({ orderBy: { nivel: "asc" } }),
        prisma.vehiculo.findMany({ orderBy: { matricula: "asc" } }),
    ]);

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
            <div
                className="
    flex
    w-full
    flex-col-reverse
    gap-3
    sm:flex-row
    sm:justify-end
    sm:items-center
    sm:gap-4
    mb-2
"
            >
                <div className="w-full sm:w-auto sm:min-w-160px">
                    <BotonEliminarEmpleado
                        id={empleadoId}
                        nombre={`${nombre} ${apellidos}`}
                    />
                </div>

                <div className="w-full sm:w-auto sm:min-w-160px">
                    <BotonModificarEmpleado
                        empleado={{
                            id: empleado.id,
                            nombre,
                            apellidos,
                            alias,
                            email,
                            salario: salario.toString(),
                            activo,
                            departamentoId: empleado.departamentoId,
                            cargoId: empleado.cargoId,
                            vehiculosIds: empleado.vehiculos.map((v) => v.id),
                        }}
                        departamentos={departamentos}
                        cargos={cargos}
                        vehiculos={vehiculos}
                    />
                </div>
            </div>
            <div>
                <section className="self-start min-w-0 rounded-xl border-4 border-yellow-300 p-3 sm:p-4">
                    <h2 className="text-xl font-bold text-yellow-300 sm:text-3xl">
                        {nombre} {apellidos}
                    </h2>
                    <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <DetalleDato etiqueta="Alias">{alias}</DetalleDato>
                        <DetalleDato etiqueta="Cargo">{cargo.nombre}</DetalleDato>
                        <DetalleDato etiqueta="Correo electrónico">{email}</DetalleDato>
                        <DetalleDato etiqueta="Salario anual">
                            {`${salario.toString()} edis`}
                        </DetalleDato>
                        <DetalleDato etiqueta="Fecha de alta">
                            {fechaAlta.toLocaleDateString("es-ES")}
                        </DetalleDato>
                        <DetalleDato
                            etiqueta="Estado laboral"
                            estado={activo ? "correcto" : "error"}
                        >
                            {activo ? "Activo" : "Inactivo"}
                        </DetalleDato>
                    </dl>
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
