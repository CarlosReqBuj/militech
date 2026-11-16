"use client";

import { useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { eliminarEmpleado } from "@/actions/empleados";

export default function BotonEliminarEmpleado({ id, nombre }) {
    const dialogRef = useRef(null);
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    function confirmar() {
        startTransition(async () => {
            const res = await eliminarEmpleado(id);

            if (res?.error) {
                toast.error(res.error);
                return;
            }

            toast.success("Empleado eliminado");
            dialogRef.current.close();
            router.push("/apartados/empleados");
        });
    }

    return (
        <>
            <button
                type="button"
                onClick={() => dialogRef.current.showModal()}
                className="inline-flex items-center justify-center w-full max-w-xs px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg text-center bg-red-500 hover:bg-red-400 rounded-lg text-black font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-red-500/50 active:scale-95"
            >
                Eliminar empleado
            </button>

            <dialog
                ref={dialogRef}
                className="m-auto w-[calc(100%-1.5rem)] max-w-md rounded-xl border-4 border-red-500 bg-neutral-950 p-0 backdrop:bg-black/70"
            >
                <div className="flex flex-col gap-4 p-5 text-center sm:p-8">
                    <h2 className="text-2xl font-bold text-red-500 sm:text-3xl">
                        ¿Eliminar empleado?
                    </h2>

                    <p className="text-sm text-gray-300 sm:text-base">
                        Vas a eliminar a{" "}
                        <span className="font-bold text-yellow-300">
                            {nombre}
                        </span>
                        . Esta acción no se puede deshacer.
                    </p>

                    <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
                        <button
                            type="button"
                            onClick={() => dialogRef.current.close()}
                            disabled={pending}
                            className="rounded-lg px-4 py-2 text-gray-400 underline hover:text-yellow-300 disabled:opacity-50"
                        >
                            Cancelar
                        </button>

                        <button
                            type="button"
                            onClick={confirmar}
                            disabled={pending}
                            className="rounded-lg border-4 border-red-500 px-4 py-2 font-bold text-red-500 transition hover:bg-red-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {pending ? "Eliminando..." : "Sí, eliminar"}
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}
