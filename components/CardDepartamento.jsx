"use client";

import Link from "next/link";

export const CardDepartamento = ({ data }) => (
    <div className="flex flex-col gap-2 rounded-xl border-2 border-yellow-300 bg-zinc-900 p-5 shadow-lg shadow-yellow-300/10 transition duration-200 hover:-translate-y-1 hover:border-yellow-200 hover:shadow-yellow-300/30">
        <Link href={"/apartados/departamentos/" + data.id}>
            <h3 className="text-xl font-bold text-yellow-300">{data.nombre}</h3>

            <p className="text-zinc-300">{data.descripcion}</p>
        </Link>
    </div>
);
