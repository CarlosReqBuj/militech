"use client";

import Link from "next/link";

export const CardVehiculo = ({ data }) => (
    <div className="flex flex-col gap-2 rounded-xl border-2 border-yellow-300 bg-zinc-900 p-5 shadow-lg shadow-yellow-300/10 transition duration-200 hover:-translate-y-1 hover:border-yellow-200 hover:shadow-yellow-300/30">
        <Link href={"/apartados/vehiculos/" + data.id}>
            <h3 className="text-xl font-bold text-yellow-300">
                {data.matricula}
            </h3>
            <div className="flex gap-2">
                <p className="text-zinc-300">{data.marca}</p>

                <p className="text-zinc-300">{data.modelo}</p>
            </div>
            <p className="text-zinc-300">{data.tipo}</p>
            <p className="text-zinc-300">{data.operativo}</p>
        </Link>
    </div>
);
