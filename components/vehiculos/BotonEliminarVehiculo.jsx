"use client";

import { useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { eliminarVehiculo } from "@/actions/vehiculos";
import BotonGenerico from "@/components/BotonGenerico";

export default function BotonEliminarVehiculo({ id, matricula }) {
    const dialogRef = useRef(null);
    const router = useRouter();

    const [pending, startTransition] = useTransition();

    function confirmar() {
        if (pending) return;

        startTransition(async () => {
            try {
                const res = await eliminarVehiculo(id);

                if (res?.error) {
                    toast.error(res.error);
                    return;
                }

                if (res?.type === "success") {
                    toast.success(res.message);

                    dialogRef.current?.close();

                    router.push("/apartados/vehiculos");
                    router.refresh();
                }
            } catch (error) {
                console.error("Error al eliminar:", error);
                toast.error("Ha ocurrido un error al eliminar el vehículo");
            }
        });
    }

    return (
        <>
            <BotonGenerico
                type="button"
                variante="rojo"
                onClick={() => dialogRef.current?.showModal()}
            >
                Eliminar vehículo
            </BotonGenerico>

            <dialog
                ref={dialogRef}
                className="m-auto w-[calc(100%-1.5rem)] max-w-md rounded-xl border-4 border-red-500 bg-neutral-950 p-0 backdrop:bg-black/70"
            >
                <div className="flex flex-col gap-4 p-5 text-center sm:p-8">
                    <h2 className="text-2xl font-bold text-red-500 sm:text-3xl">
                        ¿Eliminar vehículo?
                    </h2>

                    <p className="text-sm text-gray-300 sm:text-base">
                        Vas a eliminar el vehículo{" "}
                        <span className="font-bold text-yellow-300">
                            {matricula}
                        </span>
                        . Esta acción no se puede deshacer.
                    </p>

                    <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
                        <BotonGenerico
                            type="button"
                            variante="secundario"
                            disabled={pending}
                            className="sm:w-auto"
                            onClick={() => dialogRef.current?.close()}
                        >
                            Cancelar
                        </BotonGenerico>

                        <BotonGenerico
                            type="button"
                            variante="rojo"
                            disabled={pending}
                            className="sm:w-auto border-4 border-red-500 hover:bg-red-500 hover:text-black"
                            onClick={confirmar}
                        >
                            {pending ? "Eliminando..." : "Sí, eliminar"}
                        </BotonGenerico>
                    </div>
                </div>
            </dialog>
        </>
    );
}
