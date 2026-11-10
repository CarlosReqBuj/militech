import { Suspense } from "react";
import Anterior from "@/components/BotonFlechaAnterior";
import ListaEmpleados from "@/components/ListaEmpleados";

export default function Empleados() {
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
                    text-center 
                    break-words"
                >
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
