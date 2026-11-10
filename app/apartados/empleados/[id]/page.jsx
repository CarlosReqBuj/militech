import { Suspense } from "react";
import Anterior from "@/components/BotonFlechaAnterior";

export default function Page({ params }) {
    return (
        <main className="min-h-screen bg-transparent p-5">
            <div className="relative flex min-h-[90vh] flex-col items-center gap-10 rounded-xl border-4 border-yellow-300 p-8">
                <div className="absolute left-6 top-6">
                    <Anterior />
                </div>

                <h1 className="mt-12 text-5xl font-bold text-yellow-300">
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

    return (
        <div>
            <h2 className="text-center text-2xl text-yellow-300">ID: {id}</h2>
        </div>
    );
}
