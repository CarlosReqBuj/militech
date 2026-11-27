import { Suspense } from "react";
import Anterior from "@/components/BotonFlechaAnterior";
import DetalleDato from "@/components/DetalleDato";
import { prisma } from "@/lib/prisma";
import ListaEmpleados from "@/components/empleados/ListaEmpleados";
import { CardDepartamento } from "@/components/departamentos/CardDepartamento";
import { Modal } from "@/components/simpleui";
import BotonEliminarVehiculo from "@/components/vehiculos/BotonEliminarVehiculo";
import BotonModificarVehiculo from "@/components/vehiculos/BotonModificarVehiculo";

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
                    Vehículo
                </h1>

                <div className="w-full max-w-6xl">
                    <Suspense
                        fallback={
                            <p className="text-center text-yellow-300">
                                Cargando vehículo...
                            </p>
                        }
                    >
                        <InfoVehiculo params={params} />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}

async function InfoVehiculo({ params }) {
    const { id } = await params;
    const vehiculoId = Number(id);

    const [vehiculo, departamentos] = await Promise.all([
        prisma.vehiculo.findUnique({
            where: { id: vehiculoId },
            include: { departamento: true },
        }),
        prisma.departamento.findMany({ orderBy: { nombre: "asc" } }),
    ]);

    if (!vehiculo) {
        return (
            <p className="text-center text-yellow-300">
                Vehículo no encontrado
            </p>
        );
    }

    const { matricula, marca, modelo, tipo, operativo, departamento, foto } =
        vehiculo;

    return (
        <div className="flex w-full flex-col gap-6 sm:gap-8">
            <div
                className="
                mb-2
                flex
                w-full
                flex-col-reverse
                gap-3
                sm:flex-row
                sm:items-center
                sm:justify-end
                sm:gap-4"
            >
                <div className="w-full sm:w-auto sm:min-w-160px">
                    <BotonEliminarVehiculo
                        id={vehiculoId}
                        matricula={matricula}
                    />
                </div>

                <div className="w-full sm:w-auto sm:min-w-160px">
                    <BotonModificarVehiculo
                        vehiculo={{
                            id: vehiculo.id,
                            matricula,
                            marca,
                            modelo,
                            tipo,
                            operativo,
                            foto,
                            departamentoId: vehiculo.departamentoId,
                        }}
                        departamentos={departamentos}
                    />
                </div>
            </div>

            <div>
                <section className="flex w-full min-w-0 flex-col gap-4 self-start rounded-xl border-4 border-yellow-300 p-3 sm:flex-row sm:items-start sm:p-4">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-xl font-bold text-yellow-300 sm:text-3xl">
                            {matricula}
                        </h2>
                        <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <DetalleDato etiqueta="Marca">{marca}</DetalleDato>
                            <DetalleDato etiqueta="Modelo">{modelo}</DetalleDato>
                            <DetalleDato etiqueta="Tipo de vehículo">{tipo}</DetalleDato>
                            <DetalleDato
                                etiqueta="Estado operativo"
                                estado={operativo ? "correcto" : "error"}
                            >
                                {operativo ? "Operativo" : "No disponible"}
                            </DetalleDato>
                        </dl>
                    </div>

                    {foto && (
                        <Modal
                            trigger={
                                <img
                                    src={foto}
                                    alt="Foto del vehículo"
                                    className="h-32 w-full shrink-0 cursor-zoom-in rounded-lg border border-yellow-300/20 bg-black/30 object-contain sm:h-40 sm:w-40"
                                />
                            }
                        >
                            <img
                                src={foto}
                                alt="Foto del vehículo"
                                className="rounded-lg object-contain"
                            />
                        </Modal>
                    )}
                </section>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:gap-8">
                <section className="min-w-0 self-start rounded-xl border-4 border-yellow-300 p-3 sm:p-4">
                    <div className="mb-4 text-xl font-bold text-yellow-300">
                        Departamento
                    </div>
                    <CardDepartamento data={departamento} />
                </section>

                <section className="min-w-0 overflow-x-auto rounded-xl border-4 border-yellow-300 p-3 sm:p-4">
                    <Suspense
                        fallback={
                            <p className="text-center text-yellow-300">
                                Cargando empleados...
                            </p>
                        }
                    >
                        <ListaEmpleados vehiculoId={vehiculoId} />
                    </Suspense>
                </section>
            </div>
        </div>
    );
}
