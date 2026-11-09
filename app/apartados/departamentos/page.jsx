import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import Anterior from "@/components/BotonFlechaAnterior";
import { List } from "@/components/simpleui";
import { CardDepartamento } from "@/components/CardDepartamento";

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
    const departamentos = await prisma.departamento.findMany({});

    return (
        <>
            <List
                card={CardDepartamento}
                data={departamentos}
                columns={[{ name: "nombre", label: "Nombre" }]}
                sort="nombre"
                direction="asc"
            >
                <div className="text-xl font-bold">Lista departamentos</div>
            </List>
        </>
    );
}
