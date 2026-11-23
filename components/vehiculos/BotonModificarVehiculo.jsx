"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

import BotonGenerico from "@/components/BotonGenerico";
import { InputImage } from "@/components/simpleui";
import { actualizarVehiculo } from "@/actions/vehiculos";

const inputClase =
    "w-full rounded-lg border-2 border-yellow-300/60 bg-neutral-950 px-3 py-2 text-sm sm:text-base text-gray-200 placeholder:text-gray-500 focus:border-yellow-300 focus:outline-none";

const labelClase = "flex flex-col gap-1 text-sm sm:text-base text-gray-300";

const TIPOS = ["TERRESTRE", "BLINDADO", "AEREO", "TRANSPORTE"];

function BotonGuardar() {
    const { pending } = useFormStatus();

    return (
        <BotonGenerico type="submit" disabled={pending} className="sm:w-auto">
            {pending ? "Guardando..." : "Guardar cambios"}
        </BotonGenerico>
    );
}

export default function BotonModificarVehiculo({
    vehiculo,
    departamentos = [],
}) {
    const dialogRef = useRef(null);
    const formRef = useRef(null);

    async function enviar(formData) {
        const res = await actualizarVehiculo(vehiculo.id, formData);

        if (res?.error) {
            toast.error(res.error);
            return;
        }

        toast.success("Vehículo modificado");
        dialogRef.current?.close();
    }

    return (
        <>
            <BotonGenerico onClick={() => dialogRef.current?.showModal()}>
                Modificar vehículo
            </BotonGenerico>

            <dialog
                ref={dialogRef}
                onClose={() => formRef.current?.reset()}
                className="m-auto max-h-[95dvh] w-[calc(100%-1.5rem)] max-w-4xl overflow-y-auto rounded-xl border-4 border-yellow-300 bg-neutral-950 p-0 text-gray-200 backdrop:bg-black/70"
            >
                <div className="p-4 sm:p-6">
                    <h2 className="mb-4 text-center text-2xl font-bold text-yellow-300 sm:text-3xl">
                        Modificar vehículo
                    </h2>

                    <form
                        key={vehiculo.id}
                        ref={formRef}
                        action={enviar}
                        className="flex flex-col gap-4"
                    >
                        {/* Matrícula, marca y modelo */}

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <label className={labelClase}>
                                Matrícula
                                <input
                                    name="matricula"
                                    required
                                    defaultValue={vehiculo.matricula}
                                    className={inputClase}
                                    placeholder="NC-1001-MIL"
                                />
                            </label>

                            <label className={labelClase}>
                                Marca
                                <input
                                    name="marca"
                                    required
                                    defaultValue={vehiculo.marca}
                                    className={inputClase}
                                />
                            </label>

                            <label className={labelClase}>
                                Modelo
                                <input
                                    name="modelo"
                                    required
                                    defaultValue={vehiculo.modelo}
                                    className={inputClase}
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
                                    defaultValue={vehiculo.tipo}
                                    className={inputClase}
                                >
                                    {TIPOS.map((t) => (
                                        <option
                                            key={t}
                                            value={t}
                                            className="bg-neutral-950 text-gray-200"
                                        >
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
                                    defaultValue={String(
                                        vehiculo.departamentoId,
                                    )}
                                    className={inputClase}
                                >
                                    {departamentos.map((d) => (
                                        <option
                                            key={d.id}
                                            value={d.id}
                                            className="bg-neutral-950 text-gray-200"
                                        >
                                            {d.nombre}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="flex items-center gap-3 text-sm text-gray-300 sm:self-end sm:pb-2 sm:text-base">
                                <input
                                    name="operativo"
                                    type="checkbox"
                                    defaultChecked={vehiculo.operativo}
                                    className="h-5 w-5 shrink-0 accent-yellow-300"
                                />
                                Operativo
                            </label>
                        </div>

                        {/* Fotografía */}

                        <div className="rounded-lg border-2 border-yellow-300/30 bg-neutral-900 p-3">
                            <InputImage
                                name="foto"
                                label="Fotografía del vehículo"
                                value={vehiculo.foto ?? ""}
                                width={320}
                                height={200}
                            />
                        </div>

                        {/* Botones */}

                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                            <BotonGenerico
                                type="button"
                                variante="secundario"
                                className="sm:w-auto"
                                onClick={() => dialogRef.current?.close()}
                            >
                                Cancelar
                            </BotonGenerico>

                            <BotonGuardar />
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}
