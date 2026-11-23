"use client";

import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import BotonGenerico from "@/components/BotonGenerico";
import { crearEmpleado } from "@/actions/empleados";

const inputClase =
    "w-full rounded-lg border-2 border-yellow-300/60 bg-transparent px-3 py-2 text-sm sm:text-base text-gray-200 placeholder:text-gray-500 focus:border-yellow-300 focus:outline-none";

const labelClase = "flex flex-col gap-1 text-sm sm:text-base text-gray-300";

function BotonEnviar() {
    const { pending } = useFormStatus();

    return (
        <BotonGenerico type="submit" disabled={pending} className="sm:w-auto">
            {pending ? "Guardando..." : "Guardar empleado"}
        </BotonGenerico>
    );
}

export default function BotonAñadirEmpleado({
    departamentos = [],
    cargos = [],
    vehiculos = [],
}) {
    const dialogRef = useRef(null);

    const [departamentoSeleccionado, setDepartamentoSeleccionado] =
        useState("");

    const vehiculosFiltrados = vehiculos.filter(
        (v) => Number(v.departamentoId) === Number(departamentoSeleccionado),
    );

    async function enviar(formData) {
        const res = await crearEmpleado(formData);

        if (res?.error) {
            toast.error(res.error);
            return;
        }

        toast.success("Empleado añadido");
        dialogRef.current?.close();
    }

    return (
        <>
            <BotonGenerico onClick={() => dialogRef.current?.showModal()}>
                Añadir empleado
            </BotonGenerico>

            <dialog
                ref={dialogRef}
                className="m-auto max-h-[95dvh] w-[calc(100%-1.5rem)] max-w-4xl overflow-y-auto rounded-xl border-4 border-yellow-300 bg-neutral-950 p-0 backdrop:bg-black/70"
            >
                <div className="p-4 sm:p-6">
                    <h2 className="mb-4 text-center text-2xl font-bold text-yellow-300 sm:text-3xl">
                        Nuevo empleado
                    </h2>

                    <form action={enviar} className="flex flex-col gap-4">
                        {/* Datos personales */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <label className={labelClase}>
                                Nombre
                                <input
                                    name="nombre"
                                    required
                                    className={inputClase}
                                    placeholder="Johnny"
                                />
                            </label>

                            <label className={labelClase}>
                                Apellidos
                                <input
                                    name="apellidos"
                                    required
                                    className={inputClase}
                                    placeholder="Silverhand"
                                />
                            </label>

                            <label className={labelClase}>
                                Alias (opcional)
                                <input
                                    name="alias"
                                    className={inputClase}
                                    placeholder="Alias"
                                />
                            </label>
                        </div>

                        {/* Email y salario */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <label className={labelClase}>
                                Email
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className={inputClase}
                                    placeholder="correo@militech.com"
                                />
                            </label>

                            <label className={labelClase}>
                                Salario anual (edis)
                                <input
                                    name="salario"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    required
                                    className={inputClase}
                                />
                            </label>
                        </div>

                        {/* Departamento, cargo y estado */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <label className={labelClase}>
                                Departamento
                                <select
                                    name="departamentoId"
                                    required
                                    value={departamentoSeleccionado}
                                    onChange={(e) =>
                                        setDepartamentoSeleccionado(
                                            e.target.value,
                                        )
                                    }
                                    className={inputClase}
                                >
                                    <option
                                        value=""
                                        disabled
                                        className="bg-neutral-950"
                                    >
                                        Selecciona...
                                    </option>

                                    {departamentos.map((d) => (
                                        <option
                                            key={d.id}
                                            value={d.id}
                                            className="bg-neutral-950"
                                        >
                                            {d.nombre}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className={labelClase}>
                                Cargo
                                <select
                                    name="cargoId"
                                    required
                                    defaultValue=""
                                    className={inputClase}
                                >
                                    <option
                                        value=""
                                        disabled
                                        className="bg-neutral-950"
                                    >
                                        Selecciona...
                                    </option>

                                    {cargos.map((c) => (
                                        <option
                                            key={c.id}
                                            value={c.id}
                                            className="bg-neutral-950"
                                        >
                                            {c.nombre}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <fieldset className="flex items-center gap-6 text-gray-300 sm:self-end sm:pb-2">
                                <legend className="mb-1 text-sm sm:text-base">
                                    Estado
                                </legend>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="activo"
                                        value="true"
                                        defaultChecked
                                        className="accent-yellow-300"
                                    />
                                    Activo
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="activo"
                                        value="false"
                                        className="accent-yellow-300"
                                    />
                                    Inactivo
                                </label>
                            </fieldset>
                        </div>

                        {/* Vehículos asignados */}
                        <details className="group rounded-lg border-2 border-yellow-300/60">
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-3 text-lg font-bold text-yellow-300 hover:bg-yellow-300/10 [&::-webkit-details-marker]:hidden">
                                <span>Vehículos asignados</span>

                                <span className="text-2xl transition-transform duration-200 group-open:rotate-180">
                                    ▾
                                </span>
                            </summary>

                            <div className="flex flex-col gap-3 border-t border-yellow-300/30 p-3">
                                <p className="text-sm text-gray-400">
                                    Selecciona los vehículos que tendrá
                                    asignados este empleado.
                                </p>

                                {vehiculos.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        {vehiculosFiltrados.map((v) => (
                                            <label
                                                key={v.id}
                                                className="flex cursor-pointer items-center gap-3 rounded-lg border border-yellow-300/30 p-3 text-gray-200 hover:bg-yellow-300/10"
                                            >
                                                <input
                                                    type="checkbox"
                                                    name="vehiculos"
                                                    value={v.id}
                                                    className="h-5 w-5 shrink-0 accent-yellow-300"
                                                />

                                                <span className="min-w-0">
                                                    <span className="block font-semibold">
                                                        {v.matricula}
                                                    </span>

                                                    <span className="block text-sm text-gray-400">
                                                        {v.marca} {v.modelo}
                                                    </span>
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400">
                                        No hay vehículos disponibles.
                                    </p>
                                )}
                            </div>
                        </details>

                        {/* Botones */}
                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                            <BotonGenerico
                                variante="secundario"
                                className="sm:w-auto"
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
