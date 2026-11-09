import { connection } from "next/server";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import Anterior from "@/components/BotonFlechaAnterior";
import { List } from "@/components/simpleui";
import { CardEmpleado } from "@/components/CardEmpleado";

export default function Empleados() {
    return (
        <main className="min-h-screen bg-zinc-950 p-5">
            <div className="relative flex min-h-[90vh] flex-col items-center gap-10 rounded-xl border-4 border-yellow-300 p-8">
                <div className="absolute left-6 top-6">
                    <Anterior />
                </div>

                <h1 className="mt-12 text-5xl font-bold text-yellow-300">
                    Empleados
                </h1>

                <div className="w-full max-w-6xl">
                    <Suspense
                        fallback={
                            <p className="text-center text-yellow-300">
                                Cargando empleados...
                            </p>
                        }
                    >
                        <ListaEmpleados />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}

async function ListaEmpleados() {
    await connection();

    const empleadosDB = await prisma.empleado.findMany({});

    const empleados = empleadosDB.map((e) => ({
        ...e,
        salario: e.salario.toNumber(),
    }));

    return (
        <>
            <List
                card={CardEmpleado}
                data={empleados}
                columns={[
                    { name: "nombre", label: "Nombre" },
                    { name: "apellido", label: "Apellido" },
                    { name: "alias", label: "Alias" },
                    { name: "email", label: "Email" },
                ]}
                sort="nombre"
                direction="asc"
            >
                <div className="text-xl font-bold">Lista empleados</div>
            </List>
        </>
    );
}
