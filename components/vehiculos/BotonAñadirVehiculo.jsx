"use client";

import { useRef, useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

import BotonGenerico from "@/components/BotonGenerico";
import { InputImage } from "@/components/simpleui";
import { crearVehiculo } from "@/actions/vehiculos";

const inputClase =
    "w-full rounded-lg border-2 border-yellow-300/60 bg-transparent px-3 py-2 text-sm sm:text-base text-gray-200 placeholder:text-gray-500 focus:border-yellow-300 focus:outline-none";

const labelClase = "flex flex-col gap-1 text-sm sm:text-base text-gray-300";

const TIPOS = ["TERRESTRE", "BLINDADO", "AEREO", "TRANSPORTE"];

function BotonEnviar() {
    const { pending } = useFormStatus();

    return (
        <BotonGenerico type="submit" disabled={pending} className="sm:w-auto">
            {pending ? "Guardando..." : "Guardar vehículo"}
        </BotonGenerico>
    );
}

export default function BotonAñadirVehiculo({ departamentos = [] }) {
    const dialogRef = useRef(null);
    const formRef = useRef(null);

    const [state, formAction, pending] = useActionState(crearVehiculo, null);

    // Gestionar respuesta del servidor
    useEffect(() => {
        if (!state) return;

        if (state.error) {
            toast.error(state.error);
            return;
        }

        if (state.type === "success") {
            toast.success(state.message);

            formRef.current?.reset();
            dialogRef.current?.close();
        }
    }, [state]);

    return (
        <>
            <BotonGenerico onClick={() => dialogRef.current?.showModal()}>
                Añadir vehículo
            </BotonGenerico>

            <dialog
                ref={dialogRef}
                className="m-auto max-h-[95dvh] w-[calc(100%-1.5rem)] max-w-4xl overflow-y-auto rounded-xl border-4 border-yellow-300 bg-neutral-950 p-0 backdrop:bg-black/70"
            >
                <div className="p-4 sm:p-6">
                    <h2 className="mb-4 text-center text-2xl font-bold text-yellow-300 sm:text-3xl">
                        Nuevo vehículo
                    </h2>

                    <form
                        ref={formRef}
                        action={formAction}
                        className="flex flex-col gap-4"
                    >
                        {/* Matrícula, marca y modelo */}

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <label className={labelClase}>
                                Matrícula
                                <input
                                    name="matricula"
                                    required
                                    className={inputClase}
                                    placeholder="NC-1001-MIL"
                                />
                            </label>

                            <label className={labelClase}>
                                Marca
                                <input
                                    name="marca"
                                    required
                                    defaultValue="Militech"
                                    className={inputClase}
                                />
                            </label>

                            <label className={labelClase}>
                                Modelo
                                <input
                                    name="modelo"
                                    required
                                    className={inputClase}
                                    placeholder="Basilisk"
                                />
                            </label>
                        </div>

                        {/* Tipo, departamento y estado */}

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <label className={labelClase}>
                                Tipo
                                <select
                                    name="tipo"
                                    required
                                    defaultValue=""
                                    className={inputClase}
                                >
                                    <option value="" disabled>
                                        Selecciona...
                                    </option>

                                    {TIPOS.map((t) => (
                                        <option key={t} value={t}>
                                            {t}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className={labelClase}>
                                Departamento
                                <select
                                    name="departamentoId"
                                    required
                                    defaultValue=""
                                    className={inputClase}
                                >
                                    <option value="" disabled>
                                        Selecciona...
                                    </option>

                                    {departamentos.map((d) => (
                                        <option key={d.id} value={d.id}>
                                            {d.nombre}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="flex items-center gap-3 text-sm text-gray-300 sm:self-end sm:pb-2 sm:text-base">
                                <input
                                    name="operativo"
                                    type="checkbox"
                                    defaultChecked
                                    className="h-5 w-5 shrink-0 accent-yellow-300"
                                />
                                Operativo
                            </label>
                        </div>

                        {/* Fotografía */}

                        <InputImage
                            name="foto"
                            label="Fotografía del vehículo"
                            width={320}
                            height={200}
                        />

                        {/* Botones */}

                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                            <BotonGenerico
                                type="button"
                                variante="secundario"
                                className="sm:w-auto"
                                disabled={pending}
                                onClick={() => dialogRef.current?.close()}
                            >
                                Cancelar
                            </BotonGenerico>

                            <BotonEnviar />
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}
