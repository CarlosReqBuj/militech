"use client";

import Link from "next/link";

const estados = {
    PLANIFICADO: "text-zinc-300 border-zinc-500",
    EN_CURSO: "text-red-500 border-red-600",
    PAUSADO: "text-orange-400 border-orange-400",
    COMPLETADO: "text-green-400 border-green-400",
    CANCELADO: "text-zinc-500 border-zinc-600",
};

export default function CardProyecto({ data }) {
    const presupuesto = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
    }).format(data.presupuesto);

    return (
        <div className="flex h-full flex-col gap-3 rounded-xl border-2 border-red-600 bg-zinc-900 p-5 text-zinc-300 shadow-lg shadow-red-600/10 transition duration-200 hover:-translate-y-1 hover:border-red-500 hover:shadow-red-600/50">
            <Link href={"/apartados/proyectos/" + data.id}>
                <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-sm tracking-widest text-red-500">
                        {data.codigo}
                    </span>
                    <span
                        className={`rounded-md border px-2 py-0.5 text-xs font-bold ${estados[data.estado]}`}
                    >
                        {data.estado.replace("_", " ")}
                    </span>
                </div>

                <h2 className="text-xl font-bold text-red-500">
                    {data.nombre}
                </h2>

                {data.descripcion && (
                    <p className="text-sm text-zinc-400">{data.descripcion}</p>
                )}

                <dl className="mt-auto grid grid-cols-2 gap-x-3 gap-y-1 text-sm">
                    <dt className="text-zinc-500">Nivel</dt>
                    <dd className="font-bold text-red-500">
                        {data.nivelSecreto}
                    </dd>

                    <dt className="text-zinc-500">Departamento</dt>
                    <dd>{data.departamento}</dd>

                    <dt className="text-zinc-500">Empleados</dt>
                    <dd>{data.empleados}</dd>

                    <dt className="text-zinc-500">Presupuesto</dt>
                    <dd>{presupuesto}</dd>

                    <dt className="text-zinc-500">Inicio</dt>
                    <dd>{data.fechaInicio}</dd>
                </dl>
            </Link>
        </div>
    );
}
